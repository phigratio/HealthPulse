package com.healthpulse.Ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.healthpulse.Ecommerce.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
