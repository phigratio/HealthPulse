package com.healthpulse.EcommerceAgain.payload;

import lombok.Data;

import java.util.List;

@Data
public class CartDto {
    private int cartId;
    private int userId;
    private List<CartItemDto> cartItems;
}