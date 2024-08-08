package com.healthpulse.Ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulse.Ecommerce.entities.Order;
import com.healthpulse.Ecommerce.payloads.ApiResponse;
import com.healthpulse.Ecommerce.services.OrderService;

@RestController
@RequestMapping("/ecommerce/admin/order")
public class AdminOrderController {

	@Autowired
	private OrderService orderService;
	
	
	@GetMapping("/")
	public ResponseEntity<List<Order>> getAllOrders() {
		List<Order> orders = orderService.getAllOrders();
		
		return new ResponseEntity<List<Order>>(orders, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/confirmed")
	public ResponseEntity<Order> confirmOrder(@PathVariable("orderId") Long orderId ) {
		
		Order order = orderService.shippedOrder(orderId);
		
		return new ResponseEntity<Order>(order, HttpStatus.ACCEPTED);
		
	}
	
	
	@PutMapping("/{orderId}/shipped")
	public ResponseEntity<Order> shippedOrder(@PathVariable("orderId") Long orderId) {

		Order order = orderService.shippedOrder(orderId);

		return new ResponseEntity<Order>(order, HttpStatus.ACCEPTED);

	}
	
	
	@PutMapping("/{orderId}/delivered")
	public ResponseEntity<Order> deliveredOrder(@PathVariable("orderId") Long orderId) {

		Order order = orderService.deliveredOrder(orderId);

		return new ResponseEntity<Order>(order, HttpStatus.ACCEPTED);

	}
	
	@PutMapping("/{orderId}/canceled")
	public ResponseEntity<Order> cancelOrder(@PathVariable("orderId") Long orderId) {

		Order order = orderService.cancelledOrder(orderId) ;

		return new ResponseEntity<Order>(order, HttpStatus.ACCEPTED);

	}
	
	
	@DeleteMapping("/{orderId}/delete")
	public ResponseEntity<ApiResponse> deleteOrder(@PathVariable("orderId") Long orderId) {

		orderService.deleteOrder(orderId);

        return new ResponseEntity<ApiResponse>(new ApiResponse("Order Deleted Successfully" , true), HttpStatus.ACCEPTED);
	}
	
	
	
}
