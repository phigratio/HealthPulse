package com.healthpulse.EcommerceAgain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Power {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String dosage; // e.g., "500mg", "20ml"
    private String unit;   // e.g., "mg", "ml"

    @ManyToOne
    private Product product; // Many powers can belong to one product
}
