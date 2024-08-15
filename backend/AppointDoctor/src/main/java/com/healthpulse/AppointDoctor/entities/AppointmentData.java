package com.healthpulse.AppointDoctor.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int doctorId;

    private String doctorSpecialization;

    private int patientId;

    private LocalDate appointmentDate;

    private LocalDateTime appointmentTime;

    private String status = "AVAILABLE";  // Initialize status to "AVAILABLE"

    private int consultationFee;

    public AppointmentData(int doctorId, String doctorSpecialization, LocalDate appointmentDate, LocalDateTime appointmentTime, int consultationFee) {
        this.doctorId = doctorId;
        this.doctorSpecialization = doctorSpecialization;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.consultationFee = consultationFee;
        this.status = "AVAILABLE"; // Default status
    }

    public void bookAppointment(int patientId) {
        if (this.status.equals("AVAILABLE")) {
            this.patientId = patientId;
            this.status = "BOOKED";
        } else {
            throw new IllegalStateException("Appointment is not available.");
        }
    }
}
