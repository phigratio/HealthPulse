package com.healthpulse.PostSection.services;

import java.util.List;

import com.healthpulse.PostSection.payloads.PostDto;
import com.healthpulse.PostSection.payloads.PostResponse;

public interface PostService {
	
	//create 

		PostDto createPost(PostDto postDto,String userId,String categoryId);

		//update 

		PostDto updatePost(PostDto postDto, Integer postId);

		// delete

		void deletePost(Integer postId);
		
		//get all posts
		
		PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy,String sortDir);
		
		//get single post
		
		PostDto getPostById(Integer postId);
		
		//get all posts by category
		
		List<PostDto> getPostsByCategory(String categoryId);
		
//		get all posts by user
		List<PostDto> getPostsByUserId(String userId);
		
		//search posts
		List<PostDto> searchPosts(String keyword);

}
