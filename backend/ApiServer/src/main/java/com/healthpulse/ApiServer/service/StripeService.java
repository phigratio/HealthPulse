package com.healthpulse.ApiServer.service;

import com.healthpulse.ApiServer.config.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        // Set the secret key
        Stripe.apiKey = stripeApiKey;
    }

    public String createPaymentIntent(PaymentRequest paymentRequest) throws StripeException {
        // Create PaymentIntent parameters
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(paymentRequest.getAmount())
                .setCurrency("usd")
                .build();

        // Create a PaymentIntent with the specified parameters
        PaymentIntent paymentIntent = PaymentIntent.create(params);

        // Return the client secret
        return paymentIntent.getClientSecret();
    }
}