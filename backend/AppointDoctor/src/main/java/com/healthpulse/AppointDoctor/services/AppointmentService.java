package com.healthpulse.AppointDoctor.services;

import java.time.LocalDate;
import java.util.List;
import com.healthpulse.AppointDoctor.entities.AppointmentData;

public interface AppointmentService {
	
	// Method to create a new appointment
	AppointmentData createAppointment(AppointmentData appointmentData);

    
    // Method to find available appointments by date and specialization
    List<AppointmentData> findAvailableAppointments(LocalDate date, String specialization);

    // Method to book an appointment
    AppointmentData bookAppointment(Long appointmentId, int userId);

    // Additional service methods can be added here
}
