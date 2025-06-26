@Entity
public class Farmer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String username;
    private String email;
    private String phone;

    @OneToMany(mappedBy = "farmer")
    private List<Product> catalogue;

    
}