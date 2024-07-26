package com.healthpulse.UserSection.config;
//
//import org.springframework.cloud.client.loadbalancer.LoadBalanced;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.client.RestTemplate;
//
//@Configuration
//public class MyConfig {
//	
//	
//	@Bean
//	@LoadBalanced
//	public RestTemplate restTemplate() {
//        return new RestTemplate();
//    }
//
//}


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProvider;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProviderBuilder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.web.client.RestTemplate;

import com.healthpulse.UserSection.config.interceptor.RestTemplateInterceptor;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class MyConfig {

    private static final Logger logger = LoggerFactory.getLogger(MyConfig.class);

//    @Bean
//    @LoadBalanced
//    public RestTemplate restTemplate(RestTemplateBuilder builder) {
//        return builder
//            .additionalInterceptors((request, body, execution) -> {
//                logger.info("Request URI: {}", request.getURI());
//                logger.info("Request Method: {}", request.getMethod());
//                logger.info("Request Headers: {}", request.getHeaders());
//                logger.info("Request Body: {}", new String(body, StandardCharsets.UTF_8));
//                return execution.execute(request, body);
//            })
//            .build();
//    }
    
    
    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;
    
    @Autowired
    private OAuth2AuthorizedClientRepository oAuth2AuthorizedClientRepository;
    
    
    @Bean
    @LoadBalanced
	public RestTemplate restTemplate() {
    	
    	RestTemplate restTemplate = new RestTemplate();
    	
    	List<ClientHttpRequestInterceptor> interceptors = new ArrayList<>();
    	
    	interceptors.add(new RestTemplateInterceptor(manager(
    		clientRegistrationRepository,oAuth2AuthorizedClientRepository				    			
    	)));
		
		restTemplate.setInterceptors(interceptors);

		return restTemplate;
	}
    
    
    // declare the bean of OAutho2AuthorizedClient manager
    @Bean
    public OAuth2AuthorizedClientManager manager(
    		ClientRegistrationRepository clientRegistrationRepository,
    		OAuth2AuthorizedClientRepository oAuth2AuthorizedClientRepository 
    		
    ) {
    	
		OAuth2AuthorizedClientProvider provider = OAuth2AuthorizedClientProviderBuilder.builder().clientCredentials().build();
		
    	DefaultOAuth2AuthorizedClientManager defaultOAuth2AuthorizedClientManager = new DefaultOAuth2AuthorizedClientManager(clientRegistrationRepository, oAuth2AuthorizedClientRepository);
    	
    	defaultOAuth2AuthorizedClientManager.setAuthorizedClientProvider(provider);
    	
    	return defaultOAuth2AuthorizedClientManager;
    	
    	
    	
    	
    }
}
