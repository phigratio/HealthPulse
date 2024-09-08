package com.healthpulase.HealthTracker.repository;

import com.healthpulase.HealthTracker.entities.TrackerTarget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrackerTargetRepository extends JpaRepository<TrackerTarget, Long> {
    Optional<TrackerTarget> findByUserId(int userId);
}
