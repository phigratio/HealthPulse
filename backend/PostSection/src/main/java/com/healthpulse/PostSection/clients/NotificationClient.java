package com.healthpulse.PostSection.clients;


import com.healthpulse.PostSection.entities.Notification;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "NOTIFICATION-MANAGER")
public interface NotificationClient {
    @PostMapping("/notifications")
    Notification createNotification(@RequestBody Notification notification);
}