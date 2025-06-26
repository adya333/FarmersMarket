@Entity
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private Integer stock;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private Farmer farmer;

    
}