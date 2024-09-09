package com.example.server.config;

import com.example.server.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;


@Configuration
public class ApplicationConfig {

    @Autowired
    private UserRepo userRepo;

}
