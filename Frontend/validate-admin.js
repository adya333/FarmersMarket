$(document).ready(function () {

        // Toggle Login/Signup
    $(".nav-link").click(function (e) {
      e.preventDefault();
      $(".nav-link").removeClass("active");
      $(this).addClass("active");

      const target = $(this).data("target");
      $("form").addClass("d-none");
      $("#" + target).removeClass("d-none");
    });

    // Login form handling
    $("#loginForm").submit(function (e) {
      e.preventDefault();
      const email = $("#adminEmail").val().trim();
      const password = $("#adminPassword").val().trim();

      if ((/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
        alert("Login successful!");
        window.location.href = "../Admin/admin.html";
      } else {
        alert("Invalid login credentials.");
      }
    });

    // Signup dummy handler
    $("#signupForm").submit(function (e) {
      e.preventDefault();
      alert("Signup request submitted! (not wired yet)");
    });

});
