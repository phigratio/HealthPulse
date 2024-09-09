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

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*") // Enable CORS for all origins
public class TranslationController {

    private static final String CLOUD_FLARE_URL = "https://api.cloudflare.com/client/v4/accounts/f085f9e010c1daeebe34f677fb3c2284/ai/run/@cf/meta/m2m100-1.2b";
    private static final String AUTHORIZATION_TOKEN = "C2NwKK9VP3FGAWgCgGvsBpDEmj2ssIZ3p_oCgThb";

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/generate-recommendation")
    public ResponseEntity<?> generateRecommendation(@RequestBody String text) {
        try {
            String translatedText = translateText(text);
            return ResponseEntity.ok(Map.of("translatedRecommendation", translatedText));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while translating the text.");
        }
    }

    private String translateText(String text) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(AUTHORIZATION_TOKEN);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("text", text);
            requestBody.put("source_lang", "en");  // Assuming English as the source language
            requestBody.put("target_lang", "bn");  // "bn" is the language code for Bengali

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    CLOUD_FLARE_URL,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return (String) response.getBody().get("translated_text");
            } else {
                throw new RuntimeException("Failed to translate text.");
            }

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new RuntimeException("Translation service error: " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("An unexpected error occurred while translating text.", e);
        }
    }
}