package com.healthpulase.HealthTracker.service;

import com.healthpulase.HealthTracker.dto.TrackerTargetDTO;

public interface TrackerTargetService {
    TrackerTargetDTO saveOrUpdateTrackerTarget(TrackerTargetDTO trackerTargetDTO);
    TrackerTargetDTO getTrackerTargetByUserId(int userId);
}
