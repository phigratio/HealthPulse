package com.healthpulse.PostSection.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.PostSection.entities.Category;
import com.healthpulse.PostSection.entities.Post;

public interface PostRepo extends JpaRepository<Post, Integer> {

	List<Post> findByUserId(String userId);
	List<Post> findByCategory(Category category);	
	
	@Query("select p from Post p where p.title like :key")
	List<Post> searchByTitle(@Param("key") String title);
	

}