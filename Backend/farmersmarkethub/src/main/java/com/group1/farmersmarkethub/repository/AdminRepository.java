package com.group1.farmersmarkethub.repository;

import com.group1.farmersmarkethub.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
    List<Admin> findByUsername(String username);
}
