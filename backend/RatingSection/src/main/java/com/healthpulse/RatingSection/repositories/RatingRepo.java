package com.healthpulse.RatingSection.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.RatingSection.entities.Rating;

public interface RatingRepo extends JpaRepository<Rating, String> {
	
	//custom finder methods
	
	List<Rating> findByUserId(String userId);
	List<Rating> findByCabinId(String hotelId);

}
