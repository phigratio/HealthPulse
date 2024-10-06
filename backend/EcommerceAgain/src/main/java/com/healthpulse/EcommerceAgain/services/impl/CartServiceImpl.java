package com.healthpulse.EcommerceAgain.services.impl;

import com.healthpulse.EcommerceAgain.entities.Cart;
import com.healthpulse.EcommerceAgain.entities.CartItem;
import com.healthpulse.EcommerceAgain.entities.Product;
import com.healthpulse.EcommerceAgain.payload.CartDto;
import com.healthpulse.EcommerceAgain.repositories.CartRepo;
import com.healthpulse.EcommerceAgain.repositories.ProductRepo;
import com.healthpulse.EcommerceAgain.services.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public CartDto addProductToCart(int userId, int productId, int quantity) {
        Cart cart = cartRepo.findByUserId(userId).orElse(new Cart());
        cart.setUserId(userId);

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
    public CartDto updateCartItemQuantity(int userId, int cartItemId, int quantity) {
        Cart cart = cartRepo.findByUserId(userId).orElseThrow();
        List<CartItem> cartItems = cart.getCartItems();

        // Find the cart item and update the quantity
        CartItem cartItem = cartItems.stream()
                .filter(item -> item.getCartItemId() == cartItemId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (quantity <= 0) {
            cartItems.remove(cartItem);  // Remove item if quantity is zero or less
        } else {
            cartItem.setQuantity(quantity);
            cartItem.setPrice(cartItem.getPrice() / cartItem.getQuantity() * quantity);  // Adjust the price based on the new quantity
        }

        Cart updatedCart = cartRepo.save(cart);
        return modelMapper.map(updatedCart, CartDto.class);
    }

    @Override
    public void deleteCartItem(int userId, int cartItemId) {
        Cart cart = cartRepo.findByUserId(userId).orElseThrow();
        List<CartItem> cartItems = cart.getCartItems();

        // Remove the specific cart item by cartItemId
        cartItems.removeIf(item -> item.getCartItemId() == cartItemId);

        cartRepo.save(cart);  // Save the updated cart after removing the item
    }

    @Override
    public void clearCart(int userId) {
        Cart cart = cartRepo.findByUserId(userId).orElseThrow();
        cart.getCartItems().clear();
        cartRepo.save(cart);
    }
}
