package com.healthpulse.EcommerceAgain.payload;

import lombok.Data;

@Data
public class OrderItemDto {
    private int orderItemId;
    private int productId;
    private int quantity;
    private float price;
}

