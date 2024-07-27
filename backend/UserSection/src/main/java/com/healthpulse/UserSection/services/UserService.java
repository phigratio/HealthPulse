package com.healthpulse.UserSection.services;

import java.util.List;

import com.healthpulse.UserSection.entities.UserInfo;

public interface UserService {
	
	UserInfo createUser(UserInfo user);
	
	UserInfo getUser(String id);
	
	List<UserInfo> getAllUser();
	
	
	// TODO: Add more methods to interact with User entity
	
	
	
	
	

}
