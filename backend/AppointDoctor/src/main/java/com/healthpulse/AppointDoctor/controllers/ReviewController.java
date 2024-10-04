package com.healthpulse.AppointDoctor.controllers;

import com.healthpulse.AppointDoctor.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.healthpulse.AppointDoctor.entities.Review;
import com.healthpulse.AppointDoctor.services.ReviewService;


import java.util.List;

@RestController
@RequestMapping("/ad/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        try {
            if (!JwtUtil.isAdmin()) {
                return ResponseEntity.status(403).body(null);  // Forbidden if not admin
            }
            Review addedReview = reviewService.addReview(review);
            return ResponseEntity.ok(addedReview);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Review>> getReviewsByDoctorId(@PathVariable("doctorId") int doctorId) {


        List<Review> reviews = reviewService.findReviewsByDoctorId(doctorId);
        return ResponseEntity.ok(reviews);
    }






}
