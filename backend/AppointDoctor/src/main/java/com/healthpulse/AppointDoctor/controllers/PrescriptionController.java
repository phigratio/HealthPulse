package com.healthpulse.AppointDoctor.controllers;

import java.util.List;

import com.healthpulse.AppointDoctor.clients.NotificationClient;
import com.healthpulse.AppointDoctor.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.AppointDoctor.entities.Prescription;
import com.healthpulse.AppointDoctor.services.PrescriptionService;

@RestController
@RequestMapping("/ad/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private NotificationClient notificationClient;


    @PostMapping
    public ResponseEntity<Prescription> createPrescription(@RequestBody Prescription prescription) {
        Prescription createdPrescription = prescriptionService.createPrescription(prescription);
        return new ResponseEntity<>(createdPrescription, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> updatePrescription(@PathVariable ("id") Long id, @RequestBody Prescription prescription) {
        if (!JwtUtil.isDoctor()) {
            return ResponseEntity.status(403).body(null);
        }
        Prescription updatedPrescription = prescriptionService.updatePrescription(id, prescription);
        if (updatedPrescription != null) {
            return ResponseEntity.ok(updatedPrescription);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable ("id") Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable ("id") Long id) {

        Prescription prescription = prescriptionService.getPrescriptionById(id);

        if (prescription != null) {
            return ResponseEntity.ok(prescription);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Prescription>> getPrescriptionsByDoctorId(@PathVariable ("doctorId") int doctorId) {
        List<Prescription> prescriptions = prescriptionService.getPrescriptionsByDoctorId(doctorId);
        return ResponseEntity.ok(prescriptions);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPrescriptionsByPatientId(@PathVariable ("patientId") int patientId) {
        List<Prescription> prescriptions = prescriptionService.getPrescriptionsByPatientId(patientId);
        return ResponseEntity.ok(prescriptions);
    }

    @GetMapping
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {
        List<Prescription> prescriptions = prescriptionService.getAllPrescriptions();
        return ResponseEntity.ok(prescriptions);
    }
}
