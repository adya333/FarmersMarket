 function toggleOrders() {
    const rows = document.querySelectorAll('.extra-order');
    const btn = document.getElementById('toggleBtn');
    let isHidden = rows[0].classList.contains('d-none');

    rows.forEach((row, index) => {
      if (isHidden && index < 5) {
        row.classList.remove('d-none'); // show 5 more
      } else if (!isHidden) {
        row.classList.add('d-none'); // hide all
      }
    });

    btn.textContent = isHidden ? 'View Less' : 'View More';
  }

// Sales Chart Initialization
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('salesChart').getContext('2d');

  const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: '₹ Sales',
        data: [1500, 2000, 1800, 2200, 2500, 2100, 2600],
        backgroundColor: 'rgba(40,167,69,0.2)',
        borderColor: '#198754',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#198754',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 500 }
        }
      }
    }
  });
});
