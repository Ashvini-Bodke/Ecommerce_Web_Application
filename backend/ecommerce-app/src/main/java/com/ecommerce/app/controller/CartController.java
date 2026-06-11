package com.ecommerce.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.app.model.Cart;
import com.ecommerce.app.service.CartService;

@RestController
@CrossOrigin

public class CartController {

    @Autowired
    private CartService service;

    @PostMapping("cart/add")
    public Cart addToCart(@RequestParam Long userId,
                          @RequestParam Long productId,
                          @RequestParam int quantity) {
        return service.addToCart(userId, productId, quantity);
    }

    @GetMapping("cart/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return service.getCart(userId);
    }


    @PutMapping("cart/{cartId}")
public ResponseEntity<?> updateQuantity(
        @PathVariable Long cartId,
        @RequestParam int quantity) {

    return ResponseEntity.ok(service.updateQuantity(cartId, quantity));
}


@ResponseStatus(HttpStatus.NO_CONTENT)
@DeleteMapping("/cart/{cartId}")
public void deleteCart(@PathVariable Long cartId){
    service.removeCartItem(cartId);
}



@ResponseStatus(HttpStatus.NO_CONTENT)
@DeleteMapping("/cart/clear/{userId}")
public void clearCartItems(@PathVariable Long userId){
    service.clearCart(userId);
}

}


