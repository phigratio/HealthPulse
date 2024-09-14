package com.healthpulse.EcommerceAgain.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.healthpulse.EcommerceAgain.payload.ProductDto;

@Service
public interface ProductService {

    //create
    ProductDto CreateProduct(ProductDto productDto);

    //read
    ProductDto ReadProduct(Integer ProductId);


    //readAll
    List<ProductDto> ReadAllProduct();


    //delete
    void DeleteProduct(Integer productId);


    //update
    ProductDto UpdateProduct(ProductDto productDto,Integer ProductId);



}