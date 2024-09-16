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
        mimeMessageHelper.setText(text, true); // true for HTML content
        mimeMessageHelper.setFrom("healthpulse9@gmail.com");

        mailSender.send(mimeMessage);

        System.out.println("Email sent successfully");
    }
}


