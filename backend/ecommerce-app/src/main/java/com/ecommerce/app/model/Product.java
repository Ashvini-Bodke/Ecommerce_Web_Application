package com.ecommerce.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="product")
public class Product {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long proId;
    private String name;
    private double price;
    private String imgUrl;


    // aggregation - has a relation

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="catId",referencedColumnName="catId")
    private Category category;


    

    
    
}
