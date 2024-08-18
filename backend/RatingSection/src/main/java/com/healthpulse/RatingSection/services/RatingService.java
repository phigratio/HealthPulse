package com.healthpulse.RatingSection.services;

import java.util.List;

import com.healthpulse.RatingSection.entities.Rating;

public interface RatingService {
	
	//create
	Rating createRating(Rating rating);
	
	
	
	
	//get all ratings
	List<Rating> getAllRatings();
	
	
	//get all by user id
	List <Rating> getAllByUserId(String userId);
	
	
	//get all by cabin id
	List <Rating> getAllByCabinlId(String cabinId);

}
