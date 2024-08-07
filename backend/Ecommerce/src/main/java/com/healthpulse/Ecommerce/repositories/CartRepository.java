package com.healthpulse.Ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.Ecommerce.entities.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

	
	
}
