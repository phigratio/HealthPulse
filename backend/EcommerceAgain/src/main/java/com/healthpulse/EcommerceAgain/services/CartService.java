package com.healthpulse.EcommerceAgain.services;

import org.springframework.stereotype.Service;

import com.healthpulse.EcommerceAgain.payload.CartDto;
import com.healthpulse.EcommerceAgain.payload.CartHelp;

@Service
public interface CartService {

    //Create
    CartDto CreateCart(CartHelp cartHelp);

    //add Product To Cart
    CartDto addProductToCart(CartHelp cartHelp);

    //Get
    CartDto GetCart(String userEmail);

    //delete product

    void RemoveById(Integer ProductId,String userEmail);

    //delete


}
