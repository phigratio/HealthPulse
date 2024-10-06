package com.healthpulse.AppointDoctor.services;

import java.time.LocalDate;
import java.util.List;
import com.healthpulse.AppointDoctor.entities.AppointmentData;

public interface AppointmentService {

    // Method to create a new appointment
    AppointmentData createAppointment(AppointmentData appointmentData);
    
    // Method to find appointment by ID
    AppointmentData findAppointmentById(Long appointmentId);

    // Method to find available appointments by date and specialization
    List<AppointmentData> findAvailableAppointments(LocalDate date, String specialization);

    // Method to find all available appointments by date without specialization filter
    List<AppointmentData> findAvailableAppointmentsByDate(LocalDate date);

    // Method to find available appointments by doctorId
    List<AppointmentData> findAvailableAppointmentsByDoctorId(int doctorId);
    
    // Method to find all appointments by doctorId after the current time 
    
    List<AppointmentData> findAppointmentsByDoctorId(int doctorId);
    

    // Method to book an appointment
    AppointmentData bookAppointment(Long appointmentId, int userId);

    // Method to find all bookings made by a user
    List<AppointmentData> findBookingsByUserId(int userId);

    // Method to cancel a booking
    AppointmentData cancelBooking(Long appointmentId, int userId);

    // Method to find all specializations
    List<String> findAllSpecializations();
    
 // Method to check if a user has an appointment with a doctor
    boolean hasAppointment(int userId, int doctorId);

    // Method to start a meeting by setting the video call URL
    AppointmentData startMeeting(Long appointmentId, String videoCallUrl);
}
