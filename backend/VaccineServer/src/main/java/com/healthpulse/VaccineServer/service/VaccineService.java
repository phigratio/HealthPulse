package com.healthpulse.VaccineServer.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthpulse.VaccineServer.entity.Vaccine;
import com.healthpulse.VaccineServer.repository.VaccineRepository;

@Service
public class VaccineService {

    @Autowired
    private VaccineRepository vaccineRepository;

    // Get all vaccines for a specific user
    public List<Vaccine> getAllVaccinesForUserId(int userId) {
        return vaccineRepository.findByUserId(userId);
    }

    // Preload 15 common vaccines for a new user
    public void preloadVaccinesForUser(int userId) {
        List<Vaccine> commonVaccines = Arrays.asList(
                new Vaccine("Hepatitis B", "Protects against Hepatitis B.", userId),
                new Vaccine("Rotavirus", "Protects against Rotavirus.", userId),
                new Vaccine("DTaP", "Protects against Diphtheria, Tetanus, and Pertussis.", userId),
                new Vaccine("Hib", "Protects against Haemophilus influenzae type b.", userId),
                new Vaccine("Pneumococcal", "Protects against pneumococcal infections.", userId),
                new Vaccine("Polio", "Protects against Polio.", userId),
                new Vaccine("Influenza", "Protects against flu.", userId),
                new Vaccine("MMR", "Protects against Measles, Mumps, and Rubella.", userId),
                new Vaccine("Varicella", "Protects against Chickenpox.", userId),
                new Vaccine("Hepatitis A", "Protects against Hepatitis A.", userId),
                new Vaccine("Meningococcal", "Protects against meningococcal infections.", userId),
                new Vaccine("HPV", "Protects against human papillomavirus.", userId),
                new Vaccine("Tdap", "Protects against Tetanus, Diphtheria, and Pertussis.", userId),
                new Vaccine("Shingles", "Protects against shingles.", userId),
                new Vaccine("COVID-19", "Protects against COVID-19.", userId)
        );

        vaccineRepository.saveAll(commonVaccines);
    }
}