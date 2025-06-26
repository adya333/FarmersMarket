package com.group1.farmersmarkethub.controller;

import com.group1.farmersmarkethub.model.Admin;
import com.group1.farmersmarkethub.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/add")
    public void addAdmin(@RequestBody Admin admin) {
        adminService.addAdmin(admin);
    }

    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @PutMapping("/update")
    public void updateAdmin(@RequestBody Admin admin) {
        adminService.updateAdmin(admin);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
    }
}
