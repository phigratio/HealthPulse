package com.healthpulse.Ecommerce.payloads;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor

public class ReviewRequest {
	
	private Long productId;
	
	private String review;

}
