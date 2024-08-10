package com.healthpulse.CabinBooking.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.CabinBooking.entities.Booking;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);
}