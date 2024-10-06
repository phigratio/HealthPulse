package com.healthpulse.AuthSection.service.impl;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.healthpulse.AuthSection.exception.ApiException;
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

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

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

	@Autowired
	private JavaMailSender mailSender;


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
	
	@Override
	@Transactional
	public UserDto approveDoctor(int userId) throws MessagingException {
	    DoctorInfo doctorInfo = doctorInfoRepo.findByUser_Id(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("DoctorInfo", "userId", userId));
	    doctorInfo.approve();
	    doctorInfoRepo.save(doctorInfo);

	    // Return the updated User with DoctorInfo
	    User user = doctorInfo.getUser();
		sendEmailDoctorConfirmation(user.getEmail(), user.getName());
	    return userToDto(user);
	}

	@Override
	@Transactional
	public UserDto rejectDoctor(int userId) {
	    DoctorInfo doctorInfo = doctorInfoRepo.findByUser_Id(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("DoctorInfo", "userId", userId));
	    doctorInfo.reject();
	    doctorInfoRepo.save(doctorInfo);

	    // Return the updated User with DoctorInfo
	    User user = doctorInfo.getUser();
	    return userToDto(user);
	}

	@Override
	public List<UserDto> getPendingDoctorApprovals() {
	    List<DoctorInfo> pendingDoctors = doctorInfoRepo.findByApprovedByAdmin("Pending");
	    return pendingDoctors.stream()
	            .map(doctorInfo -> {
	                User user = doctorInfo.getUser();
	                return userToDto(user);
	            })
	            .collect(Collectors.toList());
	}

	@Override
	public String validateVerificationToken(String token) {
		User user = userRepo.findByVerificationToken(token).orElse(null);
		if (user == null) {
			return "invalid";
		}

		user.setEnabled(true);
		userRepo.save(user);
		return "valid";
	}

	@Override
	public String forgotPassword(String email) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User", "email"));
		if (user == null) {
			return "You are not registered yet";
		}
		else{
			String token = UUID.randomUUID().toString();
			user.setVerificationToken(token);
			userRepo.save(user);

			try {
				forgotPasswordEmail(email, token);
			} catch (MessagingException e) {
				return "Failed to send reset password email";
			}

			return "A email is sent to your email address";
		}
	}

	@Override
	public String resetPassword(String token, String newPassword) {
		User user = userRepo.findByVerificationToken(token).orElseThrow(() -> new ApiException("Invalid or expired reset token."));

		if (user == null) {
			return "You are not valid user to reset password";
		}
		else{
			user.setPassword(this.passwordEncoder.encode(newPassword));
			String newToken = UUID.randomUUID().toString();
			user.setVerificationToken(newToken);
			userRepo.save(user);
			return "Your new password is set properly!!!";
		}

	}

	// Send forgot password email to the user
	private void forgotPasswordEmail(String email, String token) throws MessagingException {
		User user = userRepo.findByEmail(email).orElse(null);

		// Generate a password reset URL using the token
		String resetUrl = "http://localhost:3000/reset-password?token=" + token;

		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		helper.setTo(email);
		helper.setSubject("Reset Your Password - Health Pulse");

		// HTML content for password reset email
		String emailContent = "<html>"
				+ "<body style='font-family: Arial, sans-serif; background-color: #f4f9ff; padding: 20px;'>"
				+ "<div style='max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'>"
				+ "<h2 style='color: #1E90FF; text-align: center;'>Forgot Your Password?</h2>"
				+ "<p style='font-size: 16px; color: #333333; line-height: 1.6;'>"
				+ "No worries, we’ve got you covered! You can reset your password by clicking the button below."
				+ "</p>"
				+ "<div style='text-align: center; margin: 20px 0;'>"
				+ "<a href='" + resetUrl + "' style='background-color: #1E90FF; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;'>"
				+ "Reset Password</a>"
				+ "</div>"
				+ "<p style='font-size: 16px; color: #333333;'>"
				+ "If you did not request this password reset, please ignore this email. This link will expire in 24 hours."
				+ "</p>"
				+ "<p style='font-size: 16px; color: #333333;'>"
				+ "Best regards,<br><strong>Health Pulse Team</strong>"
				+ "</p>"
				+ "</div>"
				+ "</body>"
				+ "</html>";

		helper.setText(emailContent, true);
		mailSender.send(mimeMessage);
	}


	// Send email reminder with improved theme and content
	private void sendEmailDoctorConfirmation(String email, String name) throws MessagingException {
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		helper.setTo(email);
		helper.setSubject("Welcome! You are a Registered Doctor at Health Pulse");

		// Improved HTML template with blue health-sector theme
		String emailContent = "<html>"
				+ "<body style='font-family: Arial, sans-serif; background-color: #f4f9ff; padding: 20px;'>"
				+ "<div style='max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'>"
				+ "<div style='text-align: center;'>"
				+ "</div>"
				+ "<h1 style='color: #1E90FF; text-align: center; font-size: 24px; margin-bottom: 10px;'>Welcome, Dr. " + name + "!</h1>"
				+ "<p style='font-size: 18px; color: #333333; text-align: center;'>"
				+ "We are thrilled to have you as part of the Health Pulse team."
				+ "</p>"
				+ "<hr style='border: 0; height: 1px; background-color: #1E90FF;' />"
				+ "<p style='font-size: 16px; color: #333333; line-height: 1.6;'>"
				+ "As a registered doctor on Health Pulse, you now have access to several exciting features:"
				+ "</p>"
				+ "<ul style='font-size: 16px; color: #333333; line-height: 1.6;'>"
				+ "<li>Add and manage blogs to share your expertise with patients and peers.</li>"
				+ "<li>Schedule and manage appointments with ease.</li>"
				+ "<li>Access various tools to grow your medical practice.</li>"
				+ "</ul>"
				+ "<div style='text-align: center; margin: 20px 0;'>"
				+ "</div>"
				+ "<p style='font-size: 16px; color: #333333;'>"
				+ "We are confident that your journey with Health Pulse will be rewarding. If you need assistance, feel free to reach out to our support team."
				+ "</p>"
				+ "<p style='font-size: 16px; color: #333333;'>"
				+ "Best regards,<br><strong>Health Pulse Team</strong>"
				+ "</p>"
				+ "<div style='text-align: center; margin-top: 20px;'>"
				+ "</div>"
				+ "</div>"
				+ "</body>"
				+ "</html>";

		helper.setText(emailContent, true);
		mailSender.send(mimeMessage);
	}




}