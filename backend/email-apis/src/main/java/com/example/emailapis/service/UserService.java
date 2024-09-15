package com.example.emailapis.service;


import com.example.emailapis.dto.UserRegistrationDto;
import com.example.emailapis.model.User;
import com.example.emailapis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public User registerNewUserAccount(UserRegistrationDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setEnabled(false);
        userRepository.save(user);

        // Generate verification token and send email
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        userRepository.save(user);

        String confirmationUrl = "http://localhost:8989/verify-email?token=" + token;
        emailService.sendEmail(user.getEmail(), "Email Verification", "Click the link to verify your email: " + confirmationUrl);

        return user;
    }

    public String validateVerificationToken(String token) {
        User user = userRepository.findByVerificationToken(token).orElse(null);
        if (user == null) {
            return "invalid";
        }

        user.setEnabled(true);
        userRepository.save(user);
        return "valid";
    }
}
