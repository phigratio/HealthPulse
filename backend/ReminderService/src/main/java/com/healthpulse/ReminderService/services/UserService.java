package com.healthpulse.ReminderService.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.ReminderService.clients.UserClient;
import com.healthpulse.ReminderService.entities.User;





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
