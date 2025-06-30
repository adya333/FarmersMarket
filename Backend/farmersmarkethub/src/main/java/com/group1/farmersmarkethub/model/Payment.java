package com.group1.farmersmarkethub.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity(name="payments")
@Table
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="payment_method")
    private String paymentMethod; // e.g., "Credit Card", "UPI", etc.

    @Column(name="transaction_id")
    private String transactionId;

    private double amount;

    @Column(name="payment_time")
    private LocalDateTime paymentTime;
    
    private String status; // e.g., "PAID", "FAILED", "PENDING"

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
    
}
