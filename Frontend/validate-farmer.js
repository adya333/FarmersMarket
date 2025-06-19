$(document).ready(function () {

    $("#farmerRegisterForm").submit(function (e) {
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        let confirmPassword = $("#confirmPassword").val().trim();
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
            window.location.href = "Farmer/index.html"
            // $.ajax({
            //     url: '/api/farmer/register', //Placeholder api, upto backend developer to set
            //     method: 'POST',
            //     data: {
            //         username: username,
            //         email: email,
            //         password: password
            //     },
            //     contentType: "application/json",
            //     success: function (res) {
            //         console.log("Registered!", res);
            //     }
            // });
        }
    });

    $("#farmerLoginForm").submit(function (e) {
        let email = $("#loginEmail").val().trim();
        let password = $("#loginPassword").val().trim();

        if (!(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
            e.preventDefault();
            alert("Invalid email format.");
        } else {
            e.preventDefault();
            window.location.href = "Farmer/index.html"
            // $.ajax({
            //     url: '/api/farmer/login', //Placeholder api, upto backend developer to set
            //     method: 'POST',
            //     data: {
            //         email: email,
            //         password: password
            //     },
            //     contentType: "application/json",
            //     success: function (res) {
            //         console.log("Logged in!", res);
            //     }
            // });
        }

    });

    $("#addProductForm").submit(function (e) {
        e.preventDefault();

        let productName = $("#productName").val().trim();
        let category = $("#productCategory").val().trim();
        let price = parseFloat($("#productPrice").val());
        let unit = $("productUnit").val().trim();
        let stock = parseInt($("#productStock").val());
        let status = $("productStatus").val().trim();

        let error = "";

        if (productName.length < 3) error = "Product name too short.";
        else if (!category) error = "Category required.";
        else if (isNaN(price) || price <= 0) error = "Invalid price.";
        else if (isNaN(stock) || stock <= 0) error = "Invalid stock.";


        alert(error);
        if (error !== "") {
            alert(error);
        } else {
            alert
        }

        // $.ajax({
        //     url: "api/farmer/postProduct", //Placeholder api
        //     method: "POST",
        //     data: {
        //         productName: productName,
        //         category: category,
        //         price: price,
        //         stock: stock,
        //         description: description
        //     },
        //     success: function (res) {
        //         alert("Product posted successfully!");
        //         $("#farmerProductForm")[0].reset(); 
        //     },
        //     error: function (xhr) {
        //         alert("Error posting product: " + xhr.responseText);
        //     }
        // });
    });

});
