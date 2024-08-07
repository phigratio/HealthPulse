package com.healthpulse.Ecommerce.services;

import java.util.List;
import com.healthpulse.Ecommerce.dto.CategoryDTO;

public interface CategoryService {
    CategoryDTO createCategory(CategoryDTO categoryDTO);
    CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO);
    CategoryDTO getCategoryById(Long id);
    List<CategoryDTO> getAllCategories();
    void deleteCategory(Long id);
}