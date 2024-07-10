package com.healthpulse.website.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="food_categories")
@NoArgsConstructor
@Getter
@Setter
public class FoodCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodCategoryId;

    @Column(name="title", length = 255, nullable = false)
    private String foodCategoryTitle;

    @Column(name="description", length = 1000, nullable = false )
    private String categoryDescription;

    @OneToMany(mappedBy = "foodCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Food> foods = new ArrayList<>();
}
