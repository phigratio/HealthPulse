package com.healthpulse.UserSection.services.impl;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.healthpulse.UserSection.entities.Rating;
import com.healthpulse.UserSection.entities.UserInfo;
import com.healthpulse.UserSection.repositories.UserRepo;
import com.healthpulse.UserSection.services.UserService;
import com.healthpulse.UserSection.exceptions.ResourceNotFoundException;
import com.healthpulse.UserSection.entities.Cabin;
import com.healthpulse.UserSection.external.CabinSection;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CabinSection cabinSection;

    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public UserInfo createUser(UserInfo user, String id) {
    	user.setId(id);
        return userRepo.save(user);
    }

    @Override
    public UserInfo getUser(String id) {
        UserInfo user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id + " !!!"));
        
        
        Rating[] ratingsOfUser = restTemplate.getForObject("http://RATING-SECTION/rating/user/" + id, Rating[].class);
        
        List<Rating> ratings = Arrays.stream(ratingsOfUser).toList();
        
		List<Rating> ratingsOfUserWithCabin = ratings.stream().map(rating -> {
			Cabin cabin = cabinSection.getCabin(rating.getCabinId());
			rating.setCabin(cabin);
			return rating;
		}).collect(Collectors.toList());
		
		user.setRatings(ratingsOfUserWithCabin);
       
        return user;
    }

    @Override
    public List<UserInfo> getAllUser() {
        return userRepo.findAll();
    }
}
