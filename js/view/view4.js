var View4 = function (container, model) {
    this.dishNameSpan = container.find($("#view4DishNameSpan"));
    this.largeFoodImg = container.find($("#view4LargeFoodImg"));
    this.recipieTableBody = container.find($("#view4RecipieTableBody"));
    this.dishTotalspan = container.find($("#view4DishTotalspan"));
    this.descSpan = container.find($("#view4DescSpan"));
    this.backToSelectDishBtn = container.find($("#view4BackToSelectDishBtn"));
    this.confirmDishBtn = container.find($("#view4ConfirmDishBtn"));
    this.dish = null;
	model.addObserver(this);


    this.reDrawView = function (dish) {
        $("#loadView").hide();
        $("#view4").show();
        this.dish = dish;
        this.dishNameSpan.html(dish.name);
        this.largeFoodImg.attr("src", dish.image);
		console.log(dish);
        this.dishTotalspan.html(model.getDishPrice(dish));
        this.descSpan.html(dish.description);
        var htmlString = "";
        for (var i = 0; i < dish.ingredients.length; i++) {
            htmlString += "<tr><td>" + dish.ingredients[i].quantity + " "
                    + dish.ingredients[i].unit + "</td><td>"
                    + dish.ingredients[i].name + "</td><td>"
                    + dish.ingredients[i].price + "</td></tr>";
        }
        this.recipieTableBody.html(htmlString);
    }

	this.update = function(obj,ident) {
		if (ident === "getDish") {
			if ( obj === "ERROR") {
				console.log(obj + " " + ident);
                $("#loadView").hide();
                $("#errorView").show();
			} else {
				this.reDrawView(obj);
			}
		}
	}
}
