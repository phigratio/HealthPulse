package com.healthpulse.SectionRegistry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class SectionRegistryApplication {

	public static void main(String[] args) {
		SpringApplication.run(SectionRegistryApplication.class, args);
	}

}
