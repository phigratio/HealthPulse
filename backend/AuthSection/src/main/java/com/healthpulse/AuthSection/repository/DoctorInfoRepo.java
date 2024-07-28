package com.healthpulse.AuthSection.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.AuthSection.entity.DoctorInfo;

public interface DoctorInfoRepo extends JpaRepository<DoctorInfo, Integer> {
}