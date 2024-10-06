package com.healthpulse.AppointDoctor.services;

import com.healthpulse.AppointDoctor.entities.Review;
import java.util.List;

public interface ReviewService {

    // Method to add a review
    Review addReview(Review review);

    // Method to find reviews by doctor ID
    List<Review> findReviewsByDoctorId(int doctorId);

    // Method to check if a review exists by user ID and doctor ID
    boolean reviewExists(int userId, int doctorId);
}
