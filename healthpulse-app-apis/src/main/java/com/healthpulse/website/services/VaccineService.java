package com.vaccine.list.service;

import java.util.List;
import com.vaccine.list.entity.Vaccine;

public interface VaccineService {
    List<Vaccine> getVaccines();
    Vaccine addVaccine(Vaccine vaccine);
    public Vaccine updateVaccine(long id, Vaccine vaccine);
	void deleteVaccine(long id);
    
    
}
