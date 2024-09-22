package com.healthpulse.EcommerceAgain.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CartDto {

    private int cartId;
    private List<CartItemDto> cartItems;
    private Float totalPrice;
}
