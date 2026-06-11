package com.ecommerce.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.app.model.Cart;
import com.ecommerce.app.model.Product;
import com.ecommerce.app.model.User;
import com.ecommerce.app.repository.CartRepository;
import com.ecommerce.app.repository.ProductRepository;
import com.ecommerce.app.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    public Cart addToCart(Long userId, Long productId, int quantity) {

        User user = userRepo.findById(userId).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();

        List<Cart> existingCart = cartRepo.findByUserUserId(userId);

        for (Cart c : existingCart) {
            if (c.getProduct().getProId().equals(productId)) {
                c.setQuantity(c.getQuantity() + quantity);
                return cartRepo.save(c);
            }
        }

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(quantity);

        return cartRepo.save(cart);
    }

    public List<Cart> getCart(Long userId) {
        return cartRepo.findByUserUserId(userId);
    }


    public Cart updateQuantity(Long cartId, int quantity) {

    Cart cart = cartRepo.findById(cartId)
            .orElseThrow(() -> new RuntimeException("Cart item not found"));

    // validation
    if (quantity < 1) {
        quantity = 1;
    }

    cart.setQuantity(quantity);

    return cartRepo.save(cart);
}



public void removeCartItem(Long cartId){
    cartRepo.deleteById(cartId);
}



public void clearCart(Long  userId){
    cartRepo.deleteByUserUserId(userId);
}

}
    

