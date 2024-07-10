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

    private String name;

    private String description;

    private String ingredients;

    private Float proteinPercentage;

    private Float fatPercentage;

    private Float calories;

    private String notSuitableFor;
    
    private Date addedDate;

    private FoodCategoryDto foodCategory;
}
