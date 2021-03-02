if ($(".mpl-navbar-login-form").length > 0) {
    function login() {
        var result = callAPI("POST", "/ajax/user/login", {
            "email": $('#email').val(),
            "password": $('#password').val()
        });
        if (result.responseJSON.result === true) {
            location.reload();
        }
    }
} else {
    function logout() {
        var result = callAPI("GET", "/ajax/user/logout", {});
        location.reload();
    }
}

function mobileLogin() {
    var result = callAPI("POST", "/ajax/user/login", {
        "email": $('#signin_popup_login').val(),
        "password": $('#signin_popup_password').val()
    });
    if (result.responseJSON.result === true) {
        location.reload();
    }
}

if ($("#signup-panel").length > 0) {
    function register() {
        var result = callAPI("POST", "/ajax/user/register", {
            "email": $('#signup_email').val(),
            "password": $('#signup_password').val(),
            "passwordVerify": $('#signup_passwordVerify').val(),
            "firstName": $('#signup_firstName').val(),
            "lastName": $('#signup_lastName').val(),
            "tos": $('#tos').prop('checked')
        });
        if (result.responseJSON.result) {
            window.location.href = "/";
        }
    }
}