package com.healthpulse.UserSection.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.healthpulse.UserSection.entities.Rating;

@FeignClient(name="RATING-SECTION")
public interface RatingSection {
	
	//get rating by user id
	
	
	//POST rating by user id
	
	@PostMapping("/rating")
	public Rating createRathing(Rating values);
	
	
	//PUT
	
	@PutMapping("/rating/{ratingId}")
	public Rating updateRating(@PathVariable("ratingId") String ratingId, Rating values);

	
	//DELETE
	@DeleteMapping("/rating/{ratingId}")
	public void deleteRating(@PathVariable("ratingId") String ratingId);
	
}
