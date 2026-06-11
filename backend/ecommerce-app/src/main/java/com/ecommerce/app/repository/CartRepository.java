package com.ecommerce.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.app.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
     
         List<Cart> findByUserUserId(Long userId);
         void deleteByUserUserId(Long userId);
}
