package com.healthpulse.UserSection.config.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2AuthorizeRequest;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.stereotype.Component;

import feign.RequestInterceptor;
import feign.RequestTemplate;



@Configuration
@Component
public class FeignClientInterceptor implements RequestInterceptor {
	
	@Autowired
	public OAuth2AuthorizedClientManager manager;
	
	
	
	@Override
	public void apply (RequestTemplate template) {
		
		String token = manager.authorize(OAuth2AuthorizeRequest.withClientRegistrationId("my-intermal-client").principal("internal").build()).getAccessToken().getTokenValue();
		template.header("Authorization", "Bearer " + token ) ; 
		
	}
	
	
	

}
