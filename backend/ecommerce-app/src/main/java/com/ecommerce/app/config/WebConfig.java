// package com.ecommerce.app.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebConfig implements WebMvcConfigurer {
//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**") // Apply to all paths
//                 .allowedOrigins("https://localhost:5173") // Specific domain
//                 .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
//                 .allowCredentials(true); // Allow credentials
//     }
// }
