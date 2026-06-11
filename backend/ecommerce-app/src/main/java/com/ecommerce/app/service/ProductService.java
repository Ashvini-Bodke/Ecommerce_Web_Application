package com.ecommerce.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.app.model.Category;
import com.ecommerce.app.model.Product;
import com.ecommerce.app.repository.CategoryRepository;
import com.ecommerce.app.repository.ProductRepository;

@Service
public class ProductService {


  @Autowired
   private ProductRepository productRepository;

   @Autowired

   private CategoryRepository categoryRepository;


   public Product addProduct(Product product){

   Long catId = product.getCategory().getCatId();

   Category category = categoryRepository.findById(catId)
   .orElseThrow(()->new RuntimeException("category not found"));

    product.setCategory(category);

    return productRepository.save(product);
   }

   public List<Product> fetchAllProducts(){
    return productRepository.findAll();
   }


   public Optional<Product> fetchProductById(Long id){
     return productRepository.findById(id);
   }


   // fetch product by category
   public List<Product> fetchproductsByCatId(Long id){
    return productRepository.findByCategoryCatId(id);
   }

   public Product updateProductById(Long id, Product updatedProduct){
    Product existingProduct = productRepository.findById(id)
     .orElseThrow(()-> new RuntimeException("product not found"));

    existingProduct.setName(updatedProduct.getName());
    existingProduct.setPrice(updatedProduct.getPrice());
    existingProduct.setImgUrl(updatedProduct.getImgUrl());
    existingProduct.setCategory(updatedProduct.getCategory());


    return productRepository.save(existingProduct);
    
   }


   public void deleteproduct(Long id){
       productRepository.deleteById(id);
   }  





  
   }

