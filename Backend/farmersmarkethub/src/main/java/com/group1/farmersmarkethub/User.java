@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String username;
    private String email;
    private String phone;

    @OneToMany(mappedBy = "user")
    private List<Order> orderHistory;

    
}