package com.healthpulse.PostSection.services;

import java.util.List;

import com.healthpulse.PostSection.payloads.CategoryDto;

public interface CategoryService {
	
	// create
		CategoryDto createCategory(CategoryDto categoryDto);

		// update
		CategoryDto updateCategory(CategoryDto categoryDto, String categoryId);

		// delete
		void deleteCategory(String categoryId);

		// get
		CategoryDto getCategory(String catId);

		// get All

		List<CategoryDto> getCategories();


}
