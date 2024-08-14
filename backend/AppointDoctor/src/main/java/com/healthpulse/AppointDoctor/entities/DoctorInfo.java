package com.healthpulse.AppointDoctor.entities;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class DoctorInfo {
	private int id;

    private String specialization;

    private String degrees;

    private String certificates; // URLs or paths to certificates
    
    private String experience;
    
    private String approvedByAdmin; // Admin can approve or reject the doctor's profile
    
}
