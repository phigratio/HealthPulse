package com.healthpulase.HealthTracker.service;

import com.healthpulase.HealthTracker.dto.TrackerDataDTO;
import java.time.LocalDate;
import java.util.List;

public interface TrackerDataService {
    TrackerDataDTO addTrackerData(TrackerDataDTO trackerDataDTO);
    TrackerDataDTO updateTrackerData(TrackerDataDTO trackerDataDTO);
    void deleteTrackerData(long id);
    TrackerDataDTO getTrackerDataById(long id);
    List<TrackerDataDTO> getTrackerDataByUserId(int userId);
    List<TrackerDataDTO> getTrackerDataByDate(LocalDate date);
    List<TrackerDataDTO> getTrackerDataByUserIdAndDate(int userId, LocalDate date);
    List<TrackerDataDTO> getTrackerDataLast7Days(int userId);
    List<TrackerDataDTO> getTrackerDataLast30Days(int userId);
    List<TrackerDataDTO> getTrackerDataLast365Days(int userId);
}
