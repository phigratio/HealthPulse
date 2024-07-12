package com.vaccine.list.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.vaccine.list.entity.Vaccine;
import com.vaccine.list.repositories.VaccineRepository;

import jakarta.annotation.PostConstruct;


@Service
public class VaccineServiceImpl implements VaccineService {

    @Autowired
    private VaccineRepository vaccineRepository;

    
    
    @PostConstruct
    public void init() {
        if (vaccineRepository.count() == 0) {
            List<Vaccine> vaccines = Arrays.asList(
                new Vaccine(1,"COVID-19 Vaccine", "This vaccine helps prevent COVID-19 infection."),
                new Vaccine(2,"Influenza Vaccine", "This vaccine helps prevent the flu."),
                new Vaccine(3,"Hepatitis B Vaccine", "This vaccine helps prevent hepatitis B infection."),
                new Vaccine(4,"MMR Vaccine", "This vaccine helps prevent measles, mumps, and rubella."),
                new Vaccine(5,"BCG Vaccine", "This vaccine helps prevent tuberculosis."),
                new Vaccine(6,"Polio Vaccine", "This vaccine helps prevent poliomyelitis."),
                new Vaccine(7,"DTP Vaccine", "This vaccine helps prevent diphtheria, tetanus, and pertussis."),
                new Vaccine(8,"Hepatitis A Vaccine", "This vaccine helps prevent hepatitis A infection."),
                new Vaccine(9,"Pneumococcal Vaccine", "This vaccine helps prevent pneumococcal infections."),
                new Vaccine(10,"Rotavirus Vaccine", "This vaccine helps prevent rotavirus infections, which cause severe diarrhea."),
                new Vaccine(11,"Haemophilus Influenzae Type B (Hib) Vaccine", "This vaccine helps prevent infections caused by Haemophilus influenzae type B."),
                new Vaccine(12,"HPV Vaccine", "This vaccine helps prevent human papillomavirus infections and related cancers."),
                new Vaccine(13,"Typhoid Vaccine", "This vaccine helps prevent typhoid fever."),
                new Vaccine(14,"Japanese Encephalitis Vaccine", "This vaccine helps prevent Japanese encephalitis."),
                new Vaccine(15,"Rabies Vaccine", "This vaccine helps prevent rabies after exposure to potentially rabid animals.")
            );
            vaccineRepository.saveAll(vaccines);
        }
    }

    
    @Override
    public List<Vaccine> getVaccines() {
        return vaccineRepository.findAll();
    }

    @Override
    public Vaccine addVaccine(Vaccine vaccine) {
        return vaccineRepository.save(vaccine);
    }
    @Override
    public void deleteVaccine(long id) {
        vaccineRepository.deleteById(id);
    }

    @Override
    public Vaccine updateVaccine(long id, Vaccine vaccine) {
        Optional<Vaccine> existingVaccine = vaccineRepository.findById(id);
        if (existingVaccine.isPresent()) {
            Vaccine v = existingVaccine.get();
            v.setTitle(vaccine.getTitle());
            v.setDescription(vaccine.getDescription());
            return vaccineRepository.save(v);
        } else {
            throw new RuntimeException("Vaccine not found with id " + id);
        }
    }

    
}
