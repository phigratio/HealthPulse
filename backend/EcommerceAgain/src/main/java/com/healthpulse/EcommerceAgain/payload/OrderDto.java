package com.healthpulse.EcommerceAgain.payload;

import lombok.Data;

import java.util.List;

@Data
public class OrderDto {
    private int orderId;
    private int userId;
    private List<OrderItemDto> orderItems;
    private String status;
    private float totalPrice;
}