package com.healthpulse.AuthSection.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender; // Autowire JavaMailSender

    public void sendEmail(String to, String subject, String text) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true); // true for multipart

        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(subject);
        String emailContent = "<html><body style='font-family: Arial, sans-serif; background-color: #f4f7f8; padding: 20px;'>"
                + "<div style='max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'>"
                + "<h2 style='color: #0056b3; text-align: center;'>Verify Your Email</h2>"
                + "<p style='font-size: 16px; color: #333;'>Dear User,</p>"
                + "<p style='font-size: 16px; color: #333;'>Please click the button below to verify your email address.</p>"
                + "<div style='text-align: center; margin: 20px 0;'>"
                + "<a href='" + text + "' style='background-color: #0056b3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Verify Email</a>"
                +"<p> "+ text + " </p>"
                + "</div>"
                + "<p style='font-size: 16px; color: #333;'>If you did not request this verification, please ignore this email.</p>"
                + "<p style='font-size: 16px; color: #333;'>Best regards,</p>"
                + "<p style='font-size: 16px; color: #333;'><strong>HealthPulse Team</strong></p>"
                + "<div style='text-align: center; margin-top: 20px;'>"
                + "</div>"
                + "</div>"
                + "</body></html>";

        // Set the email content as HTML
        mimeMessageHelper.setText(emailContent, true);
        mimeMessageHelper.setFrom("healthpulse9@gmail.com");

        mailSender.send(mimeMessage);

        System.out.println("Email sent successfully");
    }
}


