package com.healthpulse.AuthSection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.healthpulse.AuthSection.entity.DoctorInfo;
import java.util.List;
import java.util.Optional;

public interface DoctorInfoRepo extends JpaRepository<DoctorInfo, Integer> {
	Optional<DoctorInfo> findByUser_Id(int userId);
    List<DoctorInfo> findByApprovedByAdmin(String approvedByAdmin);
    
}