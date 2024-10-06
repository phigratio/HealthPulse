package com.healthpulse.EcommerceAgain.services.impl;

import com.healthpulse.EcommerceAgain.entities.Cart;
import com.healthpulse.EcommerceAgain.entities.CartItem;
import com.healthpulse.EcommerceAgain.entities.Order;
import com.healthpulse.EcommerceAgain.entities.OrderItem;
import com.healthpulse.EcommerceAgain.payload.OrderDto;
import com.healthpulse.EcommerceAgain.repositories.CartRepo;
import com.healthpulse.EcommerceAgain.repositories.OrderRepo;
import com.healthpulse.EcommerceAgain.services.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<OrderDto> getOrdersByUserId(int userId) {
        List<Order> orders = orderRepo.findByUserId(userId).orElseThrow();
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public OrderDto placeOrder(int userId) {
        Cart cart = cartRepo.findByUserId(userId).orElseThrow();
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("PLACED");

        float total = 0;
        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(cartItem.getProductId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            order.getOrderItems().add(orderItem);
            total += cartItem.getPrice();
        }

        order.setTotalPrice(total);
        Order savedOrder = orderRepo.save(order);

        // Clear cart after placing the order
        cart.getCartItems().clear();
        cartRepo.save(cart);

        return modelMapper.map(savedOrder, OrderDto.class);
    }
}
