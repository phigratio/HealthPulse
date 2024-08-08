package com.healthpulse.Ecommerce.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.healthpulse.Ecommerce.entities.Category;
import com.healthpulse.Ecommerce.entities.Product;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

	Optional<Category> findByName(String topLavelCategory);
}
