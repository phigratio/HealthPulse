package com.healthpulse.website.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MedicineDto {

	private Integer medicineId;

	private String name;

	private String description;

	private Float price;

	private Integer quantity;

	private Float power;

	private String imageName;

	private String brand;

	private String addedDate;

	private MedicineCategoryDto medicineCategory;

}
