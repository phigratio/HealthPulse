package com.healthpulse.CabinBooking.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.healthpulse.CabinBooking.entities.User;

import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {

    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numOfAdults;
    private int numOfChildren;
    private int totalNumOfGuest;
    private String bookingConfirmationCode;
//    private UserDTO userDTO;
    private int userId;
//    private User user;
    private RoomDTO room;
}