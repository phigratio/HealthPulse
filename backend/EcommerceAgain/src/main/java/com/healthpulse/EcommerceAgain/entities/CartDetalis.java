//package com.healthpulse.EcommerceAgain.entities;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.ManyToOne;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.ToString;
//
//@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@ToString
//public class CartDetalis {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int CartDetalisId;
//    @ManyToOne
//    private Product products;
//
//    private int Quantity;
//    private int Amount;
//
//    @ManyToOne
//    private Cart cart;
//
//}
