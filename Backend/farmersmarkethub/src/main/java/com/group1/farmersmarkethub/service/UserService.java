package com.group1.farmersmarkethub.service;

import com.group1.farmersmarkethub.model.User;
import com.group1.farmersmarkethub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepo;

    @Autowired
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User registerUser(User user) {
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepo.findById(id);
    }

    public User updateUser(User user) {
        return userRepo.save(user); 
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}
