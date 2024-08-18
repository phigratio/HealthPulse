package com.healthpulse.Ecommerce.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.payloads.CreateProductRequest;

public interface ProductService {

    Product createProduct(CreateProductRequest createProductRequest);

    Product updateProduct(Long productId, CreateProductRequest updateProductRequest);

    Product getProductById(Long productId);

    //Page<Product> getAllProducts(String category, List<String> color, List<String> size, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize);

    //Page<Product> getAllProducts(String category, List<String> power, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize);
    
    List<Product> getProductsByCategory(String categoryName);

    void deleteProduct(Long productId);

    List<Product> filterProducts(String keyword);

    //List<Product> filterProductsByCategoryAndPrice(String categoryName, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort);

    Product findProductById(Long productId);

	List<Product> getAllProducts();
	
	Page<Product> getAllProducts(String category, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize);


}
