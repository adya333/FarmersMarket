$(document).ready(function () {

    $("#adminRegisterForm").submit(function (e) {
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
            $.ajax({
                url: '/api/admin/register', //Placeholder api, upto backend developer to set
                method: 'POST',
                data: {
                    username: username,
                    email: email,
                    password: password
                },
                contentType: "application/json",
                success: function (res) {
                    console.log("Registered!", res);
                }
            });
        }
    });

    $("#adminLoginForm").submit(function (e) {
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();

        if (!(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
            e.preventDefault();
            alert("Invalid email format.");
        } else {
            $.ajax({
                url: '/api/admin/login', //Placeholder api, upto backend developer to set
                method: 'POST',
                data: {
                    email: email,
                    password: password
                },
                contentType: "application/json",
                success: function (res) {
                    console.log("Logged in!", res);
                }
            });
        }

    });

});
