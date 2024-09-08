package com.healthpulase.HealthTracker.repository;

import com.healthpulase.HealthTracker.entities.TrackerData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TrackerDataRepository extends JpaRepository<TrackerData, Long> {
    List<TrackerData> findByUserId(int userId);
    List<TrackerData> findByDate(LocalDate date);
    List<TrackerData> findByUserIdAndDate(int userId, LocalDate date);
    List<TrackerData> findByUserIdAndDateBetween(int userId, LocalDate startDate, LocalDate endDate);
    boolean existsByUserIdAndDate(int userId, LocalDate date);

}