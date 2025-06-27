package com.group1.farmersmarkethub.controller;

import com.group1.farmersmarkethub.model.Order;
import com.group1.farmersmarkethub.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private static final Logger logger = LogManager.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public void placeOrder(@RequestBody Order order) {
        orderService.placeOrder(order);
        logger.info("Order placed");
    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @DeleteMapping("/cancel/{id}")
    public void cancelOrder(@PathVariable Long id) {
        orderService.cancelOrder(id);
        logger.warn("Order {} CANCELLED", id);
    }

    @PutMapping("/status/{id}")
    public Order updateOrder(@RequestBody Order order)
    {
         logger.info("Order Updated");
         return orderService.updateOrder(order);
    }
}

