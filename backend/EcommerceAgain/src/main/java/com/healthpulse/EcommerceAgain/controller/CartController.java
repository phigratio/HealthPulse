package com.healthpulse.EcommerceAgain.controller;

import com.healthpulse.EcommerceAgain.payload.CartDto;
import com.healthpulse.EcommerceAgain.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> getCartByUserId(@PathVariable ("userId") int userId) {
        CartDto cartDto = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cartDto);
    }

    @PostMapping("/{userId}/add/{productId}/{quantity}")
    public ResponseEntity<CartDto> addProductToCart(@PathVariable ("userId") int userId,
                                                    @PathVariable ("productId") int productId,
                                                    @PathVariable ("quantity") int quantity) {
        CartDto updatedCart = cartService.addProductToCart(userId, productId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    @PutMapping("/{userId}/update/{cartItemId}/{quantity}")
    public ResponseEntity<CartDto> updateCartItemQuantity(@PathVariable("userId") int userId,
                                                          @PathVariable("cartItemId") int cartItemId,
                                                          @PathVariable("quantity") int quantity) {
        CartDto updatedCart = cartService.updateCartItemQuantity(userId, cartItemId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/{userId}/remove/{cartItemId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable("userId") int userId,
                                               @PathVariable("cartItemId") int cartItemId) {
        cartService.deleteCartItem(userId, cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable ("userId") int userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}

