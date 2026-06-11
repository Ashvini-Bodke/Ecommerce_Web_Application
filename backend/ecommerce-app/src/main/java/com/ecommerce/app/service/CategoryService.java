package com.ecommerce.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.app.model.Category;
import com.ecommerce.app.repository.CategoryRepository;

@Service
public class CategoryService {

   
@Autowired
private CategoryRepository categoryRepository;


public Category addCategory(Category category) {

    categoryRepository.findByName(category.getName())
        .ifPresent(c -> {
            throw new RuntimeException("Category already exists");
        });

    return categoryRepository.save(category);
}

public List<Category> fetchAllCategory(){
    return categoryRepository.findAll();
}

public Optional<Category> fetchCategoryById(Long id){
    return categoryRepository.findById(id);
}



public Category updateCategoryById(Long id,Category updatedCategory){

     Category existingCategory = categoryRepository.findById(id)
          .orElseThrow(()->new RuntimeException("ctaegory not found"));

     existingCategory.setName(updatedCategory.getName());
     return categoryRepository.save(existingCategory);
}


public void deleteCategoryById(Long id){
 categoryRepository.deleteById(id);
}

}
