package com.healthpulse.EcommerceAgain.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PowerDto {
    private int id;
    private String dosage; // e.g., "500mg", "20ml"
    private String unit;   // e.g., "mg", "ml"
}
