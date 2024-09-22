package com.healthpulse.EcommerceAgain.payload;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ProductDto {
    private int productId;
    private String productName;
    private String description;
    private Float price;
    private Float discountPrice;
    private String chemicalName;
    private String companyName;
    private List<PowerDto> power;
    private Float weight;
    private int quantity;
    private byte[] img;
}
