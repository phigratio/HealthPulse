package com.example.apikeys.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiKeyConfig {

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

    public String getGeminiApiKey() {
        return geminiApiKey;
    }

    public String getWeatherApiKey() {
        return weatherApiKey;
    }

    public String getSpeechToTextApiKey() {
        return speechToTextApiKey;
    }

    public String getTextToSpeechApiKey() {
        return textToSpeechApiKey;
    }

    public String getMapsApiKey() {
        return mapsApiKey;
    }

    public String getVisionApiKey() {
        return visionApiKey;
    }

    public String getNewsApiKey() {
        return newsApiKey;
    }
}

