package com.healthpulse.EcommerceAgain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.healthpulse.EcommerceAgain.entities.Product;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    List<Product> findByChemicalName(String chemicalName);

    List<Product> findByCompanyName(String companyName);

    List<Product> findByPriceBetween(Float minPrice, Float maxPrice);

    List<Product> findByDiscountPriceBetween(Float minDiscountPrice, Float maxDiscountPrice);

    List<Product> findByProductNameContaining(String keyword);

    List<Product> findByWeight(Float weight);

    List<Product> findByChemicalNameAndCompanyName(String chemicalName, String companyName);

    @Query("SELECT DISTINCT p.chemicalName FROM Product p")
    List<String> findAllDistinctChemicalNames();

    @Query("SELECT DISTINCT p.companyName FROM Product p")
    List<String> findAllDistinctCompanyNames();
}