package com.healthpulse.AuthSection.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.AuthSection.entity.UserCredential;

public interface UserCredentialRepo extends JpaRepository<UserCredential, String> {
    Optional<UserCredential> findByEmail(String email);
}
