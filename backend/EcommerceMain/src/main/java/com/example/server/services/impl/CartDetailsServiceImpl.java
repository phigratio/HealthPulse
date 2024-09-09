package com.example.server.services.impl;

import com.example.server.payload.CartDetailDto;
import com.example.server.payload.CartHelp;
import com.example.server.repositories.CartRepo;
import com.example.server.repositories.UserRepo;
import com.example.server.services.CartDetailsService;
import org.springframework.beans.factory.annotation.Autowired;

public class CartDetailsServiceImpl implements CartDetailsService {





    @Override
    public CartDetailDto addProduct(CartHelp cartHelp) {
        int productId=cartHelp.getProductId();
        int quantity= cartHelp.getQuantity();
        String userEmail= cartHelp.getUserEmail();









        return null;
    }
}
