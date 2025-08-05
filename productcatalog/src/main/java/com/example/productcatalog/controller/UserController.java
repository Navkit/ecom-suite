package com.example.productcatalog.controller;

import com.example.productcatalog.entity.User;
import com.example.productcatalog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
public class UserController {
    @Autowired
    private UserService userService;
    //http://localhost:8081/home/user
    @GetMapping("/users")
    public List<User> getUser() {
        System.out.println("getting users");
        return this.userService.getUsers();
    }
}
