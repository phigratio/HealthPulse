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

import com.healthpulse.Ecommerce.entities.Review;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.payloads.ReviewRequest;
import com.healthpulse.Ecommerce.services.ReviewService;
import com.healthpulse.Ecommerce.services.UserService;

@RestController
@RequestMapping("/ecommerce/review")
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;

	@Autowired
	private UserService userService;
	
	@PostMapping("/create/user/{userId}/")
	public ResponseEntity<Review> createReview(@RequestBody ReviewRequest req, @PathVariable("userId") int userId) {

		User user = userService.getUserById(userId);

		Review review = reviewService.createReview(req, user);

		return new ResponseEntity<Review>(review, HttpStatus.CREATED);

	}
	
	
	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Review>> getProductReview(@PathVariable("productId") Long productId) {

		List<Review> reviews = reviewService.getProductReview(productId);

		return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
	}
	
	
}
