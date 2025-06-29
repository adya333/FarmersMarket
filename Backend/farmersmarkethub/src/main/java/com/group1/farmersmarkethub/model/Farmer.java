package com.group1.farmersmarkethub.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Table
@Entity(name="farmer")
@Data
public class Farmer {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="full_name")
    private String fullName;

    @Column(name="user_name")
    private String username;

    private String email;
    private String phone;

    @OneToMany
    @JoinColumn(name="farmer_id")
    private List<Product> catalogue;

    
}