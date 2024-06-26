package com.healthpulse.website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.website.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {

}