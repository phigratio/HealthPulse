package com.example.vaccineapp.service;

import com.example.vaccineapp.entity.User;
import com.example.vaccineapp.entity.Vaccine;
import com.example.vaccineapp.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class VaccineService {

    @Autowired
    private VaccineRepository vaccineRepository;

    // Get all vaccines for a specific user
    public List<Vaccine> getAllVaccinesForUser(User user) {
        return vaccineRepository.findByUser(user);
    }

    // Preload 15 common vaccines for a new user
    public void preloadVaccinesForUser(User user) {
        List<Vaccine> commonVaccines = Arrays.asList(
                new Vaccine("Hepatitis B", "Protects against Hepatitis B.", user),
                new Vaccine("Rotavirus", "Protects against Rotavirus.", user),
                new Vaccine("DTaP", "Protects against Diphtheria, Tetanus, and Pertussis.", user),
                new Vaccine("Hib", "Protects against Haemophilus influenzae type b.", user),
                new Vaccine("Pneumococcal", "Protects against pneumococcal infections.", user),
                new Vaccine("Polio", "Protects against Polio.", user),
                new Vaccine("Influenza", "Protects against flu.", user),
                new Vaccine("MMR", "Protects against Measles, Mumps, and Rubella.", user),
                new Vaccine("Varicella", "Protects against Chickenpox.", user),
                new Vaccine("Hepatitis A", "Protects against Hepatitis A.", user),
                new Vaccine("Meningococcal", "Protects against meningococcal infections.", user),
                new Vaccine("HPV", "Protects against human papillomavirus.", user),
                new Vaccine("Tdap", "Protects against Tetanus, Diphtheria, and Pertussis.", user),
                new Vaccine("Shingles", "Protects against shingles.", user),
                new Vaccine("COVID-19", "Protects against COVID-19.", user)
        );

        vaccineRepository.saveAll(commonVaccines);
    }
}
