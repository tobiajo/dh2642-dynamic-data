var View5 = function (container, model) {
    this.imageCol = container.find($("#view5ImageCol"));
    this.totalCostSpan = container.find($("#view5TotalCostSpan"));
    this.printRecipieBtn = container.find($("#view5PrintRecipieBtn"));
    
    model.addObserver(this);

    this.updateView = function () {
        var menu = model.getFullMenu();
        var htmlString = "";
        for (var i = 0; i < menu.length; i++) {
            htmlString += "<div class=\"col-md-3\"><h4>" + menu[i].name
                    + "</h4><img src=\"" + menu[i].image
                    + "\" class=\"img - thumbnail\" width=\"200\">"
                    + "<p>Cost: " + model.getDishPrice(menu[i]) * model.getNumberOfGuests() + "</p></div>";
        }
        this.imageCol.html(htmlString);
        this.totalCostSpan.html(model.getTotalMenuPrice());
    }
    
    this.update = function (obj,ident) {
        this.updateView();
    }
} 
