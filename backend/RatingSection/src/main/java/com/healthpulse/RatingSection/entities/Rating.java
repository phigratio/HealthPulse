package com.healthpulse.RatingSection.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Rating {
	
	@Id
	private String ratingId;
	private String userId;
	private String cabinId;
	private int rating;
	private String feedback;
}
