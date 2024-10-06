package com.healthpulase.HealthTracker.service.impl;

import com.healthpulase.HealthTracker.dto.TrackerTargetDTO;
import com.healthpulase.HealthTracker.entities.TrackerTarget;
import com.healthpulase.HealthTracker.repository.TrackerTargetRepository;
import com.healthpulase.HealthTracker.service.TrackerTargetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TrackerTargetServiceImpl implements TrackerTargetService {

    @Autowired
    private TrackerTargetRepository trackerTargetRepository;

    @Override
    public TrackerTargetDTO saveOrUpdateTrackerTarget(TrackerTargetDTO trackerTargetDTO) {
        Optional<TrackerTarget> existingTargetOpt = trackerTargetRepository.findByUserId(trackerTargetDTO.getUserId());

        TrackerTarget trackerTarget;
        if (existingTargetOpt.isPresent()) {
            trackerTarget = existingTargetOpt.get();
            trackerTarget.setSteps(trackerTargetDTO.getSteps());
            trackerTarget.setWeight(trackerTargetDTO.getWeight());
            trackerTarget.setWaterIntake(trackerTargetDTO.getWaterIntake());
            trackerTarget.setCaloriesIntake(trackerTargetDTO.getCaloriesIntake());
            trackerTarget.setCaloriesBurned(trackerTargetDTO.getCaloriesBurned());
            trackerTarget.setSleepHours(trackerTargetDTO.getSleepHours());
            trackerTarget.setScreenTime(trackerTargetDTO.getScreenTime());
        } else {
            trackerTarget = mapToEntity(trackerTargetDTO);
        }

        TrackerTarget savedTarget = trackerTargetRepository.save(trackerTarget);
        return mapToDTO(savedTarget);
    }

    @Override
    public TrackerTargetDTO getTrackerTargetByUserId(int userId) {
        TrackerTarget trackerTarget = trackerTargetRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Tracker target not found for user with ID: " + userId));
        return mapToDTO(trackerTarget);
    }

    private TrackerTargetDTO mapToDTO(TrackerTarget trackerTarget) {
        return new TrackerTargetDTO(
                trackerTarget.getId(),
                trackerTarget.getUserId(),
                trackerTarget.getSteps(),
                trackerTarget.getWeight(),
                trackerTarget.getWaterIntake(),
                trackerTarget.getCaloriesIntake(),
                trackerTarget.getCaloriesBurned(),
                trackerTarget.getSleepHours(),
                trackerTarget.getScreenTime()
        );
    }

    private TrackerTarget mapToEntity(TrackerTargetDTO trackerTargetDTO) {
        return new TrackerTarget(
                trackerTargetDTO.getId(),
                trackerTargetDTO.getUserId(),
                trackerTargetDTO.getSteps(),
                trackerTargetDTO.getWeight(),
                trackerTargetDTO.getWaterIntake(),
                trackerTargetDTO.getCaloriesIntake(),
                trackerTargetDTO.getCaloriesBurned(),
                trackerTargetDTO.getSleepHours(),
                trackerTargetDTO.getScreenTime()
        );
    }
}
