package com.healthpulse.Ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.Ecommerce.entities.Review;

public interface ReviewRepo extends JpaRepository<Review, Long> {

	
	
	@Query("SELECT r FROM Review r WHERE r.product.id = :productId")
	List<Review> getAllProductsReview(@Param ("productId")  Long productId);

	
}
