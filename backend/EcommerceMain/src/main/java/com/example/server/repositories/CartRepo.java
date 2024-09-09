package com.example.server.repositories;

import com.example.server.entities.Cart;
import com.example.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart,Integer> {
    public Cart findByUser(User user);
//   public Cart findByUser_id(Integer Id);
}
