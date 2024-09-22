//package com.healthpulse.EcommerceAgain.entities;
//
//import java.util.List;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
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
//public class Cart {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int Id;
//
//    private int userId;
//    private float TotalAmount;
//
//
//    @OneToMany(cascade = CascadeType.ALL,mappedBy = "cart")
//    private List<CartDetalis> cartDetalis;
//
//
//    public void setCartDetalis(List<CartDetalis> pro) {
//    }
//}
