package com.example.productcatalog.service;

import com.example.productcatalog.model.Category;
import com.example.productcatalog.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    //final
    private CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }



    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
