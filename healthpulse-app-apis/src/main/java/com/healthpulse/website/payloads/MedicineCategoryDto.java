package com.healthpulse.website.payloads;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class MedicineCategoryDto {

	private Integer medicine_categoryId;;
	@NotBlank(message = "Category title can not be empty")
	@Size(min = 4,message = "Min size of category title is 4")
	private String medicine_categoryTitle;

	@NotBlank(message = "Category description can not be empty")
	@Size(min = 10, message = "min size of cateogry desc is 10")
	private String categoryDescription;

}