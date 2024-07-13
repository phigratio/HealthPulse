package com.healthpulse.RatingSection.payload;

import org.springframework.http.HttpStatus;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse {
	private String message;
	private boolean success;
	private HttpStatus status;
}
