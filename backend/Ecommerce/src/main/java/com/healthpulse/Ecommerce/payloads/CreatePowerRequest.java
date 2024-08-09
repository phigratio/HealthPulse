package com.healthpulse.Ecommerce.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePowerRequest {
    private String name;
    private String quantity;
}
