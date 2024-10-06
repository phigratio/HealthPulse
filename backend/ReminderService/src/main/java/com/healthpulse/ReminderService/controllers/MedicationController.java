package com.healthpulse.ReminderService.controllers;

import com.healthpulse.ReminderService.entities.Medication;
import com.healthpulse.ReminderService.services.MedicationService;
import com.healthpulse.ReminderService.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reminder/medications")
public class MedicationController {

    @Autowired
    private MedicationService medicationService;

    @PostMapping("/add")
    public Medication addMedication(@RequestBody Medication medication) {
        if(!JwtUtil.isCurrentUser(medication.getUserId())){
          return null;
        }
        return medicationService.addMedication(medication);
    }

    @GetMapping("/user/{userId}")
    public List<Medication> getMedicationsByUser(@PathVariable ("userId") Integer userId) {
        if(!JwtUtil.isCurrentUser(userId)){
            return null;
        }

        return medicationService.getMedicationsByUser(userId);
    }
    
 // Update a medication
    @PutMapping("/update/{id}")
    public Medication updateMedication(@PathVariable ("id") Long id, @RequestBody Medication medication) {
        if(!JwtUtil.isCurrentUser(medication.getUserId())){
            return null;
        }
        return medicationService.updateMedication(id, medication);
    }

    // Delete a medication
    @DeleteMapping("/delete/{id}")
    public void deleteMedication(@PathVariable ("id") Long id) {
        Medication medication = medicationService.getMedicationById(id);

        if(!JwtUtil.isCurrentUser(medication.getUserId())){
            return;
        }
        medicationService.deleteMedication(id);
    }

    // Load single medication by ID
    @GetMapping("/{id}")
    public Medication getMedicationById(@PathVariable ("id") Long id) {

        return medicationService.getMedicationById(id);
    }

    // Load current medications by user ID
    @GetMapping("/current/user/{userId}")
    public List<Medication> getCurrentMedicationsByUser(@PathVariable ("userId") Integer userId) {
        if(!JwtUtil.isCurrentUser(userId)){
            return null;
        }

        // Assuming you have a method to fetch current medications in your service
        return medicationService.getCurrentMedicationsByUser(userId);
    }
}
