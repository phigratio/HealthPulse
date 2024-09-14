package com.healthpulse.EcommerceAgain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthpulse.EcommerceAgain.entities.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
}

