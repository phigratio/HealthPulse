package com.healthpulse.Ecommerce.payloads;

import java.util.HashSet;
import java.util.Set;

import com.healthpulse.Ecommerce.entities.Power;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {
	
	private String title;
	
	private String description;
	
	private int price;
	
	private int discountedPrice;
	
	private int quantity;
	
	private String brand;
	
	private Set<CreatePowerRequest> powers = new HashSet<>();

	
	private String imageUrl;
	
	
//	private String topLavelCategory;
//	
//	private String secondLavelCategory;
//	
//	private String thirdLavelCategory;

	private Long topLevelCategoryId;
    private Long secondLevelCategoryId;
    private Long thirdLevelCategoryId;

}
