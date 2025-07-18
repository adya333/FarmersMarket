package com.group1.farmersmarkethub.repository;

import com.group1.farmersmarkethub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByUsername(String username);
    List<User> findByEmail(String email);

}
