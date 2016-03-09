var Controller3 = function (view3, view4, model) {

    view3.menuTypeSel.on("change", function () {
		model.getAllDishes($(this).find("option:selected").val());
        $("#view3").hide();
        $("#loadView").show();
    });

    view3.searchBtn.click(function () {
		model.getAllDishes(view3.searchInput.val(),view3.menuTypeSel.find("option:selected").val());
        $("#view3").hide();
        $("#loadView").show();
    });

    view3.dishThumbNailRow.click(function (e) {
        if (e.target.id.split("_")[0] == "thumbnailId") {
			model.getDish(e.target.id.split("_")[1]);
            $("#view3").hide();
            $("#loadView").show();
        }
    });
}
