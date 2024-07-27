package com.healthpulse.UserSection.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "userInfo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class UserInfo {
	
	@Id
	private String id;
	private String name;
	private String email;
	@Column(length = 99999)
	private String about;
	
	@Transient
	private List <Rating> ratings = new ArrayList<>();

}
