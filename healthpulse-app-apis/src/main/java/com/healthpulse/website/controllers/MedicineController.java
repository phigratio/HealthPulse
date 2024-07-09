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
import com.healthpulse.website.payloads.MedicineDto;
import com.healthpulse.website.services.MedicineService;

@RestController
@RequestMapping("/api/v1/medicines")
public class MedicineController {
	
	@Autowired
	private MedicineService medicineService;
	
	// Create medicine
	@PostMapping("/{medicineCategoryId}")
	public ResponseEntity<MedicineDto> createMedicine(
			@Valid @RequestBody MedicineDto medicineDto,
			@PathVariable ("medicineCategoryId") Integer medicineCategoryId) {
		MedicineDto createdMedicine = this.medicineService.createMedicine(medicineDto, medicineCategoryId);
		return new ResponseEntity<>(createdMedicine, HttpStatus.CREATED);
	}
	
	// Other CRUD operations (update, delete, get, etc.)
	
	// Update medicine
	@PutMapping("/{medicineId}")
	public ResponseEntity<MedicineDto> updateMedicine(
			@Valid @RequestBody MedicineDto medicineDto,
			@PathVariable ("medicineId") Integer medicineId) {
		MedicineDto updatedMedicine = this.medicineService.updateMedicine(medicineDto, medicineId);
		return ResponseEntity.ok(updatedMedicine);
	}
	
	// Delete medicine
	@DeleteMapping("/{medicineId}")
	public ResponseEntity<ApiResponse> deleteMedicine(@PathVariable ("medicineId") Integer medicineId) {
		this.medicineService.deleteMedicine(medicineId);
		return new ResponseEntity<>(new ApiResponse("Medicine deleted successfully", true), HttpStatus.OK);
	}
	
	// Get all medicines
	@GetMapping("/")
	public ResponseEntity<List<MedicineDto>> getAllMedicines() {
		return ResponseEntity.ok(this.medicineService.getAllMedicines());
	}
	
	// Get single medicine
	@GetMapping("/{medicineId}")
	public ResponseEntity<MedicineDto> getMedicineById(@PathVariable ("medicineId") Integer medicineId) {
		return ResponseEntity.ok(this.medicineService.getMedicineById(medicineId));
	}
	
	// Get all medicines by category
	@GetMapping("/category/{medicineCategoryId}")
	public ResponseEntity<List<MedicineDto>> getMedicinesByCategory(@PathVariable ("medicineCategoryId") Integer medicineCategoryId) {
		return ResponseEntity.ok(this.medicineService.getMedicinesByCategory(medicineCategoryId));
	}
	
	// Search medicines by name
	@GetMapping("/search/{keyword}")
	public ResponseEntity<List<MedicineDto>> searchMedicines(@PathVariable ("keyword") String keyword) {
		return ResponseEntity.ok(this.medicineService.searchMedicines(keyword));
	}
	
	// medicine image upload
	
	
	
	
    //method to serve files
	
}
