package com.group1.farmersmarkethub.service;

import com.group1.farmersmarkethub.controller.PaymentController;
import com.group1.farmersmarkethub.model.Payment;
import com.group1.farmersmarkethub.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.List;

@Service
public class PaymentService {
   
     private static final Logger logger = LogManager.getLogger(PaymentController.class);

    @Autowired
    private PaymentRepository paymentRepo;

    public Payment processPayment(Payment payment) {
        // You can add validation, status update, etc. here
        if(payment.getStatus().equals("Paid"))
        {
            logger.info("Transaction Successful");
        }
        else if(payment.getStatus().equals("Failed"))
        {
            logger.error("Transaction Failed");
        }
        return paymentRepo.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepo.findById(id).orElse(null);
    }

    public void deletePayment(Long id) {
        paymentRepo.deleteById(id);
    }
}
