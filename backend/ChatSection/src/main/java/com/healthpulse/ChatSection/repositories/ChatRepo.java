package com.healthpulse.ChatSection.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.ChatSection.entities.Chat;

public interface ChatRepo extends JpaRepository<Chat, Long> {

}
