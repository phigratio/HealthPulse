package com.healthpulse.CabinBooking.services;


import org.springframework.web.multipart.MultipartFile;

import com.healthpulse.CabinBooking.dto.Response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface RoomService {

    Response addNewRoom(MultipartFile photo,String hospital, String address , String roomType, BigDecimal roomPrice, String description);

    List<String> getAllRoomTypes();
    
    List<String> getAllHospitals();

    Response getAllRooms();

    Response deleteRoom(Long roomId);

    Response updateRoom(Long roomId,String hospital, String address, String description, String roomType, BigDecimal roomPrice, MultipartFile photo);

    Response getRoomById(Long roomId);

    Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType , String hospital);

    Response getAllAvailableRooms();
}