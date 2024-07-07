package com.healthpulse.website.payloads;

import java.util.HashSet;
import java.util.Set;

import com.healthpulse.website.entities.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class UserDto {

	private int id;

	@NotEmpty
	@Size(min = 4, message = "Username must be min of 4 characters !!!")
	private String name;

	@Email(message = "Email address is not valid !!!")
	@NotEmpty(message = "Email is required !!!")
	private String email;

	@NotEmpty
	@Size(min = 8, message = "Password must be min of 8 chars  !!!")
	private String password;

	@NotEmpty(message = "About is required !!!")
	private String about;
	
	private String imageName; 
	
	private Set<RoleDto> roles = new HashSet<>();
	
	// doctor info if role id is 503
	private DoctorInfoDto doctorInfo;
	
	
	
	
	
	private int age;
	

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
	private float bsa; // Body Surface Area
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

	@JsonIgnore
	public String getPassword() {
		return this.password;
	}

	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}
}
