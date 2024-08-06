package com.healthpulse.Ecommerce.controllers;

import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ecommerce/users")
public class EcommerceUserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable("userId") Integer userId) {
        return userService.getUserById(userId);
    }
}
