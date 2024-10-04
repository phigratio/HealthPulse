package com.healthpulse.EcommerceAgain.repositories;

import com.healthpulse.EcommerceAgain.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    Optional<List<Order>> findByUserId(int userId);
}