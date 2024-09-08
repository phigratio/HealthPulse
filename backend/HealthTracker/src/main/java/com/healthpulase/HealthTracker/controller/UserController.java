package com.healthpulase.HealthTracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulase.HealthTracker.entities.User;
import com.healthpulase.HealthTracker.service.UserService;


@RestController
@RequestMapping("/tracker/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable("userId") Integer userId) {
        return userService.getUserById(userId);
    }
    
    @GetMapping("/")
	public List<User> getUsers() {
		return userService.getUsers();
	}
}