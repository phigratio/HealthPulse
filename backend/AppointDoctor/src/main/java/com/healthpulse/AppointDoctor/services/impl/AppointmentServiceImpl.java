package com.healthpulse.AppointDoctor.services.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.AppointDoctor.entities.AppointmentData;
import com.healthpulse.AppointDoctor.repositories.AppointmentRepository;
import com.healthpulse.AppointDoctor.services.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public AppointmentData createAppointment(AppointmentData appointmentData) {
        return appointmentRepository.save(appointmentData);
    }
    
    @Override
    public AppointmentData findAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid appointment ID"));
    }

    @Override
    public List<AppointmentData> findAvailableAppointments(LocalDate date, String specialization) {
        return appointmentRepository.findAll().stream()
                .filter(appointment -> appointment.getAppointmentDate().equals(date) &&
                        appointment.getDoctorSpecialization().equalsIgnoreCase(specialization) &&
                        "AVAILABLE".equals(appointment.getStatus()))  // Ensure status is checked for "AVAILABLE"
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentData> findAvailableAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findAll().stream()
                .filter(appointment -> appointment.getAppointmentDate().equals(date) &&
                        "AVAILABLE".equals(appointment.getStatus()))  // Ensure status is checked for "AVAILABLE"
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentData> findAvailableAppointmentsByDoctorId(int doctorId) {
        return appointmentRepository.findAll().stream()
                .filter(appointment -> appointment.getDoctorId() == doctorId &&
                        "AVAILABLE".equals(appointment.getStatus()))  // Ensure status is checked for "AVAILABLE"
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentData> findBookingsByUserId(int userId) {
        return appointmentRepository.findAll().stream()
                .filter(appointment -> appointment.getPatientId() == userId)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentData bookAppointment(Long appointmentId, int userId) {
        AppointmentData appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid appointment ID"));

        appointment.bookAppointment(userId);
        return appointmentRepository.save(appointment);
    }

    @Override
    public AppointmentData cancelBooking(Long appointmentId, int userId) {
        AppointmentData appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid appointment ID"));

        if (appointment.getPatientId() != userId) {
            throw new IllegalStateException("User is not authorized to cancel this booking.");
        }

        appointment.setStatus("AVAILABLE");
        appointment.setPatientId(0); // Reset patient ID
        return appointmentRepository.save(appointment);
    }
    
    @Override
    public List<AppointmentData> findAppointmentsByDoctorId(int doctorId) {
        LocalDateTime currentTime = LocalDateTime.now();
        return appointmentRepository.findByDoctorIdAndAppointmentTimeAfterOrderByAppointmentTimeAsc(doctorId, currentTime);
    }
    
   
    
    @Override
    public List<String> findAllSpecializations() {
        return appointmentRepository.findAll().stream()
                .map(AppointmentData::getDoctorSpecialization)
                .distinct()
                .collect(Collectors.toList());
    }

    
    
}
