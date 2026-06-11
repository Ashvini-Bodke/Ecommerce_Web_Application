package com.ecommerce.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.app.model.Order;
import com.ecommerce.app.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
    

    @Autowired
    private OrderService orderService;


@PostMapping
public Order placeOrder(@RequestBody Order order) {
 return   orderService.placeOrder(order);

   
}

}
