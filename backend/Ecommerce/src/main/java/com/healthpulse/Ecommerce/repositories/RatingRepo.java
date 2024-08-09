package com.healthpulse.Ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.Ecommerce.entities.Rating;

public interface RatingRepo extends JpaRepository<Rating, Long> {
	
	
//	@Query("SELECT r FROM Rating r WHERE r.product.id = :productId")
//	public List<Rating> getAllProductsRating( @Param ("productId") Long productId);
	
	List<Rating> findByProductId(Long productId);

}
