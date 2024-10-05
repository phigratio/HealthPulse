package com.healthpulse.AppointDoctor.controllers;

import java.time.LocalDate;
import java.util.List;

import com.healthpulse.AppointDoctor.utils.JwtUtil;
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
        if (!JwtUtil.isCurrentUser(appointmentData.getDoctorId())) {
            return ResponseEntity.status(403).body(null);  // Forbidden if not admin
        }
        AppointmentData createdAppointment = appointmentService.createAppointment(appointmentData);
        return ResponseEntity.ok(createdAppointment);
    }
    
    @GetMapping("/{appointmentId}")
    public ResponseEntity<AppointmentData> getAppointmentById(@PathVariable("appointmentId") Long appointmentId) {
        AppointmentData appointmentData = appointmentService.findAppointmentById(appointmentId);
        return ResponseEntity.ok(appointmentData);
    }

    // Endpoint to find available appointments by date and specialization
    @GetMapping("/available")
    public ResponseEntity<List<AppointmentData>> getAvailableAppointments(
            @RequestParam("date") LocalDate date, 
            @RequestParam("specialization") String specialization) {
        List<AppointmentData> availableAppointments = appointmentService.findAvailableAppointments(date, specialization);
        return ResponseEntity.ok(availableAppointments);
    }

    // Endpoint to find available appointments by date without specialization filter
    @GetMapping("/available-by-date")
    public ResponseEntity<List<AppointmentData>> getAvailableAppointmentsByDate(
            @RequestParam("date") LocalDate date) {
        List<AppointmentData> availableAppointments = appointmentService.findAvailableAppointmentsByDate(date);
        return ResponseEntity.ok(availableAppointments);
    }

    // Endpoint to find available appointments by doctorId
    @GetMapping("/available-by-doctor")
    public ResponseEntity<List<AppointmentData>> getAvailableAppointmentsByDoctorId(
            @RequestParam("doctorId") int doctorId) {
        List<AppointmentData> availableAppointments = appointmentService.findAvailableAppointmentsByDoctorId(doctorId);
        return ResponseEntity.ok(availableAppointments);
    }

    // Endpoint to book an appointment
    @PostMapping("/{appointmentId}/book")
    public ResponseEntity<AppointmentData> bookAppointment(
            @PathVariable ("appointmentId")  Long appointmentId, 
            @RequestParam("userId") int userId) {
        if (!JwtUtil.isCurrentUser(userId)) {
            return ResponseEntity.status(403).body(null);
        }
        AppointmentData bookedAppointment = appointmentService.bookAppointment(appointmentId, userId);
        return ResponseEntity.ok(bookedAppointment);
    }

    // Endpoint to get all bookings made by a user
    @GetMapping("/user-bookings")
    public ResponseEntity<List<AppointmentData>> getBookingsByUserId(
            @RequestParam("userId") int userId) {
        List<AppointmentData> userBookings = appointmentService.findBookingsByUserId(userId);
        return ResponseEntity.ok(userBookings);
    }

    // Endpoint to cancel a booking
    @PostMapping("/{appointmentId}/cancel")
    public ResponseEntity<AppointmentData> cancelBooking(
            @PathVariable ("appointmentId")  Long appointmentId, 
            @RequestParam("userId") int userId) {
        if (!JwtUtil.isCurrentUser(userId)) {
            return ResponseEntity.status(403).body(null);
        }
        AppointmentData cancelledAppointment = appointmentService.cancelBooking(appointmentId, userId);
        return ResponseEntity.ok(cancelledAppointment);
    }
    
    // Endpoint to get all unique specializations
    @GetMapping("/specializations")
    public ResponseEntity<List<String>> getAllSpecializations() {
        List<String> specializations = appointmentService.findAllSpecializations();
        return ResponseEntity.ok(specializations);
    }
    
    
    // Endpoint to get all appointments by doctorId after the current time
    
    @GetMapping("/doctor/{doctorId}/appointments")
    public ResponseEntity<List<AppointmentData>> getAppointmentsByDoctorId(
            @PathVariable("doctorId") int doctorId) {
        List<AppointmentData> appointments = appointmentService.findAppointmentsByDoctorId(doctorId);
        return ResponseEntity.ok(appointments);
    }

    @PostMapping("/{appointmentId}/start-meeting")
    public ResponseEntity<AppointmentData> startMeeting(
            @PathVariable("appointmentId") Long appointmentId,
            @RequestParam("videoCallUrl") String videoCallUrl) {
        AppointmentData appointment = appointmentService.startMeeting(appointmentId, videoCallUrl);
        return ResponseEntity.ok(appointment);
    }
}
