package com.healthpulse.AppointDoctor.services.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.healthpulse.AppointDoctor.services.UserService;
import com.healthpulse.AppointDoctor.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

import com.healthpulse.AppointDoctor.entities.AppointmentData;
import com.healthpulse.AppointDoctor.repositories.AppointmentRepository;
import com.healthpulse.AppointDoctor.services.AppointmentService;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Autowired
    private UserService userService;


    @Autowired
    private JavaMailSender mailSender;

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
    
    @Override
    public boolean hasAppointment(int userId, int doctorId) {
        return appointmentRepository.findAll().stream()
                .anyMatch(appointment -> appointment.getPatientId() == userId &&
                                          appointment.getDoctorId() == doctorId &&
                                          "BOOKED".equals(appointment.getStatus()));
    }

//    @Override
//    public AppointmentData startMeeting(Long appointmentId, String videoCallUrl) {
//        AppointmentData appointment = appointmentRepository.findById(appointmentId)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid appointment ID"));
//
//        appointment.startMeeting(videoCallUrl);  // Set the video call URL and ensure the appointment is booked
//
//        //Trigger the sendEmail() function
//
//
//
//        return appointmentRepository.save(appointment);  // Save the updated appointment data
//    }


    // Send Email when a meeting stars

//    private void sendEmail (String Email , String url) throws MessageException {
//        MimeMailMessage mimeMessage = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
//        helper.setTo(email);
//        helper.setSubject("Important: Your Doctor Is waiting for you!!!");
//
//        String emailContent = "<html><body style='font-family: Arial, sans-serif;'>"
//                + "<h1 style='color: #1E90FF;'>HealthPulse: Appointment Reminder</h1>"
//                + "<p style='font-size: 16px;'>Dear User,</p>"
//                + "<p style='font-size: 16px;'>This is a reminder to take your appointment. Your doctor is in meeting room!!!</p>"
//
//                + "<h3 style='color: #FF0000;'>Join now..</h3>"
//
//                + "<p style='font-size: 16px;'> Link:" + url + "</p>"
//                + "<p style='font-size: 16px;'>Regards,<br><b>HealthPulse Team</b></p>"
//                + "</body></html>";
//
//        helper.setText(emailContent, true);
//
//        mailSender.send(mimeMessage);
//
//    }


    @Override
    public AppointmentData startMeeting(Long appointmentId, String videoCallUrl) {
        // Step 1: Fetch appointment details
        AppointmentData appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid appointment ID"));

        // Step 2: Set the video call URL and ensure the appointment is booked
        appointment.startMeeting(videoCallUrl);

        // Step 3: Fetch user details using the patient ID from the appointment
        User patient = userService.getUserById(appointment.getPatientId());

        // Step 4: Extract the user email
        String email = patient.getEmail();

        // Step 5: Send the email notification with the video call URL
        try {
            sendEmail(email, videoCallUrl);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }

        // Step 6: Save and return the updated appointment data
        return appointmentRepository.save(appointment);
    }

    // Method to send an email notification to the user
    private void sendEmail(String email, String url) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        // Set the recipient email and subject
        helper.setTo(email);
        helper.setSubject("Your Doctor is Waiting - HealthPulse Meeting Invitation");

        // Email template content with a professional medical theme
        String emailContent = "<html><body style='font-family: Arial, sans-serif; background-color: #f4f7f8; padding: 20px;'>"
                + "<div style='max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'>"
                + "<h2 style='color: #0056b3; text-align: center;'>Your Doctor is Waiting</h2>"
                + "<p style='font-size: 16px; color: #333;'>Dear Valued Patient,</p>"
                + "<p style='font-size: 16px; color: #333;'>Your virtual consultation is about to begin. Please click the link below to join the meeting with your doctor.</p>"
                + "<div style='text-align: center; margin: 20px 0;'>"
                + "<a href='" + url + "' style='background-color: #0056b3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Join Meeting</a>"
                + "</div>"
                + "<p style='font-size: 16px; color: #333;'>Meeting Link: <a href='" + url + "' style='color: #0056b3;'>" + url + "</a></p>"
                + "<p style='font-size: 16px; color: #333;'>If you have any questions or need assistance, feel free to contact us.</p>"
                + "<p style='font-size: 16px; color: #333;'>Best regards,</p>"
                + "<p style='font-size: 16px; color: #333;'><strong>HealthPulse Team</strong></p>"
                + "<div style='text-align: center; margin-top: 20px;'>"
                + "<img src='https://your-logo-url.com/logo.png' alt='HealthPulse Logo' style='height: 50px;' />"
                + "</div>"
                + "</div>"
                + "</body></html>";

        // Set the HTML content and send the email
        helper.setText(emailContent, true);
        mailSender.send(mimeMessage);
    }


}
