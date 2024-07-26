package com.example.ApiGateway.models;

import java.util.Collection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class AuthResponse {
	
	private String id;
	
	private String accessToken;
	
	private String refreshToken;
	
	private long expiresAt;
	
	private Collection<String> authorities;
	

}
