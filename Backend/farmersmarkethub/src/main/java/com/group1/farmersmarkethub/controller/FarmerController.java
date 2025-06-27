package com.group1.farmersmarkethub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group1.farmersmarkethub.model.Farmer;
import com.group1.farmersmarkethub.service.FarmerServices;

@RestController
@RequestMapping("/farmers")
public class FarmerController {

    @Autowired
    private FarmerServices farmerService;

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