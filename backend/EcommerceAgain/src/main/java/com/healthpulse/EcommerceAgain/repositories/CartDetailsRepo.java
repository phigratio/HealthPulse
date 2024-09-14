package com.healthpulse.EcommerceAgain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthpulse.EcommerceAgain.entities.Cart;
import com.healthpulse.EcommerceAgain.entities.CartDetalis;
import com.healthpulse.EcommerceAgain.entities.Product;

@Repository
public interface CartDetailsRepo extends JpaRepository<CartDetalis,Integer> {
    public void deleteByProductsAndCart(Product product, Cart cart);
    public CartDetalis findByProductsAndCart(Product product, Cart cart);
}
