package com.healthpulse.VaccineServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulse.VaccineServer.service.VaccineService;

@RestController
@RequestMapping("/vaccine")
//@CrossOrigin(origins = "*")
public class VaccineController {

  

    @Autowired
    private VaccineService vaccineService;

    // Assuming you have a method to get user details by user ID
    @GetMapping("/{userId}/vaccines")
    public void preloadVaccinesForUser(@PathVariable ("userId") Long userId) {
        User user = userService.findById(userId);

        // Check if the user has any vaccines associated, if not preload them
        if (vaccineService.getAllVaccinesForUser(user).isEmpty()) {
            vaccineService.preloadVaccinesForUser(user);
        }

        // Return the list of vaccines
        return vaccineService.getAllVaccinesForUser(user);
    }
}
