package com.healthpulse.website.entities;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "doctor_info")
@NoArgsConstructor
@Getter
@Setter
public class DoctorInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String specialization;

    private String degrees;

    @Column(length = 1000)
    private String certificates; // URLs or paths to certificates
    
    private String experience;
    
    private String approvedByAdmin; // Admin can approve or reject the doctor's profile
    
    

    // Add other fields as needed
}
