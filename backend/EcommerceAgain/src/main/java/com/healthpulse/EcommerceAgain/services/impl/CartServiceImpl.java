package com.healthpulse.EcommerceAgain.services.impl;
import com.healthpulse.EcommerceAgain.entities.Cart;
import com.healthpulse.EcommerceAgain.entities.CartItem;
import com.healthpulse.EcommerceAgain.entities.Product;
import com.healthpulse.EcommerceAgain.payload.CartDto;
import com.healthpulse.EcommerceAgain.payload.CartItemDto;
import com.healthpulse.EcommerceAgain.repositories.CartRepo;
import com.healthpulse.EcommerceAgain.repositories.ProductRepo;
import com.healthpulse.EcommerceAgain.services.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CartDto getCartByUserId(int userId) {
        Cart cart = cartRepo.findByUserId(userId).orElse(new Cart());
        return modelMapper.map(cart, CartDto.class);
    }

//    @Override
//    public CartDto addProductToCart(int userId, int productId, int quantity) {
//        Cart cart = cartRepo.findByUserId(userId).orElse(new Cart());
//        cart.setUserId(userId);
//
//        Product product = productRepo.findById(productId).orElseThrow();
//        CartItem cartItem = new CartItem();
//        cartItem.setProductId(productId);
//        cartItem.setQuantity(quantity);
//        cartItem.setPrice(product.getPrice() * quantity);
//
//        cart.getCartItems().add(cartItem);
//        Cart savedCart = cartRepo.save(cart);
//
//        return modelMapper.map(savedCart, CartDto.class);
//    }

    @Override
    public CartDto addProductToCart(int userId, int productId, int quantity) {
        Cart cart = cartRepo.findByUserId(userId).orElse(new Cart());
        cart.setUserId(userId);

        // Initialize cartItems if it is null
        if (cart.getCartItems() == null) {
            cart.setCartItems(new ArrayList<>());
        }

        Product product = productRepo.findById(productId).orElseThrow();
        CartItem cartItem = new CartItem();
        cartItem.setProductId(productId);
        cartItem.setQuantity(quantity);
        cartItem.setPrice(product.getPrice() * quantity);

        cart.getCartItems().add(cartItem);
        Cart savedCart = cartRepo.save(cart);

        return modelMapper.map(savedCart, CartDto.class);
    }


    @Override
    public void clearCart(int userId) {
        Cart cart = cartRepo.findByUserId(userId).orElseThrow();
        cart.getCartItems().clear();
        cartRepo.save(cart);
    }
}