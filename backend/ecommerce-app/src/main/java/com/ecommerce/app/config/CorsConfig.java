package com.ecommerce.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class CorsConfig {

   // @Bean
   // public  CorsConfigurationSource corsConfigurationSource(){

   //  CorsConfiguration  configuration = new CorsConfiguration();
   //  configuration.addAllowedOrigin("http://localhost:5173/");
   //  configuration.AllowedMethod("GET", "POST", "PUT", "DELETE", "OPTIONS");
   //  configuration.addAllowedHeader("*");
   //  configuration.addAllowedHeader("*");

   //  UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
   //  source.registerCorsConfiguration("/**", configuration);

   //  return source;


   // }




  



    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("*");
            }
        };
    }
}

    
 
    

