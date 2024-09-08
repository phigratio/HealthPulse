package com.healthpulase.HealthTracker.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TrackerDataDTO {
    private long id;
    private int userId;
    private LocalDate date;
    private int steps;
    private float weight;
    private float waterIntake;
    private int caloriesIntake;
    private int caloriesBurned;
    private float sleepHours;
    private float screenTime;
}
