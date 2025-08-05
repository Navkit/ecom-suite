package com.example.productcatalog.service;

import com.example.productcatalog.entity.User;
import com.example.productcatalog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    private List<User> store = new ArrayList<>();

//    public UserService(){
//        store.add(new User(UUID.randomUUID().toString(),"navkit", "navkit@dev.in"));
//        store.add(new User(UUID.randomUUID().toString(),"navkit1", "navkit1@dev.in"));
//        store.add(new User(UUID.randomUUID().toString(),"navkit2", "navkit2@dev.in"));
//    }
    public List<User> getUsers(){
        return this.userRepository.findAll();
    }

    public User createUser(User user){
        user.setUserId(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return  userRepository.save(user);
    }
}
