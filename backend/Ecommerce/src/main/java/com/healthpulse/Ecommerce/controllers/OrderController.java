package com.healthpulse.Ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Order>> userOrderHistory(@PathVariable("userId") int userId) {
		User user = userService.getUserById(userId);
		List<Order> orders = orderService.userOrderHistory(user.getId());

		return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
	}
	
	
	//find order by id
	
	@GetMapping("/{orderId}")
	public ResponseEntity<Order> findOrderById(@PathVariable("orderId") Long orderId) {
		Order order = orderService.findOrderById(orderId);
		return new ResponseEntity<Order>(order, HttpStatus.OK);
	}
	
	
	
	
	
	
}
