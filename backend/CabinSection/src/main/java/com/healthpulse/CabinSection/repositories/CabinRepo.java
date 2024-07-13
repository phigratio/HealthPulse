package com.healthpulse.CabinSection.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.CabinSection.entities.Cabin;

public interface CabinRepo extends JpaRepository<Cabin, String> {
	
}
