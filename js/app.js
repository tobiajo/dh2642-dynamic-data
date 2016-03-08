$(function () {
    //We instantiate our model
    var model = new DinnerModel();

    //Hide all but the first view div
    $("#view2").hide();
    $("#view3").hide();
    $("#view4").hide();
    $("#view5").hide();
    $("#view6").hide();
    $("#view7").hide();
    $("#loadView").hide();
    $("#errorView").hide();
    
    //Unhide main page body (no flickering)
    $("#page_body").removeClass("hidden");

    //Init Views
    var view1 = new View1($("#view1"));
    var view2 = new View2($("#view2"), model);
    var view3 = new View3($("#view3"), model);
    var view4 = new View4($("#view4"), model);
    var view5 = new View5($("#view5"), model);
    var view6 = new View6($("#view6"), model);
    var view7 = new View7($("#view7"), model);

    //Init controllers
    var controller1 = new Controller1(view1, model);
    var controller2 = new Controller2(model, view2);
    var controller3 = new Controller3(view3, view4, model);
    var controller4 = new Controller4(model, view4);
    var controller5 = new Controller5(view5);
    var controller7 = new Controller7(view7);
});
