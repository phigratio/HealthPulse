package com.healthpulse.Ecommerce.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "ecom-rating")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Rating {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
//	@ManyToOne
//	@JoinColumn(name = "user_id")
//	private User user;
//	
	
	private int userId;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;
	
	private double rating;
	
	private LocalDateTime createdAt;
	
	
	
}
