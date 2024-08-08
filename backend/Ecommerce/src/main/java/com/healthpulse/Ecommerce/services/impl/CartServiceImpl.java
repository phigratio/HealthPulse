package com.healthpulse.Ecommerce.services.impl;

import org.springframework.stereotype.Service;

import com.healthpulse.Ecommerce.entities.Cart;
import com.healthpulse.Ecommerce.entities.CartItem;
import com.healthpulse.Ecommerce.entities.Product;
import com.healthpulse.Ecommerce.entities.User;
import com.healthpulse.Ecommerce.payloads.AddItemRequest;
import com.healthpulse.Ecommerce.repositories.CartRepository;
import com.healthpulse.Ecommerce.services.CartItemService;
import com.healthpulse.Ecommerce.services.CartService;
import com.healthpulse.Ecommerce.services.ProductService;


@Service
public class CartServiceImpl implements CartService {
	
	private CartRepository cartRepository;
	private CartItemService cartItemService;
	private ProductService productService;
	
	
	
	public CartServiceImpl(CartRepository cartRepository, CartItemService cartItemService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }
	

	@Override
	public Cart createCart(User user) {

		Cart cart = new Cart();
		cart.setUserId(user.getId());
		
		
		
		
		return cartRepository.save(cart);
	}

	@Override
	public String addCartItem(Integer userId, AddItemRequest addItemRequest) {
		Cart cart = cartRepository.findByUserId(userId);
		Product product = productService.findProductById(addItemRequest.getProductId());
		
		CartItem isPresent = cartItemService.isCartItemExist(cart, product, addItemRequest.getPower(), userId);
		
		if(isPresent == null) {
			CartItem cartItem = new CartItem();
			cartItem.setCart(cart);
			cartItem.setProduct(product);
			cartItem.setPower(addItemRequest.getPower());
			cartItem.setQuantity(addItemRequest.getQuantity());
			cartItem.setUserId(userId);
			cartItem.setPrice(product.getPrice() * addItemRequest.getQuantity());
			cartItem.setDiscountedPrice(product.getDiscountPrice() * addItemRequest.getQuantity());

			CartItem createdCartItem = cartItemService.createCartItem(cartItem);

			cart.getCartItems().add(createdCartItem);
			
		} 
		
		return "Item added to cart";
		
		
		
//		else {
//			isPresent.setQuantity(isPresent.getQuantity() + addItemRequest.getQuantity());
//			isPresent.setPrice(isPresent.getProduct().getPrice() * isPresent.getQuantity());
//			isPresent.setDiscountedPrice(isPresent.getProduct().getDiscountPrice() * isPresent.getQuantity());
//
//			cartItemService.updateCartItem(userId, isPresent.getId(), isPresent);
//
//			return "Item quantity updated";
//		}
		
		
		
	}

	@Override
	public Cart findUserCart(Integer userId) {
		Cart cart = cartRepository.findByUserId(userId);
        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItems = 0;
        
		for (CartItem cartItem : cart.getCartItems()) {
			totalPrice += cartItem.getPrice();
			totalDiscountedPrice += cartItem.getDiscountedPrice();
			totalItems += cartItem.getQuantity();
		}
		
		cart.setTotalPrice(totalPrice);
		cart.setTotalDiscountedPrice(totalDiscountedPrice);
		cart.setTotalItems(totalItems);
		cart.setDiscount(totalPrice - totalDiscountedPrice);
		
		
		return cartRepository.save(cart); 
		
		
	}

}
