package com.healthpulse.AuthSection.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthpulse.AuthSection.entity.DoctorInfo;
import com.healthpulse.AuthSection.entity.Role;
import com.healthpulse.AuthSection.entity.User;
import com.healthpulse.AuthSection.exception.ResourceNotFoundException;
import com.healthpulse.AuthSection.payloads.DoctorInfoDto;
import com.healthpulse.AuthSection.payloads.UserDto;
import com.healthpulse.AuthSection.repository.DoctorInfoRepo;
import com.healthpulse.AuthSection.repository.RoleRepo;
import com.healthpulse.AuthSection.repository.UserRepo;
import com.healthpulse.AuthSection.service.UserService;

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
	            .orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));

	    user.setName(userDto.getName());
	    user.setEmail(userDto.getEmail());
	    user.setAbout(userDto.getAbout());
	    user.setAge(userDto.getAge());
	    user.setImageName(userDto.getImageName());

	    // Update DoctorInfo if it exists
	    DoctorInfo doctorInfo = user.getDoctorInfo();
	    if (doctorInfo != null) {
	        DoctorInfoDto doctorInfoDto = userDto.getDoctorInfo();
	        if (doctorInfoDto != null) {
	            doctorInfo.setSpecialization(doctorInfoDto.getSpecialization());
	            doctorInfo.setDegrees(doctorInfoDto.getDegrees());
	            doctorInfo.setCertificates(doctorInfoDto.getCertificates());
	            doctorInfo.setCV(doctorInfoDto.getCV());
	            doctorInfo.setCertificateOfRegistration(doctorInfoDto.getCertificateOfRegistration());
	            doctorInfo.setExperience(doctorInfoDto.getExperience());
//	            doctorInfo.setApprovedByAdmin(doctorInfoDto.getApprovedByAdmin());
	        }
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
        
        if(roleId==502) {
            user.setImageName("user.png");
        }
		if (roleId == 503) {
			user.setImageName("doctor.png");
		}
		if (roleId == 501) {
			user.setImageName("admin.png");
		}

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