package com.example.productcatalog.service;

import com.example.productcatalog.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private List<User> store = new ArrayList<>();

    public UserService(){
        store.add(new User(UUID.randomUUID().toString(),"navkit", "navkit@dev.in"));
        store.add(new User(UUID.randomUUID().toString(),"navkit1", "navkit1@dev.in"));
        store.add(new User(UUID.randomUUID().toString(),"navkit2", "navkit2@dev.in"));
    }
    public List<User> getUsers(){
        return this.store;
    }
}
