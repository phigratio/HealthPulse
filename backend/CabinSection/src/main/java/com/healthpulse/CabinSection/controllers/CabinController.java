package com.healthpulse.CabinSection.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.healthpulse.CabinSection.entities.Cabin;
import com.healthpulse.CabinSection.services.CabinService;

@RestController
@RequestMapping("/cabin")
public class CabinController {

    @Autowired
    private CabinService cabinService;

    @PostMapping
    public ResponseEntity<Cabin> createCabin(@RequestBody Cabin cabin) {
        Cabin createdCabin = cabinService.createCabin(cabin);
        return ResponseEntity.ok(createdCabin);
    }
    
//    @PreAuthorize("hasRole('ADMIN')") // This is for Role based authentication
    @GetMapping("/{id}")
    public ResponseEntity<Cabin> getCabinById(@PathVariable ("id") String id) {
        Cabin cabin = cabinService.getCabinById(id);
        return ResponseEntity.ok(cabin);
    }

    @GetMapping
    public ResponseEntity<List<Cabin>> getAllCabins() {
        List<Cabin> cabins = cabinService.getAllCabins();
        return ResponseEntity.ok(cabins);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Cabin> updateCabin(@PathVariable String id, @RequestBody Cabin cabinDetails) {
//        Cabin cabin = cabinService.getCabinById(id);
//        cabin.setCabinNo(cabinDetails.getCabinNo());
//        cabin.setCabinType(cabinDetails.getCabinType());
//        cabin.setLatitude(cabinDetails.getLatitude());
//        cabin.setLongitude(cabinDetails.getLongitude());
//        cabin.setHospitalName(cabinDetails.getHospitalName());
//        cabin.setAbout(cabinDetails.getAbout());
//        Cabin updatedCabin = cabinService.createCabin(cabin);
//        return ResponseEntity.ok(updatedCabin);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteCabin(@PathVariable String id) {
//        cabinService.deleteCabin(id);
//        return ResponseEntity.noContent().build();
//    }
}
