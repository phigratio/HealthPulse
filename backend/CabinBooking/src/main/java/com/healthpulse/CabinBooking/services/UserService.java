package com.healthpulse.CabinBooking.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.CabinBooking.clients.UserClient;
import com.healthpulse.CabinBooking.dto.Response;
import com.healthpulse.CabinBooking.entities.User;

@Service
public class UserService {

    @Autowired
    private UserClient userClient;

    public User getUserById(Integer userId) {
        return userClient.getUserById(userId);
    }
    
}
