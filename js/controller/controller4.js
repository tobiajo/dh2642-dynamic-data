var Controller4 = function (model, view) {
    view.confirmDishBtn.click(function () {
        model.addDishToMenu(view.id);
    })

    view.backToSelectDishBtn.click(function () {
        $("#view4").hide();
        $("#view3").show();
    })
}