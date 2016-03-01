var View3 = function (container, model) {
    this.dishThumbNailRow = container.find($("#view3DishThumbNailRow"));
    this.searchInput = container.find($("#view3SearchInput"));
    this.searchBtn = container.find($("#view3SearchBtn"));
    this.menuTypeSel = container.find($("#view3MenuTypeSel"));

    this.update = function(dishes) {
        this.reDrawView(dishes);
    };

    this.reDrawView = function (dishes) {
        var htmlString = "";
        for (var i = 0; i < dishes.length; i++) {
            htmlString += "<div class=\"col-md-3\"><h4>" + dishes[i].name
                    + "</h4><img src=\"" + dishes[i].image
                    + "\" class=\"img - thumbnail\" width=\"200\" id=\"thumbnailId_" + dishes[i].id + "\">"
                    + "<p>" +
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    + "</p></div>";
        }
        this.dishThumbNailRow.html(htmlString);
    };

    model.addObserver(this);
    
    //init
    //this.reDrawView(this.menuTypeSel.find("option:selected").val(), this.searchInput.val());
}
