package com.ecommerce.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.app.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  
    Optional<User> findByEmail(String email);
}
