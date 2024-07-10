package com.healthpulse.website.services.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.website.entities.Food;
import com.healthpulse.website.entities.FoodCategory;
import com.healthpulse.website.exceptions.ResourceNotFoundException;
import com.healthpulse.website.payloads.FoodDto;
import com.healthpulse.website.repositories.FoodCategoryRepo;
import com.healthpulse.website.repositories.FoodRepo;
import com.healthpulse.website.services.FoodService;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepo foodRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FoodCategoryRepo foodCategoryRepo;

    @Override
    public FoodDto createFood(FoodDto foodDto, Integer foodCategoryId) {
        FoodCategory foodCategory = this.foodCategoryRepo.findById(foodCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Food Category", "Food Category id", foodCategoryId));

        Food food = this.modelMapper.map(foodDto, Food.class);
        food.setFoodCategory(foodCategory);
        food.setAddedDate(new Date());

        Food newFood = this.foodRepo.save(food);

        return this.modelMapper.map(newFood, FoodDto.class);
    }

    @Override
    public FoodDto updateFood(FoodDto foodDto, Integer foodId) {
        Food food = this.foodRepo.findById(foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Food", "Food id", foodId));

        food.setName(foodDto.getName());
        food.setDescription(foodDto.getDescription());
        food.setIngredients(foodDto.getIngredients());
        food.setProteinPercentage(foodDto.getProteinPercentage());
        food.setFatPercentage(foodDto.getFatPercentage());
        food.setCalories(foodDto.getCalories());
        food.setNotSuitableFor(foodDto.getNotSuitableFor());
        food.setAddedDate(new Date());

        Food updatedFood = this.foodRepo.save(food);
        return this.modelMapper.map(updatedFood, FoodDto.class);
    }

    @Override
    public void deleteFood(Integer foodId) {
        Food food = this.foodRepo.findById(foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Food", "Food id", foodId));
        this.foodRepo.delete(food);
    }

    @Override
    public List<FoodDto> getAllFoods() {
        List<Food> foods = this.foodRepo.findAll();
        return foods.stream().map(food -> this.modelMapper.map(food, FoodDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public FoodDto getFoodById(Integer foodId) {
        Food food = this.foodRepo.findById(foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Food", "Food id", foodId));
        return this.modelMapper.map(food, FoodDto.class);
    }

    @Override
    public List<FoodDto> getFoodsByCategory(Integer foodCategoryId) {
        FoodCategory foodCategory = this.foodCategoryRepo.findById(foodCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Food Category", "Food Category id", foodCategoryId));
        List<Food> foods = this.foodRepo.findByFoodCategory(foodCategory);
        return foods.stream().map(food -> this.modelMapper.map(food, FoodDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<FoodDto> searchFoods(String keyword) {
        List<Food> foods = this.foodRepo.searchByName("%" + keyword + "%");
        return foods.stream().map(food -> this.modelMapper.map(food, FoodDto.class))
                .collect(Collectors.toList());
    }
}
