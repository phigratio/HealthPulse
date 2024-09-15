package com.healthpulse.EcommerceAgain.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthpulse.EcommerceAgain.entities.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart,Integer> {
    public Cart findByUserId(int userId);
//   public Cart findByUser_id(Integer Id);
}