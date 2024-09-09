package com.example.server.services;

import com.example.server.payload.SingIn;
import com.example.server.payload.UserDto;
import org.springframework.stereotype.Service;

@Service
public interface UserService {


    UserDto CreateUser(UserDto userDto);

    SingIn SingIn(SingIn singIn);
}

