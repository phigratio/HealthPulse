package com.healthpulse.EcommerceAgain.services;


import com.healthpulse.EcommerceAgain.payload.CartDto;

public interface CartService {

    CartDto getCartByUserId(int userId);

    CartDto addProductToCart(int userId, int productId, int quantity);

    void clearCart(int userId);
}