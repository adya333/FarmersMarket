package com.group1.farmersmarkethub.repository;

import com.group1.farmersmarkethub.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    Optional<Farmer> findByUsername(String username);
    Optional<Farmer> findByEmail(String email);
}
