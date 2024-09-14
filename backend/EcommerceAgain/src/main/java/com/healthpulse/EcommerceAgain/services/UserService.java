package com.healthpulse.EcommerceAgain.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.EcommerceAgain.clients.UserClient;
import com.healthpulse.EcommerceAgain.entities.User;



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
