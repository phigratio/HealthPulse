package com.healthpulse.EcommerceAgain.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class OrderDto {

    private int orderId;
    private List<OrderItemDto> orderItems;
    private LocalDateTime orderDate;
    private Float totalPrice;
    private String status;
}
