var Controller4 = function (model, view) {
    view.confirmDishBtn.click(function () {
        model.addDishToMenu(view.dish);
    })

    view.backToSelectDishBtn.click(function () {
        $("#view4").hide();
        $("#view3").show();
    })
}
