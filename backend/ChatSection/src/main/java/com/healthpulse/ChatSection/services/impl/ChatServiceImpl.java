package com.healthpulse.ChatSection.services.impl;

import com.healthpulse.ChatSection.clients.UserClient;
import com.healthpulse.ChatSection.entities.Chat;
import com.healthpulse.ChatSection.entities.User;
import com.healthpulse.ChatSection.repositories.ChatRepo;
import com.healthpulse.ChatSection.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepo chatRepo;

    @Autowired
    private UserClient userClient;

    @Override
    public Chat createChat(Chat chat, Long senderId) {
        chat.setSenderId(senderId);
        return chatRepo.save(chat);
    }

    @Override
    public Chat getChat(Long id) {
        Optional<Chat> chatOptional = chatRepo.findById(id);
        if (chatOptional.isPresent()) {
            Chat chat = chatOptional.get();
            User senderInfo = userClient.getUserById(chat.getSenderId());
            chat.setSenderInfo(senderInfo);
            return chat;
        }
        return null;
    }

    @Override
    public List<Chat> getAllChats() {
        List<Chat> chats = chatRepo.findAll();
        for (Chat chat : chats) {
            User senderInfo = userClient.getUserById(chat.getSenderId());
            chat.setSenderInfo(senderInfo);
        }
        return chats;
    }
}
