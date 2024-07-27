package com.healthpulse.AuthSection;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AuthSectionApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthSectionApplication.class, args);
	}

}
