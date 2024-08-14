package com.healthpulse.CabinBooking.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.CabinBooking.entities.Room;


import java.time.LocalDate;
import java.util.List;


public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();
    
    @Query("SELECT DISTINCT r.hospital FROM Room r ")
    List<String> findDistinctHospital();


//    @Query("SELECT r FROM Room r WHERE r.roomType LIKE %:roomType% AND r.id NOT IN (SELECT bk.room.id FROM Booking bk WHERE" +
//            "(bk.checkInDate <= :checkOutDate) AND (bk.checkOutDate >= :checkInDate))")
	@Query("SELECT r FROM Room r WHERE r.roomType LIKE %:roomType% AND r.hospital LIKE %:hospital% AND r.id NOT IN (SELECT b.room.id FROM Booking b WHERE"
			+ "(b.checkInDate <= :checkOutDate) AND (b.checkOutDate >= :checkInDate))")
    List<Room> findAvailableRoomsByDatesAndTypes( @Param ("checkInDate")  LocalDate checkInDate,@Param ("checkOutDate")  LocalDate checkOutDate,@Param ("roomType")  String roomType, @Param ("hospital")  String hospital );


    @Query("SELECT r FROM Room r WHERE r.id NOT IN (SELECT b.room.id FROM Booking b)")
    List<Room> getAllAvailableRooms();
}