$(document).ready(function () {

    $("#userRegisterForm").submit(function (e) {
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        let confirmPassword = $("#confirmPassword").val().trim();
        let error = "";
        let username = email.slice(0, email.indexOf('@'));


        if (!/^[\w.-]+@[a-z\d.-]+\.[a-z]{2,}$/i.test(email))
            error = "Invalid email.";
        else if (password.length < 6)
            error = "Password too short.";
        else if (!/\d/.test(password) || !/[!@#$%^&*]/.test(password))
            error = "Add a number & symbol.";
        else if (password !== confirmPassword)
            error = "Passwords don’t match.";


        if (error !== "") {
            e.preventDefault();
            alert(error);
        } else {
            
        }
    });

    $("#userLoginForm").submit(function (e) {
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();

        if (!(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
            e.preventDefault();
            alert("Invalid email format.");
        } else {
            
        }

    });

    $("#userCheckoutForm").submit(function (e) {
        let name = $("#fullName").val().trim();
        let email = $("#email").val().trim();
        let phone = $("#phone").val().trim();
        let address = $("#address").val().trim();
        let pincode = $("#pincode").val().trim();
        let payment = $("#payment").val();

        let error = "";

        if (name.length < 3) error = "Full Name must be at least 3 characters.";
        else if (!(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) error = "Invalid email.";
        else if (!/^\d{10}$/.test(phone)) error = "Phone number must be 10 digits.";
        else if (address.length < 10) error = "Address is too short.";
        else if (!/^\d{6}$/.test(pincode)) error = "PIN Code must be 6 digits.";
        else if (payment === "") error = "Select a payment method.";

        if (error !== "") {
            e.preventDefault();
            alert(error);
        } else {
            $.ajax({
                url: "api/user/checkout",
                method: "POST",
                data: {
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    address: address,
                    pincode: pincode,
                    paymentMethod: payment
                },
                contentType: "application/json",
                success: function (res) {
                    alert(res);
                },
                error: function (xhr) {
                    alert("Checkout failed: " + xhr.responseText);
                }
            });
        }
    });

});
