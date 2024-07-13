package com.healthpulse.RatingSection.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.RatingSection.entities.Rating;
import com.healthpulse.RatingSection.services.RatingService;
import com.healthpulse.RatingSection.repositories.RatingRepo;


@Service
public class RatingServiceImpl implements RatingService {
	
	@Autowired
	private RatingRepo ratingRepo;

	@Override
	public Rating createRating(Rating rating) {
		String randomId = UUID.randomUUID().toString();
		rating.setRatingId(randomId);
		return ratingRepo.save(rating);
	}

	@Override
	public List<Rating> getAllRatings() {
		
		return ratingRepo.findAll();
	}
	

	@Override
	public List<Rating> getAllByUserId(String userId) {
		return ratingRepo.findByUserId(userId);
	}

	@Override
	public List<Rating> getAllByCabinlId(String cabinId) {
		return ratingRepo.findByCabinId(cabinId);
    }
}


