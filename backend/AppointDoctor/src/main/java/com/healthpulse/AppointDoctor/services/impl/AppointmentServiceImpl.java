package com.healthpulse.AppointDoctor.services.impl;

import java.time.LocalDate;
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
    public List<AppointmentData> findAvailableAppointments(LocalDate date, String specialization) {
        return appointmentRepository.findAll().stream()
                .filter(appointment -> appointment.getAppointmentDate().equals(date) &&
                        appointment.getDoctorSpecialization().equalsIgnoreCase(specialization) &&
                        appointment.getStatus().equals("AVAILABLE"))
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentData bookAppointment(Long appointmentId, int userId) {
        AppointmentData appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid appointment ID"));

        appointment.bookAppointment(userId);
        return appointmentRepository.save(appointment);
    }
}
