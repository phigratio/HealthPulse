package com.healthpulse.Ecommerce.services.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.entities.Review;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.payloads.ReviewRequest;
import com.healthpulse.Ecommerce.repositories.ProductRepository;
import com.healthpulse.Ecommerce.repositories.ReviewRepo;
import com.healthpulse.Ecommerce.services.ProductService;
import com.healthpulse.Ecommerce.services.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {
	
	private ReviewRepo reviewRepository;

	private ProductRepository productRepository;
	
	private ProductService productService;
	
	public ReviewServiceImpl(ReviewRepo reviewRepository, ProductRepository productRepository,
			ProductService productService) {
		this.reviewRepository = reviewRepository;
		this.productRepository = productRepository;
		this.productService = productService;
	}
	
	
	
	@Override
	public Review createReview(ReviewRequest reviewRequest, User user) {
		Product product = productService.findProductById(reviewRequest.getProductId());
		
		Review review = new Review();
		
		review.setProduct(product);
		review.setUserId(user.getId());
		review.setReview(reviewRequest.getReview());
		review.setCreatedOn(LocalDateTime.now());
		
		return reviewRepository.save(review);
		
		
	}

	@Override
	public List<Review> getProductReview(Long productId) {
		return reviewRepository.getAllProductsReview(productId); 
	}

}
