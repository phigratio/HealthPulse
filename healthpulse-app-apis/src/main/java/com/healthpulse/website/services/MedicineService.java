package com.healthpulse.website.services;

import java.util.List;

import com.healthpulse.website.payloads.MedicineDto;


public interface MedicineService {
	
	//create
	
	MedicineDto createMedicine(MedicineDto medicineDto, Integer medicineCategoryId);
	
	//update
	
	MedicineDto updateMedicine(MedicineDto medicineDto, Integer medicineId);
	
	//delete
	
	void deleteMedicine(Integer medicineId);
	
	//get all medicines as list
	
	List<MedicineDto> getAllMedicines();
	
	//get single medicine
	
	MedicineDto getMedicineById(Integer medicineId);
	
	//get all medicines by category
	
	List<MedicineDto> getMedicinesByCategory(Integer medicineCategoryId);
	
	//search medicines
	
	List<MedicineDto> searchMedicines(String keyword);
	
	

}
