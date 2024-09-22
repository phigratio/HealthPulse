package com.healthpulse.ApiServer.controller;

import com.healthpulse.ApiServer.config.PaymentRequest;
import com.healthpulse.ApiServer.service.StripeService;
import com.stripe.exception.StripeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/apiserver/stripe")
public class StripeController {

    private final StripeService stripeService;

    // Constructor injection
    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/charge")
    public ResponseEntity<Map<String, Object>> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        try {
            // Call the service to create a PaymentIntent and get the client secret
            String clientSecret = stripeService.createPaymentIntent(paymentRequest);

            // Prepare the response with the client secret
            Map<String, Object> response = new HashMap<>();
            response.put("clientSecret", clientSecret);

            // Return HTTP 200 OK with the client secret
            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            // If there is an error, return an error response with HTTP 400 Bad Request
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}