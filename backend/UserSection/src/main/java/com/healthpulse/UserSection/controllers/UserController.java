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

import com.healthpulse.UserSection.entities.UserInfo;
import com.healthpulse.UserSection.payload.ApiResponse;
import com.healthpulse.UserSection.services.UserService;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	//create user 
	@PostMapping("/{id}")
    public ResponseEntity<UserInfo> createUser(@RequestBody UserInfo user, @PathVariable ("id") String id ) {
    	 UserInfo createdUser = userService.createUser(user, id);
    	 return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    	        		
    }
	
	//get user by id
	@GetMapping("/{id}")
	@CircuitBreaker(name = "ratingCabinBreaker", fallbackMethod = "ratingCabinFallback")
	@Retry(name = "ratingCabinRetry", fallbackMethod = "ratingCabinFallback")
	@RateLimiter(name = "ratingCabinRateLimiter",fallbackMethod = "ratingCabinFallback")
	public ResponseEntity<UserInfo> getUser(@PathVariable ("id") String id) {
		UserInfo user = userService.getUser(id);
		return ResponseEntity.ok(user);
	}
	
	
	// Fallback method for getUser method 
	
	public ResponseEntity<UserInfo> ratingCabinFallback(String id, Exception e) {
		UserInfo user =  UserInfo.builder()
			.email("dummy@example.com")
			.name("dummy")
			.about("dummy")
			.id("dummy")
			.build();
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	
	
	//get all users
	
	@GetMapping
	public ResponseEntity<List<UserInfo>> getAllUser() {
		List<UserInfo> users = userService.getAllUser();
		return ResponseEntity.ok(users);
	}
	
	
	

}
