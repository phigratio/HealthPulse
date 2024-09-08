package com.healthpulase.HealthTracker.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.healthpulase.HealthTracker.clients.UserClient;
import com.healthpulase.HealthTracker.dto.TrackerDataDTO;
import com.healthpulase.HealthTracker.entities.User;
import com.healthpulase.HealthTracker.repository.TrackerDataRepository;
import com.healthpulase.HealthTracker.service.TrackerDataService;

@Service
public class TrackerDataScheduler {

    @Autowired
    private TrackerDataService trackerDataService;

    @Autowired
    private UserClient userClient;

    @Autowired
    private TrackerDataRepository trackerDataRepository;

    // Scheduled task to run every day at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void createDailyTrackerData() {
        List<User> users = userClient.getUsers();

        for (User user : users) {
            LocalDate today = LocalDate.now();
            boolean exists = trackerDataRepository.existsByUserIdAndDate(user.getId(), today);

            if (!exists) {
                TrackerDataDTO trackerDataDTO = new TrackerDataDTO();
                trackerDataDTO.setUserId(user.getId());
                trackerDataDTO.setDate(today);
                trackerDataDTO.setSteps(0); // Set default or calculated values
                trackerDataDTO.setWeight(0);
                trackerDataDTO.setWaterIntake(0);
                trackerDataDTO.setCaloriesIntake(0);
                trackerDataDTO.setCaloriesBurned(0);
                trackerDataDTO.setSleepHours(0);
                trackerDataDTO.setScreenTime(0);

                trackerDataService.addTrackerData(trackerDataDTO);
            }
        }
    }
}