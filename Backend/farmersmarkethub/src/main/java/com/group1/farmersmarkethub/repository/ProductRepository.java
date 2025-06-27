package com.group1.farmersmarkethub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group1.farmersmarkethub.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByFarmerId(Long farmerId);
    List<Product> findByStockLessThan(Integer threshold);
}
