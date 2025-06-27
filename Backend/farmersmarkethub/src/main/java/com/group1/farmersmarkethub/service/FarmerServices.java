package com.group1.farmersmarkethub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group1.farmersmarkethub.model.Farmer;
import com.group1.farmersmarkethub.repository.FarmerRepository;

@Service
public class FarmerServices {

    @Autowired
    private final FarmerRepository farmerRepo;

    public FarmerServices(FarmerRepository farmerRepo) {
        this.farmerRepo = farmerRepo;
    }

    public Farmer registerFarmer(Farmer farmer) {
        return farmerRepo.save(farmer);
    }

    public List<Farmer> listAllFarmers() {
        return farmerRepo.findAll();
    }

    public Optional<Farmer> getFarmerById(Long id) {
        return farmerRepo.findById(id);
    }

    public Farmer updateFarmer(Farmer farmer) {
        return farmerRepo.save(farmer);
    }

    public void deleteFarmer(Long farmerId) {
        farmerRepo.deleteById(farmerId);
    }
}
