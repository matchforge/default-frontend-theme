function cartAddGameserver() {
    var data = {};
    var variables = {};
    $('[data-variable]').each(function(){
        var value = "";
        if(this.value === undefined) {
            value = this.val();
        } else {
            value = this.value;
        }
        variables[this.id] = value;
    });
    data["variables"] = variables;
    var location = $("#location option:selected").text();
    var forgeId = $("#location option:selected").attr("data-forge");
    var gameType = $("#gameserver-panel").attr("data-game-type");
    var payDays = $("#payTime option:selected").val();

    data["location"] = location;
    data["forge"] = forgeId;
    data["payDays"] = payDays;
    data["game"] = gameType;

    var result = callAPI("POST", "/ajax/cart/add/gameserver", data);
    if(result.responseJSON.result === true) {
        window.location.href = "/cart";
    }
}

function cartRemoveItem(position) {
    var result = callAPI("DELETE", "/ajax/cart/remove?item=" + position, {});
    if(result.responseJSON.result) {
        location.reload();
    }
}

function cartAddCoupon() {
    var coupon = $("#coupon_code").val();
    var result = callAPI("POST", "/ajax/cart/addCoupon", {code: coupon});
    if(result.responseJSON.result) { location.reload(); }
}

function cartRemoveCoupon() {
    var coupon = $("#coupon_code").val();
    var result = callAPI("DELETE", "/ajax/cart/removeCoupon", {});
    location.reload();
}