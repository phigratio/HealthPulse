package com.healthpulase.HealthTracker.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class TrackerData {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
