package com.healthpulse.Ecommerce.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class PaymentInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private int userId;
	
	@Column(name = "cardholder_name")
	private String cardholderName;
	

	@Column(name = "card_number")
	private String cardNumber;
	
	@Column(name = "expiry_date")
	private String expiryDate;
	
	@Column(name = "cvv")
	private String cvv;
	
}
