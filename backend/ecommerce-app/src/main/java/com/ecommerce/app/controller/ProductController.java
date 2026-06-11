package com.ecommerce.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.app.model.Product;
import com.ecommerce.app.service.ProductService;

@RestController
public class ProductController {


    @Autowired
    private ProductService productService;


    @PostMapping("/admin/products")
    @ResponseStatus(HttpStatus.CREATED)
    public Product addProduct(@RequestBody Product product){
        return productService.addProduct(product);

    }

    @GetMapping("/products")
    @ResponseStatus(HttpStatus.OK)
    public List<Product> fetchAllProduct(){
        return productService.fetchAllProducts();
    }

    @GetMapping("/products/{id}")
     @ResponseStatus(HttpStatus.OK)
    public Optional<Product> fetchproductById(@PathVariable Long id){
        return productService.fetchProductById(id);
    }

   
    @GetMapping("/products/categories/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Product> getProductByCategory(@PathVariable Long id){
      return productService.fetchproductsByCatId(id);
    }



    
    @PutMapping("/admin/products/{id}")
     @ResponseStatus(HttpStatus.OK)
    public Product updateProductById(@PathVariable Long id,@RequestBody Product updatedProduct){
        return productService.updateProductById(id, updatedProduct);

    }


    @DeleteMapping("/admin/products/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id){
        productService.deleteproduct(id);
    }

 




    
    
}
