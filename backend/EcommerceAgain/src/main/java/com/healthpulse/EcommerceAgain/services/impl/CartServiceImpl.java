package com.healthpulse.EcommerceAgain.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

import com.healthpulse.EcommerceAgain.clients.UserClient;
import com.healthpulse.EcommerceAgain.entities.Cart;
import com.healthpulse.EcommerceAgain.entities.CartDetalis;
import com.healthpulse.EcommerceAgain.entities.Product;
import com.healthpulse.EcommerceAgain.entities.User;
import com.healthpulse.EcommerceAgain.payload.CartDetailDto;
import com.healthpulse.EcommerceAgain.payload.CartDto;
import com.healthpulse.EcommerceAgain.payload.CartHelp;
import com.healthpulse.EcommerceAgain.payload.ProductDto;
import com.healthpulse.EcommerceAgain.repositories.CartDetailsRepo;
import com.healthpulse.EcommerceAgain.repositories.CartRepo;
import com.healthpulse.EcommerceAgain.repositories.ProductRepo;
import com.healthpulse.EcommerceAgain.services.CartService;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private CartDetailsRepo cartDetailsRepo;

    @Autowired
    private UserClient userClient; // Using Feign client to get user info from another microservice

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CartDto CreateCart(CartHelp cartHelp) {
        return null; // This method is not implemented yet
    }

    @Override
    public CartDto addProductToCart(CartHelp cartHelp) {
        int productId = cartHelp.getProductId();
        int quantity = cartHelp.getQuantity();
        String userEmail = cartHelp.getUserEmail();

        AtomicReference<Integer> totalAmount = new AtomicReference<>(0);

        // Fetch the user from the User microservice
        User user = userClient.getUsers().stream()
            .filter(u -> u.getEmail().equals(userEmail))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = this.productRepo.findById(productId).orElseThrow();

        // Create Cart Details
        CartDetalis cartDetalis = new CartDetalis();
        cartDetalis.setProducts(product);
        cartDetalis.setQuantity(quantity);
        cartDetalis.setAmount((int) (product.getPrice() * quantity));

        Cart cart = this.cartRepo.findByUserId(user.getId());

        if (cart == null) {
            // Create a new cart if not exists
            cart = new Cart();
            cart.setUserId(user.getId());
            cart.setTotalAmount(cartDetalis.getAmount());

            cart.getCartDetalis().add(cartDetalis);
            cartDetalis.setCart(cart);

            this.cartRepo.save(cart);
        } else {
            // Add/Update product in an existing cart
            AtomicReference<Boolean> productExists = new AtomicReference<>(false);
            List<CartDetalis> updatedCartDetails = cart.getCartDetalis().stream().map(item -> {
                if (item.getProducts().getProductId() == productId) {
                    item.setQuantity(quantity);
                    item.setAmount((int) (quantity * product.getPrice()));
                    productExists.set(true);
                }
                totalAmount.set(totalAmount.get() + item.getAmount());
                return item;
            }).collect(Collectors.toList());

            if (!productExists.get()) {
                updatedCartDetails.add(cartDetalis);
                totalAmount.set(totalAmount.get() + cartDetalis.getAmount());
                cartDetalis.setCart(cart);
            }

            cart.setCartDetalis(updatedCartDetails);
            cart.setTotalAmount(totalAmount.get());
            this.cartRepo.save(cart);
        }

        CartDto cartDto = this.modelMapper.map(cart, CartDto.class);
        List<CartDetailDto> cartDetailsDto = cartDto.getCartDetalis();

        // Decompress image for each product
        for (CartDetailDto detailDto : cartDetailsDto) {
            ProductDto productDto = detailDto.getProducts();
            productDto.setImg(decompressBytes(productDto.getImg()));
        }

        cartDto.setCartDetalis(cartDetailsDto);
        return cartDto;
    }

    @Override
    public CartDto GetCart(String userEmail) {
        User user = userClient.getUsers().stream()
            .filter(u -> u.getEmail().equals(userEmail))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = this.cartRepo.findByUserId(user.getId());

        if (cart == null) {
            throw new RuntimeException("Cart not found for the user");
        }

        CartDto cartDto = this.modelMapper.map(cart, CartDto.class);
        List<CartDetailDto> cartDetailsDto = cartDto.getCartDetalis();

        // Decompress image for each product
        for (CartDetailDto detailDto : cartDetailsDto) {
            ProductDto productDto = detailDto.getProducts();
            productDto.setImg(decompressBytes(productDto.getImg()));
        }

        cartDto.setCartDetalis(cartDetailsDto);
        return cartDto;
    }

    @Override
    public void RemoveById(Integer productId, String userEmail) {
        User user = userClient.getUsers().stream()
            .filter(u -> u.getEmail().equals(userEmail))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = this.productRepo.findById(productId).orElseThrow();
        Cart cart = this.cartRepo.findByUserId(user.getId());

        if (cart == null) {
            throw new RuntimeException("Cart not found for the user");
        }

        CartDetalis cartDetails = this.cartDetailsRepo.findByProductsAndCart(product, cart);
        int amount = cartDetails.getAmount();

        cart.setTotalAmount(cart.getTotalAmount() - amount);
        this.cartRepo.save(cart);

        this.cartDetailsRepo.delete(cartDetails);
    }

    private static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException e) {
            // Handle exception
        }
        return outputStream.toByteArray();
    }
}
