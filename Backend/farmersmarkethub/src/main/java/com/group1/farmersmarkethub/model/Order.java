@Entity
@Table(name = "orders")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    private List<Product> products;

    @ElementCollection
    private List<Integer> quantities;

    private Double netPrice;

    private LocalDateTime dateOfTransaction;

    @Enumerated(EnumType.STRING)
    private OrderState state;

    
}