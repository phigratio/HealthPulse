package com.healthpulse.Ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.Ecommerce.entities.Cart;
import com.healthpulse.Ecommerce.entities.CartItem;
import com.healthpulse.Ecommerce.entities.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
	@Query("SELECT c FROM CartItem c WHERE c.cart=:cart AND c.product=:product AND c.power=:power AND c.userId=:userId") 
	public CartItem isCartItemExist(@Param("cart") Cart cart , @Param("product") Product product , @Param("power") String power , @Param("userId") Integer userId);
	
	
	@Query("SELECT c FROM CartItem c WHERE c.id=:id")
	public List<CartItem> findByUserId(@Param("id")  int id);

}
