package com.example.server.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {


    private int Userid;

    private String Name;
    private String Email;
    private String Password;
    private String Contact;


    private Date date;

    private String Role;

//     private CartDto cart;

}

