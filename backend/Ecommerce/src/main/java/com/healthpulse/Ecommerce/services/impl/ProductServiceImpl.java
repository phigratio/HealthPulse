package com.healthpulse.Ecommerce.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import org.springframework.data.domain.Pageable;

import com.healthpulse.Ecommerce.dto.ProductDTO;
import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.repositories.ProductRepository;
import com.healthpulse.Ecommerce.services.ProductService;
import com.healthpulse.Ecommerce.utils.ModelMapperUtil;  // Custom utility class for mapping DTOs

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapperUtil modelMapperUtil;

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = modelMapperUtil.convertToEntity(productDTO, Product.class);
        Product savedProduct = productRepository.save(product);
        return modelMapperUtil.convertToDTO(savedProduct, ProductDTO.class);
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(p -> modelMapperUtil.convertToDTO(p, ProductDTO.class)).orElse(null);
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        if (!productRepository.existsById(productId)) {
            return null;
        }
        Product product = modelMapperUtil.convertToEntity(productDTO, Product.class);
        product.setId(productId);
        Product updatedProduct = productRepository.save(product);
        return modelMapperUtil.convertToDTO(updatedProduct, ProductDTO.class);
    }

    @Override
    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategory(category).stream()
                .map(product -> modelMapperUtil.convertToDTO(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> modelMapperUtil.convertToDTO(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductDTO> filterProducts(String keyword) {
        return productRepository.findByKeyword(keyword).stream()
                .map(product -> modelMapperUtil.convertToDTO(product, ProductDTO.class))
                .collect(Collectors.toList());
    }
    
    
    @Override
    public List<ProductDTO> filterProductsByCategoryAndPrice(String category, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort) {
        return productRepository.filterProductsByCategoryAndPrice(category, minPrice, maxPrice, minDiscount, sort).stream()
                .map(product -> modelMapperUtil.convertToDTO(product, ProductDTO.class))
                .collect(Collectors.toList());
    }
    
    



}
