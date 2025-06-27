package com.group1.farmersmarkethub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group1.farmersmarkethub.model.Product;
import com.group1.farmersmarkethub.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public Product addProduct(Product product) {
        return productRepo.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepo.findById(id);
    }

    public Product updateProduct(Product product) {
        return productRepo.save(product);
    }

    public void deleteProduct(Long productId) {
        productRepo.deleteById(productId);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    public List<Product> getProductsByFarmerId(Long farmerId) {
        return productRepo.findByFarmerId(farmerId);
    }
}
