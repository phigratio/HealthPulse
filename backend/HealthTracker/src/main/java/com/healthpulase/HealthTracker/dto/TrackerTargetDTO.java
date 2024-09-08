package com.healthpulase.HealthTracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TrackerTargetDTO {

    private long id;

    private int userId;

    private int steps;

    private float weight;

    private float waterIntake;

    private int caloriesIntake;

    private int caloriesBurned;

    private float sleepHours;

    private float screenTime;
}
