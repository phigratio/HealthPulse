package com.healthpulse.website.payloads;

import java.util.HashSet;
import java.util.Set;



import com.healthpulse.website.entities.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class UserDto {

	private int id;

	@NotEmpty
	@Size(min = 4, message = "Username must be min of 4 characters !!!")
	private String name;

	@Email(message = "Email address is not valid !!!")
	@NotEmpty(message = "Email is required !!!")
	private String email;

	@NotEmpty
	@Size(min = 8, message = "Password must be min of 8 chars  !!!")
	private String password;

	@NotEmpty(message = "About is required !!!")
	private String about;
	
	private Set<RoleDto> roles = new HashSet<>();
	
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	
	@JsonProperty
	public void setPassword(String password) {
		this.password=password;
	}

}