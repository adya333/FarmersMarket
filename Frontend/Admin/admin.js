document.addEventListener('DOMContentLoaded', function() {
  // Load sidebar
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    fetch('sidebar.html')
      .then(response => response.text())
      .then(html => {
        sidebarContainer.innerHTML = html;
        if (window.innerWidth < 768) {
          document.querySelector('.sidebar')?.classList.remove('active');
        }
      })
      .catch(error => console.error('Failed to load sidebar:', error));
  }

  // Toggle sidebar
  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      const sidebar = document.querySelector('.sidebar');
      const containerRow = document.querySelector('.container-fluid > .row');
      
      if (sidebar) sidebar.classList.toggle('active');
      if (containerRow) containerRow.classList.toggle('sidebar-open');
    });
  }

  let allOrders = []; // Store all orders
  let filteredOrders = []; // Store filtered orders
  const itemsPerPage = 10;
  let currentPage = 1;

  // Load orders with pagination and filtering
  function loadOrders() {
      fetch('orders.json')
        .then(response => response.json())
        .then(orders => {
          allOrders = orders;
          applyFilters(); // Initial load with all orders
        })
        .catch(error => console.error('Error loading orders:', error));
  }
  
  // Apply filters and pagination
  function applyFilters() {
    const customerFilter = document.getElementById('customerFilter').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const amountFilter = document.getElementById('amountFilter').value.toLowerCase();
    
    filteredOrders = allOrders.filter(order => {
      return (
        (customerFilter === '' || order.customer.toLowerCase().includes(customerFilter)) &&
        (statusFilter === '' || order.status === statusFilter) &&
        (amountFilter === '' || order.amount.toLowerCase().includes(amountFilter))
      );
    });
      
    renderTable();
    updatePagination();
  }
  
  // Render table with current page data
  function renderTable() {
    const tableBody = document.getElementById('ordersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const ordersToShow = filteredOrders.slice(startIndex, endIndex);
    
    ordersToShow.forEach(order => {
      const row = document.createElement('tr');
      row.setAttribute('data-order-id', order.orderId);
      
      row.innerHTML = `
        <td>${order.orderId}</td>
        <td>${order.customer}</td>
        <td>${order.items}</td>
        <td>${order.amount}</td>
        <td><span class="badge status-badge status-${order.status}">
          ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span></td>
        <td><button class="btn btn-sm btn-outline-primary update-btn">Update</button></td>
      `;
      
      tableBody.appendChild(row);
    });
  }
  
  // Update pagination controls
  function updatePagination() {
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const pagination = document.querySelector('.pagination');
    
    // Clear existing page numbers (except prev/next)
    const existingPages = document.querySelectorAll('.pagination .page-item:not(#prevPage):not(#nextPage)');
    existingPages.forEach(page => page.remove());
    
    // Add page numbers in correct order
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    
    // Create a document fragment to hold our page items
    const fragment = document.createDocumentFragment();
    
    // Add page numbers in ascending order (1, 2, 3...)
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      
      pageItem.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = i;
        renderTable();
        updatePagination();
      });
      
      fragment.appendChild(pageItem);
    }
    
    // Insert all page numbers at once between prev and next buttons
    prevPage.after(fragment);
    
    // Update prev/next buttons
    prevPage.classList.toggle('disabled', currentPage === 1);
    nextPage.classList.toggle('disabled', currentPage === totalPages);
  }
  
  // Event listeners for pagination
  document.getElementById('prevPage').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderTable();
      updatePagination();
    }
  });
  
  document.getElementById('nextPage').addEventListener('click', (e) => {
    e.preventDefault();
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
      updatePagination();
    }
  });
  
  // Event listeners for filters
  document.getElementById('customerFilter').addEventListener('input', () => {
    currentPage = 1;
    applyFilters();
  });
  
  document.getElementById('statusFilter').addEventListener('change', () => {
    currentPage = 1;
    applyFilters();
  });
  
  document.getElementById('amountFilter').addEventListener('input', () => {
    currentPage = 1;
    applyFilters();
  });
  
  document.getElementById('resetFilters').addEventListener('click', () => {
    document.getElementById('customerFilter').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('amountFilter').value = '';
    currentPage = 1;
    applyFilters();
  });

  // Call the function to load orders
  loadOrders();

  // Status Update System - Using event delegation
  let currentOrderRow = null;

  // Handle click on dynamically created update buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('update-btn')) {
      e.preventDefault();
      e.stopPropagation();
      
      currentOrderRow = e.target.closest('tr');
      const badge = currentOrderRow?.querySelector('.status-badge');
      
      if (badge) {
        const currentStatus = badge.className.match(/status-\w+/)?.[0]?.replace('status-', '');
        const statusSelect = document.getElementById('statusOption');
        const validationMessage = document.getElementById('statusValidation');
        
        // Reset modal state
        statusSelect.value = currentStatus || '';
        statusSelect.classList.remove('is-invalid');
        validationMessage.textContent = '';
          
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('statusModal'));
        modal.show();
      }
    }
  });

  // Save status handler
  const saveStatusBtn = document.getElementById('saveStatus');
  if (saveStatusBtn) {
    saveStatusBtn.addEventListener('click', function() {
      if (!currentOrderRow) return;
      
      const statusSelect = document.getElementById('statusOption');
      const newStatus = statusSelect.value;
      const validationMessage = document.getElementById('statusValidation');
      
      // Validate selection
      if (!newStatus) {
        statusSelect.classList.add('is-invalid');
        validationMessage.textContent = 'Please select a status';
        return;
      }
      
      const badge = currentOrderRow.querySelector('.status-badge');
      
      if (badge) {
        // Update Status
        badge.className = 'badge status-badge'; // Reset classes
        badge.classList.add(`status-${newStatus}`);
        badge.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
        
        // Hide modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('statusModal'));
        modal.hide();
        
        // Visual feedback
        badge.style.transform = 'scale(1.1)';
        badge.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        setTimeout(() => {
          badge.style.transform = '';
          badge.style.boxShadow = '';
        }, 200);

        // Clear currentOrderRow only after animation completes
        setTimeout(() => {
          currentOrderRow = null;
        }, 200);
      }
    });
  }

  // Chart.js Initialization
  try {
    const ctx = document.getElementById('ordersChart')?.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Orders This Week',
            data: [5, 9, 7, 8, 6, 12, 10],
            borderColor: '#208a25',
            backgroundColor: 'rgba(32, 138, 37, 0.1)',
            tension: 0.4,
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  } catch (e) {
    console.error("Chart initialization failed:", e);
  }
});

// Users Management System
document.addEventListener('DOMContentLoaded', function() {
  // Load data
  let allFarmers = [];
  let allUsers = [];
  const itemsPerPage = 10;
  
  // Farmers data
  let filteredFarmers = [];
  let currentFarmerPage = 1;
  
  // Users data
  let filteredUsers = [];
  let currentUserPage = 1;
  
  // Current user to delete
  let userToDelete = null;
  
  // Load data from JSON
  function loadUserData() {
    fetch('users.json')
      .then(response => response.json())
      .then(data => {
        allFarmers = data.farmers || [];
        allUsers = data.users || [];
        applyFarmerFilters();
        applyUserFilters();
      })
      .catch(error => console.error('Error loading user data:', error));
  }
  
  // Farmers functions
  function applyFarmerFilters() {
    const searchTerm = document.getElementById('farmerSearch').value.toLowerCase();
    
    filteredFarmers = allFarmers.filter(farmer => {
      return (
        farmer.id.toString().includes(searchTerm) ||
        farmer.name.toLowerCase().includes(searchTerm) ||
        farmer.email.toLowerCase().includes(searchTerm)
      );
    });
    
    renderFarmersTable();
    updateFarmerPagination();
  }
  
  function renderFarmersTable() {
    const tableBody = document.getElementById('farmersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    const startIndex = (currentFarmerPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const farmersToShow = filteredFarmers.slice(startIndex, endIndex);
    
    farmersToShow.forEach(farmer => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${farmer.id}</td>
        <td>${farmer.name}</td>
        <td>${farmer.email}</td>
        <td>${farmer.location || 'N/A'}</td>
        <td><button class="btn btn-sm btn-danger delete-btn" data-id="${farmer.id}" data-type="farmer">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
    
    // Add delete event listeners
    document.querySelectorAll('#farmersTableBody .delete-btn').forEach(btn => {
      btn.addEventListener('click', handleDeleteClick);
    });
  }
  
  function updateFarmerPagination() {
    const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);
    updatePagination('farmer', totalPages, currentFarmerPage);
  }
  
  // Users functions
  function applyUserFilters() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    
    filteredUsers = allUsers.filter(user => {
      return (
        user.id.toString().includes(searchTerm) ||
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    });
    
    renderUsersTable();
    updateUserPagination();
  }
  
  function renderUsersTable() {
    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    const startIndex = (currentUserPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usersToShow = filteredUsers.slice(startIndex, endIndex);
    
    usersToShow.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.orders || '0'} orders</td>
        <td><button class="btn btn-sm btn-danger delete-btn" data-id="${user.id}" data-type="user">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
    
    // Add delete event listeners
    document.querySelectorAll('#usersTableBody .delete-btn').forEach(btn => {
      btn.addEventListener('click', handleDeleteClick);
    });
  }
  
  function updateUserPagination() {
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    updatePagination('user', totalPages, currentUserPage);
  }
  
  // Common pagination function
  function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pagination = document.querySelector('.pagination');
    
    // Clear existing page numbers (except prev/next)
    const existingPages = document.querySelectorAll('.pagination .page-item:not(#prevPage):not(#nextPage)');
    existingPages.forEach(page => page.remove());
    
    // Add page numbers in correct order
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    
    // Create a document fragment to hold our page items
    const fragment = document.createDocumentFragment();
    
    // Add page numbers in ascending order (1, 2, 3...)
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      
      pageItem.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = i;
        renderProductsTable();
        updatePagination();
      });
      
      fragment.appendChild(pageItem);
    }
    
    // Insert all page numbers at once between prev and next buttons
    prevPage.after(fragment);
    
    // Update prev/next buttons
    prevPage.classList.toggle('disabled', currentPage === 1);
    nextPage.classList.toggle('disabled', currentPage === totalPages);
    
    // Ensure next button stays at the end
    if (nextPage.parentNode) {
      nextPage.parentNode.appendChild(nextPage);
    }
  }
  
  // Delete functionality
  function handleDeleteClick(e) {
    e.preventDefault();
    userToDelete = {
      id: e.target.getAttribute('data-id'),
      type: e.target.getAttribute('data-type')
    };
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
  }
  
  // Event listeners
  document.getElementById('farmerSearch').addEventListener('input', () => {
    currentFarmerPage = 1;
    applyFarmerFilters();
  });
  
  document.getElementById('userSearch').addEventListener('input', () => {
    currentUserPage = 1;
    applyUserFilters();
  });
  
  document.getElementById('resetFarmerFilters').addEventListener('click', () => {
    document.getElementById('farmerSearch').value = '';
    currentFarmerPage = 1;
    applyFarmerFilters();
  });
  
  document.getElementById('resetUserFilters').addEventListener('click', () => {
    document.getElementById('userSearch').value = '';
    currentUserPage = 1;
    applyUserFilters();
  });
  
  document.getElementById('prevFarmerPage').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentFarmerPage > 1) {
      currentFarmerPage--;
      renderFarmersTable();
      updateFarmerPagination();
    }
  });
  
  document.getElementById('nextFarmerPage').addEventListener('click', (e) => {
    e.preventDefault();
    const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);
    if (currentFarmerPage < totalPages) {
      currentFarmerPage++;
      renderFarmersTable();
      updateFarmerPagination();
    }
  });
  
  document.getElementById('prevUserPage').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUserPage > 1) {
      currentUserPage--;
      renderUsersTable();
      updateUserPagination();
    }
  });
  
  document.getElementById('nextUserPage').addEventListener('click', (e) => {
    e.preventDefault();
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    if (currentUserPage < totalPages) {
      currentUserPage++;
      renderUsersTable();
      updateUserPagination();
    }
  });
  
  document.getElementById('confirmDelete').addEventListener('click', () => {
    if (!userToDelete) return;
    
    if (userToDelete.type === 'farmer') {
      allFarmers = allFarmers.filter(f => f.id !== userToDelete.id);
      applyFarmerFilters();
    } else {
      allUsers = allUsers.filter(u => u.id !== userToDelete.id);
      applyUserFilters();
    }
    
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
    userToDelete = null;
  });
  
  // Initialize
  loadUserData();
});

// products implementation
document.addEventListener('DOMContentLoaded', function() {
  let allProducts = [];
  let filteredProducts = [];
  let currentProduct = null;
  const itemsPerPage = 10;
  let currentPage = 1;

  // Load product data from JSON
  function loadProducts() {
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        allProducts = data.map(product => ({
          id: product.product_id,
          name: product.name,
          category: product.category,
          farmer: product.farmer,
          price: product.price,
          quantity: product.quantity,
          status: product.status.toLowerCase() // Ensure lowercase for consistency
        }));
        applyFilters();
      })
      .catch(error => console.error('Error loading products:', error));
  }

  // Apply filters and search
  function applyFilters() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const stockFilter = document.getElementById('stockFilter').value;

    filteredProducts = allProducts.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm) ||
        product.farmer.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm);
      
      const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
      
      let matchesStock = true;
      if (stockFilter === 'in-stock') {
        matchesStock = product.quantity > 0;
      } else if (stockFilter === 'out-of-stock') {
        matchesStock = product.quantity <= 0;
      }
      
      return matchesSearch && matchesCategory && matchesStock;
    });

    renderProductsTable();
    updatePagination();
  }

  // Render products table
  function renderProductsTable() {
    const tableBody = document.getElementById('productsTableBody');
    tableBody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No products found</td></tr>`;
      return;
    }
    
    productsToShow.forEach(product => {
      const isInStock = product.status === 'in-stock'; // Check status field
      const statusClass = isInStock ? 'bg-success' : 'bg-danger';
      const statusText = isInStock ? 'In Stock' : 'Out of Stock';
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.farmer}</td>
        <td>₹${product.price.toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>
          <span class="badge ${statusClass}">${statusText}</span>
        </td>
        <td>
          <button class="btn btn-sm btn-primary view-btn" 
                  data-id="${product.id}"
                  data-name="${product.name}"
                  data-farmer="${product.farmer}"
                  data-category="${product.category}"
                  data-price="${product.price}"
                  data-quantity="${product.quantity}"
                  data-status="${product.status}">
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', handleViewClick);
    });
  }

  // Handle view button click
  function handleViewClick(e) {
    const btn = e.currentTarget;
    const isInStock = btn.getAttribute('data-status') === 'in-stock';
    
    currentProduct = {
      id: btn.getAttribute('data-id'),
      name: btn.getAttribute('data-name'),
      farmer: btn.getAttribute('data-farmer'),
      category: btn.getAttribute('data-category'),
      price: btn.getAttribute('data-price'),
      quantity: parseInt(btn.getAttribute('data-quantity')),
      status: btn.getAttribute('data-status')
    };

    // Update view modal
    document.getElementById('viewProductId').textContent = currentProduct.id;
    document.getElementById('viewProductName').textContent = currentProduct.name;
    document.getElementById('viewProductFarmer').textContent = currentProduct.farmer;
    document.getElementById('viewProductCategory').textContent = currentProduct.category;
    document.getElementById('viewProductPrice').textContent = currentProduct.price;
    document.getElementById('viewProductQuantity').textContent = currentProduct.quantity;
    
    const statusBadge = document.getElementById('viewProductStatus');
    statusBadge.textContent = isInStock ? 'In Stock' : 'Out of Stock';
    statusBadge.className = 'badge ' + (isInStock ? 'bg-success' : 'bg-danger');

    // Show/hide notify button
    document.getElementById('notifyFarmerBtn').style.display = 
      isInStock ? 'none' : 'block';

    new bootstrap.Modal(document.getElementById('viewProductModal')).show();
  }

  // Update pagination controls
  function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginationContainer = document.getElementById('productsPagination');
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    
    // Clear existing page numbers (except prev/next)
    const existingPages = paginationContainer.querySelectorAll('.page-item:not(#prevPage):not(#nextPage)');
    existingPages.forEach(page => page.remove());
    
    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      
      pageItem.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = i;
        renderProductsTable();
      });
      
      prevPage.after(pageItem);
    }
    
    // Update prev/next buttons
    prevPage.classList.toggle('disabled', currentPage === 1);
    nextPage.classList.toggle('disabled', currentPage === totalPages || totalPages === 0);
  }

  // Initialize event listeners
  function setupEventListeners() {
    // Delete product from view modal
    document.getElementById('deleteProductBtn').addEventListener('click', () => {
      document.getElementById('deleteProductName').textContent = currentProduct.name;
      bootstrap.Modal.getInstance(document.getElementById('viewProductModal')).hide();
      new bootstrap.Modal(document.getElementById('deleteConfirmModal')).show();
    });

    // Notify farmer from view modal
    document.getElementById('notifyFarmerBtn').addEventListener('click', () => {
      document.getElementById('farmerName').textContent = currentProduct.farmer;
      document.getElementById('productName').textContent = currentProduct.name;
      bootstrap.Modal.getInstance(document.getElementById('viewProductModal')).hide();
      new bootstrap.Modal(document.getElementById('notifyModal')).show();
    });

    // Confirm delete
    document.getElementById('confirmDelete').addEventListener('click', () => {
      allProducts = allProducts.filter(p => p.id !== currentProduct.id);
      applyFilters();
      bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
      alert(`Product "${currentProduct.name}" deleted successfully`);
    });

    // Confirm notification
    document.getElementById('confirmNotify').addEventListener('click', () => {
      const message = document.getElementById('notificationMessage').value || 
                     `Your product ${currentProduct.name} is out of stock. Please restock.`;
      
      // Here you would typically send this to your backend
      console.log(`Notification sent to ${currentProduct.farmer}:`, message);
      bootstrap.Modal.getInstance(document.getElementById('notifyModal')).hide();
      alert(`Notification sent to ${currentProduct.farmer}`);
    });

    // Filter event listeners
    document.getElementById('productSearch').addEventListener('input', () => {
      currentPage = 1;
      applyFilters();
    });

    document.getElementById('categoryFilter').addEventListener('change', () => {
      currentPage = 1;
      applyFilters();
    });

    document.getElementById('stockFilter').addEventListener('change', () => {
      currentPage = 1;
      applyFilters();
    });

    document.getElementById('resetProductFilters').addEventListener('click', () => {
      document.getElementById('productSearch').value = '';
      document.getElementById('categoryFilter').value = '';
      document.getElementById('stockFilter').value = '';
      currentPage = 1;
      applyFilters();
    });

    // Pagination controls
    document.getElementById('prevPage').addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        renderProductsTable();
        updatePagination();
      }
    });

    document.getElementById('nextPage').addEventListener('click', (e) => {
      e.preventDefault();
      const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderProductsTable();
        updatePagination();
      }
    });
  }

  // Initialize
  loadProducts();
  setupEventListeners();
});