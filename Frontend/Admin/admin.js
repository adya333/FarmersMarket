// $(document).ready(function () {
//   // Load sidebar
//   $('#sidebar-container').load('sidebar.html', function () {
//     // Ensure sidebar is hidden initially on small screens
//     if ($(window).width() < 768) {
//       $('.sidebar').removeClass('active');
//     }
//   });

//   // Toggle sidebar on click
//   $('#sidebarToggle').on('click', function () {
//     $('.sidebar').toggleClass('active');
//     $('.container-fluid > .row').toggleClass('sidebar-open');
//   });

//   let currentOrderRow = null;
  
//   // Update button click handler
//   $('.update-btn').click(function() {
//     currentOrderRow = $(this).closest('tr');
//     const currentStatus = currentOrderRow.find('.status-badge').attr('class').split(' ')[2].replace('status-', '');
    
//     // Set current status in modal dropdown
//     $('#statusOption').val(currentStatus);
    
//     // Show modal
//     $('#statusModal').modal('show');
//   });
  
//   // Save status handler
//   $('#saveStatus').click(function() {
//     const newStatus = $('#statusOption').val();
//     const statusText = $('#statusOption option:selected').text();
    
//     // Update the badge
//     const badge = currentOrderRow.find('.status-badge')
//       .removeClass('status-processing status-delivered status-cancelled')
//       .addClass('status-' + newStatus)
//       .text(statusText);
    
//     // Close modal
//     $('#statusModal').modal('hide');
    
//     // Visual feedback
//     badge.fadeOut(100).fadeIn(100);
//   });

//   // Chart.js Line Graph
//   const ctx = document.getElementById('ordersChart').getContext('2d');
//   new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//       datasets: [{
//         label: 'Orders This Week',
//         data: [5, 9, 7, 8, 6, 12, 10],
//         borderColor: '#208a25',
//         backgroundColor: 'rgba(32, 138, 37, 0.1)',
//         tension: 0.4,
//       }]
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: { beginAtZero: true }
//       }
//     }
//   });
// });

$(document).ready(function () {
  // Load sidebar
  $('#sidebar-container').load('sidebar.html', function () {
    if ($(window).width() < 768) {
      $('.sidebar').removeClass('active');
    }
  });

  // Toggle sidebar
  $('#sidebarToggle').on('click', function () {
    $('.sidebar').toggleClass('active');
    $('.container-fluid > .row').toggleClass('sidebar-open');
  });

  // Status Update System with Conflict Protection
  (function() {
    let currentOrderRow = null;
    
    // Update button with event namespace
    $('.update-btn').off('click.statusUpdate').on('click.statusUpdate', function(e) {
      e.stopImmediatePropagation();
      
      currentOrderRow = $(this).closest('tr');
      const $badge = currentOrderRow.find('.status-badge');
      
      // Safer class extraction
      const currentStatus = $badge.attr('class').match(/status-\w+/)[0].replace('status-', '');
      
      $('#statusOption').val(currentStatus);
      $('#statusModal').modal('show');
    });
    
    // Save handler with visual feedback
    $('#saveStatus').off('click').on('click', function() {
      if (!currentOrderRow) return;
      
      const newStatus = $('#statusOption').val();
      const $badge = currentOrderRow.find('.status-badge')
        .removeClass(function(index, className) {
          return (className.match(/\bstatus-\S+/g) || []).join(' ');
        })
        .addClass('status-' + newStatus)
        .text($('#statusOption option:selected').text());
      
      $('#statusModal').modal('hide');
      
      // Enhanced visual feedback
      $badge.css({
        'transform': 'scale(1.1)',
        'box-shadow': '0 0 10px rgba(0,0,0,0.2)'
      }).animate({
        'transform': 'scale(1)',
        'box-shadow': 'none'
      }, 200);
    });
  })();

  // Chart.js Initialization with Error Handling
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
