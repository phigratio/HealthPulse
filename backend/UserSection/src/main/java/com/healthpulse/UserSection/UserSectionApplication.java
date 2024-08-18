package com.healthpulse.UserSection;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableFeignClients 

public class UserSectionApplication {
	
	

	public static void main(String[] args) {
		SpringApplication.run(UserSectionApplication.class, args);
	}

}
