package com.healthpulse.Ecommerce.services;

import java.util.List;

import com.healthpulse.Ecommerce.entities.Review;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.payloads.ReviewRequest;

public interface ReviewService {
	
	Review createReview(ReviewRequest reviewRequest , User user);
	
	List<Review> getProductReview(Long productId);

}
