var View7 = function (container, model) {
    this.numberOfGuests = container.find($("#view7NumberOfGuests"));
this.backToEditDinnerBtn = container.find($("#view7backToEditDinnerBtn"));

    model.addObserver(this);

    this.reDrawView = function () {
        this.numberOfGuests.html(model.getNumberOfGuests());
    }

    this.update = function (obj) {
        if (obj == "GUESTS") {
            this.reDrawView();
        }
    }
}