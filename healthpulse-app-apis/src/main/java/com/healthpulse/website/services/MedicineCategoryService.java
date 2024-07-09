package com.healthpulse.website.services;

import java.util.List;

import com.healthpulse.website.payloads.MedicineCategoryDto;

public interface MedicineCategoryService {
	
	
	// create
	MedicineCategoryDto createCategory(MedicineCategoryDto medicineCategoryDto);

		// update
	MedicineCategoryDto updateCategory(MedicineCategoryDto medicineCategoryDto, Integer medicineCategoryId);

		// delete
		void deleteCategory(Integer medicineCategoryId);

		// get
		MedicineCategoryDto getCategory(Integer medicineCategoryId);

		// get All

		List<MedicineCategoryDto> getCategories();
	
	

}
