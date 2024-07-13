package com.healthpulse.CabinSection.services;

import java.util.List;

import com.healthpulse.CabinSection.entities.Cabin;



public interface CabinService {
	
	//create 
	
	Cabin createCabin(Cabin cabin);
	
	//get by id
	
	Cabin getCabinById(String id);
	
	//get all
	
	List<Cabin> getAllCabins();

}
