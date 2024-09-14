package com.healthpulse.VaccineServer.entity;

import jakarta.persistence.*;

@Entity
public class Vaccine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;


    private int userId;

    // Constructors
    public Vaccine() {}

    public Vaccine(String title, String description, int userId) {
        this.title = title;
        this.description = description;
        this.userId = userId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUserId() {
        return userId;
    }

	public void setUserId(int userId) {
		this.userId = userId;
	}
}
