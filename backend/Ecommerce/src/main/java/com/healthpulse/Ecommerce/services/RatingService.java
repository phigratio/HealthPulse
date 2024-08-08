package com.healthpulse.Ecommerce.services;

import java.util.List;

import com.healthpulse.Ecommerce.entities.Rating;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.payloads.RatingRequest;

public interface RatingService {
	
	Rating createRating(RatingRequest ratingRequest , User user);
	
	List<Rating> getProductRating(Long productId);
	
		
	
}
