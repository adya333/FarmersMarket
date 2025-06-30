package com.group1.farmersmarkethub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group1.farmersmarkethub.model.Order;
import com.group1.farmersmarkethub.model.User;
import com.group1.farmersmarkethub.util.OrderState;
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);
    List<Order> findByUserId(Long userId);
    List<Order> findByState(OrderState state);
    List<Order> findByDateOfTransactionBetween(java.time.LocalDateTime start, java.time.LocalDateTime end);
}
