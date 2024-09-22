package com.healthpulse.EcommerceAgain.services;

import com.healthpulse.EcommerceAgain.payload.CartDto;

public interface CartService {

    CartDto addProductToCart(int cartId, int productId, int quantity);

    CartDto removeProductFromCart(int cartId, int productId);

    CartDto getCartById(int cartId);

    void clearCart(int cartId);
}
