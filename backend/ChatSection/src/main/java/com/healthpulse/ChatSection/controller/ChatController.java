package com.healthpulse.ChatSection.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.ChatSection.entities.Chat;
import com.healthpulse.ChatSection.services.ChatService;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/sender/{senderId}")
    public ResponseEntity<Chat> createChat(@PathVariable ("senderId") Long senderId, @RequestBody Chat chat) {
        chat.setSenderId(senderId);
        Chat createdChat = chatService.createChat(chat, senderId);
        return ResponseEntity.ok(createdChat);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chat> getChat(@PathVariable ("id") Long id) {
        Chat chat = chatService.getChat(id);
        if (chat != null) {
            return ResponseEntity.ok(chat);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Chat>> getAllChats() {
        List<Chat> chats = chatService.getAllChats();
        return ResponseEntity.ok(chats);
    }
}