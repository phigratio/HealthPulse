package com.healthpulse.website.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.website.payloads.FoodDto;
import com.healthpulse.website.services.FoodService;

@RestController
@RequestMapping("/api/v1/foods")
public class FoodController {

    @Autowired
    private FoodService foodService;

    // Create food
    @PostMapping("/category/{categoryId}")
    public ResponseEntity<FoodDto> createFood(@RequestBody FoodDto foodDto, @PathVariable ("categoryId") Integer categoryId) {
        FoodDto createFood = this.foodService.createFood(foodDto, categoryId);
        return new ResponseEntity<>(createFood, HttpStatus.CREATED);
    }

    // Update food
    @PutMapping("/{foodId}")
    public ResponseEntity<FoodDto> updateFood(@RequestBody FoodDto foodDto, @PathVariable ("foodId") Integer foodId) {
        FoodDto updatedFood = this.foodService.updateFood(foodDto, foodId);
        return ResponseEntity.ok(updatedFood);
    }

    // Delete food
    @DeleteMapping("/{foodId}")
    public ResponseEntity<Void> deleteFood(@PathVariable ("foodId") Integer foodId) {
        this.foodService.deleteFood(foodId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Get all foods
    @GetMapping("/")
    public ResponseEntity<List<FoodDto>> getAllFoods() {
        List<FoodDto> allFoods = this.foodService.getAllFoods();
        return ResponseEntity.ok(allFoods);
    }

    // Get single food by ID
    @GetMapping("/{foodId}")
    public ResponseEntity<FoodDto> getFoodById(@PathVariable ("foodId") Integer foodId) {
        FoodDto foodDto = this.foodService.getFoodById(foodId);
        return ResponseEntity.ok(foodDto);
    }

    // Get all foods by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<FoodDto>> getFoodsByCategory(@PathVariable ("categoryId") Integer categoryId) {
        List<FoodDto> foods = this.foodService.getFoodsByCategory(categoryId);
        return ResponseEntity.ok(foods);
    }

    // Search foods
    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<FoodDto>> searchFoods(@PathVariable String keyword) {
        List<FoodDto> result = this.foodService.searchFoods(keyword);
        return ResponseEntity.ok(result);
    }
}
