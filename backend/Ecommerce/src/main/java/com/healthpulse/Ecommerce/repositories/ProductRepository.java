package com.healthpulse.Ecommerce.repositories;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.Ecommerce.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.topLevelCategory.name = ?1 OR p.secondLevelCategory.name = ?1 OR p.thirdLevelCategory.name = ?1")
    List<Product> findByCategory(String category);
    
    @Query("SELECT p FROM Product p WHERE p.title LIKE %?1% OR p.description LIKE %?1%")
    List<Product> findByKeyword(String keyword);
    
    
    @Query("SELECT p FROM Product p " +
    	       "WHERE (:category = '' OR p.topLevelCategory.name = :category OR p.secondLevelCategory.name = :category OR p.thirdLevelCategory.name = :category) " +
    	       "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.price BETWEEN :minPrice AND :maxPrice)) " +
    	       "AND (:minDiscount IS NULL OR p.discountPercentage >= :minDiscount) " +
    	       "ORDER BY " +
    	       "CASE WHEN :sort = 'price_low' THEN p.price END ASC, " +
    	       "CASE WHEN :sort = 'price_high' THEN p.price END DESC")
    	List<Product> filterProductsByCategoryAndPrice(
    	       @Param("category") String category,
    	       @Param("minPrice") Integer minPrice,
    	       @Param("maxPrice") Integer maxPrice,
    	       @Param("minDiscount") Integer minDiscount,
    	       @Param("sort") String sort);



}
