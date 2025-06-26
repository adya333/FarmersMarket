package com.group1.farmersmarkethub.repository;

import model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface productRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByFarmerId(Long farmerId);
    List<Product> findByStockLessThan(Integer threshold);
}
