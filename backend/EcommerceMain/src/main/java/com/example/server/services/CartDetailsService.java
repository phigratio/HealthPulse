package com.example.server.services;

import com.example.server.payload.CartDetailDto;
import com.example.server.payload.CartHelp;
import org.springframework.stereotype.Service;

@Service
public interface CartDetailsService {

    //add product
    public CartDetailDto addProduct(CartHelp cartHelp);
}