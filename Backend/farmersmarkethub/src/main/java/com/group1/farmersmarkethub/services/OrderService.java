package com.group1.farmersmarkethub.services;

import com.group1.farmersmarkethub.model.Order;
import com.group1.farmersmarkethub.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepo;

    @Autowired
    public OrderService(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Order placeOrder(Order order) {
        return orderRepo.save(order); 
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepo.findById(orderId);
    }

    public void cancelOrder(Long orderId) {
        orderRepo.deleteById(orderId); 
    }

    public Order updateOrder(Order order) {
        return orderRepo.save(order); 
    }
}
