package com.healthpulse.website.services;

import java.util.List;

import com.healthpulse.website.payloads.FoodDto;

public interface FoodService {
    
    // Create
    FoodDto createFood(FoodDto foodDto, Integer foodCategoryId);

    // Update
    FoodDto updateFood(FoodDto foodDto, Integer foodId);

    // Delete
    void deleteFood(Integer foodId);

    // Get all foods as list
    List<FoodDto> getAllFoods();

    // Get single food
    FoodDto getFoodById(Integer foodId);

    // Get all foods by category
    List<FoodDto> getFoodsByCategory(Integer foodCategoryId);

    // Search foods
    List<FoodDto> searchFoods(String keyword);
}
