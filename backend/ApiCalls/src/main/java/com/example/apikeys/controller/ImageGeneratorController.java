package com.example.apikeys.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.util.Collections;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*") // Enable CORS for all origins // Optional base path for your API
public class ImageGeneratorController {

    private static final String CLOUD_FLARE_URL = "https://api.cloudflare.com/client/v4/accounts/f085f9e010c1daeebe34f677fb3c2284/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0 ";
    private static final String AUTHORIZATION_TOKEN = "C2NwKK9VP3FGAWgCgGvsBpDEmj2ssIZ3p_oCgThb";

    @PostMapping("/generate-image")
    public ResponseEntity<?> generateImage(@RequestBody PromptRequest request) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Prepare headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(AUTHORIZATION_TOKEN);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_OCTET_STREAM));

            // Prepare the body
            Map<String, String> body = Collections.singletonMap("prompt", request.getPrompt());

            // Create HTTP entity with headers and body
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

            // Make the request to Cloudflare API
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    CLOUD_FLARE_URL,
                    HttpMethod.POST,
                    entity,
                    byte[].class
            );

            // Check if response is successful
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.setContentType(MediaType.IMAGE_PNG);
                return new ResponseEntity<>(response.getBody(), responseHeaders, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to generate image from Cloudflare API.");
            }

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            // Handle HTTP errors
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while generating the image.");
        }
    }
}

class PromptRequest {
    private String prompt;

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}
