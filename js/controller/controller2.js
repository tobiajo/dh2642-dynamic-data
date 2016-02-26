var Controller2 = function (model, view) {

    view.minusGuestsBtn.click(function () {
        model.setNumberOfGuests(model.getNumberOfGuests() - 1);
    })

    view.plusGuestsBtn.click(function () {
        model.setNumberOfGuests(model.getNumberOfGuests() + 1);
    })

    view.confirmDinnerBtn.click(function () {
        $("#view2").hide();
        $("#view3").hide();
        $("#view4").hide();
        $("#view7").show();
        $("#view5").show();
    })
}