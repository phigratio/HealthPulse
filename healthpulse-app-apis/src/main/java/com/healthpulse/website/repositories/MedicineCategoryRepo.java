package com.healthpulse.website.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.website.entities.MedicineCategory;

public interface MedicineCategoryRepo  extends JpaRepository<MedicineCategory, Integer>{

}
