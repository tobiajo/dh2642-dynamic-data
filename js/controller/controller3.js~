var Controller3 = function (view3, view4) {

    view3.menuTypeSel.on("change", function () {
        view3.reDrawView($(this).find("option:selected").val(), view3.searchInput.val());
    });

    view3.searchInput.keyup(function () {
        view3.reDrawView(view3.menuTypeSel.find("option:selected").val(), view3.searchInput.val());
    });

    view3.searchBtn.click(function () {
        view3.reDrawView(view3.menuTypeSel.find("option:selected").val(), view3.searchInput.val());
    });

    view3.dishThumbNailRow.click(function (e) {
        if (e.target.id.split("_")[0] == "thumbnailId") {
            view4.reDrawView(e.target.id.split("_")[1]);
            $("#view3").hide();
            $("#view4").show();
        }
    });
}