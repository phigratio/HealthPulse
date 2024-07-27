package com.healthpulse.UserSection.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.UserSection.entities.UserInfo;

public interface UserRepo extends JpaRepository<UserInfo, String> {
	
	

}
