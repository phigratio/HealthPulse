package com.healthpulse.UserSection.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.UserSection.entities.User;

public interface UserRepo extends JpaRepository<User, String> {
	
	

}
