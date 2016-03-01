//DinnerModel Object constructor
var DinnerModel = function () {

    //TODO Lab 2 implement the data structure that will hold number of guest
    // and selected dinner options for dinner menu
	this.apiUrl = "http://api.bigoven.com/recipes?pg=1&rpp=25";
	this.apiDishUrl = "http://api.bigoven.com/recipe/";
	this.apiKey = "8vtk7KykflO5IzB96kb0mpot0sU40096";
    this.numberOfGuests = 0;
    this.menu = [];
    var observers = [];

    this.addObserver = function (obs) {
       	observers.push(obs);
    }

    var notifyObservers = function (obj,ident) {
       	for (var i = 0; i < observers.length; i++) {
         	observers[i].update(obj,ident);
        }
    }

    this.setNumberOfGuests = function (num) {
        if (num >= 0) {
            this.numberOfGuests = num;
            notifyObservers("GUESTS");
        }
    }

    // should return 
    this.getNumberOfGuests = function () {
        return this.numberOfGuests;
    }

    //Returns the dish that is on the menu for selected type 
    this.getSelectedDish = function (type) {
        var dishOut;
        if (type == "starter") {
            dishOut = menu[0];
        } else if (type == "dessert") {
            dishOut = menu[2];
        } else {
            dishOut = menu[1];
        }
        return dishOut;
    }

    //Returns all the dishes on the menu.
    this.getFullMenu = function () {
        var menuOut = [];
        for (var i = 0; i < this.menu.length; i++) {
            if (this.menu[i] != null) {
                menuOut.push(this.menu[i]);
            }
        }
        return menuOut;
    }

    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function () {
        var ingredientsOut = [];
        for (var i = 0; i < this.menu.length; i++) {
            if (this.menu[i] != null) {
                ingredientsOut = ingredientsOut.concat(this.menu[i].ingredients);
            }
        }
        return ingredientsOut;
    }

    this.getDishPrice = function (dish) {
		console.log(dish.ingredients);
        var priceOut = 0;
        for (var i = 0; i < dish.ingredients.length; i++) {
            priceOut += dish.ingredients[i].price;
        }
        return priceOut;
    }

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function () {
        var priceOut = 0;
        var ingredients = this.getAllIngredients();
        for (var i = 0; i < ingredients.length; i++) {
            priceOut += ingredients[i].price;
        }
        return priceOut * this.getNumberOfGuests();
    }

    //Adds the passed dish to the menu. If the dish of that type already exists on the menu
    //it is removed from the menu and the new one added.
    this.addDishToMenu = function (dish) {
		this.menu.push(dish);
        notifyObservers("MENU");
    }

    //Removes dish from menu
    this.removeDishFromMenu = function (id) {
        var dish = this.getDish(id);
        var i = 1;
        if (dish.type == "starter") {
            i = 0;
        } else if (dish.type == "dessert") {
            i = 2;
        }
        if (this.menu[i] == dish) {
            this.menu[i] = null;
            notifyObservers("MENU");
        }
    }

    //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
    //you can use the filter argument to filter out the dish by name or ingredient (use for search)
    //if you don't pass any filter all the dishes will be returned
    this.getAllDishes = function (type, filter) {

        var url = this.apiUrl + "&api_key=" + this.apiKey;
		if (typeof type === "string") {
			url += "&any_kw=" + type;
		}

		console.log(url);

        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: allDishesAsync,
			error: function() {
				notifyObservers("ERROR","getDishes");		
			}
        });

        /*return $(dishes).filter(function (index, dish) {
            var found = true;
            if (filter) {
                found = false;
                $.each(dish.ingredients, function (index, ingredient) {
                    if (ingredient.name.indexOf(filter) != -1) {
                        found = true;
                    }
                });
                if (dish.name.indexOf(filter) != -1)
                {
                    found = true;
                }
            }
            return dish.type == type && found;
        });*/
    }

    function allDishesAsync(apiData) {
        var allDishes = [];
        console.log(apiData);
        for (var i = 0; i < 10; i++) {
            var r = apiData.Results[i];
            var dish = {
                'id': r.RecipeID,
                'name': r.Title,
                'type': r.Category,
                'image': r.ImageURL
            };
            allDishes.push(dish);
        }
        notifyObservers(allDishes, "getDishes");
    }

    //function that returns a dish of specific ID
    this.getDish = function (id) {
	var url = this.apiDishUrl + id + "?api_key=" + this.apiKey;
	$.ajax({
         type: "GET",
         dataType: 'json',
         cache: false,
         url: url,
         success: function (data) {
            	var dish = {
					'id': data.RecipeID,
					'name': data.Title,
            	    'type': data.Category,
            	    'image': data.ImageURL,
					'ingredients': [],
					'description': data.Description
            	};
				for (var i =0;i<data.Ingredients.length;i++) {
					var ingredient = {
						'name': data.Ingredients[i].Name,
						'quantity': data.Ingredients[i].Quantity,
						'unit': data.Ingredients[i].Unit,
						'price': data.Ingredients[i].Quantity,					
					};
					dish.ingredients.push(ingredient);				
				}
				notifyObservers(dish, "getDish");
        },
		error: function() {
			notifyObservers("ERROR","getDish");		
		}
    	});	
	}
}
