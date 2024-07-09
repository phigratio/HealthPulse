package com.healthpulse.website.services.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.website.entities.Medicine;
import com.healthpulse.website.entities.MedicineCategory;
import com.healthpulse.website.exceptions.ResourceNotFoundException;
import com.healthpulse.website.payloads.MedicineDto;
import com.healthpulse.website.repositories.MedicineCategoryRepo;
import com.healthpulse.website.repositories.MedicineRepo;
import com.healthpulse.website.services.MedicineService;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepo medicineRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MedicineCategoryRepo medicineCategoryRepo;

    @Override
    public MedicineDto createMedicine(MedicineDto medicineDto, Integer medicineCategoryId) {
        MedicineCategory medicineCategory = this.medicineCategoryRepo.findById(medicineCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine Category", "Medicine Category id", medicineCategoryId));

        Medicine medicine = this.modelMapper.map(medicineDto, Medicine.class);
        medicine.setMedicineCategory(medicineCategory);
        medicine.setAddedDate(new Date());
        medicine.setImageName("default.png");

        Medicine newMedicine = this.medicineRepo.save(medicine);

        return this.modelMapper.map(newMedicine, MedicineDto.class);
    }

    @Override
    public MedicineDto updateMedicine(MedicineDto medicineDto, Integer medicineId) {
        Medicine medicine = this.medicineRepo.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine", "Medicine id", medicineId));

        medicine.setName(medicineDto.getName());
        medicine.setDescription(medicineDto.getDescription());
        medicine.setPrice(medicineDto.getPrice());
        medicine.setQuantity(medicineDto.getQuantity());
        medicine.setPower(medicineDto.getPower());
        medicine.setImageName(medicineDto.getImageName());
        medicine.setBrand(medicineDto.getBrand());
        medicine.setAddedDate(new Date()); // Update date on edit

        Medicine updatedMedicine = this.medicineRepo.save(medicine);
        return this.modelMapper.map(updatedMedicine, MedicineDto.class);
    }

    @Override
    public void deleteMedicine(Integer medicineId) {
        Medicine medicine = this.medicineRepo.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine", "Medicine id", medicineId));
        this.medicineRepo.delete(medicine);
    }

    @Override
    public List<MedicineDto> getAllMedicines() {
        List<Medicine> medicines = this.medicineRepo.findAll();
        return medicines.stream().map(medicine -> this.modelMapper.map(medicine, MedicineDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public MedicineDto getMedicineById(Integer medicineId) {
        Medicine medicine = this.medicineRepo.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine", "Medicine id", medicineId));
        return this.modelMapper.map(medicine, MedicineDto.class);
    }

    @Override
    public List<MedicineDto> getMedicinesByCategory(Integer medicineCategoryId) {
        MedicineCategory medicineCategory = this.medicineCategoryRepo.findById(medicineCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine Category", "Medicine Category id", medicineCategoryId));
        List<Medicine> medicines = this.medicineRepo.findByMedicineCategory(medicineCategory);
        return medicines.stream().map(medicine -> this.modelMapper.map(medicine, MedicineDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicineDto> searchMedicines(String keyword) {
        List<Medicine> medicines = this.medicineRepo.searchByName("%" + keyword + "%");
        return medicines.stream().map(medicine -> this.modelMapper.map(medicine, MedicineDto.class))
                .collect(Collectors.toList());
    }
}
