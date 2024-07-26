package com.example.ApiGateway.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ApiGateway.models.AuthResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	
	@GetMapping("/login")
	public ResponseEntity<AuthResponse>login( 
			@RegisteredOAuth2AuthorizedClient("okta")  OAuth2AuthorizedClient authorizedClient,
			@AuthenticationPrincipal OidcUser user,
			Model model) {
		
		logger.info("User email : " + user.getEmail());
		
		AuthResponse authResponse = new AuthResponse();
		
		authResponse.setId(user.getEmail());
		authResponse.setAccessToken(authorizedClient.getAccessToken().getTokenValue());
		
		authResponse.setRefreshToken(authorizedClient.getRefreshToken().getTokenValue());
		
		authResponse.setExpiresAt(authorizedClient.getAccessToken().getExpiresAt().getEpochSecond());
		
		List <String> authorities = user.getAuthorities().stream().map(grantedAuthority -> {
            return grantedAuthority.getAuthority();
		}).collect(Collectors.toList());
		
		authResponse.setAuthorities(authorities);
		
		return new ResponseEntity<>(authResponse , HttpStatus.OK);
	
		
	}
	
}
