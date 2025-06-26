package com.group1.farmersmarkethub.controller;

import com.group1.farmersmarkethub.model.Farmer;
import com.group1.farmersmarkethub.service.FarmerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/farmers")
public class FarmerController {

    @Autowired
    private FarmerService farmerService;

    @PostMapping("/register")
    public void registerFarmer(@RequestBody Farmer farmer) {
        farmerService.registerFarmer(farmer);
    }

    @GetMapping("/all")
    public List<Farmer> getAllFarmers() {
        return farmerService.listAllFarmers();
    }

    @PutMapping("/update")
    public void updateFarmer(@RequestBody Farmer farmer) {
        farmerService.updateFarmer(farmer);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFarmer(@PathVariable Long id) {
        farmerService.deleteFarmer(id);
    }
}