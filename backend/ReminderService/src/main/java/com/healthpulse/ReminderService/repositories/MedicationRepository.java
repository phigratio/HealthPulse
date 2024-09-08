package com.healthpulse.ReminderService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.healthpulse.ReminderService.entities.Medication;
import java.util.List;

public interface MedicationRepository extends JpaRepository<Medication, Long> {
    List<Medication> findByUserId(Integer userId);
}
