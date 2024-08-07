package com.healthpulse.Ecommerce.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    
    private String description;
    
    private int price;
    
    private int discountPrice;
    
    private int discountPercentage;
    
    private int quantity;
    
    private String brand;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Power> powers = new HashSet<>();
    
    private String imageUrl;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rating> ratings = new ArrayList<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "top_level_category_id")
    private Category topLevelCategory;
    
    @ManyToOne
    @JoinColumn(name = "second_level_category_id")
    private Category secondLevelCategory;
    
    @ManyToOne
    @JoinColumn(name = "third_level_category_id")
    private Category thirdLevelCategory;
    
    private LocalDate createdOn;
}
