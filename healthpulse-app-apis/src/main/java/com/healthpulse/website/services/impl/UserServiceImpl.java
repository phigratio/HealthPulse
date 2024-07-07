package com.healthpulse.website.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthpulse.website.config.AppConstants;
import com.healthpulse.website.entities.DoctorInfo;
import com.healthpulse.website.entities.Role;
import com.healthpulse.website.entities.User;
import com.healthpulse.website.exceptions.ResourceNotFoundException;
import com.healthpulse.website.payloads.DoctorInfoDto;
import com.healthpulse.website.payloads.UserDto;
import com.healthpulse.website.repositories.DoctorInfoRepo;
import com.healthpulse.website.repositories.RoleRepo;
import com.healthpulse.website.repositories.UserRepo;
import com.healthpulse.website.services.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private DoctorInfoRepo doctorInfoRepo;


	@Override
	public UserDto createUser(UserDto userDto) {
		User user = this.dtoToUser(userDto);
		User savedUser = this.userRepo.save(user);
		return this.userToDto(savedUser);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", " Id ", userId));

		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
//		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		user.setAbout(userDto.getAbout());
		user.setAge(userDto.getAge());

		// Set the new fields
		user.setHeight(userDto.getHeight());
		user.setWeight(userDto.getWeight());
		user.setGender(userDto.getGender());
		user.setBloodGroup(userDto.getBloodGroup());
		user.setWaist(userDto.getWaist());
		user.setHip(userDto.getHip());
		user.setBmi(userDto.getBmi());
		user.setBodyFatPercentage(userDto.getBodyFatPercentage());
		user.setWaistToHipRatio(userDto.getWaistToHipRatio());
		user.setCalorieNeeds(userDto.getCalorieNeeds());
		user.setIdealWeight(userDto.getIdealWeight());
		user.setWaterIntake(userDto.getWaterIntake());
		user.setBsa(userDto.getBsa());
		user.setProteinNeeds(userDto.getProteinNeeds());
		user.setCarbNeeds(userDto.getCarbNeeds());
		user.setFatNeeds(userDto.getFatNeeds());
		user.setMuscleMassNeeds(userDto.getMuscleMassNeeds());
		user.setBoneDensityNeeds(userDto.getBoneDensityNeeds());
		user.setMetabolicAgeNeeds(userDto.getMetabolicAgeNeeds());
		user.setVisceralFatNeeds(userDto.getVisceralFatNeeds());
		user.setBodyWaterNeeds(userDto.getBodyWaterNeeds());
		user.setMuscleMass(userDto.getMuscleMass());
		user.setBoneDensity(userDto.getBoneDensity());
		user.setMetabolicAge(userDto.getMetabolicAge());
		user.setVisceralFat(userDto.getVisceralFat());
		user.setBodyWater(userDto.getBodyWater());
		
		//Set the doctor info
		
		DoctorInfo doctorInfo = user.getDoctorInfo();
		if (doctorInfo != null) {
			DoctorInfoDto doctorInfoDto = userDto.getDoctorInfo();
			doctorInfo.setSpecialization(doctorInfoDto.getSpecialization());
			doctorInfo.setDegrees(doctorInfoDto.getDegrees());
			doctorInfo.setCertificates(doctorInfoDto.getCertificates());
			doctorInfo.setExperience(doctorInfoDto.getExperience());
			doctorInfo.setApprovedByAdmin(doctorInfoDto.getApprovedByAdmin());
		}

		User updatedUser = this.userRepo.save(user);
		return this.userToDto(updatedUser);
	}

	@Override
	public UserDto getUserById(Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", " Id ", userId));

		return this.userToDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {

		List<User> users = this.userRepo.findAll();
		List<UserDto> userDtos = users.stream().map(user -> this.userToDto(user)).collect(Collectors.toList());

		return userDtos;
	}

	@Override
	public void deleteUser(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
		this.userRepo.delete(user);

	}

	public User dtoToUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);

		// user.setId(userDto.getId());
		// user.setName(userDto.getName());
		// user.setEmail(userDto.getEmail());
		// user.setAbout(userDto.getAbout());
		// user.setPassword(userDto.getPassword());
		return user;
	}

	public UserDto userToDto(User user) {
		UserDto userDto = this.modelMapper.map(user, UserDto.class);
		return userDto;
	}
	
	@Transactional
    @Override
    public UserDto registerNewUser(UserDto userDto, Integer roleId) {
        User user = this.modelMapper.map(userDto, User.class);

        // Encode the password
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));

        // Get the role
        Role role = this.roleRepo.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "Id", roleId));

        user.getRoles().add(role);

        User newUser = this.userRepo.save(user);

        // If the role is doctor (role ID 503), create a DoctorInfo entry
        if (roleId == 503) {
            DoctorInfoDto doctorInfoDto = userDto.getDoctorInfo();
            if (doctorInfoDto == null) {
                // Handle case where DoctorInfoDto is null
                DoctorInfo doctorInfo = new DoctorInfo();
                doctorInfo.setUser(newUser);
                doctorInfo.setDegrees("");
                doctorInfo.setCertificates("");
                doctorInfo.setExperience("");
                doctorInfo.setSpecialization("General"); // Example default value
                doctorInfo.setApprovedByAdmin("Pending");
                

                this.doctorInfoRepo.save(doctorInfo);
            } else {
                DoctorInfo doctorInfo = new DoctorInfo();
                doctorInfo.setUser(newUser);
                doctorInfo.setSpecialization(doctorInfoDto.getSpecialization());
                doctorInfo.setDegrees(doctorInfoDto.getDegrees());
                doctorInfo.setCertificates(doctorInfoDto.getCertificates());
                doctorInfo.setExperience(doctorInfoDto.getExperience());
                doctorInfo.setApprovedByAdmin("Pending");

                this.doctorInfoRepo.save(doctorInfo);
            }
        }

        return this.modelMapper.map(newUser, UserDto.class);
    }


}