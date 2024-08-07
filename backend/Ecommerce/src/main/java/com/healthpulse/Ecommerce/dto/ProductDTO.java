package com.healthpulse.Ecommerce.dto;

import java.time.LocalDate;
import java.util.Set;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductDTO {

    private Long id;
    private String title;
    private String description;
    private int price;
    private int discountPrice;
    private int discountPercentage;
    private int quantity;
    private String brand;
    private Set<PowerDTO> powers;
    private String imageUrl;
    private LocalDate createdOn;
    private Long topLevelCategoryId;
    private Long secondLevelCategoryId;
    private Long thirdLevelCategoryId;
}
