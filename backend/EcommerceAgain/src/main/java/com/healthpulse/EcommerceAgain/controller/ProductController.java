package com.healthpulse.EcommerceAgain.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import com.healthpulse.EcommerceAgain.payload.ApiResponse;
import com.healthpulse.EcommerceAgain.payload.ProductDto;
import com.healthpulse.EcommerceAgain.services.ProductService;

@RestController
@RequestMapping("/ecommerce/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Create a new product
    @PostMapping("/add")
    public ResponseEntity<ProductDto> createProduct(@RequestPart("productDto") String productDtoJson,
                                                    @RequestPart(required = false) MultipartFile img) throws IOException {
        // Deserialize JSON string to ProductDto
        ObjectMapper objectMapper = new ObjectMapper();
        ProductDto productDto = objectMapper.readValue(productDtoJson, ProductDto.class);

        // Handle image file (optional)
        if (img != null && !img.isEmpty()) {
            productDto.setImg(img.getBytes());
        }

        ProductDto savedProduct = productService.createProduct(productDto);
        return ResponseEntity.ok(savedProduct);
    }


    // Get product by ID
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("productId") Integer productId) {
        ProductDto productDto = productService.getProductById(productId);
        return ResponseEntity.ok(productDto);
    }

    // Get all products
    @GetMapping("/")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // Update a product
    @PutMapping("/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("productId") Integer productId,
                                                    @RequestPart("productDto") String productDtoJson,
                                                    @RequestPart(required = false) MultipartFile img) throws IOException {
        // Deserialize JSON string to ProductDto
        ObjectMapper objectMapper = new ObjectMapper();
        ProductDto productDto = objectMapper.readValue(productDtoJson, ProductDto.class);

        // Handle image file (optional)
        if (img != null && !img.isEmpty()) {
            productDto.setImg(img.getBytes());
        }

        ProductDto updatedProduct = productService.updateProduct(productDto, productId);
        return ResponseEntity.ok(updatedProduct);
    }


    // Delete a product
    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable("productId") Integer productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok(new ApiResponse("Product deleted successfully"));
    }

    // Search products by chemical name
    @GetMapping("/search/chemicalName/{chemicalName}")
    public ResponseEntity<List<ProductDto>> searchByChemicalName(@PathVariable("chemicalName") String chemicalName) {
        List<ProductDto> products = productService.searchByChemicalName(chemicalName);
        return ResponseEntity.ok(products);
    }

    // Search products by company name
    @GetMapping("/search/companyName/{companyName}")
    public ResponseEntity<List<ProductDto>> searchByCompanyName(@PathVariable("companyName") String companyName) {
        List<ProductDto> products = productService.searchByCompanyName(companyName);
        return ResponseEntity.ok(products);
    }

    // Filter products by price range
    @GetMapping("/filter/price")
    public ResponseEntity<List<ProductDto>> filterByPriceRange(@RequestParam("minPrice") Float minPrice,
                                                               @RequestParam("maxPrice") Float maxPrice) {
        List<ProductDto> products = productService.filterByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    // Get distinct company names
    @GetMapping("/companies")
    public ResponseEntity<List<String>> getDistinctCompanyNames() {
        List<String> companyNames = productService.getDistinctCompanyNames();
        return ResponseEntity.ok(companyNames);
    }

    // Get distinct chemical names
    @GetMapping("/chemicals")
    public ResponseEntity<List<String>> getDistinctChemicalNames() {
        List<String> chemicalNames = productService.getDistinctChemicalNames();
        return ResponseEntity.ok(chemicalNames);
    }
}
