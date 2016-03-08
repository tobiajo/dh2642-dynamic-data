var Controller1 = function (view, model) {
    view.createNewDinnerBtn.click(function() {
        model.getAllDishes();
        $("#view1").hide();
        $("#view2").show();
        $("#loadView").show();
    })
}
