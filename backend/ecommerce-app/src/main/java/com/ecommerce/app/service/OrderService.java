package com.ecommerce.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.app.model.Order;
import com.ecommerce.app.repository.CartRepository;
import com.ecommerce.app.repository.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;
     


     public Order placeOrder(Order order) {

        // 1. Save order
        Order savedOrder = orderRepository.save(order);

        // 2. Clear cart
     //  cartRepository.deleteByUserUserId(order.getUser().getUserId());
       return savedOrder;

       
    }


}
