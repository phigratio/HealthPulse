package com.healthpulse.ChatSection.services;

import java.util.List;

import com.healthpulse.ChatSection.entities.Chat;

public interface ChatService {
	
	   Chat createChat(Chat chat, Long senderId);

	    Chat getChat(Long id);

	    List<Chat> getAllChats();

}
