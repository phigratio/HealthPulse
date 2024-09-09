package com.example.apikeys.controller;

import com.example.apikeys.Repository.QuestionRepository;
import com.example.apikeys.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    private Random random = new Random();

    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question question) {
        return questionRepository.save(question);
    }

    @GetMapping("/random")
    public Question getRandomQuestion() {
        List<Question> questions = questionRepository.findAll();
        if (questions.isEmpty()) {
            return null; // Or throw an exception if you prefer
        }
        int randomIndex = random.nextInt(questions.size());
        return questions.get(randomIndex);
    }
}