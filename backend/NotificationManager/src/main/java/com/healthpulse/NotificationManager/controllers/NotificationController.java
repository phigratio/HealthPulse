package com.healthpulse.NotificationManager.controllers;

import com.healthpulse.NotificationManager.entities.Notification;
import com.healthpulse.NotificationManager.services.NotificationService;
import com.healthpulse.NotificationManager.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification createdNotification = notificationService.createNotification(notification);
        return ResponseEntity.ok(createdNotification);
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        if ( !JwtUtil.isAdmin()) {
            return ResponseEntity.status(403).body(null); // Forbidden if admin
        }
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        if ( !JwtUtil.isAdmin()) {
            return ResponseEntity.status(403).body(null); // Forbidden if admin
        }
        Notification notification = notificationService.getNotificationById(id);
        return notification != null ? ResponseEntity.ok(notification) : ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByUserId(@PathVariable int userId) {
        if (!JwtUtil.isCurrentUser(userId) || !JwtUtil.isAdmin()) {
            return ResponseEntity.status(403).body(null); // Forbidden if not user himself or admin
        }
        List<Notification> notifications = notificationService.getNotificationsByUserId(userId);
        return ResponseEntity.ok(notifications);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {

        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}
