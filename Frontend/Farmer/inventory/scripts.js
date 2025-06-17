const categories = [
  "Vegetables",
  "Fruits",
  "Grains",
  "Dairy",
  "Herbs",
  "Spices",
  "Flowers",
];
const productTableBody = document.querySelector("#inventoryTable tbody");
const productCategory = document.getElementById("productCategory");
const editProductCategory = document.getElementById("editProductCategory");
const productUnit = document.getElementById("productUnit");
const editProductUnit = document.getElementById("editProductUnit");
const productStatus = document.getElementById("productStatus");
const editProductStatus = document.getElementById("editProductStatus");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resetFiltersButton = document.getElementById("resetFilters");

let products = JSON.parse(localStorage.getItem("agribazaarProducts")) || [];

function populateCategoryOptions(selectElement) {
  selectElement.innerHTML = categories
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join("");
}

function populateFilterCategories(selectElement) {
  selectElement.innerHTML =
    `<option value="">All Categories</option>` +
    categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("");
}

populateCategoryOptions(productCategory);
populateCategoryOptions(editProductCategory);
populateFilterCategories(categoryFilter);

// Function to render products to the table
function renderProducts(filteredProducts = products) {
  productTableBody.innerHTML = ""; // Clear existing rows
  filteredProducts.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.unit}</td>
            <td><span class="badge bg-${
              product.status === "Available" ? "success" : "danger"
            }">${product.status}</span></td>
            <td>${product.lastUpdated}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 edit-btn" data-index="${index}"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Delete</button>
            </td>
        `;
    productTableBody.appendChild(row);
  });
}

// Initial render
renderProducts();

// Add Product Form Submission
document
  .getElementById("addProductForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const newProduct = {
      name: document.getElementById("productName").value,
      category: productCategory.value,
      price: parseFloat(document.getElementById("productPrice").value),
      stock: parseFloat(document.getElementById("productStock").value),
      unit: productUnit.value,
      status: productStatus.value,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    products.push(newProduct);
    localStorage.setItem("agribazaarProducts", JSON.stringify(products));
    renderProducts();
    e.target.reset();
    bootstrap.Modal.getInstance(
      document.getElementById("addProductModal")
    ).hide();
  });

// Edit and Delete functionality
productTableBody.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("delete-btn") ||
    e.target.closest(".delete-btn")
  ) {
    const button = e.target.classList.contains("delete-btn")
      ? e.target
      : e.target.closest(".delete-btn");
    const index = button.dataset.index;
    if (confirm("Are you sure you want to delete this product?")) {
      products.splice(index, 1);
      localStorage.setItem("agribazaarProducts", JSON.stringify(products));
      renderProducts();
    }
  }

  if (
    e.target.classList.contains("edit-btn") ||
    e.target.closest(".edit-btn")
  ) {
    const button = e.target.classList.contains("edit-btn")
      ? e.target
      : e.target.closest(".edit-btn");
    const index = button.dataset.index;
    const productToEdit = products[index];

    document.getElementById("editRowIndex").value = index;
    document.getElementById("editProductName").value = productToEdit.name;
    document.getElementById("editProductCategory").value =
      productToEdit.category;
    document.getElementById("editProductPrice").value = productToEdit.price;
    document.getElementById("editProductStock").value = productToEdit.stock;
    document.getElementById("editProductUnit").value = productToEdit.unit;
    document.getElementById("editProductStatus").value = productToEdit.status;

    new bootstrap.Modal(document.getElementById("editProductModal")).show();
  }
});

// Edit Product Form Submission
document
  .getElementById("editProductForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const index = document.getElementById("editRowIndex").value;
    products[index] = {
      name: document.getElementById("editProductName").value,
      category: editProductCategory.value,
      price: parseFloat(document.getElementById("editProductPrice").value),
      stock: parseFloat(document.getElementById("editProductStock").value),
      unit: editProductUnit.value,
      status: editProductStatus.value,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    localStorage.setItem("agribazaarProducts", JSON.stringify(products));
    renderProducts();
    bootstrap.Modal.getInstance(
      document.getElementById("editProductModal")
    ).hide();
  });

// Filter and Search Logic
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
resetFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "";
  renderProducts();
});
