package com.healthpulse.PostSection.services.impl;

import com.healthpulse.PostSection.clients.NotificationClient;
import com.healthpulse.PostSection.entities.Notification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.PostSection.entities.Comment;
import com.healthpulse.PostSection.entities.Post;
import com.healthpulse.PostSection.exceptions.ResourceNotFoundException;
import com.healthpulse.PostSection.payloads.CommentDto;
import com.healthpulse.PostSection.repositories.CommentRepo;
import com.healthpulse.PostSection.repositories.PostRepo;
import com.healthpulse.PostSection.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private PostRepo postRepo;

	@Autowired
	private CommentRepo commentRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private NotificationClient notificationClient;

	@Override
	public CommentDto createComment(CommentDto commentDto, Integer postId) {

		Post post = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "post id ", postId));

		Comment comment = this.modelMapper.map(commentDto, Comment.class);

		comment.setPost(post);

		Comment savedComment = this.commentRepo.save(comment);

		Notification noti = new Notification();
		noti.setUserId(Integer.parseInt(post.getUserId()));
		noti.setData("New comment added to your post.");
		notificationClient.createNotification(noti);

		return this.modelMapper.map(savedComment, CommentDto.class);
	}

	@Override
	public void deleteComment(Integer commentId) {

		Comment com = this.commentRepo.findById(commentId)
				.orElseThrow(() -> new ResourceNotFoundException("Comment", "CommentId", commentId));
		this.commentRepo.delete(com);
	}

}