package com.healthpulse.CabinBooking.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.CabinBooking.dto.Response;
import com.healthpulse.CabinBooking.entities.Booking;
import com.healthpulse.CabinBooking.services.BookingService;

@RestController
@RequestMapping("/cb/bookings")

public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book-room/{roomId}/{userId}")
//    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Response> saveBookings(@PathVariable ("roomId") Long roomId,
                                                 @PathVariable ("userId")  Long userId,
                                                 @RequestBody Booking bookingRequest) {


        Response response = bookingService.saveBooking(roomId, userId, bookingRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }

    @GetMapping("/all")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllBookings() {
        Response response = bookingService.getAllBookings();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-by-confirmation-code/{confirmationCode}")
    public ResponseEntity<Response> getBookingByConfirmationCode(@PathVariable ("confirmationCode") String confirmationCode) {
        Response response = bookingService.findBookingByConfirmationCode(confirmationCode);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/cancel/{bookingId}")
//    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Response> cancelBooking(@PathVariable ("bookingId") Long bookingId) {
        Response response = bookingService.cancelBooking(bookingId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


}