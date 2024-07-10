package com.healthpulse.website.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.website.payloads.FoodCategoryDto;
import com.healthpulse.website.services.FoodCategoryService;

@RestController
@RequestMapping("/api/v1/foodCategories")
public class FoodCategoryController {

    @Autowired
    private FoodCategoryService foodCategoryService;

    // Create food category
    @PostMapping("/")
    public ResponseEntity<FoodCategoryDto> createFoodCategory(@RequestBody FoodCategoryDto foodCategoryDto) {
        FoodCategoryDto createFoodCategory = this.foodCategoryService.createCategory(foodCategoryDto);
        return new ResponseEntity<>(createFoodCategory, HttpStatus.CREATED);
    }

    // Update food category
    @PutMapping("/{categoryId}")
    public ResponseEntity<FoodCategoryDto> updateFoodCategory(@RequestBody FoodCategoryDto foodCategoryDto,
            @PathVariable ("categoryId")  Integer categoryId) {
        FoodCategoryDto updatedCategory = this.foodCategoryService.updateCategory(foodCategoryDto, categoryId);
        return ResponseEntity.ok(updatedCategory);
    }

    // Delete food category
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteFoodCategory(@PathVariable ("categoryId") Integer categoryId) {
        this.foodCategoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Get food category
    @GetMapping("/{categoryId}")
    public ResponseEntity<FoodCategoryDto> getFoodCategory(@PathVariable ("categoryId") Integer categoryId) {
        FoodCategoryDto foodCategoryDto = this.foodCategoryService.getCategory(categoryId);
        return ResponseEntity.ok(foodCategoryDto);
    }

    // Get all food categories
    @GetMapping("/")
    public ResponseEntity<List<FoodCategoryDto>> getAllFoodCategories() {
        List<FoodCategoryDto> categories = this.foodCategoryService.getCategories();
        return ResponseEntity.ok(categories);
    }
}
