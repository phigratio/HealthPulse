package com.healthpulse.Ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.payloads.ApiResponse;
import com.healthpulse.Ecommerce.payloads.CreateProductRequest;
import com.healthpulse.Ecommerce.services.ProductService;

@RestController
@RequestMapping("/ecommerce/admin/product")
public class AdminProductController {

	@Autowired
	private ProductService productService;
	
	@PostMapping("/")
	public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest product) {

		Product newProduct = productService.createProduct(product);

		return new ResponseEntity<Product>(newProduct,HttpStatus.CREATED);

	}
	
	
	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponse> deleteProduct(@PathVariable("productId") Long productId) {
		productService.deleteProduct(productId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Product Deleted", true), HttpStatus.OK);
	}

	
	@GetMapping("/all")
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> products = productService.getAllProducts();
		return new ResponseEntity<List<Product>>(products, HttpStatus.ACCEPTED);
	}
	
	
	@PutMapping("/{productId}/update")
	public ResponseEntity<Product> updateProduct(@PathVariable("productId") Long productId,
			@RequestBody CreateProductRequest product) {
		Product updatedProduct = productService.updateProduct(productId, product);
		return new ResponseEntity<Product>(updatedProduct, HttpStatus.ACCEPTED);
	}
	
	//create multiple products
	
	@PostMapping("/creates")
	public ResponseEntity<ApiResponse> createMultipleProducts(@RequestBody CreateProductRequest[] products ) {
		for(CreateProductRequest product : products) {
            productService.createProduct(product);
        }
        return new ResponseEntity<ApiResponse>(new ApiResponse("Products Created", true), HttpStatus.CREATED);
    }
	
}
