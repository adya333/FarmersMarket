const transactions = [
  { id: "TXN001", orderId: "ORD101", buyer: "Aarav Singh", amount: 500, commission: 20, type: "Credit", status: "Completed", method: "Bank Transfer", date: "2025-06-10" },
  { id: "TXN002", orderId: "ORD102", buyer: "Meera Das", amount: 300, commission: 15, type: "Credit", status: "Pending", method: "UPI", date: "2025-06-11" },
  { id: "TXN003", orderId: "ORD103", buyer: "Ravi Kumar", amount: 700, commission: 30, type: "Credit", status: "Completed", method: "Bank Transfer", date: "2025-06-12" },
  { id: "TXN004", orderId: "ORD104", buyer: "Simran Kaur", amount: 250, commission: 10, type: "Refund", status: "Reversed", method: "Adjustment", date: "2025-06-13" },
  { id: "TXN005", orderId: "ORD105", buyer: "Aditya Rao", amount: 400, commission: 18, type: "Credit", status: "Completed", method: "UPI", date: "2025-06-14" },
  { id: "TXN006", orderId: "ORD106", buyer: "Kiran Joshi", amount: 900, commission: 40, type: "Credit", status: "Completed", method: "Bank Transfer", date: "2025-06-15" },
  { id: "TXN007", orderId: "ORD107", buyer: "Neha Verma", amount: 150, commission: 5, type: "Refund", status: "Reversed", method: "Adjustment", date: "2025-06-16" },
  { id: "TXN008", orderId: "ORD108", buyer: "Rajesh Nair", amount: 620, commission: 25, type: "Credit", status: "Pending", method: "UPI", date: "2025-06-17" },
  { id: "TXN009", orderId: "ORD109", buyer: "Divya Menon", amount: 540, commission: 22, type: "Credit", status: "Completed", method: "Bank Transfer", date: "2025-06-18" },
  { id: "TXN010", orderId: "ORD110", buyer: "Vikas Gupta", amount: 310, commission: 12, type: "Credit", status: "Completed", method: "UPI", date: "2025-06-19" },
];

const tbody = document.querySelector("#transactionTable tbody");

function renderTable(data) {
  tbody.innerHTML = "";
  data.forEach(txn => {
    const net = txn.type === "Refund" ? `-₹${txn.amount - txn.commission}` : `₹${txn.amount - txn.commission}`;
    const amtType = net[0]=='-' ? 'text-danger':'text-success';
    const row = `
      <tr>
        <td>${txn.id}</td>
        <td>${txn.orderId}</td>
        <td>${txn.buyer}</td>
        <td>₹${txn.amount}</td>
        <td>₹${txn.commission}</td>
        <td style="text-align:center" class=${amtType}>${net}</td>
        
        <td><span class="badge ${txn.type === 'Credit' ? 'bg-success' : 'bg-danger'}">${txn.type}</span></td>

        <td><span class="badge ${txn.status === 'Completed' ? 'bg-success' : txn.status==='Pending'? 'bg-warning text-black' : 'bg-danger'}">${txn.status}</span></td>
        <td>${txn.method}</td>
        <td>${txn.date}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}

function applyFilters() {
  const txnVal = document.getElementById("filterTxn").value.toLowerCase();
  const buyerVal = document.getElementById("filterBuyer").value.toLowerCase();
  const typeVal = document.getElementById("filterType").value.toLowerCase();
  const statusVal = document.getElementById("filterStatus").value.toLowerCase();
  const methodVal = document.getElementById("filterMethod").value.toLowerCase();
  const dateVal = document.getElementById("filterDate").value;

  const filtered = transactions.filter(txn => {
    return (
      txn.id.toLowerCase().includes(txnVal) &&
      txn.buyer.toLowerCase().includes(buyerVal) &&
      (typeVal === "" || txn.type.toLowerCase() === typeVal) &&
      (statusVal === "" || txn.status.toLowerCase() === statusVal) &&
      (methodVal === "" || txn.method.toLowerCase() === methodVal) &&
      (dateVal === "" || txn.date === dateVal)
    );
  });

  renderTable(filtered);
}

// Initial render
renderTable(transactions);

// Trigger filtering only on button click
document.getElementById("filterBtn").addEventListener("click", applyFilters);
