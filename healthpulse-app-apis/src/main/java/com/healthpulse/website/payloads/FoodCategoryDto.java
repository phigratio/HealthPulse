package com.healthpulse.website.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class FoodCategoryDto {

    private Integer foodCategoryId;

    @NotBlank(message = "Category title cannot be empty")
    @Size(min = 4, message = "Min size of category title is 4")
    private String foodCategoryTitle;

    @NotBlank(message = "Category description cannot be empty")
    @Size(min = 10, message = "Min size of category description is 10")
    private String categoryDescription;
}
