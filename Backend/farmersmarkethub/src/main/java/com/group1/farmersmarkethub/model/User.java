package com.group1.farmersmarkethub.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Table
@Entity(name="users")
@Data
public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="full_name")
    private String fullName;

    @Column(name="user_name")
    private String username;

    private String email;
    private String phone;

    // @JsonManagedReference
    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    // private List<Order> orderHistory;

    
}