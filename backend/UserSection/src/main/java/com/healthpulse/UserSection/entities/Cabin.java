package com.healthpulse.UserSection.entities;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
