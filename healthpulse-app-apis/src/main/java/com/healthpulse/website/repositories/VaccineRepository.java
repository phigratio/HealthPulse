package com.vaccine.list.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vaccine.list.entity.Vaccine;

public interface VaccineRepository extends JpaRepository<Vaccine, Long> {
}
