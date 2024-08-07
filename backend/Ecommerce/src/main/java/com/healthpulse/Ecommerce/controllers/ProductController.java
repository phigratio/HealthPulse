package com.healthpulse.Ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.Ecommerce.dto.ProductDTO;
import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.services.ProductService;

@RestController
@RequestMapping("/ecommerce/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
        return productService.createProduct(productDTO);
    }

    @GetMapping("/{id}")
    public ProductDTO getProductById(@PathVariable ("id") Long id) {
        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public ProductDTO updateProduct(@PathVariable ("id") Long id, @RequestBody ProductDTO productDTO) {
        return productService.updateProduct(id, productDTO);
    }

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable ("id") Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/category/{category}")
    public List<ProductDTO> getProductsByCategory(@PathVariable ("category") String category) {
        return productService.getProductsByCategory(category);
    }

    @GetMapping("/filter")
    public List<ProductDTO> filterProducts(@RequestParam ("keyword") String keyword) {
        return productService.filterProducts(keyword);
    }
    
    
    @GetMapping("/multi-filter")
    public List<ProductDTO> filterProductsByCategoryAndPrice(
            @RequestParam(value = "category", defaultValue = "") String category,
            @RequestParam(value = "minPrice", required = false) Integer minPrice,
            @RequestParam(value = "maxPrice", required = false) Integer maxPrice,
            @RequestParam(value = "minDiscount", required = false) Integer minDiscount,
            @RequestParam(value = "sort", defaultValue = "price_low") String sort) {

        return productService.filterProductsByCategoryAndPrice(category, minPrice, maxPrice, minDiscount, sort);
    }

    

    
 }
