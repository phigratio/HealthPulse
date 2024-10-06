package com.healthpulse.AuthSection.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.AuthSection.entity.User;

public interface UserRepo extends JpaRepository<User, Integer>{
		
	
	Optional<User> findByEmail(String email);
	Optional<User> findByVerificationToken(String token);


}