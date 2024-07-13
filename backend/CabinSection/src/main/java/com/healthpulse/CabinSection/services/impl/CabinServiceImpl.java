package com.healthpulse.CabinSection.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.CabinSection.entities.Cabin;
import com.healthpulse.CabinSection.repositories.CabinRepo;
import com.healthpulse.CabinSection.services.CabinService;
import com.healthpulse.CabinSection.exceptions.ResourceNotFoundException;


@Service
public class CabinServiceImpl implements CabinService {
	
	@Autowired
	private CabinRepo cabinRepo;

	@Override
	public Cabin createCabin(Cabin cabin) {
		
		String randomId = java.util.UUID.randomUUID().toString();
		cabin.setId(randomId);
		
		return cabinRepo.save(cabin);
	}

	@Override
	public Cabin getCabinById(String id) {
		
		return cabinRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cabin not found with id: "+id + " !!!"));
	}

	@Override
	public List<Cabin> getAllCabins() {
		
		return cabinRepo.findAll();
	}

}
