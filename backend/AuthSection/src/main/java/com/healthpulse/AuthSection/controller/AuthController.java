package com.healthpulse.AuthSection.controller;


import java.security.Principal;

import com.healthpulse.AuthSection.event.OnRegistrationCompleteEvent;
import com.healthpulse.AuthSection.exception.ResourceNotFoundException;
import com.healthpulse.AuthSection.payloads.ApiResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.AuthSection.entity.User;
import com.healthpulse.AuthSection.exception.ApiException;
import com.healthpulse.AuthSection.payloads.JwtAuthRequest;
import com.healthpulse.AuthSection.payloads.JwtAuthResponse;
import com.healthpulse.AuthSection.payloads.UserDto;
import com.healthpulse.AuthSection.repository.UserRepo;
import com.healthpulse.AuthSection.security.JwtTokenHelper;
import com.healthpulse.AuthSection.service.UserService;

@RestController
@RequestMapping("/auth")
//@CrossOrigin // Add this if you need to handle cross-origin requests
public class AuthController {

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) throws Exception {
        this.authenticate(request.getUsername(), request.getPassword());
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());
        String token = this.jwtTokenHelper.generateToken(userDetails);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(token);
        response.setUser(this.mapper.map((User) userDetails, UserDto.class));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    private void authenticate(String username, String password) throws Exception {
        // Log to check the received username (which is the email)
        System.out.println("Authenticating user with email: " + username);

        // Fetch the user by email (username is email in this case)
        User user = this.userRepo.findByEmail(username)
                .orElseThrow(() -> new ApiException("User not found !!!"));

        // Log to check if the user was found
        System.out.println("User found: " + user.getEmail() + ", Enabled: " + user.isEnabled());

        // Check if the user is enabled (i.e., email is verified)
        if (!user.isEnabled()) {
            // Log that the user has not verified their email
            System.out.println("User email is not verified for: " + username);
            throw new ApiException("Please Verify Your Email"); // Throw exception if not verified
        }

        // Log before proceeding with authentication
        System.out.println("User is verified, proceeding with authentication.");

        // Proceed with authentication as it was doing before
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);

        try {
            this.authenticationManager.authenticate(authenticationToken);
            // Log if authentication is successful
            System.out.println("Authentication successful for: " + username);
        } catch (BadCredentialsException e) {
            // Log if the authentication fails
            System.out.println("Invalid credentials for: " + username);
            throw new ApiException("Invalid username or password !!!");
        }
    }


    // register new user api
    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto, @RequestParam ("roleId") Integer roleId) {
        UserDto registeredUser = this.userService.registerNewUser(userDto, roleId);
        // Convert UserDto to User entity using ModelMapper
        User registeredUserEntity = mapper.map(registeredUser, User.class);

        // Publish the registration complete event with the User entity
        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registeredUserEntity));
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    // get logged-in user data
    @GetMapping("/current-user/")
    public ResponseEntity<UserDto> getUser(Principal principal) {
        User user = this.userRepo.findByEmail(principal.getName()).orElseThrow(() -> new ApiException("User not found !!"));
        return new ResponseEntity<>(this.mapper.map(user, UserDto.class), HttpStatus.OK);
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


    @PostMapping("/forgot-password/{email}")
    public ResponseEntity<ApiResponse> forgotPassword(@PathVariable("email") String email) throws MessagingException {
        try {
            userService.forgotPassword(email);
            return new ResponseEntity<>(new ApiResponse("Password reset link sent to your email. ", true), HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponse("User with given email not found", false), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse("An unexpected error occurred", false), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/reset-password/{token}/{newPass}")
    public ResponseEntity<ApiResponse> resetPassword(@PathVariable("token") String token, @PathVariable("newPass") String newPass) {
        try {
            userService.resetPassword(token, newPass);
            return new ResponseEntity<>(new ApiResponse("Password changed successfully !!!", true), HttpStatus.OK);
        } catch (ApiException e) {
            return new ResponseEntity<>(new ApiResponse("Invalid or expired token !!!", false), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse("An unexpected error occurred !!!", false), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}