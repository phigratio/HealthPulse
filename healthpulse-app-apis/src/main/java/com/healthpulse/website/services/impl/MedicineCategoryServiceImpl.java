package com.healthpulse.website.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.website.entities.MedicineCategory;

import com.healthpulse.website.payloads.MedicineCategoryDto;
import com.healthpulse.website.repositories.MedicineCategoryRepo;
import com.healthpulse.website.services.MedicineCategoryService;




@Service
public class MedicineCategoryServiceImpl implements MedicineCategoryService {

	@Autowired
	private MedicineCategoryRepo medicineCategoryRepo;

	@Autowired
	private ModelMapper modelMapper;
	
	
	@Override
	public MedicineCategoryDto createCategory(MedicineCategoryDto medicineCategoryDto) {
		MedicineCategory cat = this.modelMapper.map(medicineCategoryDto, MedicineCategory.class);
		MedicineCategory addedCat = this.medicineCategoryRepo.save(cat);
		return this.modelMapper.map(addedCat, MedicineCategoryDto.class);
	}

	@Override
	public MedicineCategoryDto updateCategory(MedicineCategoryDto medicineCategoryDto, Integer medicineCategoryId) {
		MedicineCategory cat = this.medicineCategoryRepo.findById(medicineCategoryId)
				.orElseThrow(() -> new RuntimeException("Category not found"));
		cat.setMedicine_categoryTitle(medicineCategoryDto.getMedicine_categoryTitle());
		cat.setCategoryDescription(medicineCategoryDto.getCategoryDescription());
		
		MedicineCategory updatedcat = this.medicineCategoryRepo.save(cat);
		
		return this.modelMapper.map(updatedcat, MedicineCategoryDto.class);
	}

	@Override
	public void deleteCategory(Integer medicineCategoryId) {
		MedicineCategory cat = this.medicineCategoryRepo.findById(medicineCategoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        this.medicineCategoryRepo.delete(cat);

	}

	@Override
	public MedicineCategoryDto getCategory(Integer medicineCategoryId) {
		MedicineCategory cat = this.medicineCategoryRepo.findById(medicineCategoryId)
				.orElseThrow(() -> new RuntimeException("Category not found"));
		return this.modelMapper.map(cat, MedicineCategoryDto.class);
	}

	@Override
	public List<MedicineCategoryDto> getCategories() {
		List<MedicineCategory> categories = this.medicineCategoryRepo.findAll();
		return categories.stream().map(category -> this.modelMapper.map(category, MedicineCategoryDto.class))
				.collect(Collectors.toList());
	}

}
