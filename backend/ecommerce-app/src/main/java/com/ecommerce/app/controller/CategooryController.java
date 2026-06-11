package com.ecommerce.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.app.model.Category;
import com.ecommerce.app.service.CategoryService;



@RestController
public class CategooryController {

  @Autowired
  private  CategoryService categoryService;

  
  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("/admin/categories")
  public Category addCategory(@RequestBody Category category){
        return  categoryService.addCategory(category);

  }
    
  @ResponseStatus(HttpStatus.OK)
  @GetMapping("/categories")
  public List<Category> fetchAllCategory(){
    return categoryService.fetchAllCategory();
  }

  @ResponseStatus(HttpStatus.OK)
  @GetMapping("/categories/{id}")
public Category fetchCategoryById(@PathVariable Long id){
    return categoryService.fetchCategoryById(id)
        .orElseThrow(() -> new RuntimeException("Category not found"));
}


  @ResponseStatus(HttpStatus.OK)
  @PutMapping("/admin/categories/{id}")
   public Category updateCategory(@PathVariable Long id , @RequestBody Category updatedCategory){
     return categoryService.updateCategoryById(id, updatedCategory);
   }


  @ResponseStatus(HttpStatus.NO_CONTENT)
  @DeleteMapping("/admin/categories/{id}")
  public void deleteCategoryById(@PathVariable Long id){
     categoryService.deleteCategoryById(id);
  }

    
}
