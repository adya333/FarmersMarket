package com.group1.farmersmarkethub.repository;

import com.group1.farmersmarkethub.model.Order;
import com.group1.farmersmarkethub.model.OrderState;
import com.group1.farmersmarkethub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);
    List<Order> findByUserId(Long userId);
    List<Order> findByState(OrderState state);
    List<Order> findByDateOfTransactionBetween(java.time.LocalDateTime start, java.time.LocalDateTime end);
}
