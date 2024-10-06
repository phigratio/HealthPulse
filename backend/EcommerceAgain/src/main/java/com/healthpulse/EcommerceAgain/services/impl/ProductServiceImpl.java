package com.healthpulse.EcommerceAgain.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;
import com.healthpulse.EcommerceAgain.entities.Product;
import com.healthpulse.EcommerceAgain.payload.ProductDto;
import com.healthpulse.EcommerceAgain.repositories.ProductRepo;
import com.healthpulse.EcommerceAgain.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepo productRepo;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);
        product.setImg(compressBytes(productDto.getImg()));

        Product savedProduct = productRepo.save(product);
        savedProduct.setImg(null);
        return modelMapper.map(savedProduct, ProductDto.class);
    }

    @Override
    public ProductDto getProductById(Integer productId) {
        Product product = productRepo.findById(productId).orElseThrow();
        product.setImg(decompressBytes(product.getImg()));
        return modelMapper.map(product, ProductDto.class);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepo.findAll();
        return products.stream()
                .map(product -> {
                    ProductDto productDto = modelMapper.map(product, ProductDto.class);
                    if (product.getImg() != null) {
                        productDto.setImg(decompressBytes(product.getImg()));
                    }
                    return productDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto, Integer productId) {
        Product existingProduct = productRepo.findById(productId).orElseThrow();
        existingProduct.setProductName(productDto.getProductName());
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setDiscountPrice(productDto.getDiscountPrice());
        existingProduct.setChemicalName(productDto.getChemicalName());
        existingProduct.setCompanyName(productDto.getCompanyName());
        existingProduct.setWeight(productDto.getWeight());
        existingProduct.setImg(compressBytes(productDto.getImg()));
        existingProduct.setQuantity(productDto.getQuantity());

        Product updatedProduct = productRepo.save(existingProduct);
        return modelMapper.map(updatedProduct, ProductDto.class);
    }

    @Override
    public void deleteProduct(Integer productId) {
        productRepo.deleteById(productId);
    }

    @Override
    public List<ProductDto> searchByChemicalName(String chemicalName) {
        List<Product> products = productRepo.findByChemicalName(chemicalName);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> searchByCompanyName(String companyName) {
        List<Product> products = productRepo.findByCompanyName(companyName);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> filterByPriceRange(Float minPrice, Float maxPrice) {
        List<Product> products = productRepo.findByPriceBetween(minPrice, maxPrice);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<String> getDistinctCompanyNames() {
        return productRepo.findAllDistinctCompanyNames();
    }

    @Override
    public List<String> getDistinctChemicalNames() {
        return productRepo.findAllDistinctChemicalNames();
    }


    private byte[] compressBytes(byte[] data) {
        if (data == null) return null;
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        return outputStream.toByteArray();
    }

    private byte[] decompressBytes(byte[] data) {
        if (data == null) return null;
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
        } catch (DataFormatException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();
    }
}