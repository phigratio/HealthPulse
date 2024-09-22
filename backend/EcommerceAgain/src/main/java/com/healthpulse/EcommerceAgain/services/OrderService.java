package com.healthpulse.EcommerceAgain.services;

import com.healthpulse.EcommerceAgain.payload.OrderDto;

import java.util.List;

public interface OrderService {

    OrderDto placeOrder(int cartId);

    OrderDto getOrderById(int orderId);

    List<OrderDto> getAllOrders();
}
