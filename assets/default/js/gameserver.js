if($("#panel").length > 0) {
    $(document).ready(function() {
        getLocations();
        updatePriceTimer();
        $("#location > option").each(function() {
            if($(this).data("forge") != false && $(this).data("forge") != "") {
                $('#location').val(this.value);
                updatePrice();
            }
        });
    });

    const gameType = $("#panel").data("game-type");
    const selection = $("#panel").data("selection");
    const selectionType = $("#panel").data("selection-type");

    let requiredCPU = 0;
    let requiredRAM = 0;
    let requiredDisc = 0;
    let refreshTimer = 10;

    function updatePrice() {
        $(".priceLoader").css("display","block");
        if(selectionType === "dropdown") {
            var selectionValue = $('#' + selection).val();
        } else {
            alert("Other render type not included to get selection value yet");
        }
        var result = callAPI("GET", "/ajax/gameserver/pricing?game=" + gameType + "&selection=" + selectionValue, { });
        $('#price').text(result.responseJSON.price.toFixed(2) + "€");
        requiredCPU = result.responseJSON.requirements.cpu;
        requiredRAM = result.responseJSON.requirements.ram;
        requiredDisc = result.responseJSON.requirements.disc;
        getLocations();
        $(".priceLoader").css("display","none");
        if($("#location").val() != "") {
            updateHardware();
        }
        refreshTimer = 10;
    }

    function updatePriceTimer(){
        if((refreshTimer - 1) <= 0) {
            if(!$("#location").is(":focus")) {
                if(!$("#selection").is(":focus")) {
                    updatePrice();
                    setTimeout(updatePriceTimer, 1000);
                } else {
                    refreshTimer = 10; setTimeout(updatePriceTimer, 1000);
                }
            } else {
                refreshTimer = 10; setTimeout(updatePriceTimer, 1000);
            }
        } else {
            refreshTimer -= 1;
            setTimeout(updatePriceTimer, 1000);
        }
    }

    $("#location").on('change', function() {
        updatePrice();
    });

    $("#" + selection).on('change', function() {
        updatePrice();
    });

    function updateHardware() {
        if ($("#location").find(':selected').is('[data-forge]')) {
            var forgeId = $("#location").find(':selected').data('forge');
            var result = callAPI("GET", "/ajax/gameserver/getHardware?forgeId=" + forgeId, {});
            $('#cpuDetails').html(requiredCPU + "x " + result.responseJSON.hardware.cpuSpeed + " GhZ (" + result.responseJSON.hardware.cpuModel + ")");
            $('#ramDetails').html(requiredRAM + " MB " + result.responseJSON.hardware.ramType);
            $('#discDetails').html((requiredDisc/1024) + " GB " + result.responseJSON.hardware.discType);
            $('#networkDetails').html(result.responseJSON.hardware.network);
            $('#ddosProtection').html(result.responseJSON.hardware.ddos);
        }
    }

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
                $('#location').append('<option data-forge="'+value+'" value="'+index+'">'+index+'</option>');
            } else {
                $('#location option[value="'+index+'"]').attr('data-forge', value);
            }

            if(value === false) {
                $('#location option[value="'+index+'"]').attr('disabled', 'disabled');
            } else {
                $('#location option[value="'+index+'"]').attr("disabled", false);
            }

            //Check if button should be disabled or not depending on location
            if($('#location option:selected').prop('disabled') === false){
                $('#cartButton').attr("disabled", false);
            } else {
                $('#cartButton').attr('disabled', 'disabled');
                //Deselect the location
                $("#location").val("");
            }
        });
    }
}