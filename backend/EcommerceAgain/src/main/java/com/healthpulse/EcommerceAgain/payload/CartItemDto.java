package com.healthpulse.EcommerceAgain.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartItemDto {

    private int cartItemId;
    private ProductDto product;
    private int quantity;
    private Float price;
}
