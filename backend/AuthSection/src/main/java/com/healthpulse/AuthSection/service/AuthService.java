package com.healthpulse.AuthSection.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthpulse.AuthSection.entity.UserCredential;
import com.healthpulse.AuthSection.repository.UserCredentialRepo;

@Service
public class AuthService {
	
	@Autowired
    private UserCredentialRepo userCredentialRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtService jwtService;
	
	public String saveUser(UserCredential userCredential ) {
		userCredential.setId(UUID.randomUUID().toString());
		userCredential.setPassword(passwordEncoder.encode(userCredential .getPassword()));
		userCredentialRepo.save(userCredential);
		

		return ("User Saved with info : "+userCredential.getName()+" "+userCredential.getEmail());
    }
	
	 public String generateToken(String username) {
	        return jwtService.generateToken(username);
	    }

	    public void validateToken(String token) {
	        jwtService.validateToken(token);
	    }


}
