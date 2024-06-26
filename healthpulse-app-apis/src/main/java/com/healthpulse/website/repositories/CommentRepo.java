package com.healthpulse.website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.website.entities.Comment;

public interface CommentRepo  extends JpaRepository<Comment	, Integer> {

}