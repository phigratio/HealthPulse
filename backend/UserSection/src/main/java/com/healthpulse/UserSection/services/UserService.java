package com.healthpulse.UserSection.services;

import java.util.List;

import com.healthpulse.UserSection.entities.User;

public interface UserService {
	
	User createUser(User user);
	
	User getUser(String id);
	
	List<User> getAllUser();
	
	
	// TODO: Add more methods to interact with User entity
	
	
	
	
	

}
