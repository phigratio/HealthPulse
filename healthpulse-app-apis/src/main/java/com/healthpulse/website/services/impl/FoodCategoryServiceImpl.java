package com.healthpulse.website.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.website.entities.FoodCategory;
import com.healthpulse.website.exceptions.ResourceNotFoundException;
import com.healthpulse.website.payloads.FoodCategoryDto;
import com.healthpulse.website.repositories.FoodCategoryRepo;
import com.healthpulse.website.services.FoodCategoryService;

@Service
public class FoodCategoryServiceImpl implements FoodCategoryService {

    @Autowired
    private FoodCategoryRepo foodCategoryRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public FoodCategoryDto createCategory(FoodCategoryDto foodCategoryDto) {
        FoodCategory foodCategory = this.modelMapper.map(foodCategoryDto, FoodCategory.class);
        FoodCategory addedCategory = this.foodCategoryRepo.save(foodCategory);
        return this.modelMapper.map(addedCategory, FoodCategoryDto.class);
    }

    @Override
    public FoodCategoryDto updateCategory(FoodCategoryDto foodCategoryDto, Integer foodCategoryId) {
        FoodCategory foodCategory = this.foodCategoryRepo.findById(foodCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Food Category", "Food Category id", foodCategoryId));

        foodCategory.setFoodCategoryTitle(foodCategoryDto.getFoodCategoryTitle());
        foodCategory.setCategoryDescription(foodCategoryDto.getCategoryDescription());

        FoodCategory updatedCategory = this.foodCategoryRepo.save(foodCategory);
        return this.modelMapper.map(updatedCategory, FoodCategoryDto.class);
    }

    @Override
    public void deleteCategory(Integer foodCategoryId) {
        FoodCategory foodCategory = this.foodCategoryRepo.findById(foodCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Food Category", "Food Category id", foodCategoryId));
        this.foodCategoryRepo.delete(foodCategory);
    }

    @Override
    public FoodCategoryDto getCategory(Integer foodCategoryId) {
        FoodCategory foodCategory = this.foodCategoryRepo.findById(foodCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Food Category", "Food Category id", foodCategoryId));
        return this.modelMapper.map(foodCategory, FoodCategoryDto.class);
    }

    @Override
    public List<FoodCategoryDto> getCategories() {
        List<FoodCategory> foodCategories = this.foodCategoryRepo.findAll();
        return foodCategories.stream().map(foodCategory -> this.modelMapper.map(foodCategory, FoodCategoryDto.class))
                .collect(Collectors.toList());
    }
}
