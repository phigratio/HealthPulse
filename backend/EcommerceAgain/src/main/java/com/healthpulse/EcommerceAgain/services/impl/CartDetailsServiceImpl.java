package com.healthpulse.EcommerceAgain.services.impl;

import com.healthpulse.EcommerceAgain.payload.CartDetailDto;
import com.healthpulse.EcommerceAgain.payload.CartHelp;
import com.healthpulse.EcommerceAgain.services.CartDetailsService;

public class CartDetailsServiceImpl implements CartDetailsService {
    @Override
    public CartDetailDto addProduct(CartHelp cartHelp) {
        int productId=cartHelp.getProductId();
        int quantity= cartHelp.getQuantity();
        String userEmail= cartHelp.getUserEmail();
        return null;
    }
}
