package com.healthpulse.AuthSection.service;

import java.util.List;

import com.healthpulse.AuthSection.payloads.UserDto;

import jakarta.transaction.Transactional;

public interface UserService {

	
	@Transactional
	UserDto  registerNewUser(UserDto userDto, Integer roleId);
		
	UserDto createUser(UserDto user);

	UserDto updateUser(UserDto user, Integer userId);

	UserDto getUserById(Integer userId);

	List<UserDto> getAllUsers();

	void deleteUser(Integer userId);

}