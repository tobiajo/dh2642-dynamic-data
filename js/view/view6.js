var View6 = function (container, model) {
    this.imagePrepRow = container.find($("#view6ImgPrepRow"));

    model.addObserver(this);

    this.reDrawView = function () {
        var menu = model.getFullMenu();
        var htmlString = "";
        for (var i = 0; i < menu.length; i++) {
            htmlString += "<div class=\"row\"><div class=\"col-md-3\"><img src=\"images\/"
                    + menu[i].image + "\" class=\"img - thumbnail\" width=\"300\"></div><div class=\"col-md-3\"><h3>"
                    + menu[i].name + "</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    + "</p></div><div class=\"col-md-6\"><h4>Preparation</h4><p>"
                    + menu[i].description + "</p></div></div>";

        }
        this.imagePrepRow.html(htmlString);
    }

    this.update = function (obj) {
        if (obj == "MENU") {
            this.reDrawView();
        }
    }
}