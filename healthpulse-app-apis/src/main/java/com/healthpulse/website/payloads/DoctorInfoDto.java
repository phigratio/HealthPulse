package com.healthpulse.website.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class DoctorInfoDto {
    private String specialization;
    private String degrees;
    private String certificates;
    private String experience;
    private String approvedByAdmin;

}
