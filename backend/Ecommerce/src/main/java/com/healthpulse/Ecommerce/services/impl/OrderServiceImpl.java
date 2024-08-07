package com.healthpulse.Ecommerce.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthpulse.Ecommerce.entities.Address;
import com.healthpulse.Ecommerce.entities.Order;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.repositories.OrderRepository;
import com.healthpulse.Ecommerce.services.OrderService;
import com.healthpulse.Ecommerce.services.ProductService;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    private CartRepository cartRepository;
    
    private CartItemService cartItemService;
    
    private ProductService productService;
    
	public OrderServiceImpl(OrderRepository orderRepository, CartRepository cartRepository, CartItemService cartItemService, ProductService productService) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
        }

    @Override
    public Order createOrder(User user, Address shippingAddress) {
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("Created");
        // Calculate and set other fields like totalPrice, totalDiscountedPrice, etc.
        return orderRepository.save(order);
    }

    @Override
    public Order findOrderById(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        return order.orElse(null);
    }

    @Override
    public List<Order> userOrderHistory(Integer userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order placeOrder(Long orderId) {
        return updateOrderStatus(orderId, "Placed");
    }

    @Override
    public Order confirmedOrder(Long orderId) {
        return updateOrderStatus(orderId, "Confirmed");
    }

    @Override
    public Order shippedOrder(Long orderId) {
        return updateOrderStatus(orderId, "Shipped");
    }

    @Override
    public Order deliveredOrder(Long orderId) {
        return updateOrderStatus(orderId, "Delivered");
    }

    @Override
    public Order cancelledOrder(Long orderId) {
        return updateOrderStatus(orderId, "Cancelled");
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

    private Order updateOrderStatus(Long orderId, String status) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setOrderStatus(status);
            if (status.equals("Shipped")) {
                order.setDeliveryDate(LocalDateTime.now().plusDays(3)); // example delivery date logic
            } else if (status.equals("Delivered")) {
                order.setDeliveryDate(LocalDateTime.now());
            }
            return orderRepository.save(order);
        }
        return null;
    }
}
