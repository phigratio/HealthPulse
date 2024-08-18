package com.healthpulse.Ecommerce.entities;

import java.util.HashSet;
import java.util.Set;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private int id;
    private String name;
    private String email;
    private String imageName;
    private Set<Role> roles = new HashSet<>();

}