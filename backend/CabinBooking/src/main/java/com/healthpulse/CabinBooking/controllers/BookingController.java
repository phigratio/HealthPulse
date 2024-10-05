package com.healthpulse.CabinBooking.controllers;


import com.healthpulse.CabinBooking.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.CabinBooking.dto.Response;
import com.healthpulse.CabinBooking.entities.Booking;
import com.healthpulse.CabinBooking.services.BookingService;
import com.healthpulse.CabinBooking.services.UserService;

@RestController
@RequestMapping("/cb/bookings")

public class BookingController {

    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private UserService userService;

    @PostMapping("/book-room/{roomId}/{userId}")
//    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Response> saveBookings(@PathVariable ("roomId") Long roomId,
                                                 @PathVariable ("userId")  Long userId,
                                                 @RequestBody Booking bookingRequest) {

        if (!JwtUtil.isCurrentUser(Math.toIntExact(userId))) {
            return ResponseEntity.status(403).body(null);  // Forbidden if not admin
        }
        Response response = bookingService.saveBooking(roomId, userId, bookingRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }

    @GetMapping("/all")

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

    public ResponseEntity<Response> cancelBooking(@PathVariable ("bookingId") Long bookingId) {
        Response response = bookingService.cancelBooking(bookingId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    
    
    @GetMapping("/get-user-bookings/{userId}")
    public ResponseEntity<Response> getUserBookingHistory(@PathVariable("userId") Integer userId) {
        if (!JwtUtil.isCurrentUser(userId)) {
            return ResponseEntity.status(403).body(null);  // Forbidden if not admin
        }
        Response response = bookingService.getUserBookingHistory(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


}