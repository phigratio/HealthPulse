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
@Table(name = "medicines")
@Getter
@Setter
@NoArgsConstructor
public class Medicine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer medicineId;

	@Column(name = "medicine_name", length = 1000000, nullable = false)
	private String name;

	@Column(length = 100000)
	private String description;
	
	private Float price;
	
	private Integer quantity;
	
	private Float power;

	private String imageName;
	
	private String brand;

	private Date addedDate;

	@ManyToOne
	@JoinColumn(name = "medicine_category_id")
	private MedicineCategory medicineCategory;
	
	
}
