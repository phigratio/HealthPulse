package com.healthpulse.UserSection.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "userInfo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class UserInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int userId;
	
	private int age;
	
	private float height;
	
	private float weight;
	
	private String gender;
	
	private String bloodGroup;
	
	private float Waist;
	
	private float Hip;
	
	private float bmi;
	
	private float bodyFatPercentage;
	
	private float waistToHipRatio;
	
	private float calorieNeeds;
	
	private float idealWeight;
	
	private float waterIntake;
	
	private float bsa;
	
	private float proteinNeeds;
	
	private float carbNeeds;
	
	private float fatNeeds;
	
	private float muscleMassNeeds;
	
	private float boneDensityNeeds;
	
	private float metabolicAgeNeeds;
	
	private float visceralFatNeeds;
	
	private float bodyWaterNeeds;
	
	private float muscleMass;
	
	private float boneDensity;
	
	private float metabolicAge;
	
	private float visceralFat;
	
	private float bodyWater;
	
	private String geneticDisease;
	
	private String chronicDisease;
	
	private String allergies;
	
	
	
}
