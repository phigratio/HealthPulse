package com.healthpulse.AuthSection.event;

import com.healthpulse.AuthSection.entity.User;
import com.healthpulse.AuthSection.service.EmailService;
import com.healthpulse.AuthSection.service.VerificationTokenService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {
    @Autowired
    private VerificationTokenService tokenService;

    @Autowired
    private EmailService emailService;

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        try {
            this.confirmRegistration(event);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private void confirmRegistration(OnRegistrationCompleteEvent event) throws MessagingException {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        tokenService.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "Registration Confirmation";
        String confirmationUrl = "http://localhost:8081/auth/verify-email?token=" + token;
        String message = "Click the link to verify your email: " + confirmationUrl;

        emailService.sendEmail(recipientAddress,subject,message);
    }


}
