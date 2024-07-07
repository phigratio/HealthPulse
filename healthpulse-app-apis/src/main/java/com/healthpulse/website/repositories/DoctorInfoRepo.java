package com.healthpulse.website.repositories;

import com.healthpulse.website.entities.DoctorInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorInfoRepo extends JpaRepository<DoctorInfo, Integer> {
}
