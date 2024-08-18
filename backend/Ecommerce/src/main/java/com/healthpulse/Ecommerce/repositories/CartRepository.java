package com.healthpulse.Ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.Ecommerce.entities.Cart;
import com.healthpulse.Ecommerce.entities.CartItem;



public interface CartRepository extends JpaRepository<Cart, Long> {
	
	
	@Query("SELECT c FROM Cart c WHERE c.userId=:userId")
	public Cart findByUserId(@Param("userId") Integer userId);

	
}
