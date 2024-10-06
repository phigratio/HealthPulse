package com.healthpulase.HealthTracker.clients;

import com.healthpulase.HealthTracker.entities.Notification;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "NOTIFICATION-MANAGER")
public interface NotificationClient {
    @PostMapping("/notifications")
    Notification createNotification(@RequestBody Notification notification);
}