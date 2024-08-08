package com.healthpulse.Ecommerce.services.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthpulse.Ecommerce.entities.Category;
import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.payloads.CreateProductRequest;
import com.healthpulse.Ecommerce.repositories.CategoryRepository;
import com.healthpulse.Ecommerce.repositories.ProductRepository;
import com.healthpulse.Ecommerce.services.ProductService;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Product createProduct(CreateProductRequest createProductRequest) {
        Product product = convertCreateProductRequestToEntity(createProductRequest);
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long productId, CreateProductRequest updateProductRequest) {
        Optional<Product> existingProductOptional = productRepository.findById(productId);
        if (!existingProductOptional.isPresent()) {
            return null;
        }

        Product product = existingProductOptional.get();
        updateProductEntity(product, updateProductRequest);
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(String categoryName) {
        return productRepository.findByCategory(categoryName);
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public List<Product> filterProducts(String keyword) {
        return productRepository.findByKeyword(keyword);
    }

    @Override
    public List<Product> filterProductsByCategoryAndPrice(String categoryName, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort) {
        return productRepository.filterProductsByCategoryAndPrice(categoryName, minPrice, maxPrice, minDiscount, sort);
    }

    @Override
    public Product findProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    private Product convertCreateProductRequestToEntity(CreateProductRequest request) {
        Product product = new Product();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountedPrice());
        product.setQuantity(request.getQuantity());
        product.setBrand(request.getBrand());
        product.setImageUrl(request.getImageUrl());

        // Set categories
        Category topLevelCategory = categoryRepository.findByName(request.getTopLavelCategory()).orElse(null);
        Category secondLevelCategory = categoryRepository.findByName(request.getSecondLavelCategory()).orElse(null);
        Category thirdLevelCategory = categoryRepository.findByName(request.getThirdLavelCategory()).orElse(null);
        product.setTopLevelCategory(topLevelCategory);
        product.setSecondLevelCategory(secondLevelCategory);
        product.setThirdLevelCategory(thirdLevelCategory);

        product.setCreatedOn(LocalDateTime.now());
        return product;
    }

    private void updateProductEntity(Product product, CreateProductRequest request) {
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountedPrice());
        product.setQuantity(request.getQuantity());
        product.setBrand(request.getBrand());
        product.setImageUrl(request.getImageUrl());

        // Update categories
        Category topLevelCategory = categoryRepository.findByName(request.getTopLavelCategory()).orElse(null);
        Category secondLevelCategory = categoryRepository.findByName(request.getSecondLavelCategory()).orElse(null);
        Category thirdLevelCategory = categoryRepository.findByName(request.getThirdLavelCategory()).orElse(null);
        product.setTopLevelCategory(topLevelCategory);
        product.setSecondLevelCategory(secondLevelCategory);
        product.setThirdLevelCategory(thirdLevelCategory);
    }
}
