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
    let email = $("#signupEmail").val().trim();
    let phone = $("#signupPhone").val().trim();
    let password = $("#signupPassword").val().trim();
    let confirmPassword = $("#signupConfirmPassword").val().trim();
    let error = "";
    let username = email.slice(0, email.indexOf('@'));

    if (!(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
            error = "Invalid email format.";
        } else if (password.length < 6) {
            error = "Password too weak, minimum 6 chars.";
        } else if (!/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            error = "Password must contain a number and a symbol.";
        } else if (password !== confirmPassword) {
            error = "Passwords do not match.";
        }

        if (error !== "") {
            e.preventDefault();
            alert(error);
        } else {
            e.preventDefault
            window.location.href = "../Admin/admin.html"
        }

  });

});
