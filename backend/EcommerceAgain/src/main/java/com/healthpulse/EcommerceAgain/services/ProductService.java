package com.healthpulse.EcommerceAgain.services;

import java.util.List;


import com.healthpulse.EcommerceAgain.payload.ProductDto;


public interface ProductService {

    ProductDto createProduct(ProductDto productDto);

    ProductDto getProductById(Integer productId);

    List<ProductDto> getAllProducts();

    ProductDto updateProduct(ProductDto productDto, Integer productId);

    void deleteProduct(Integer productId);

    List<ProductDto> searchByChemicalName(String chemicalName);

    List<ProductDto> searchByCompanyName(String companyName);

    List<ProductDto> filterByPriceRange(Float minPrice, Float maxPrice);

    List<String> getDistinctCompanyNames();

    List<String> getDistinctChemicalNames();
}
