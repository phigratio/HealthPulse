package com.healthpulse.PostSection.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.PostSection.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, String> {

}