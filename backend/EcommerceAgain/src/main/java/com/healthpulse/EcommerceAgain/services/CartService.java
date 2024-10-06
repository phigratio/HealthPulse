package com.healthpulse.EcommerceAgain.services;

import com.healthpulse.EcommerceAgain.payload.CartDto;

public interface CartService {

    CartDto getCartByUserId(int userId);

    CartDto addProductToCart(int userId, int productId, int quantity);

    CartDto updateCartItemQuantity(int userId, int cartItemId, int quantity);

    void deleteCartItem(int userId, int cartItemId);

    void clearCart(int userId);
}
