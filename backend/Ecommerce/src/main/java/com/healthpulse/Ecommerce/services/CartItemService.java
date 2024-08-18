package com.healthpulse.Ecommerce.services;

import java.util.List;

import com.healthpulse.Ecommerce.entities.Cart;
import com.healthpulse.Ecommerce.entities.CartItem;
import com.healthpulse.Ecommerce.entities.OrderItem;
import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.entities.User;

public interface CartItemService {
	
	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Integer userId, Long id,  CartItem cartItem);
	
	public CartItem isCartItemExist(Cart cart , Product product , String power , Integer userId);
	
	public void removeCartItem( Integer userId, Long id);
	
	public CartItem findCartItemById(Long id);
	
	List<OrderItem> convertCartItemsToOrderItems(User user);
	
	

}
