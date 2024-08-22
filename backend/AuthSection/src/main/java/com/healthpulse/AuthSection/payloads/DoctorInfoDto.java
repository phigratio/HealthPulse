package com.healthpulse.AuthSection.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class DoctorInfoDto {
    private String specialization;
    private String degrees;
    private String certificates; // URLs or paths to certificates
    private String experience;
    private String approvedByAdmin;
    private String CV; // URL or path to CV
    private String certificateOfRegistration; // URL or path to certificate of registration
}
