package com.healthpulse.EcommerceAgain.repositories;


import com.healthpulse.EcommerceAgain.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByUserId(int userId);
}
