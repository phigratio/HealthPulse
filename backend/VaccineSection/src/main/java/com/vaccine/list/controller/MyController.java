package com.example.vaccineapp.controller;

import com.example.vaccineapp.entity.User;
import com.example.vaccineapp.service.UserService;
import com.example.vaccineapp.service.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private VaccineService vaccineService;

    // Assuming you have a method to get user details by user ID
    @GetMapping("/{userId}/vaccines")
    public void preloadVaccinesForUser(@PathVariable Long userId) {
        User user = userService.findById(userId);

        // Check if the user has any vaccines associated, if not preload them
        if (vaccineService.getAllVaccinesForUser(user).isEmpty()) {
            vaccineService.preloadVaccinesForUser(user);
        }

        // Return the list of vaccines
        return vaccineService.getAllVaccinesForUser(user);
    }
}
