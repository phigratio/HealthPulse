package com.healthpulse.Ecommerce.utils;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ModelMapperUtil {

    private final ModelMapper modelMapper;

    public ModelMapperUtil() {
        this.modelMapper = new ModelMapper();
    }

    public <D> D convertToDTO(Object entity, Class<D> dtoClass) {
        return modelMapper.map(entity, dtoClass);
    }

    public <E> E convertToEntity(Object dto, Class<E> entityClass) {
        return modelMapper.map(dto, entityClass);
    }
}
