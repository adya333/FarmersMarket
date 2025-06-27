package com.group1.farmersmarkethub.repository;

import com.group1.farmersmarkethub.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
