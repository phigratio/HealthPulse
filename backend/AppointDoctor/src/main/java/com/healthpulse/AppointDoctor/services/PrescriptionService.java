package com.healthpulse.AppointDoctor.services;

import java.util.List;
import com.healthpulse.AppointDoctor.entities.Prescription;

public interface PrescriptionService {
    Prescription createPrescription(Prescription prescription);
    Prescription updatePrescription(Long id, Prescription prescription);
    void deletePrescription(Long id);
    Prescription getPrescriptionById(Long id);
    List<Prescription> getPrescriptionsByDoctorId(int doctorId);
    List<Prescription> getPrescriptionsByPatientId(int patientId);
    List<Prescription> getAllPrescriptions();
}
