/**
 * Created by Administrator on 2015/11/29.
 */
(function($){
    $(document).on("mouseenter mouseleave","div.photo",function(event){
        var $detail = $(this).find(".details");
        if(event.type == "mouseenter"){
            $detail.fadeTo("fast",0.7);
        }else if(event.type == "mouseleave"){
            $detail.fadeOut("fast");
        }
    });
    var pageNum = 1;
    $(document).on("nextPage",function(event,scrollVisible){
        event.preventDefault();
        var $link = $("#more-photos");
        var url = $link.attr("href");
        if(url){
            $.get(url,function(data){
                var $data = $(data).appendTo("#gallery");
                if(scrollVisible){
                    var newTop = $data.offset().top;
                    $(window).scrollTop(newTop);
                }
                checkScrollPostion();
            });
            pageNum++;
            if(pageNum < 20){
                $link.attr({
                    "href":"pages/"+pageNum+".html"
                });
            }else{
                $link.remove();
            }
        }
    });
    $(document).ready(function() {
        $('#more-photos').click(function(event) {
            event.preventDefault();
            $(this).trigger("nextPage",[true]);
        });
        var timer = 0;
        $(window).scroll(function() {
            if (!timer) {
                timer = setTimeout(function() {
                    checkScrollPostion();
                    timer = 0;
                }, 250);
            }
        }).trigger("scroll");
    });
    function checkScrollPostion(){
        var distance = $(window).scrollTop()+$(window).height();
        if($("#container").height() <= distance){
            $(document).trigger("nextPage");
        }
    }
   /* $(document).ready(function(){
        $(window).scroll(checkScrollPostion).trigger("scroll");
    });*/
})(jQuery);
