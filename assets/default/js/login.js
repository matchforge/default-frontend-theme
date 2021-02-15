if($(".mpl-navbar-login-form").length > 0) {
    function login() {
        var result = callAPI("POST", "/ajax/user/login", {"email": $('#email').val(), "password": $('#password').val()});
        if(result.responseJSON.result === true) {
            location.reload();
        }
    }
} else {
    function logout() {
        var result = callAPI("GET", "/ajax/user/logout", {});
        location.reload();
    }
}