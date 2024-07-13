package com.healthpulse.UserSection.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.UserSection.entities.User;
import com.healthpulse.UserSection.repositories.UserRepo;
import com.healthpulse.UserSection.services.UserService;
import com.healthpulse.UserSection.exceptions.ResourceNotFoundException;


@Service


public class UserServiceImpl implements UserService {
	
	
	@Autowired
	private UserRepo userRepo;

	@Override
	public User createUser(User user) {
		String randomId = UUID.randomUUID().toString();
		user.setId(randomId);
		return userRepo.save(user);
	}

	@Override
	public User getUser(String id) {
		
		return userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id: "+id +" !!!" ));
	}

	@Override
	public List<User> getAllUser() {
		
		return userRepo.findAll();
	}

}
