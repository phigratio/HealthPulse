package com.healthpulase.HealthTracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulase.HealthTracker.clients.UserClient;
import com.healthpulase.HealthTracker.entities.User;



@Service
public class UserService {

    @Autowired
    private UserClient userClient;

    public User getUserById(Integer userId) {
        return userClient.getUserById(userId);
    }
    
    //get all users
    
	public List<User> getUsers() {
		return userClient.getUsers();
	}
    
}
