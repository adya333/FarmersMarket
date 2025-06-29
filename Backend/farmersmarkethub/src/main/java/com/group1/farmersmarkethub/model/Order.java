package com.group1.farmersmarkethub.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.group1.farmersmarkethub.util.OrderState;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "order_products",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

    @ElementCollection
    @CollectionTable(name = "order_quantities", joinColumns = @JoinColumn(name = "order_id"))
    @MapKeyColumn(name = "product_id")
    @Column(name = "quantity")
    private Map<Long, Integer> quantities;

    @Column(name = "net_price")
    private Double netPrice;

    @Column(name = "date_of_transaction")
    private LocalDateTime dateOfTransaction;

    @Column(name = "order_state")
    @Enumerated(EnumType.STRING)
    private OrderState state;

}
