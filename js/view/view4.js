var View4 = function (container, model) {
    this.dishNameSpan = container.find($("#view4DishNameSpan"));
    this.largeFoodImg = container.find($("#view4LargeFoodImg"));
    this.recipieTableBody = container.find($("#view4RecipieTableBody"));
    this.dishTotalspan = container.find($("#view4DishTotalspan"));
    this.descSpan = container.find($("#view4DescSpan"));
    this.backToSelectDishBtn = container.find($("#view4BackToSelectDishBtn"));
    this.confirmDishBtn = container.find($("#view4ConfirmDishBtn"));
    this.id = "";


    this.reDrawView = function (id) {
        this.id = id;
        var dish = model.getDish(id);
        this.dishNameSpan.html(dish.name);
        this.largeFoodImg.attr("src", "images\/" + dish.image);
        this.dishTotalspan.html(model.getDishPrice(id));
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
}
