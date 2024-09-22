package com.healthpulse.EcommerceAgain.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Data
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @Column
    private String productName;

    private String description;
    private Float price;
    private Float discountPrice;
    private String chemicalName;
    private String companyName;

    @OneToMany(mappedBy = "product") // correct relationship mapping
    private List<Power> power;

    private Float weight;
    private int quantity;

    @Column(length = 65555)
    private byte[] img;
}

