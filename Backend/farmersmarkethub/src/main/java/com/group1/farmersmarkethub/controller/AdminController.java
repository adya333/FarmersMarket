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
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.group1.farmersmarkethub.model.Admin;
import com.group1.farmersmarkethub.service.AdminService;

@RestController
@RequestMapping("/admins")
public class AdminController {
    
private static final Logger logger = LogManager.getLogger(AdminController.class);
    @Autowired
    private AdminService adminService;

    @PostMapping("/add")
    public void addAdmin(@RequestBody Admin admin) {
        logger.info("Admin has been created");
        adminService.addAdmin(admin);
    }

    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @PutMapping("/update")
    public void updateAdmin(@RequestBody Admin admin) {
        adminService.updateAdmin(admin);
        logger.info("Admin updated");
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdminById(id);
        logger.warn("Admin {} deleted",id);
    }
}
