package com.healthpulse.RatingSection.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulse.RatingSection.entities.Rating;
import com.healthpulse.RatingSection.services.RatingService;

@RestController
@RequestMapping("/rating")

public class RatingController {
	
	
	@Autowired
	private RatingService ratingService;
	
	//create a rating
	@PostMapping
	public ResponseEntity<Rating> createRating(@RequestBody Rating rating) {
		Rating newRating = ratingService.createRating(rating);
		return new ResponseEntity<Rating>(newRating, HttpStatus.CREATED);
	}
	
	//get all ratings
	@GetMapping
	public ResponseEntity<List<Rating>> getAllRatings() {
        List<Rating> ratings = ratingService.getAllRatings();
        return new ResponseEntity<List<Rating>>(ratings, HttpStatus.OK);
    }
		
	
	//get all ratings by user id
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Rating>> getAllByUserId(@PathVariable ("userId") String userId) {
		List<Rating> ratings = ratingService.getAllByUserId(userId);
		return new ResponseEntity<List<Rating>>(ratings, HttpStatus.OK);
	}
	
	
	
	//get all ratings by cabin id
	@GetMapping("/cabin/{cabinId}")
	public ResponseEntity<List<Rating>> getAllByCabinId(@PathVariable("cabinId") String cabinId) {
		List<Rating> ratings = ratingService.getAllByCabinlId(cabinId);
		return new ResponseEntity<List<Rating>>(ratings, HttpStatus.OK);
	}
}
