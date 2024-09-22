//package com.healthpulse.EcommerceAgain.services.impl;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.healthpulse.EcommerceAgain.entities.Cart;
//import com.healthpulse.EcommerceAgain.entities.Product;
//import com.healthpulse.EcommerceAgain.payload.CartDto;
//import com.healthpulse.EcommerceAgain.repositories.CartRepo;
//import com.healthpulse.EcommerceAgain.repositories.ProductRepo;
//import com.healthpulse.EcommerceAgain.services.CartService;
//import com.healthpulse.EcommerceAgain.exceptions.ResourceNotFoundException;
//
//import java.util.Optional;
//
//@Service
//public class CartServiceImpl implements CartService {
//
//    @Autowired
//    private CartRepo cartRepo;
//
//    @Autowired
//    private ProductRepo productRepo;
//
//    @Override
//    public CartDto addProductToCart(int cartId, int productId, int quantity) {
//        Cart cart = cartRepo.findById(cartId)
//                .orElseThrow(() -> new ResourceNotFoundException("Cart", "id", cartId));
//
//        Product product = productRepo.findById(productId)
//                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
//
//        cart.addProduct(product, quantity);
//        Cart updatedCart = cartRepo.save(cart);
//        return new CartDto(updatedCart);
//    }
//
//    @Override
//    public CartDto removeProductFromCart(int cartId, int productId) {
//        Cart cart = cartRepo.findById(cartId)
//                .orElseThrow(() -> new ResourceNotFoundException("Cart", "id", cartId));
//
//        Product product = productRepo.findById(productId)
//                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
//
//        cart.removeProduct(product);
//        Cart updatedCart = cartRepo.save(cart);
//        return new CartDto(updatedCart);
//    }
//
//    @Override
//    public CartDto getCartById(int cartId) {
//        Cart cart = cartRepo.findById(cartId)
//                .orElseThrow(() -> new ResourceNotFoundException("Cart", "id", cartId));
//        return new CartDto(cart);
//    }
//
//    @Override
//    public void clearCart(int cartId) {
//        Cart cart = cartRepo.findById(cartId)
//                .orElseThrow(() -> new ResourceNotFoundException("Cart", "id", cartId));
//
//        cart.clearCart();
//        cartRepo.save(cart);
//    }
//}
