package com.ecommerce.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.app.model.Category;

public interface CategoryRepository  extends JpaRepository<Category, Long>{
Optional<Category> findByName(String name);
}
