package com.healthpulse.website.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "foods")
@Getter
@Setter
@NoArgsConstructor
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodId;

    @Column(name = "food_name", length = 255, nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(length = 500)
    private String ingredients;

    private Float proteinPercentage;

    private Float fatPercentage;

    private Float calories;

    @Column(length = 500)
    private String notSuitableFor;

    private Date addedDate;

    @ManyToOne
    @JoinColumn(name = "food_category_id")
    private FoodCategory foodCategory;
}
