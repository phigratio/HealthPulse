package com.healthpulse.CabinBooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CabinBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(CabinBookingApplication.class, args);
	}

}
