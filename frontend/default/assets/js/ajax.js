//This is the ajax handler for the default matchforge frontend

function callAPI(type, route, data) {
    return $.ajax({
        type: type,
        url: route,
        dataType: "json",
        async: false,
        data: data,
        success: function (response) {
            if (response.hasOwnProperty("errorMessage")) {
                displayError(response["errorMessage"]);
                return {};
            } else {
                return response;
            }
        },
        error: function(response) {
            if(response.responseJSON.errorMessage) {
                displayError(response.responseJSON.errorMessage);
                return {};
            } else {
                return response;
            }
        }
    });
}

function displayError(errorMessage) {
    console.log('Error: ' + errorMessage);
    toastr.error(errorMessage, 'Error!')
}