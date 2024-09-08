package com.healthpulse.ReminderService.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String dosage;
    private String unit;
    private String medicationType;
    private String amount;
    private int frequencyPerDay;
    
//    @ElementCollection
//    @CollectionTable(name = "medication_times", joinColumns = @JoinColumn(name = "medication_id"))
//    private List<LocalTime> times;

//    @ElementCollection
//    @CollectionTable(name = "medication_times", joinColumns = @JoinColumn(name = "medication_id"))
//    @OrderColumn(name = "times_order")
//    private List<LocalTime> times;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "medication_times", joinColumns = @JoinColumn(name = "medication_id"))
    @OrderColumn(name = "times_order")
    private List<LocalTime> times;
    
    
    private LocalDate startDate;
    private int durationDays;
    private String instructions; 
    private Boolean reminderSent;
    private Integer userId;
}

