// MedicineRepo.java
package com.healthpulse.website.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthpulse.website.entities.Medicine;
import com.healthpulse.website.entities.MedicineCategory;

public interface MedicineRepo extends JpaRepository<Medicine, Integer> {
    List<Medicine> findByMedicineCategory(MedicineCategory medicineCategory); // Correct method name

    @Query("select m from Medicine m where m.name like :key")
    List<Medicine> searchByName(@Param("key") String name);
}
