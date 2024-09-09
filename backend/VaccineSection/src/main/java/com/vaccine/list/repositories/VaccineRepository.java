package com.example.vaccineapp.repository;

import com.example.vaccineapp.entity.Vaccine;
import com.example.vaccineapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VaccineRepository extends JpaRepository<Vaccine, Long> {
    List<Vaccine> findByUser(User user);
}
