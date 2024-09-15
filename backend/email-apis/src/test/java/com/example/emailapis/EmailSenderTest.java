package com.example.emailapis;

import com.example.emailapis.service.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailSenderTest {

    @Autowired
    private EmailService emailService;

    @Test
    void emailSendTest(){
        System.out.println("Email Sender Test");
        emailService.sendEmail("saidurrahman@iut-dhaka.edu","Email from Spring Boot","khela sesh");
    }
}
