document.addEventListener("DOMContentLoaded", () => {
  const productListContainer = document.getElementById("productList");
  const productSearchInput = document.getElementById("productSearch");
  const categoryFilterSelect = document.getElementById("categoryFilter");
  const statusFilterSelect = document.getElementById("statusFilter");
  const noProductsMessage = document.getElementById("noProductsMessage");

  // --- Dummy Data (In a real app, this would come from your backend API) ---
  // Added 'farmerName' to each product
  let products = [
    {
      id: "prod001",
      name: "Organic Tomatoes",
      category: "Vegetables",
      price: 50,
      unit: "kg",
      stock: 100,
      description:
        "Freshly harvested organic tomatoes, perfect for salads and cooking.",
      image:
        "https://seed2plant.in/cdn/shop/products/tomatoseeds.jpg?v=1604033216",
      status: "active",
      farmerName: "Farmer Gopal", // Added farmer name
    },
    {
      id: "prod002",
      name: "Farm Fresh Potatoes",
      category: "Vegetables",
      price: 35,
      unit: "kg",
      stock: 200,
      description: "Locally grown potatoes, great for all culinary uses.",
      image:
        "https://media.istockphoto.com/id/530514284/photo/potatoes-in-the-farm.jpg?s=612x612&w=0&k=20&c=YE5hCCpeyOYytHuV_H8BBjbb0doK21Ukv0Dl_48862Y=",
      status: "active",
      farmerName: "Farmer Ramesh", // Added farmer name
    },
    {
      id: "prod003",
      name: "Pure Cow Milk",
      category: "Dairy",
      price: 60,
      unit: "L",
      stock: 15, // Low stock example
      description: "Unprocessed, pure cow milk from our dairy farm.",
      image:
        "https://5.imimg.com/data5/ANDROID/Default/2021/8/MS/ZW/EN/83330732/product-jpeg-500x500.jpg",
      status: "low_stock",
      farmerName: "Dairy Farms Inc.", // Added farmer name
    },
    {
      id: "prod004",
      name: "Organic Eggs",
      category: "Dairy & Poultry",
      price: 80,
      unit: "dozen",
      stock: 0, // Out of stock example
      description: "Free-range organic eggs, rich in protein.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDWUJkTSHcu8BnLS4HyHSx5xgPnAPp1MR4ejUY8iR4VK-M-ifYLQf4tcPY1WdsdBPLgCU&usqp=CAU",
      status: "out_of_stock",
      farmerName: "Poultry Paradise", // Added farmer name
    },
    {
      id: "prod005",
      name: "Fresh Cabbage",
      category: "Vegetables",
      price: 40,
      unit: "kg",
      stock: 120,
      description: "Crisp and fresh green cabbage.",
      image:
        "https://assets.clevelandclinic.org/transform/LargeFeatureImage/871f96ae-a852-4801-8675-683191ce372d/Benefits-Of-Cabbage-589153824-770x533-1_jpg",
      status: "active",
      farmerName: "Green Harvest Farm", // Added farmer name
    },
    {
      id: "prod006",
      name: "Homemade Ghee",
      category: "Dairy",
      price: 450,
      unit: "500g",
      stock: 20,
      description: "Traditional homemade ghee, rich in flavor.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsDjQjdwh2Wm1u2TwpgdFR9L72IVmHiQP6jA&s",
      status: "active",
      farmerName: "Grandma's Kitchen", // Added farmer name
    },
    {
      id: "prod007",
      name: "Organic Brown Rice",
      category: "Grains & Cereals",
      price: 120,
      unit: "kg",
      stock: 50,
      description: "Nutritious organic brown rice, directly from the farm.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYGM4vuFwX4yewh89Dz1EZ-GgKXhLSjR6i0g&s",
      status: "active",
      farmerName: "Golden Grains Farm", // Added farmer name
    },
    {
      id: "prod008",
      name: "Fresh Mustard Greens",
      category: "Vegetables",
      price: 30,
      unit: "bunch",
      stock: 75,
      description: "Crisp, slightly peppery mustard greens.",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2024/2/393461958/LY/VC/CX/51509864/fresh-mustard-green.jpeg",
      status: "active",
      farmerName: "Local Greens Co.", // Added farmer name
    },
  ];

  // Get unique categories for filtering
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Populate category filters
  function populateCategoryFilters() {
    categoryFilterSelect.innerHTML =
      '<option value="all">All Categories</option>';
    categories.forEach((category) => {
      if (category !== "All") {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilterSelect.appendChild(option);
      }
    });
  }

  // --- Product Card Rendering ---
  function renderProducts(filteredProducts) {
    productListContainer.innerHTML = ""; // Clear existing products
    if (filteredProducts.length === 0) {
      noProductsMessage.style.display = "block";
      return;
    } else {
      noProductsMessage.style.display = "none";
    }

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      // Determine status class for styling
      let statusClass = "";
      switch (product.status) {
        case "active":
          statusClass = "status-active";
          break;
        case "inactive":
          statusClass = "status-inactive";
          break;
        case "low_stock":
          statusClass = "status-low_stock";
          break;
        case "out_of_stock":
          statusClass = "status-out_of_stock";
          break;
        default:
          statusClass = "";
      }

      productCard.innerHTML = `
        <img src="${
          product.image || "https://via.placeholder.com/280x180?text=No+Image"
        }" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="farmer-name">By: ${
            product.farmerName
          }</p> <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Stock:</strong> ${product.stock} ${product.unit}</p>
          <p class="product-price">₹${product.price.toFixed(2)} / ${
        product.unit
      }</p>
          <span class="product-status ${statusClass}">${product.status
        .replace(/_/g, " ")
        .toUpperCase()}</span>
        </div>
      `;
      productListContainer.appendChild(productCard);
    });
  }

  // --- Filtering and Searching Logic ---
  function filterAndSearchProducts() {
    const searchTerm = productSearchInput.value.toLowerCase();
    const selectedCategory = categoryFilterSelect.value;
    const selectedStatus = statusFilterSelect.value;

    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.farmerName.toLowerCase().includes(searchTerm); // Also search by farmer name

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" || product.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    renderProducts(filtered);
  }

  // --- Event Listeners ---
  productSearchInput.addEventListener("keyup", filterAndSearchProducts);
  categoryFilterSelect.addEventListener("change", filterAndSearchProducts);
  statusFilterSelect.addEventListener("change", filterAndSearchProducts);

  // --- Initial Load ---
  populateCategoryFilters();
  filterAndSearchProducts(); // Render all products initially
});
