package com.healthpulse.AuthSection.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthpulse.AuthSection.entity.UserCredential;
import com.healthpulse.AuthSection.entity.UserInfo;
import com.healthpulse.AuthSection.external.UserSection;
import com.healthpulse.AuthSection.repository.UserCredentialRepo;

@Service
public class AuthService {
	
	@Autowired
    private UserCredentialRepo userCredentialRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserSection userSection;
	
	public String saveUser(UserCredential userCredential ) {
		String userId = UUID.randomUUID().toString();
		userCredential.setId(userId);
		userCredential.setPassword(passwordEncoder.encode(userCredential.getPassword()));
		userCredentialRepo.save(userCredential);

		// Create UserInfo entry
		UserInfo userInfo = new UserInfo();
		userInfo.setId(userId);
		userSection.createUser(userInfo, userId);

		

		return ("User Saved with info : "+userCredential.getName()+" "+userCredential.getEmail());
    }
	
	 public String generateToken(String username) {
	        return jwtService.generateToken(username);
	    }

	    public void validateToken(String token) {
	        jwtService.validateToken(token);
	    }


}
