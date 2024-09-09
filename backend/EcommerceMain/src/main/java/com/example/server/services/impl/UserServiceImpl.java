package com.example.server.services.impl;

import com.example.server.entities.Cart;
import com.example.server.entities.Role;
import com.example.server.entities.TotalRoles;
import com.example.server.entities.User;
import com.example.server.payload.SingIn;
import com.example.server.payload.UserDto;
import com.example.server.repositories.UserRepo;
import com.example.server.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {



    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private UserRepo userRepo;




    @Override
    public UserDto CreateUser(UserDto userDto) {
        User user= this.modelMapper.map(userDto, User.class);
        List<Role> list= new ArrayList<>();
        list.add(new Role(TotalRoles.ADMIN.name()));
        user.setRole(list);
        user.setPassword(user.getPassword());
        Cart cart= new Cart();
        cart.setUser(user);
        user.setCart(cart);

        this.userRepo.save(user);
        return this.modelMapper.map(user,UserDto.class);
    }

    @Override
    public SingIn SingIn(SingIn singIn) {

        User user=this.userRepo.findByEmail(singIn.getEmail());
        return singIn;
    }
}

