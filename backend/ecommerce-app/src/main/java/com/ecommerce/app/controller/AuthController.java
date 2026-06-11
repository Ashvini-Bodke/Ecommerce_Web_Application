package com.ecommerce.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.app.model.User;
import com.ecommerce.app.service.UserService;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;

  @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user){
        return userService.loginUser(user.getEmail(), user.getPassword());
    }

    
}
