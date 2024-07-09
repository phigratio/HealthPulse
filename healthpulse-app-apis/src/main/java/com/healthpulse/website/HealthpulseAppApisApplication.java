package com.healthpulse.website;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.healthpulse.website.config.AppConstants;
import com.healthpulse.website.entities.Role;
import com.healthpulse.website.repositories.RoleRepo;

@SpringBootApplication
public class HealthpulseAppApisApplication implements CommandLineRunner  {
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepo roleRepo;

	// Main method
	
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(HealthpulseAppApisApplication.class);
		app.run(args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) throws Exception {

		//System.out.println(this.passwordEncoder.encode("xyz"));

		try {

			Role role = new Role();
			role.setId(AppConstants.ADMIN_USER);
			role.setName("ROLE_ADMIN");

			Role role1 = new Role();
			role1.setId(AppConstants.NORMAL_USER);
			role1.setName("ROLE_NORMAL");
			
			Role role2 = new Role();
			role2.setId(AppConstants.DOCTOR_USER);
			role2.setName("ROLE_DOCTOR");
			
			List<Role> roles = List.of(role, role1 , role2);

			List<Role> result = this.roleRepo.saveAll(roles);

			result.forEach(r -> {
				System.out.println(r.getName());
			});

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

}