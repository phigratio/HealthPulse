package com.healthpulse.PostSection.services.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.healthpulse.PostSection.clients.NotificationClient;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.PostSection.entities.Category;
import com.healthpulse.PostSection.exceptions.ResourceNotFoundException;
import com.healthpulse.PostSection.payloads.CategoryDto;
import com.healthpulse.PostSection.repositories.CategoryRepo;
import com.healthpulse.PostSection.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{
	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private NotificationClient notificationClient;

	@Override
	public CategoryDto createCategory(CategoryDto categoryDto) {
		String randomCatId = UUID.randomUUID().toString();
		categoryDto.setCategoryId(randomCatId);
		Category cat = this.modelMapper.map(categoryDto, Category.class);
		Category addedCat = this.categoryRepo.save(cat);
		return this.modelMapper.map(addedCat, CategoryDto.class);
	}

	@Override
	public CategoryDto updateCategory(CategoryDto categoryDto, String categoryId) {

		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category ", "Category Id", categoryId));

		cat.setCategoryTitle(categoryDto.getCategoryTitle());
		cat.setCategoryDescription(categoryDto.getCategoryDescription());

		Category updatedcat = this.categoryRepo.save(cat);

		return this.modelMapper.map(updatedcat, CategoryDto.class);
	}

	@Override
	public void deleteCategory(String categoryId) {

		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category ", "category id", categoryId));
		this.categoryRepo.delete(cat);
	}

	@Override
	public CategoryDto getCategory(String categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "category id", categoryId));

		return this.modelMapper.map(cat, CategoryDto.class);
	}

	@Override
	public List<CategoryDto> getCategories() {

		List<Category> categories = this.categoryRepo.findAll();
		List<CategoryDto> catDtos = categories.stream().map((cat) -> this.modelMapper.map(cat, CategoryDto.class))
				.collect(Collectors.toList());

		return catDtos;
	}

	

	

}
