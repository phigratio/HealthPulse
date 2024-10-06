package com.healthpulse.AppointDoctor.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.healthpulse.AppointDoctor.clients.NotificationClient;
import com.healthpulse.AppointDoctor.entities.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.AppointDoctor.entities.Prescription;
import com.healthpulse.AppointDoctor.repositories.PrescriptionRepository;
import com.healthpulse.AppointDoctor.services.PrescriptionService;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private NotificationClient notificationClient;

    @Override
    public Prescription createPrescription(Prescription prescription) {
        // Set the creatingTime to the current time if not set
        if (prescription.getCreatingTime() == null) {
            prescription.setCreatingTime(LocalDateTime.now());
        }

        Notification noti = new Notification();
        noti.setUserId(prescription.getPatientId());
        noti.setData("New prescription added...");
        notificationClient.createNotification(noti);

        return prescriptionRepository.save(prescription);
    }

    @Override
    public Prescription updatePrescription(Long id, Prescription prescription) {
        Optional<Prescription> existingPrescription = prescriptionRepository.findById(id);
        if (existingPrescription.isPresent()) {
            Prescription updatedPrescription = existingPrescription.get();
            updatedPrescription.setDoctorId(prescription.getDoctorId());
            updatedPrescription.setPatientId(prescription.getPatientId());
            updatedPrescription.setPrescription(prescription.getPrescription());
            return prescriptionRepository.save(updatedPrescription);
        }
        return null; // You may want to throw an exception here instead
    }

    @Override
    public void deletePrescription(Long id) {
        prescriptionRepository.deleteById(id);
    }

    @Override
    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id).orElse(null);
    }

    @Override
    public List<Prescription> getPrescriptionsByDoctorId(int doctorId) {
        return prescriptionRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Prescription> getPrescriptionsByPatientId(int patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }

    @Override
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }
}
