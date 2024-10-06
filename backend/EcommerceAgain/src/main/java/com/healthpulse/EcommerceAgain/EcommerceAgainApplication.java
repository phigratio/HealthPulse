package com.healthpulse.EcommerceAgain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class EcommerceAgainApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceAgainApplication.class, args);
	}

}
