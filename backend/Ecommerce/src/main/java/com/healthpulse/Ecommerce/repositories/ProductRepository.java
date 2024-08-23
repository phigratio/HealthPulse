package com.healthpulse.Ecommerce.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.Ecommerce.dto.ProductDTO;
import com.healthpulse.Ecommerce.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.topLevelCategory.name = :category OR p.secondLevelCategory.name = :category OR p.thirdLevelCategory.name = :category")
    List<Product> findByCategory(@Param("category") String category);
    
    @Query("SELECT p FROM Product p WHERE p.title LIKE %:keyword% OR p.description LIKE %:keyword%")
    List<Product> findByKeyword(@Param("keyword") String keyword);
    
//    @Query("SELECT p FROM Product p " +
//           "WHERE (:category = '' OR p.topLevelCategory.name = :category OR p.secondLevelCategory.name = :category OR p.thirdLevelCategory.name = :category) " +
//           "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.price BETWEEN :minPrice AND :maxPrice)) " +
//           "AND (:minDiscount IS NULL OR p.discountPercentage >= :minDiscount) " +
//           "ORDER BY " +
//           "CASE WHEN :sort = 'price_low' THEN p.price END ASC, " +
//           "CASE WHEN :sort = 'price_high' THEN p.price END DESC")
//    List<Product> filterProductsByCategoryAndPrice(
//           @Param("category") String category,
//           @Param("minPrice") Integer minPrice,
//           @Param("maxPrice") Integer maxPrice,
//           @Param("minDiscount") Integer minDiscount,
//           @Param("sort") String sort);
//
//    @Query("SELECT p FROM Product p WHERE " +
//            "(p.topLevelCategory.name = :category OR p.secondLevelCategory.name = :category OR p.thirdLevelCategory.name = :category) AND " +
//            "(:brands IS NULL OR p.brand IN :brands) AND " +
//            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
//            "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " )
//     Page<Product> findProductsByFilters(
//         @Param("category") String category,
//         @Param("brands") List<String> brands,
//         @Param("minPrice") Integer minPrice,
//         @Param("maxPrice") Integer maxPrice,
//         Pageable pageable);
    
    @Query("SELECT p FROM Product p " +
    	       "WHERE (:category IS NULL OR :category = '' OR p.topLevelCategory.name = :category OR p.secondLevelCategory.name = :category OR p.thirdLevelCategory.name = :category) " +
    	       "AND (:minPrice IS NULL OR :maxPrice IS NULL OR p.price BETWEEN :minPrice AND :maxPrice) " +
    	       "AND (:minDiscount IS NULL OR p.discountPercentage >= :minDiscount) " +
    	       "ORDER BY " +
    	       "CASE WHEN :sort = 'price_low' THEN p.price END ASC, " +
    	       "CASE WHEN :sort = 'price_high' THEN p.price END DESC, " +
    	       "CASE WHEN :sort = 'rating' THEN (SELECT AVG(r.rating) FROM p.ratings r) END DESC")
    	Page<Product> filterProductsByCategoryAndPrice(
    	       @Param("category") String category,
    	       @Param("minPrice") Integer minPrice,
    	       @Param("maxPrice") Integer maxPrice,
    	       @Param("minDiscount") Integer minDiscount,
    	       @Param("sort") String sort,
    	       Pageable pageable);

    

}
