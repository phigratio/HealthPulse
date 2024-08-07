package com.healthpulse.Ecommerce.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.healthpulse.Ecommerce.dto.CategoryDTO;
import com.healthpulse.Ecommerce.entities.Category;
import com.healthpulse.Ecommerce.exception.ResourceNotFoundException;
import com.healthpulse.Ecommerce.repositories.CategoryRepository;
import com.healthpulse.Ecommerce.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = mapToEntity(categoryDTO);
        Category newCategory = categoryRepository.save(category);
        return mapToDTO(newCategory);
    }

    @Override
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        category.setName(categoryDTO.getName());
        category.setLevel(categoryDTO.getLevel());

        if (categoryDTO.getParentCategoryId() != null) {
            Category parentCategory = categoryRepository.findById(categoryDTO.getParentCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent Category", "id", categoryDTO.getParentCategoryId()));
            category.setParentCategory(parentCategory);
        } else {
            category.setParentCategory(null);
        }

        Category updatedCategory = categoryRepository.save(category);
        return mapToDTO(updatedCategory);
    }

    @Override
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        return mapToDTO(category);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        categoryRepository.delete(category);
    }

    private CategoryDTO mapToDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setLevel(category.getLevel());
        if (category.getParentCategory() != null) {
            categoryDTO.setParentCategoryId(category.getParentCategory().getId());
        }
        return categoryDTO;
    }

    private Category mapToEntity(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setLevel(categoryDTO.getLevel());

        if (categoryDTO.getParentCategoryId() != null) {
            Category parentCategory = categoryRepository.findById(categoryDTO.getParentCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent Category", "id", categoryDTO.getParentCategoryId()));
            category.setParentCategory(parentCategory);
        }
        return category;
    }
}
