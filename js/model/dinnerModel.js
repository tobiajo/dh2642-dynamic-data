//DinnerModel Object constructor
var DinnerModel = function () {

    //TODO Lab 2 implement the data structure that will hold number of guest
    // and selected dinner options for dinner menu
	this.apiUrl = "http://api.bigoven.com/recipes?pg=1&rpp=25";
	this.apiDishUrl = "http://api.bigoven.com/recipe/";
	this.apiKey = "8vtk7KykflO5IzB96kb0mpot0sU40096";
    this.numberOfGuests = 0;
    var menu = [];
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

    this.getNumberOfGuests = function () {
        return this.numberOfGuests;
    }

    //Returns all the dishes on the menu.
    this.getFullMenu = function () {
        return menu;
    }

    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function () {
        var ingredientsOut = [];
        for (var i = 0; i < menu.length; i++) {
            if (menu[i] != null) {
                ingredientsOut = ingredientsOut.concat(menu[i].ingredients);
            }
        }
        return ingredientsOut;
    }

    this.getDishPrice = function (dish) {
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
		menu.push(dish);
        notifyObservers("MENU");
    }

    //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
    //you can use the filter argument to filter out the dish by name or ingredient (use for search)
    //if you don't pass any filter all the dishes will be returned
    this.getAllDishes = function (type, filter) {

        var url = this.apiUrl + "&api_key=" + this.apiKey;
		if (typeof type === "string") {
			url += "&any_kw=" + type;
		}

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
