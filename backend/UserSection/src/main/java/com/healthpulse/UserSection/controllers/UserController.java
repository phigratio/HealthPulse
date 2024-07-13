package com.healthpulse.UserSection.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulse.UserSection.entities.User;
import com.healthpulse.UserSection.payload.ApiResponse;
import com.healthpulse.UserSection.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	//create user 
	@PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
    	 User createdUser = userService.createUser(user);
    	 return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    	        		
    }
	
	//get user by id
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable ("id") String id) {
		User user = userService.getUser(id);
		return ResponseEntity.ok(user);
	}
	
	
	//get all users
	
	@GetMapping
	public ResponseEntity<List<User>> getAllUser() {
		List<User> users = userService.getAllUser();
		return ResponseEntity.ok(users);
	}
	
	
	

}
