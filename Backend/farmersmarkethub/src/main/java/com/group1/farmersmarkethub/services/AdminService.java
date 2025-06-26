package com.group1.farmersmarkethub.services;

import com.group1.farmersmarkethub.model.Admin;
import com.group1.farmersmarkethub.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }
    public Admin updateAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
    public void deleteAdminById(Long id) {
        adminRepository.deleteById(id);
    }
}
