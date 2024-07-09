package com.healthpulse.website.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulse.website.payloads.ApiResponse;
import com.healthpulse.website.payloads.MedicineCategoryDto;
import com.healthpulse.website.services.MedicineCategoryService;

@RestController
@RequestMapping("/api/v1/medicineCategories")

public class MedicineCategoryController {
	
	@Autowired
	private MedicineCategoryService medicineCategoryService;
	
	// create
	
	@PostMapping("/")
	public ResponseEntity<MedicineCategoryDto> createCategory(
			@Valid @RequestBody MedicineCategoryDto medicineCategoryDto) {
		MedicineCategoryDto createCategory = this.medicineCategoryService.createCategory(medicineCategoryDto);
		return new ResponseEntity<MedicineCategoryDto>(createCategory, HttpStatus.CREATED);
	}
	
	// update
	
	@PutMapping("/{catId}")
	public ResponseEntity<MedicineCategoryDto> updateCategory(
			@Valid @RequestBody MedicineCategoryDto medicineCategoryDto, @PathVariable Integer catId) {
		MedicineCategoryDto updatedCategory = this.medicineCategoryService.updateCategory(medicineCategoryDto, catId);
		return new ResponseEntity<MedicineCategoryDto>(updatedCategory, HttpStatus.OK);
	}
	
	// delete
	
	@DeleteMapping("/{catId}")
	public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Integer catId) {
		this.medicineCategoryService.deleteCategory(catId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("category is deleted successfully !!", true),
				HttpStatus.OK);
	}
	
	// get
	
	@GetMapping("/{catId}")
	public ResponseEntity<MedicineCategoryDto> getCategory(@PathVariable Integer catId) {
		MedicineCategoryDto category = this.medicineCategoryService.getCategory(catId);
		return new ResponseEntity<MedicineCategoryDto>(category, HttpStatus.OK);
	}
	
	// get all
	@GetMapping("/")
	public ResponseEntity<List<MedicineCategoryDto>> getCategories() {
		List<MedicineCategoryDto> categories = this.medicineCategoryService.getCategories();
		return new ResponseEntity<List<MedicineCategoryDto>>(categories, HttpStatus.OK);
	}

}
