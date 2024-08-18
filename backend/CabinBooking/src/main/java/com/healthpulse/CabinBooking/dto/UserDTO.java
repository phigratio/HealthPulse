package com.healthpulse.CabinBooking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.healthpulse.CabinBooking.entities.Role;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private int id;
    private String email;
    private String name;
    private String phoneNumber;
//    private String role;
    
    private List<Role> roles = new ArrayList<>();
    private List<BookingDTO> bookings = new ArrayList<>();

}