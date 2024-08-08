package com.healthpulse.Ecommerce.services;

import java.util.List;

import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.payloads.CreateProductRequest;

public interface ProductService {

    Product createProduct(CreateProductRequest createProductRequest);

    Product updateProduct(Long productId, CreateProductRequest updateProductRequest);

    Product getProductById(Long productId);

    List<Product> getAllProducts();

    List<Product> getProductsByCategory(String categoryName);

    void deleteProduct(Long productId);

    List<Product> filterProducts(String keyword);

    List<Product> filterProductsByCategoryAndPrice(String categoryName, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort);

    Product findProductById(Long productId);
}
