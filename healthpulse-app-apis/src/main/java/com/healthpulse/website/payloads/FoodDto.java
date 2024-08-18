package com.healthpulse.website.payloads;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FoodDto {

    private Integer foodId;
    
    private Float price;

    private String name;

    private String description;

    private String ingredients;
    
    private String imageName;
    
    private Float proteinPercentage;

    private Float fatPercentage;

    private Float calories;

    private String notSuitableFor;
    
    private Date addedDate;

    private FoodCategoryDto foodCategory;
}
