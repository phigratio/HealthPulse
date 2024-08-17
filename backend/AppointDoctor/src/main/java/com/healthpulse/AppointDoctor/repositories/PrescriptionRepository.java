package com.healthpulse.AppointDoctor.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.healthpulse.AppointDoctor.entities.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByDoctorId(int doctorId);
    List<Prescription> findByPatientId(int patientId);
}
