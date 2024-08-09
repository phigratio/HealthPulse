package com.healthpulse.Ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.services.ProductService;

@RestController
@RequestMapping("/ecommerce")

public class ProductController {

	@Autowired
	private ProductService productService;
	
	
//	@GetMapping("/products")
//	public ResponseEntity<Page<Product>> findProductByCategoryHandler(
//	        @RequestParam String category,
//	        @RequestParam List<String> color,
//	        @RequestParam List<String> size,
//	        @RequestParam Integer minPrice,
//	        @RequestParam Integer maxPrice,
//	        @RequestParam Integer minDiscount,
//	        @RequestParam String sort,
//	        @RequestParam String stock,
//	        @RequestParam Integer pageNumber,
//	        @RequestParam Integer pageSize) {
//
//	    Page<Product> res = productService.getAllProducts(
//	            category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);
//
//	    System.out.println("Complete products");
//	    return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
//	}
	
	
//	@GetMapping("/products")
//	public ResponseEntity<Page<Product>> findProductByCategoryHandler(
//	        @RequestParam String category,
//	        @RequestParam List<String> power,  // Added power parameter
//	        @RequestParam Integer minPrice,
//	        @RequestParam Integer maxPrice,
//	        @RequestParam Integer minDiscount,
//	        @RequestParam String sort,
//	        @RequestParam String stock,
//	        @RequestParam Integer pageNumber,
//	        @RequestParam Integer pageSize) {
//
//	    Page<Product> res = productService.getAllProducts(
//	            category, power, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);
//
//	    return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
//	}
	
//	@GetMapping("/products")
//	public ResponseEntity<List<Product>> getAllProducts() {
//		List<Product> res = productService.getAllProducts();
//		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
//	}
	
	@GetMapping("/products")
	public ResponseEntity<Page<Product>> getAllProducts(
	        @RequestParam(name = "category", required = false, defaultValue = "") String category,
	        @RequestParam(name = "minPrice", required = false) Integer minPrice,
	        @RequestParam(name = "maxPrice", required = false) Integer maxPrice,
	        @RequestParam(name = "minDiscount", required = false) Integer minDiscount,
	        @RequestParam(name = "sort", required = false) String sort,
	        @RequestParam(name = "stock", required = false) String stock,
	        @RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
	        @RequestParam(name = "pageSize", required = false, defaultValue = "10") Integer pageSize) {

	    Page<Product> res = productService.getAllProducts(category, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);
	    return new ResponseEntity<>(res, HttpStatus.OK);
	}

	
	
	
	
	@GetMapping("/products/id/{productId}")
	public ResponseEntity<Product> findProductByIdHandler(@PathVariable ("productId") Long productId) {
		Product res = productService.getProductById(productId);
		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}

	
	
}
