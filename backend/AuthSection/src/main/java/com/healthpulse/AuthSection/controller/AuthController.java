package com.healthpulse.AuthSection.controller;


import java.security.Principal;
import jakarta.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
@CrossOrigin // Add this if you need to handle cross-origin requests
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
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        try {
            this.authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            throw new ApiException("Invalid username or password !!");
        }
    }

    // register new user api
    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto, @RequestParam ("roleId") Integer roleId) {
        UserDto registeredUser = this.userService.registerNewUser(userDto, roleId);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    // get logged-in user data
    @GetMapping("/current-user/")
    public ResponseEntity<UserDto> getUser(Principal principal) {
        User user = this.userRepo.findByEmail(principal.getName()).orElseThrow(() -> new ApiException("User not found !!"));
        return new ResponseEntity<>(this.mapper.map(user, UserDto.class), HttpStatus.OK);
    }
}