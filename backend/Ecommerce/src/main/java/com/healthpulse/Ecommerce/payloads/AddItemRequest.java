package com.healthpulse.Ecommerce.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddItemRequest {
	
	private Long productId;
	
	private String power;
	
	private int quantity;
	
	private Integer price;

}
