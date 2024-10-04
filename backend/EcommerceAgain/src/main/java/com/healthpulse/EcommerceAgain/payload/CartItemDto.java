package com.healthpulse.EcommerceAgain.payload;

import lombok.Data;

@Data
public class CartItemDto {
    private int cartItemId;
    private int productId;
    private int quantity;
    private float price;
}