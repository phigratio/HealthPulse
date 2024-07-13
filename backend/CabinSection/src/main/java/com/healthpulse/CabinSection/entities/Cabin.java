package com.healthpulse.CabinSection.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cabin {
	@Id
	private String id;
	private String cabinNo;
	private String cabinType;
	private String latitude;
	private String longitude;
	private String hospitalName;
	private String about;
	

}
