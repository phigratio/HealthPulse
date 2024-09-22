package com.healthpulse.EcommerceAgain.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderItemDto {

    private int orderItemId;
    private ProductDto product;
    private int quantity;
    private Float price;
}
