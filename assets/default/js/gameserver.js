if($("#panel").length > 0) {
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
        $(".priceLoader").css("display","none");
    }

    $("#location").on('change', function() {
        updatePrice();
    });

    $("#" + selection).on('change', function() {
        updatePrice();
    });
}