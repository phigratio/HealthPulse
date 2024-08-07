package com.healthpulse.Ecommerce.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.Ecommerce.entities.Cart;
import com.healthpulse.Ecommerce.entities.CartItem;
import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.repositories.CartItemRepository;
import com.healthpulse.Ecommerce.repositories.CartRepository;
import com.healthpulse.Ecommerce.services.CartItemService;
import com.healthpulse.Ecommerce.services.UserService;


@Service
public class CartItemServiceImpl implements CartItemService {
	
	@Autowired
	private CartItemRepository cartItemRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private CartRepository cartRepository;
	
	
	public CartItemServiceImpl(CartItemRepository cartItemRepository, UserService userService,
			CartRepository cartRepository) {
		this.cartItemRepository = cartItemRepository;
		this.userService = userService;
		this.cartRepository = cartRepository;
	}
	
	
	
	@Override
	public CartItem createCartItem(CartItem cartItem) {
		cartItem.setQuantity(1);
		cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity() );
		cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountPrice() * cartItem.getQuantity());
		
		CartItem createdCartItem = cartItemRepository.save(cartItem);
		
		return createdCartItem;
		
		
	}

	@Override
	public CartItem updateCartItem(Integer userId, Long id, CartItem cartItem) {
		CartItem item = findCartItemById(id);
		User user =  userService.getUserById(userId);
		
		if (user.getId()== userId) {
			item.setQuantity(cartItem.getQuantity());
			item.setPrice(item.getProduct().getPrice() * item.getQuantity());
			item.setDiscountedPrice(item.getProduct().getDiscountPrice() * item.getQuantity());

		}
		
		return cartItemRepository.save(item);
		
	}

	@Override
	public CartItem isCartItemExist(Cart cart, Product product, String power, Integer userId) {
		CartItem cartItem = cartItemRepository.isCartItemExist(cart, product, power, userId);
		
		return cartItem;
	}
	

	@Override
	public void removeCartItem(Integer userId, Long id) {
		CartItem item = findCartItemById(id);
		User user =  userService.getUserById(item.getUserId());
		
		if(true) {
			
			cartItemRepository.deleteById(id);
		}
		
	}

	@Override
	public CartItem findCartItemById(Long id) {
		Optional<CartItem> cartItem = cartItemRepository.findById(id);
		
		if (cartItem.isPresent()) {
			return cartItem.get();
		}
		return null;
	}

}
