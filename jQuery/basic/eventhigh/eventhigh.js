/**
 * Created by Administrator on 2015/11/29.
 */
$(function($){
    var pageNum = 1;
    $("#more-photos").click(function(event){
        event.preventDefault();
        var $link = $(this);
        var url = $link.attr("href");
        if(url){
            $.get(url,function(data){
                $("#gallery").append(data);
            });
            pageNum++;
            if(pageNum < 3){
                $link.attr({
                    "href":"pages/"+pageNum+".html"
                });
            }else{
                $link.remove();
            }
        }
    });
    /*$("div.photo").hover(
        function(){
            $(this).find(".details").fadeTo("fast",0.7);
        },
        function(){
            $(this).find(".details").fadeOut("fast");
        }
    );*/
   /* $("div.photo").on("mouseenter mouseleave",function(event){
       var $detail = $(this).find(".details");
        if(event.type == "mouseenter"){
            $detail.fadeTo("fast",0.7);
        }else if(event.type == "mouseleave"){
            $detail.fadeOut("fast");
        }
        //$detail.toggleClass("seleced",event.type == "mouseenter"); delete seleted class
    });*/
    //gallery
   /* $("#gallery").on("mouseover mouseout",function(event){
        var $target = $(event.target).closest("div.photo");
        var $related = $(event.relatedTarget).closest("div.photo");
        var $detail = $target.find(".details");
        if(event.type == "mouseover" && $target.length){
            $detail.fadeTo("fast",0.7);
        }else if(event.type == "mouseout" && !$related.length){
            $detail.fadeOut("fast");
        }
    });*/
    $("#gallery").on("mouseenter mouseleave","div.photo",function(event){
        var $detail = $(this).find(".details");
        if(event.type == "mouseenter"){
            $detail.fadeTo("fast",0.7);
        }else if(event.type == "mouseleave"){
            $detail.fadeOut("fast");
        }
    });
});
