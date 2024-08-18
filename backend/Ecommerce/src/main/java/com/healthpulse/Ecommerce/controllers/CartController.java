package com.healthpulse.Ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulse.Ecommerce.entities.Cart;
import com.healthpulse.Ecommerce.payloads.AddItemRequest;
import com.healthpulse.Ecommerce.services.CartService;
import com.healthpulse.Ecommerce.services.UserService;

@RestController
@RequestMapping("/ecommerce/cart")
public class CartController {

	@Autowired
	private CartService cartService;
	
	@Autowired
	private UserService userService;
	
	
	//create cart for user
	
	@PostMapping("/user/{userId}")
	public ResponseEntity<Cart> createCart(@PathVariable("userId") int userId) {
		Cart cart = cartService.createCart(userService.getUserById(userId));
		return new ResponseEntity<Cart>(cart, HttpStatus.CREATED);
	}
	
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<Cart> getCartByUserId(@PathVariable("userId") int userId) {
		Cart cart = cartService.findUserCart(userId);
		return new ResponseEntity<Cart>(cart, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/add/user/{userId}")
	public ResponseEntity<Cart> addItemToCart(@RequestBody AddItemRequest cart , @PathVariable("userId") int userId) {
		Cart cart1 = cartService.addCartItem( userId , cart);
		return new ResponseEntity<Cart>(cart1, HttpStatus.OK);
	}
	
}
