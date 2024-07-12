package com.vaccine.list.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vaccine.list.entity.Vaccine;
import com.vaccine.list.service.VaccineService;

@RestController
@RequestMapping("/api")
public class MyController {

    @Autowired
    private VaccineService vaccineService;

    @GetMapping("/vaccines")
    public List<Vaccine> getVaccines() {
        return this.vaccineService.getVaccines();
    }

    @PostMapping(path = "/vaccines", consumes = "application/json")
    public Vaccine addVaccine(@RequestBody Vaccine vaccine) {
        return this.vaccineService.addVaccine(vaccine);
    }

    @PutMapping("/vaccines/{vaccineId}")
    public ResponseEntity<Vaccine> updateVaccine(@PathVariable("vaccineId") long vaccineId, @RequestBody Vaccine vaccine) {
        try {
            Vaccine updatedVaccine = this.vaccineService.updateVaccine(vaccineId, vaccine);
            return new ResponseEntity<>(updatedVaccine, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/vaccines/{vaccineId}")
    public ResponseEntity<HttpStatus> deleteVaccine(@PathVariable("vaccineId") String vaccineId) {
        try {
            this.vaccineService.deleteVaccine(Long.parseLong(vaccineId));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NumberFormatException e) {
            // Handle the case where the vaccineId is not a valid number
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
}
