package com.example.server.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor

public class PaymentDetails {
    private String orderId;
    private Integer amount;
    private String currency;

    private String key;
}