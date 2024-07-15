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


import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class MyConfig {

    private static final Logger logger = LoggerFactory.getLogger(MyConfig.class);

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
            .additionalInterceptors((request, body, execution) -> {
                logger.info("Request URI: {}", request.getURI());
                logger.info("Request Method: {}", request.getMethod());
                logger.info("Request Headers: {}", request.getHeaders());
                logger.info("Request Body: {}", new String(body, StandardCharsets.UTF_8));
                return execution.execute(request, body);
            })
            .build();
    }
}
