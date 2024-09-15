package com.example.emailapis.controller;

import com.example.emailapis.dto.UserRegistrationDto;
import com.example.emailapis.event.OnRegistrationCompleteEvent;
import com.example.emailapis.model.User;
import com.example.emailapis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RegistrationController {

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @PostMapping("/register")
    public ResponseEntity<String> registerUserAccount(@RequestBody UserRegistrationDto userDto) {
        User registered = userService.registerNewUserAccount(userDto);
        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered));
        return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful. Please check your email for verification.");
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        String result = userService.validateVerificationToken(token);
        if (result.equals("valid")) {
            return ResponseEntity.ok("Your account has been verified successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification token.");
        }
    }
}
