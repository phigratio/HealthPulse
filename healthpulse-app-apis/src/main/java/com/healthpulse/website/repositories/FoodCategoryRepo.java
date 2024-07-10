package com.healthpulse.website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.website.entities.FoodCategory;

public interface FoodCategoryRepo extends JpaRepository<FoodCategory, Integer> {
}
