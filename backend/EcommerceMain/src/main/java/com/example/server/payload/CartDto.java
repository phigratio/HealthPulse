package com.example.server.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private int Id;

    private UserDto user;

    private float TotalAmount;

    private List<CartDetailDto> cartDetalis;
}

