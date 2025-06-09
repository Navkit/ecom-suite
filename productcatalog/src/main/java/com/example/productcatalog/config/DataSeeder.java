package com.example.productcatalog.config;

import com.example.productcatalog.model.Category;
import com.example.productcatalog.model.Product;
import com.example.productcatalog.repository.CategoryRepository;
import com.example.productcatalog.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public DataSeeder(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
    //clear all exsiting data
//        productRepository.deleteAll();
//        categoryRepository.deleteAll();

        //crete category

        Category electronics = new Category();
        electronics.setName("Electronics");

        Category clothing = new Category();
        clothing.setName("Clothing");

        Category home = new Category();
        home.setName("Home And Electronics");
        categoryRepository.saveAll(Arrays.asList(electronics,home,clothing));

        //create products
        Product phone = new Product();
        phone.setName("Smartphone");
        phone.setDescription("latestMobile");
        phone.setImageUrl("https://placehold.co/400x400");
        phone.setPrice(700.00);
        phone.setCategory(electronics);


        Product laptop = new Product();
        laptop.setName("Laptop");
        laptop.setDescription("new Lpatops");
        laptop.setImageUrl("https://placehold.co/400x400");
        laptop.setPrice(900.00);
        laptop.setCategory(electronics);

        Product jacket = new Product();
        jacket.setName("Winter Jacket");
        jacket.setDescription("new jackets");
        jacket.setImageUrl("https://placehold.co/400x400");
        jacket.setPrice(200.00);
        jacket.setCategory(clothing);

        Product oven = new Product();
        oven.setName("Oven");
        oven.setDescription("new Oven");
        oven.setImageUrl("https://placehold.co/400x400");
        oven.setPrice(1200.00);
        oven.setCategory(home);

        productRepository.saveAll(Arrays.asList(phone,laptop,jacket,oven));

    }
}
