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
@Table(name="medicine_categories")
@NoArgsConstructor
@Getter
@Setter
public class MedicineCategory  {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer medicine_categoryId;
	
	@Column(name="title",length = 100000,nullable = false)
	private String medicine_categoryTitle;
	
	@Column(name="description",length = 10000000,nullable = false )
	private String categoryDescription;
	
	
	@OneToMany(mappedBy = "medicineCategory",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<Medicine> posts=new ArrayList<>();
	
}


