package com.healthpulse.AppointDoctor.entities;

import java.util.ArrayList;
import java.util.List;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private int id;
    private String name;
    private String email;
    private String imageName;
    private List<Role> roles = new ArrayList<>();
    private DoctorInfo doctorInfo;

}