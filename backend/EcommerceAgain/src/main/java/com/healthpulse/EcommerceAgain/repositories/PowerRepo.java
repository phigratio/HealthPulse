package com.healthpulse.EcommerceAgain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthpulse.EcommerceAgain.entities.Power;

@Repository
public interface PowerRepo extends JpaRepository<Power, Integer> {
    // You can add custom query methods if needed here
}
