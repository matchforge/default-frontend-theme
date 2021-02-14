if($("#panel").length > 0) {
    $(document).ready(function() {
        getLocations();
    });

    const gameType = $("#panel").data("game-type");
    const selection = $("#panel").data("selection");
    const selectionType = $("#panel").data("selection-type");

    function updatePrice() {
        $(".priceLoader").css("display","block");
        if(selectionType === "dropdown") {
            var selectionValue = $('#' + selection).val();
        } else {
            alert("Other render type not included to get selection value yet");
        }
        var result = callAPI("GET", "/ajax/gameserver/pricing?game=" + gameType + "&selection=" + selectionValue, { });
        $('#price').text(result.responseJSON.price.toFixed(2) + "€");
        getLocations();
        $(".priceLoader").css("display","none");
    }

    $("#location").on('change', function() {
        updatePrice();
    });

    $("#" + selection).on('change', function() {
        updatePrice();
    });

    function getLocations() {
        if(selectionType === "dropdown") {
            var selectionValue = $('#' + selection).val();
        } else {
            alert("Other render type not included to get selection value yet");
        }
        var result = callAPI("GET", "/ajax/gameserver/locations?game=" + gameType + "&selection=" + selectionValue, { });

        $.each(result.responseJSON.forges, function(index, value) {
            var exists = $("#location option")
                .filter(function (i, o) { return o.value === index; })
                .length > 0;
            if(exists === false) {
                $('#location').append('<option value="'+index+'">'+index+'</option>');
            }

            if(value === false) {
                $('#location option[value="'+index+'"]').attr('disabled', 'disabled');
            } else {
                $('#location option[value="'+index+'"]').attr("disabled", false);
            }

            //Check if button should be disabled or not depending on location
            if($('#location option:selected').prop('disabled') == true){
                $('#cartButton').attr('disabled', 'disabled');
            } else {
                $('#cartButton').attr("disabled", false);
            }
        });
    }
}