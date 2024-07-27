package com.healthpulse.PostSection.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.PostSection.entities.Comment;

public interface CommentRepo  extends JpaRepository<Comment	, Integer> {

	Optional<Comment> findById(Integer commentId);

}