package com.healthpulse.website.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.website.entities.Food;
import com.healthpulse.website.entities.FoodCategory;

public interface FoodRepo extends JpaRepository<Food, Integer> {
    List<Food> findByFoodCategory(FoodCategory foodCategory);

    @Query("select f from Food f where f.name like :key")
    List<Food> searchByName(@Param("key") String name);
}
