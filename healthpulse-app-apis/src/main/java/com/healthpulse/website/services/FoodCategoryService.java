package com.healthpulse.website.services;

import java.util.List;

import com.healthpulse.website.payloads.FoodCategoryDto;

public interface FoodCategoryService {
    
    // Create
    FoodCategoryDto createCategory(FoodCategoryDto foodCategoryDto);

    // Update
    FoodCategoryDto updateCategory(FoodCategoryDto foodCategoryDto, Integer foodCategoryId);

    // Delete
    void deleteCategory(Integer foodCategoryId);

    // Get
    FoodCategoryDto getCategory(Integer foodCategoryId);

    // Get all
    List<FoodCategoryDto> getCategories();
}
