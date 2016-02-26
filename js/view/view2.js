var View2 = function (container, model) {

    this.numberOfGuests = container.find($("#view2NumberOfGuestsSpan"));
    this.minusGuestsBtn = container.find($("#view2MinusGuestBtn"));
    this.plusGuestsBtn = container.find($("#view2PlusGuestBtn"));
    this.dinnerTableBody = container.find($("#View2DinnerTableBody"));
    this.confirmDinnerBtn = container.find($("#view2ConfirmDinnerBtn"));

    model.addObserver(this);

    this.reDrawView = function () {
        var menu = model.getFullMenu();
        var htmlString = "";
        for (var i = 0; i < menu.length; i++) {
            htmlString += "<tr> <td>" + menu[i].name + "</td> <td>"
                    + model.getDishPrice(menu[i].id) * model.getNumberOfGuests()
                    + "</td> </tr>";
        }
        htmlString += "<tr> <td><b>Total price:</b></td><td><b>"
                + model.getTotalMenuPrice() + "</b></td></tr>";
        this.dinnerTableBody.html(htmlString);
        this.numberOfGuests.html(model.getNumberOfGuests());
    }

    this.update = function (obj) {
        this.reDrawView();
    }
}
