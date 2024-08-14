package com.healthpulse.AppointDoctor.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.healthpulse.AppointDoctor.entities.AppointmentData;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentData, Long> {
    // Custom query methods can be added here if needed
}
