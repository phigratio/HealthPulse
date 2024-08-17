package com.healthpulse.AppointDoctor.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Prescription {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int doctorId;
	
	private int patientId;
	
	private LocalDateTime creatingTime;
	
	@Column(length = 1000000000)
	private String prescription;

	@PrePersist
	public void prePersist() {
		this.creatingTime = LocalDateTime.now();
	}

	@PreUpdate
	public void preUpdate() {
		this.creatingTime = LocalDateTime.now();
	}
}
