package com.healthpulse.Ecommerce.services;

import java.util.List;





import com.healthpulse.Ecommerce.dto.ProductDTO;


public interface ProductService {

    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO getProductById(Long id);
    
    
    ProductDTO updateProduct(Long productId, ProductDTO productDTO);
    
    
    List<ProductDTO> getProductsByCategory(String category);

    List<ProductDTO> getAllProducts();

    void deleteProduct(Long id);

    List<ProductDTO> filterProducts(String keyword);
    
    List<ProductDTO> filterProductsByCategoryAndPrice(String category, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort);


    
    
}