package com.healthpulse.Ecommerce.services.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.entities.Rating;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.payloads.RatingRequest;
import com.healthpulse.Ecommerce.repositories.RatingRepo;
import com.healthpulse.Ecommerce.services.ProductService;
import com.healthpulse.Ecommerce.services.RatingService;


@Service
public class RatingServiceImpl implements RatingService {

	
	private RatingRepo ratingRepository;
	
	private ProductService productService;
	
	
	public RatingServiceImpl(RatingRepo ratingRepository, ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productService = productService;
      }
	
	
	@Override
	public Rating createRating(RatingRequest ratingRequest, User user) {
		
		Product product = productService.findProductById(ratingRequest.getProductId());
		
		Rating rating = new Rating();
		
		rating.setProduct(product);
		
		rating.setUserId(user.getId());
		
		rating.setRating(ratingRequest.getRating());
		
		rating.setCreatedAt(LocalDateTime.now());
		
		return ratingRepository.save(rating);
		
		
	}

	@Override
	public List<Rating> getProductRating(Long productId) {
		
		return ratingRepository.findByProductId(productId);
		
		
	}

}
