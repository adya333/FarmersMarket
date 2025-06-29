package com.group1.farmersmarkethub.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.group1.farmersmarkethub.util.OrderState;
@Service
public class OrderStateService {
    public List<OrderState> getAllStates() {
        return Arrays.asList(OrderState.values());
    }
}
