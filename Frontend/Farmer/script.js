function toggleOrders() {
  const rows = document.querySelectorAll("#orderTable .extra-order");
  const btn = document.getElementById("toggleBtn");
  let isHidden = rows[0].classList.contains("d-none");

  rows.forEach((row, index) => {
    if (isHidden && index < 5) {
      row.classList.remove("d-none");
    } else if (!isHidden) {
      row.classList.add("d-none");
    }
  });

  btn.textContent = isHidden ? "View Less" : "View More";
}
 function toggleRating() {
    const section = document.getElementById('ratingSection');
    section.classList.toggle('d-none');
  }

// Second table toggle for duplicate Recent Orders
function toggleOrders2() {
  const rows = document.querySelectorAll("#orderTable2 .extra-order");
  const btn = document.getElementById("toggleBtn2");
  let isHidden = rows.length > 0 && rows[0].classList.contains("d-none");

  rows.forEach((row, index) => {
    if (isHidden && index < 5) {
      row.classList.remove("d-none");
    } else if (!isHidden) {
      row.classList.add("d-none");
    }
  });

  btn.textContent = isHidden ? "View Less" : "View More";
}

// Sales Chart Initialization
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("salesChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "₹ Sales",
          data: [1500, 2000, 1800, 2200, 2500, 2100, 2600],
          backgroundColor: "rgba(44, 95, 45, 0.2)",
          borderColor: "#2c5f2d",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#2c5f2d",
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 500 },
        },
      },
    },
  });
});
