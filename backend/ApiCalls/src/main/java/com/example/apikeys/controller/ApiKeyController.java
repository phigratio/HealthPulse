package com.example.apikeys.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/config")
public class ApiKeyController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${weather.api.key}")
    private String weatherApiKey;

    @Value("${speechToText.api.key}")
    private String speechToTextApiKey;

    @Value("${textToSpeech.api.key}")
    private String textToSpeechApiKey;

    @Value("${maps.api.key}")
    private String mapsApiKey;

    @Value("${vision.api.key}")
    private String visionApiKey;

    @Value("${news.api.key}")
    private String newsApiKey;

    @GetMapping("/apiKeys")
    public Map<String, String> getApiKeys() {
        return Map.of(
                "geminiApiKey", geminiApiKey,
                "weatherApiKey", weatherApiKey,
                "speechToTextApiKey", speechToTextApiKey,
                "textToSpeechApiKey", textToSpeechApiKey,
                "mapsApiKey", mapsApiKey,
                "visionApiKey", visionApiKey,
                "newsApiKey", newsApiKey
        );
    }
}
