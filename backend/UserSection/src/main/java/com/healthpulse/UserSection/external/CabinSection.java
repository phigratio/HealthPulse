package com.healthpulse.UserSection.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.healthpulse.UserSection.entities.Cabin;

@FeignClient(name="CABIN-SECTION")
public interface CabinSection {
	
	@GetMapping("/cabin/{cabinId}")
	public Cabin getCabin(@PathVariable ("cabinId") String cabinId);
	
	

}
