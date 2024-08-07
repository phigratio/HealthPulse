package com.healthpulse.Ecommerce.services;

import com.healthpulse.Ecommerce.entities.Cart;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.payloads.AddItemRequest;

public interface CartService {
	
	
	public Cart createCart(User user);
	
	public String addCartItem(Integer userId, AddItemRequest addItemRequest);
	
	public Cart findUserCart(Integer userId);

}
