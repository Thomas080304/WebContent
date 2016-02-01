/**
 * Created by Administrator on 2015/11/28.
 */
$(function($){
    //hover
    $("#switcher").hover(
        function(){
            $(this).addClass("hover");
        },
        function(){
            $(this).removeClass("hover");
        }
    );
    //collapse
    var toggerSwitcher = function(event){
        if(!$(event.target).is("button")){
            $("#switcher button").toggleClass("hidden");
        }
    };
    $("#switcher").on("click",toggerSwitcher);
    $("#switcher").trigger("click");
    //setClass
    $("#switcher-default").addClass("selected");
    var setBodyClass = function(className){
        $("body").removeClass().addClass(className);
        $("#switcher button").removeClass("selected");
        $("switcher-"+className).addClass("selected");
        $("#switcher").off("click",toggerSwitcher);
        if(className == "default"){
            $("#switcher").on("click",toggerSwitcher);
        }
    };
    $("#switcher").click(function(event){
        if($(event.target).is("button")){
            var className = event.target.id.split("-")[1];
            setBodyClass(className);
        }
    });
    //keyup
    var triggers = {
        D:"default",
        N:"narrow",
        L:"large"
    };
    $(document).keyup(function(event){
        var keyCode = String.fromCharCode(event.keyCode);
        if(keyCode in triggers){
            setBodyClass(triggers[keyCode]);
        }
    });

});