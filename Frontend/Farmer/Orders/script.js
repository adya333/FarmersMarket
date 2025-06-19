const orders = [
  { id: '#001', product: 'Tomato', qty: '10kg', price: '₹500', customer: 'Raj', date: '2025-06-01', status: 'Confirmation Pending', txn: '--' },
  { id: '#002', product: 'Potato', qty: '20kg', price: '₹700', customer: 'Aman', date: '2025-06-01', status: 'On the Way', txn: 'TXN124' },
  { id: '#003', product: 'Milk', qty: '15L', price: '₹1,300', customer: 'Sneha', date: '2025-06-02', status: 'Delivered', txn: 'TXN125' },
  { id: '#004', product: 'Onion', qty: '12kg', price: '₹480', customer: 'Ravi', date: '2025-06-03', status: 'Delivered', txn: 'TXN126' },
  { id: '#005', product: 'Carrot', qty: '8kg', price: '₹320', customer: 'Priya', date: '2025-06-03', status: 'On the Way', txn: 'TXN127' },
  { id: '#006', product: 'Curd', qty: '5L', price: '₹300', customer: 'Vikram', date: '2025-06-04', status: 'Cancelled Order', txn: 'TXN128' },
  { id: '#007', product: 'Cabbage', qty: '6kg', price: '₹180', customer: 'Nita', date: '2025-06-04', status: 'Delivered', txn: 'TXN129' },
  { id: '#008', product: 'Paneer', qty: '2kg', price: '₹500', customer: 'Deepak', date: '2025-06-04', status: 'Delivered', txn: 'TXN130' },
  { id: '#009', product: 'Banana', qty: '1 dozen', price: '₹60', customer: 'Arjun', date: '2025-06-05', status: 'Delivered', txn: 'TXN131' },
  { id: '#010', product: 'Spinach', qty: '5kg', price: '₹150', customer: 'Lakshmi', date: '2025-06-05', status: 'On the Way', txn: 'TXN132' },
  { id: '#011', product: 'Tomato', qty: '10kg', price: '₹500', customer: 'Raj', date: '2025-06-01', status: 'Delivered', txn: 'TXN123' },
  { id: '#012', product: 'Potato', qty: '20kg', price: '₹700', customer: 'Aman', date: '2025-06-01', status: 'On the Way', txn: 'TXN124' },
  { id: '#013', product: 'Milk', qty: '15L', price: '₹1,300', customer: 'Sneha', date: '2025-06-02', status: 'Delivered', txn: 'TXN125' },
  { id: '#014', product: 'Onion', qty: '12kg', price: '₹480', customer: 'Ravi', date: '2025-06-03', status: 'Delivered', txn: 'TXN126' },
  { id: '#015', product: 'Carrot', qty: '8kg', price: '₹320', customer: 'Priya', date: '2025-06-03', status: 'On the Way', txn: 'TXN127' },
  { id: '#016', product: 'Curd', qty: '5L', price: '₹300', customer: 'Vikram', date: '2025-06-04', status: 'Cancelled Order', txn: 'TXN128' },
  { id: '#017', product: 'Cabbage', qty: '6kg', price: '₹180', customer: 'Nita', date: '2025-06-04', status: 'Delivered', txn: 'TXN129' },
  { id: '#018', product: 'Paneer', qty: '2kg', price: '₹500', customer: 'Deepak', date: '2025-06-04', status: 'Delivered', txn: 'TXN130' },
  { id: '#019', product: 'Banana', qty: '1 dozen', price: '₹60', customer: 'Arjun', date: '2025-06-05', status: 'Delivered', txn: 'TXN131' },
  { id: '#020', product: 'Spinach', qty: '5kg', price: '₹150', customer: 'Lakshmi', date: '2025-06-05', status: 'On the Way', txn: 'TXN132' },
  { id: '#021', product: 'Onion', qty: '12kg', price: '₹480', customer: 'Ravi', date: '2025-06-03', status: 'Delivered', txn: 'TXN126' },
  { id: '#022', product: 'Carrot', qty: '8kg', price: '₹320', customer: 'Priya', date: '2025-06-03', status: 'On the Way', txn: 'TXN127' },
  { id: '#023', product: 'Curd', qty: '5L', price: '₹300', customer: 'Vikram', date: '2025-06-04', status: 'Cancelled Order', txn: 'TXN128' },
  { id: '#024', product: 'Cabbage', qty: '6kg', price: '₹180', customer: 'Nita', date: '2025-06-04', status: 'Delivered', txn: 'TXN129' },
  { id: '#025', product: 'Paneer', qty: '2kg', price: '₹500', customer: 'Deepak', date: '2025-06-04', status: 'Delivered', txn: 'TXN130' },
  { id: '#026', product: 'Banana', qty: '1 dozen', price: '₹60', customer: 'Arjun', date: '2025-06-05', status: 'Delivered', txn: 'TXN131' },
  { id: '#027', product: 'Spinach', qty: '5kg', price: '₹150', customer: 'Lakshmi', date: '2025-06-05', status: 'On the Way', txn: 'TXN132' }
];


const transactions = [
  { txnId: 'TXN123', timestamp: '2025-06-01 10:22:30', user: 'Raj', orderId: '#001', paymentMode: 'UPI', senderBank: 'HDFC', receiverBank: 'SBI' },
  { txnId: 'TXN124', timestamp: '2025-06-01 11:45:12', user: 'Aman', orderId: '#002', paymentMode: 'Credit Card', senderBank: 'ICICI', receiverBank: 'Axis' },
  { txnId: 'TXN125', timestamp: '2025-06-02 08:13:45', user: 'Sneha', orderId: '#003', paymentMode: 'Net Banking', senderBank: 'BOB', receiverBank: 'PNB' },
];



  const rowsPerPage = 10;
let currentPage = 1;
let filteredOrders = [...orders]; // clone for filtering

function renderTable(page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const tableBody = document.getElementById('orderBody');
  tableBody.innerHTML = '';

  const pageOrders = filteredOrders.slice(start, end);
  if (pageOrders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8">No orders found.</td></tr>`;
    return;
  }

  pageOrders.forEach(order => {
    tableBody.innerHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.product}</td>
        <td>${order.qty}</td>
        <td>${order.price}</td>
        <td>${order.customer}</td>
        <td>${order.date}</td>
        <td><span class="badge ${order.status === 'Delivered' ? 'bg-success' : order.status === 'On the Way' ? 'bg-warning text-dark' : order.status === 'Confirmation Pending'?'bg-primary':'bg-danger'}">${order.status}</span></td>
        <td>${order.txn}</td>
      </tr>`;
  });
  attachRowClickListeners();
}

function renderPagination() {
  const pageCount = Math.ceil(filteredOrders.length / rowsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= pageCount; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <button class="page-link" onclick="goToPage(${i})">${i}</button>
      </li>`;
  }
}

function goToPage(page) {
  currentPage = page;
  renderTable(currentPage);
  renderPagination();
}

function applyFilters() {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const status = document.getElementById('paymentStatus').value;
  const maxPrice = document.getElementById('maxPrice').value;

  filteredOrders = orders.filter(order => {
    const orderDate = order.date;
    const price = parseInt(order.price.replace(/[₹,]/g, ''));

    return (!startDate || orderDate >= startDate)
      && (!endDate || orderDate <= endDate)
      && (!status || order.status === status)
      && (!maxPrice || price <= parseFloat(maxPrice));
  });

  currentPage = 1;
  renderTable(currentPage);
  renderPagination();
}




function showOrderDetails(orderId) {
  const order = orders.find(o => o.id === orderId);
  const transaction = transactions.find(t => t.txnId === order.txn);

  let details = `
    <strong>Order ID:</strong> ${order.id}<br>
    <strong>Product:</strong> ${order.product}<br>
    <strong>Quantity:</strong> ${order.qty}<br>
    <strong>Price:</strong> ${order.price}<br>
    <strong>Customer:</strong> ${order.customer}<br>
    <strong>Date:</strong> ${order.date}<br>
    <strong>Status:</strong> ${order.status}<br>
    <strong>Transaction ID:</strong> ${order.txn}<br>
  `;

  if (transaction) {
    details += `
      <hr>
      <strong>Payment Timestamp:</strong> ${transaction.timestamp}<br>
      <strong>Payment Mode:</strong> ${transaction.paymentMode}<br>
      <strong>Sender Bank:</strong> ${transaction.senderBank}<br>
      <strong>Receiver Bank:</strong> ${transaction.receiverBank}<br>
    `;
  }

  document.getElementById('modalBody').innerHTML = details;
  const myModal = new bootstrap.Modal(document.getElementById('orderModal'));
  myModal.show();
}



// Initial load
renderTable(currentPage);
renderPagination();

function attachRowClickListeners() {
  const rows = document.querySelectorAll('#orderBody tr');
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const txnId = row.children[7].innerText;
      const txn = transactions.find(t => t.txnId === txnId);

      if (txn) {
        document.getElementById('modalTransactionId').innerText = txn.txnId;
        document.getElementById('modalTimestamp').innerText = txn.timestamp;
        document.getElementById('modalUser').innerText = txn.user;
        document.getElementById('modalOrderId').innerText = txn.orderId;
        document.getElementById('modalPaymentMode').innerText = txn.paymentMode;
        document.getElementById('modalReceiverBank').innerText = txn.receiverBank;
        document.getElementById('modalSenderBank').innerText = txn.senderBank;

        const modal = new bootstrap.Modal(document.getElementById('transactionModal'));
        modal.show();
      }
    });
  });
}


