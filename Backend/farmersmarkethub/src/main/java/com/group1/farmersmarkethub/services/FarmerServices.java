package com.group1.farmersmarkethub.services;

import com.group1.farmersmarkethub.model.Farmer;
import com.group1.farmersmarkethub.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FarmerServices {

    private final FarmerRepository farmerRepo;

    @Autowired
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
