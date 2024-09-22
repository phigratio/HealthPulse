package com.healthpulse.EcommerceAgain.services;

import com.healthpulse.EcommerceAgain.entities.Power;
import com.healthpulse.EcommerceAgain.repositories.PowerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PowerService {

    @Autowired
    private PowerRepo powerRepo;

    public List<Power> getAllPowers() {
        return powerRepo.findAll();
    }

    public Power getPowerById(int id) {
        return powerRepo.findById(id).orElse(null);
    }

    public Power savePower(Power power) {
        return powerRepo.save(power);
    }

    public void deletePowerById(int id) {
        powerRepo.deleteById(id);
    }
}
