package com.healthpulse.AppointDoctor.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.AppointDoctor.clients.UserClient;
import com.healthpulse.AppointDoctor.entities.User;


@Service
public class UserService {

    @Autowired
    private UserClient userClient;

    public User getUserById(Integer userId) {
        return userClient.getUserById(userId);
    }
    
}
