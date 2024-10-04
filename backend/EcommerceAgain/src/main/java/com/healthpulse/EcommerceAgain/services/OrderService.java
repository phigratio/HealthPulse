package com.healthpulse.EcommerceAgain.services;

import com.healthpulse.EcommerceAgain.payload.OrderDto;

import java.util.List;

public interface OrderService {

    List<OrderDto> getOrdersByUserId(int userId);

    OrderDto placeOrder(int userId);
}