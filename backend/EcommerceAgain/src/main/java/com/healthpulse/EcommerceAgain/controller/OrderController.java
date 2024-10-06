package com.healthpulse.EcommerceAgain.controller;

import com.healthpulse.EcommerceAgain.payload.OrderDto;
import com.healthpulse.EcommerceAgain.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<OrderDto>> getOrdersByUserId(@PathVariable ("userId") int userId) {
        List<OrderDto> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/{userId}/place")
    public ResponseEntity<OrderDto> placeOrder(@PathVariable ("userId") int userId) {
        OrderDto placedOrder = orderService.placeOrder(userId);
        return ResponseEntity.ok(placedOrder);
    }
}
