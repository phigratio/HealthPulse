package com.healthpulse.Ecommerce.controllers;

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

import com.healthpulse.Ecommerce.entities.Rating;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.payloads.RatingRequest;
import com.healthpulse.Ecommerce.services.RatingService;
import com.healthpulse.Ecommerce.services.UserService;

@RestController
@RequestMapping("/ecommerce/rating")
public class RatingController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private RatingService ratingService;
	
	
	@PostMapping("/create/user/{userId}/")
	public ResponseEntity<?> createRating(@RequestBody RatingRequest req , @PathVariable("userId") int userId) {
		
		User user = userService.getUserById(userId);
		
		Rating rating = ratingService.createRating(req, user);
		
		return new ResponseEntity<Rating>(rating,HttpStatus.CREATED);
		
	}
	
	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Rating>> getProductRating(@PathVariable("productId") Long productId) {

		List<Rating> ratings = ratingService.getProductRating(productId);

		return new ResponseEntity<List<Rating>>(ratings, HttpStatus.OK);
	}
	
}
