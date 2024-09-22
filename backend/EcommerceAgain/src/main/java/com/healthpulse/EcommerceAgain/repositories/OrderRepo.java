package com.healthpulse.EcommerceAgain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.healthpulse.EcommerceAgain.entities.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    // Add any custom query methods if necessary
}
