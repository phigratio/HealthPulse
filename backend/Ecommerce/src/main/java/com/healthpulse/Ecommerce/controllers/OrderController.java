package com.healthpulse.Ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulse.Ecommerce.entities.Address;
import com.healthpulse.Ecommerce.entities.Order;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.services.OrderService;
import com.healthpulse.Ecommerce.services.UserService;

@RestController
@RequestMapping("/ecommerce/orders")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/user/{userId}")
	public ResponseEntity<Order> createOrder(@PathVariable("userId") int userId , @RequestBody Address address) {
		User user = userService.getUserById(userId);
		Order order = orderService.createOrder(user, address);

		return new ResponseEntity<Order>(order, HttpStatus.CREATED);
	}
	
	
	
	
	
	
	
}
