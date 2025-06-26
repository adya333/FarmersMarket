package com.group1.farmersmarkethub.service;

import com.group1.farmersmarkethub.model.OrderState;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
@Service
public class OrderStateService {
    public List<OrderState> getAllStates() {
        return Arrays.asList(OrderState.values());
    }
}
