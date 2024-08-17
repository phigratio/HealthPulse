package com.healthpulse.AppointDoctor.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.healthpulse.AppointDoctor.entities.AppointmentData;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentData, Long> {
    
	List<AppointmentData> findByDoctorIdAndAppointmentTimeAfterOrderByAppointmentTimeAsc(int doctorId, LocalDateTime currentTime);
}
