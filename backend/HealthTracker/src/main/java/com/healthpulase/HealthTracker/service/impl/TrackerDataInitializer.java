package com.healthpulase.HealthTracker.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class TrackerDataInitializer {

    @Autowired
    private TrackerDataScheduler trackerDataScheduler;

    @PostConstruct
    public void init() {
        // Call this method to create tracker data immediately at startup
        trackerDataScheduler.createDailyTrackerData();
    }
}
