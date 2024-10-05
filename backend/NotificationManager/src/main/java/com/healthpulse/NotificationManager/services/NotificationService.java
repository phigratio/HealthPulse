package com.healthpulse.NotificationManager.services;

import com.healthpulse.NotificationManager.entities.Notification;

import java.util.List;

public interface NotificationService {
    Notification createNotification(Notification notification);
    List<Notification> getAllNotifications();
    Notification getNotificationById(Long id);
    void deleteNotification(Long id);
    List<Notification> getNotificationsByUserId(int userId);
}
