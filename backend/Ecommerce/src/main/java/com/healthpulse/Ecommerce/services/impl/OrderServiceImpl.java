package com.healthpulse.Ecommerce.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthpulse.Ecommerce.entities.Address;
import com.healthpulse.Ecommerce.entities.Order;
import com.healthpulse.Ecommerce.entities.OrderItem;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.repositories.CartRepository;
import com.healthpulse.Ecommerce.repositories.OrderRepository;
import com.healthpulse.Ecommerce.services.CartItemService;
import com.healthpulse.Ecommerce.services.OrderService;
import com.healthpulse.Ecommerce.services.ProductService;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private CartItemService cartItemService;
    
    @Autowired
    private ProductService productService;
    
    public OrderServiceImpl(OrderRepository orderRepository, CartRepository cartRepository, CartItemService cartItemService, ProductService productService) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @Override
    public Order createOrder(User user, Address shippingAddress) {
        // Create a new order
        Order order = new Order();
        order.setUserId(user.getId());
        order.setShippingAddress(shippingAddress);
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("Created");
        
        // Retrieve cart items associated with the user and create order items
        List<OrderItem> orderItems = cartItemService.convertCartItemsToOrderItems(user);
        order.setOrderItems(orderItems);
        
        // Calculate total price, discount, and total discounted price
        double totalPrice = calculateTotalPrice(orderItems);
        order.setTotalPrice(totalPrice);
        int discount = calculateDiscount(totalPrice);
        order.setDiscount(discount);
        order.setTotalDiscountedPrice((int) (totalPrice - discount));
        
        // Calculate the total number of items
        order.setTotalItems(orderItems.size());
        
        // Set created at timestamp
        order.setCreatedAt(LocalDateTime.now());

        // Save and return the order
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

    private double calculateTotalPrice(List<OrderItem> orderItems) {
        return orderItems.stream().mapToDouble(OrderItem::getPrice).sum();
    }

    private int calculateDiscount(double totalPrice) {
        // Example discount calculation logic (can be customized)
        if (totalPrice > 100) {
            return (int) (totalPrice * 0.1); // 10% discount for orders above $100
        }
        return 0;
    }
}
