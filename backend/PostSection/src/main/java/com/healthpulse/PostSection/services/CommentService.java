package com.healthpulse.PostSection.services;

import com.healthpulse.PostSection.payloads.CommentDto;

public interface CommentService {
	
	CommentDto createComment(CommentDto commentDto, Integer postId);

	void deleteComment(Integer commentId);

}
