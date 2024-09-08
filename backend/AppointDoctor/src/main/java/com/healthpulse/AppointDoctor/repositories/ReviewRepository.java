package com.healthpulse.AppointDoctor.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.healthpulse.AppointDoctor.entities.Review;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Find reviews by doctor ID
    List<Review> findByDoctorId(int doctorId);

    // Check if a review exists for a specific user and doctor
    boolean existsByUserIdAndDoctorId(int userId, int doctorId);
}
