package com.healthpulse.AppointDoctor.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.AppointDoctor.entities.AppointmentData;
import com.healthpulse.AppointDoctor.services.AppointmentService;

@RestController
@RequestMapping("/ad/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    
    // Endpoint to create a new appointment
    @PostMapping("/create")
    public ResponseEntity<AppointmentData> createAppointment(@RequestBody AppointmentData appointmentData) {
        AppointmentData createdAppointment = appointmentService.createAppointment(appointmentData);
        return ResponseEntity.ok(createdAppointment);
    }


    // Endpoint to find available appointments by date and specialization
    @GetMapping("/available")
    public ResponseEntity<List<AppointmentData>> getAvailableAppointments(
            @RequestParam("date") LocalDate date, 
            @RequestParam("specialization") String specialization) {
        List<AppointmentData> availableAppointments = appointmentService.findAvailableAppointments(date, specialization);
        return ResponseEntity.ok(availableAppointments);
    }

    // Endpoint to book an appointment
    @PostMapping("/{appointmentId}/book")
    public ResponseEntity<AppointmentData> bookAppointment(
            @PathVariable ("appointmentId")  Long appointmentId, 
            @RequestParam("userId") int userId) {
        AppointmentData bookedAppointment = appointmentService.bookAppointment(appointmentId, userId);
        return ResponseEntity.ok(bookedAppointment);
    }

    // Additional endpoints can be added here
}
