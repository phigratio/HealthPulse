package com.healthpulse.AppointDoctor.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ad_reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int userId;
    private int doctorId;
    private int rating; // Assuming rating is out of 5
    private String reviewText;

    public Review(int userId, int doctorId, int rating, String reviewText) {
        this.userId = userId;
        this.doctorId = doctorId;
        this.rating = rating;
        this.reviewText = reviewText;
    }
}
