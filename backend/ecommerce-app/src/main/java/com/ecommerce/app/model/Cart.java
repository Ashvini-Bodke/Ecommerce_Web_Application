package com.ecommerce.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name="cart")
public class Cart {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long cartId;
    private int quantity;

    @ManyToOne
    @JoinColumn(name="proId")
    private Product product;

    
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;
    
}
