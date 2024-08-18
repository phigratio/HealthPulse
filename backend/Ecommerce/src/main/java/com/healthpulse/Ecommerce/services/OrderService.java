package com.healthpulse.Ecommerce.services;

import java.util.List;

import com.healthpulse.Ecommerce.entities.Address;
import com.healthpulse.Ecommerce.entities.Order;
import com.healthpulse.Ecommerce.entities.User;

public interface OrderService  {
	
	Order createOrder(User user , Address shippingAddress);
	
	Order findOrderById(Long orderId);
	
	List<Order> userOrderHistory(Integer userId);
	
	Order placeOrder(Long order);
	
	Order confirmedOrder(Long order);
	
	Order shippedOrder(Long order);
	
	Order deliveredOrder(Long order);
	
	Order cancelledOrder(Long order);
	
	List<Order> getAllOrders();
	
	void deleteOrder(Long orderId);
	
	
	
	

}
