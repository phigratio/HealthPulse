package com.healthpulse.CabinBooking.services;

import com.healthpulse.CabinBooking.dto.Response;
import com.healthpulse.CabinBooking.entities.Booking;

public interface BookingService {
	
	Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
    
    Response getUserBookingHistory(Integer userId);

}
