package com.healthpulse.EcommerceAgain.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.healthpulse.EcommerceAgain.entities.User;


@FeignClient(name = "AUTH-SECTION")
public interface UserClient {
    @GetMapping("/users/{userId}")
    User getUserById(@PathVariable("userId") Integer userId);
    
    @GetMapping("/users/")
    List<User> getUsers();
}
