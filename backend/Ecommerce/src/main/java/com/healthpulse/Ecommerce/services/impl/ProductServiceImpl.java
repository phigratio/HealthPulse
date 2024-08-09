package com.healthpulse.Ecommerce.services.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthpulse.Ecommerce.entities.Category;
import com.healthpulse.Ecommerce.entities.Power;
import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.payloads.CreatePowerRequest;
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

//    @Override
//    public Product createProduct(CreateProductRequest createProductRequest) {
//        Product product = convertCreateProductRequestToEntity(createProductRequest);
//        return productRepository.save(product);
//    }
    
    public Product createProduct(CreateProductRequest request) {
        Product product = new Product();
        int a = request.getPrice();
        int b = request.getDiscountedPrice();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountedPrice());
        product.setDiscountPercentage(((a - b) * 100) / a);
        product.setQuantity(request.getQuantity());
        product.setBrand(request.getBrand());
        product.setImageUrl(request.getImageUrl());
        product.setCreatedOn(LocalDateTime.now());

        // Set categories
        Category topLevelCategory = categoryRepository.findById(request.getTopLevelCategoryId()).orElse(null);
        Category secondLevelCategory = categoryRepository.findById(request.getSecondLevelCategoryId()).orElse(null);
        Category thirdLevelCategory = categoryRepository.findById(request.getThirdLevelCategoryId()).orElse(null);

        product.setTopLevelCategory(topLevelCategory);
        product.setSecondLevelCategory(secondLevelCategory);
        product.setThirdLevelCategory(thirdLevelCategory);

        // Set powers
        for (CreatePowerRequest powerRequest : request.getPowers()) {
            Power power = new Power();
            power.setName(powerRequest.getName());
            power.setQuantity(powerRequest.getQuantity());
            power.setProduct(product); // Associate power with the product
            product.getPowers().add(power); // Add power to the product's set of powers
        }

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

//    @Override
//    public List<Product> filterProductsByCategoryAndPrice(String categoryName, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort) {
//        return productRepository.filterProductsByCategoryAndPrice(categoryName, minPrice, maxPrice, minDiscount, sort);
//    }

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
        product.setCreatedOn(LocalDateTime.now());
        
        

        // Set categories
//        Category topLevelCategory = categoryRepository.findByName(request.getTopLavelCategory()).orElse(null);
//        Category secondLevelCategory = categoryRepository.findByName(request.getSecondLavelCategory()).orElse(null);
//        Category thirdLevelCategory = categoryRepository.findByName(request.getThirdLavelCategory()).orElse(null);
        
        Category topLevelCategory = categoryRepository.findById(request.getTopLevelCategoryId()).orElse(null);
        Category secondLevelCategory = categoryRepository.findById(request.getSecondLevelCategoryId()).orElse(null);
        Category thirdLevelCategory = categoryRepository.findById(request.getThirdLevelCategoryId()).orElse(null);
        
        
        product.setTopLevelCategory(topLevelCategory);
        product.setSecondLevelCategory(secondLevelCategory);
        product.setThirdLevelCategory(thirdLevelCategory);
        
        
        for (CreatePowerRequest powerRequest : request.getPowers()) {
            Power power = new Power();
            power.setName(powerRequest.getName());
            power.setQuantity(powerRequest.getQuantity());
            power.setProduct(product); // Set the product reference in Power
            product.getPowers().add(power); // Add power to product's power set
        }
        

        
        return productRepository.save(product);
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
//        Category topLevelCategory = categoryRepository.findByName(request.getTopLavelCategory()).orElse(null);
//        Category secondLevelCategory = categoryRepository.findByName(request.getSecondLavelCategory()).orElse(null);
//        Category thirdLevelCategory = categoryRepository.findByName(request.getThirdLavelCategory()).orElse(null);
        
        Category topLevelCategory = categoryRepository.findById(request.getTopLevelCategoryId()).orElse(null);
        Category secondLevelCategory = categoryRepository.findById(request.getSecondLevelCategoryId()).orElse(null);
        Category thirdLevelCategory = categoryRepository.findById(request.getThirdLevelCategoryId()).orElse(null);
        
        product.setTopLevelCategory(topLevelCategory);
        product.setSecondLevelCategory(secondLevelCategory);
        product.setThirdLevelCategory(thirdLevelCategory);
    }

//    @Override
//    public Page<Product> getAllProducts(String category, List<String> color, List<String> size, 
//                                        Integer minPrice, Integer maxPrice, Integer minDiscount, 
//                                        String sort, String stock, Integer pageNumber, Integer pageSize) {
//
//        // Define the Pageable object for pagination and sorting
//        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sort));
//
//        // Fetch products using the repository method with the applied filters
//        return productRepository.findProductsByFilters(category, color, size, minPrice, maxPrice, 
//                                                       minDiscount, stock, pageable);
//    }
    
//    @Override
//    public Page<Product> getAllProducts(String category, List<String> power, 
//                                        Integer minPrice, Integer maxPrice, 
//                                        Integer minDiscount, String sort, 
//                                        String stock, Integer pageNumber, Integer pageSize) {
//
//        // Define the Pageable object for pagination and sorting
//        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sort));
//
//        // Fetch products using the repository method with the applied filters
//        return productRepository.findProductsByFilters(category, power, minPrice, maxPrice, 
//                                                       minDiscount, pageable);
//    }

    
//    @Override
//    public Page<Product> getAllProducts(String category, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {
//        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sort));
//        return productRepository.filterProductsByCategoryAndPrice(category, minPrice, maxPrice, minDiscount, sort, pageable);
//    }

    
    @Override
    @Transactional(readOnly = true)
    public Page<Product> getAllProducts(String category, Integer minPrice, Integer maxPrice,
                                         Integer minDiscount, String sort, String stock,
                                         Integer pageNumber, Integer pageSize) {

        Pageable pageable;
        
        if (sort != null && !sort.isEmpty()) {
            // Create a Sort object based on the sort parameter
            Sort sortOrder = Sort.by(Sort.Order.asc(sort)); // Default sort direction is ascending
            pageable = PageRequest.of(pageNumber, pageSize, sortOrder);
        } else {
            // Default sorting
            pageable = PageRequest.of(pageNumber, pageSize);
        }
        
        return productRepository.filterProductsByCategoryAndPrice(category, minPrice, maxPrice, minDiscount, sort, pageable);
    }


}
