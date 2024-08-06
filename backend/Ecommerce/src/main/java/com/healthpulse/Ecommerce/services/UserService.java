package com.healthpulse.Ecommerce.services;

import com.healthpulse.Ecommerce.clients.UserClient;
import com.healthpulse.Ecommerce.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserClient userClient;

    public User getUserById(Integer userId) {
        return userClient.getUserById(userId);
    }
}
