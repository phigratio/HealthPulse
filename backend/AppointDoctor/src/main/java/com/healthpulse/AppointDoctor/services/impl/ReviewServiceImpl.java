package com.healthpulse.AppointDoctor.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.healthpulse.AppointDoctor.entities.Review;
import com.healthpulse.AppointDoctor.repositories.ReviewRepository;
import com.healthpulse.AppointDoctor.services.ReviewService;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public Review addReview(Review review) {
        if (reviewRepository.existsByUserIdAndDoctorId(review.getUserId(), review.getDoctorId())) {
            throw new IllegalStateException("User has already reviewed this doctor.");
        }
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> findReviewsByDoctorId(int doctorId) {
        return reviewRepository.findByDoctorId(doctorId);
    }

    @Override
    public boolean reviewExists(int userId, int doctorId) {
        return reviewRepository.existsByUserIdAndDoctorId(userId, doctorId);
    }
}
