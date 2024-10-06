package com.healthpulase.HealthTracker.service.impl;

import com.healthpulase.HealthTracker.clients.NotificationClient;
import com.healthpulase.HealthTracker.dto.TrackerDataDTO;
import com.healthpulase.HealthTracker.entities.Notification;
import com.healthpulase.HealthTracker.entities.TrackerData;
import com.healthpulase.HealthTracker.repository.TrackerDataRepository;
import com.healthpulase.HealthTracker.service.TrackerDataService;
import com.healthpulase.HealthTracker.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TrackerDataServiceImpl implements TrackerDataService {

    @Autowired
    private TrackerDataRepository trackerDataRepository;

    @Autowired
    private NotificationClient notificationClient;

    @Override
    public TrackerDataDTO addTrackerData(TrackerDataDTO trackerDataDTO) {

        TrackerData trackerData = mapToEntity(trackerDataDTO);
        TrackerData savedTrackerData = trackerDataRepository.save(trackerData);

        Notification noti = new Notification();
        noti.setUserId(trackerData.getUserId());
        noti.setData("Your tracker data has been added.");
        notificationClient.createNotification(noti);


        return mapToDTO(savedTrackerData);
    }

//    @Override
//    public TrackerDataDTO updateTrackerData(long id, TrackerDataDTO trackerDataDTO) {
//        TrackerData existingData = trackerDataRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Tracker data not found with id: " + id));
//        existingData.setSteps(trackerDataDTO.getSteps());
//        existingData.setWeight(trackerDataDTO.getWeight());
//        existingData.setWaterIntake(trackerDataDTO.getWaterIntake());
//        existingData.setCaloriesIntake(trackerDataDTO.getCaloriesIntake());
//        existingData.setCaloriesBurned(trackerDataDTO.getCaloriesBurned());
//        existingData.setSleepHours(trackerDataDTO.getSleepHours());
//        existingData.setScreenTime(trackerDataDTO.getScreenTime());
//        existingData.setDate(trackerDataDTO.getDate());
//        existingData.setUserId(trackerDataDTO.getUserId());
//        
//        TrackerData updatedData = trackerDataRepository.save(existingData);
//        return mapToDTO(updatedData);
//    }
    
    @Override
    public TrackerDataDTO updateTrackerData(TrackerDataDTO trackerDataDTO) {
        // Check if the tracker data exists for the given userId and date
        TrackerData existingData = trackerDataRepository.findByUserIdAndDate(trackerDataDTO.getUserId(), trackerDataDTO.getDate())
                .stream()
                .findFirst()
                .orElseGet(() -> {
                    // If not found, create a new TrackerData entity
                    TrackerData newData = new TrackerData();
                    newData.setUserId(trackerDataDTO.getUserId());
                    newData.setDate(trackerDataDTO.getDate());
                    return newData;
                });

        // Update the existing or new entity with the provided data
        existingData.setSteps(trackerDataDTO.getSteps());
        existingData.setWeight(trackerDataDTO.getWeight());
        existingData.setWaterIntake(trackerDataDTO.getWaterIntake());
        existingData.setCaloriesIntake(trackerDataDTO.getCaloriesIntake());
        existingData.setCaloriesBurned(trackerDataDTO.getCaloriesBurned());
        existingData.setSleepHours(trackerDataDTO.getSleepHours());
        existingData.setScreenTime(trackerDataDTO.getScreenTime());

        // Save the updated or new entity to the repository
        TrackerData updatedData = trackerDataRepository.save(existingData);

        Notification noti = new Notification();
        noti.setUserId(updatedData.getUserId());
        noti.setData("Your tracker data has been added.");
        notificationClient.createNotification(noti);

        return mapToDTO(updatedData);
    }


    @Override
    public void deleteTrackerData(long id) {
        trackerDataRepository.deleteById(id);
    }

    @Override
    public TrackerDataDTO getTrackerDataById(long id) {
        TrackerData trackerData = trackerDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tracker data not found with id: " + id));
        return mapToDTO(trackerData);
    }

    @Override
    public List<TrackerDataDTO> getTrackerDataByUserId(int userId) {
        return trackerDataRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TrackerDataDTO> getTrackerDataByDate(LocalDate date) {
        return trackerDataRepository.findByDate(date)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<TrackerDataDTO> getTrackerDataByUserIdAndDate(int userId, LocalDate date) {
        return trackerDataRepository.findByUserIdAndDate(userId, date)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<TrackerDataDTO> getTrackerDataLast7Days(int userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(7);
        return trackerDataRepository.findByUserIdAndDateBetween(userId, startDate, endDate)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TrackerDataDTO> getTrackerDataLast30Days(int userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
        return trackerDataRepository.findByUserIdAndDateBetween(userId, startDate, endDate)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TrackerDataDTO> getTrackerDataLast365Days(int userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(365);
        return trackerDataRepository.findByUserIdAndDateBetween(userId, startDate, endDate)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    private TrackerDataDTO mapToDTO(TrackerData trackerData) {
        return new TrackerDataDTO(
                trackerData.getId(),
                trackerData.getUserId(),
                trackerData.getDate(),
                trackerData.getSteps(),
                trackerData.getWeight(),
                trackerData.getWaterIntake(),
                trackerData.getCaloriesIntake(),
                trackerData.getCaloriesBurned(),
                trackerData.getSleepHours(),
                trackerData.getScreenTime()
        );
    }

    private TrackerData mapToEntity(TrackerDataDTO trackerDataDTO) {
        return new TrackerData(
                trackerDataDTO.getId(),
                trackerDataDTO.getUserId(),
                trackerDataDTO.getDate(),
                trackerDataDTO.getSteps(),
                trackerDataDTO.getWeight(),
                trackerDataDTO.getWaterIntake(),
                trackerDataDTO.getCaloriesIntake(),
                trackerDataDTO.getCaloriesBurned(),
                trackerDataDTO.getSleepHours(),
                trackerDataDTO.getScreenTime()
        );
    }
}
