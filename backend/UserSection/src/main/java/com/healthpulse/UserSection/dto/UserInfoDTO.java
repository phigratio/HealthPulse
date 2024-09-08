package com.healthpulse.UserSection.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoDTO {

    private Long id;
    private int userId;
    private int age;
    private String district;
    private String address;
    private String phoneNumber;
    private String readyToDonateBlood;
    private float height;
    private float weight;
    private String gender;
    private String bloodGroup;
    private float waist;
    private float hip;
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
