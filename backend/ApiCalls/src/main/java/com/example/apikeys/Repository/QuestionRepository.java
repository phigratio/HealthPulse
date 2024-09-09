package com.example.apikeys.Repository;



import com.example.apikeys.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;


public interface QuestionRepository extends JpaRepository<Question, Long> {
}

