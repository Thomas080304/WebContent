(function($){
	function throttle(method, context){
		if($.isFunction(method)){
			clearTimeout(mthod.tId);
			method.tId = window.setTimeout(function(){
				method.call(context || window);
			},100);
		}
	}
	$.fn.zxxbox = function(){
		return this.each(function(){
			//alert(this);
			$.zxxbox();
		});
	};
	$.zxxbox = function(options){
		var options = $.extend({},zxxboxDefault,options),
			eleOut = $("#wrapOut"),
			eleBlank = $("#zxxBlank");
		$.zxxbox.o = {
			options:options,
			bg:eleBlank,
			out:eleOut,
			clo:$('#wrapClose')
		};
		$.zxxbox.setSize();
		$.zxxbox.setPosition();
		$(window).resize(function(){
			$.zxxbox.setPosition();
		});
		$.zxxbox.o.clo.on('click',function(){
			$.zxxbox.hide();
		});
	};
	$.extend($.zxxbox,{
		hide:function(){
			
		},
		setSize:function(){
			//alert(1);
		},
		setPosition:function(){
			var winW = $(window).width(),
				winH = $(window).height(),
				bodyH = $(document.body).height();
			if(bodyH < winH){
				bodyH = winH;
			}
			$.zxxbox.o.bg.width(winW).height(bodyH).css({
				opacity:'0.5'
			});
			var outSW = $.zxxbox.o.out.outerWidth(),
				outSH = $.zxxbox.o.out.outerHeight();
			var t = (winH-outSH)/2,l = (winW-outSW)/2;
			$.zxxbox.o.out.css({
				top:t,
				left:l,
				zIndex:$.zxxbox.o.options.zIndex
			});

		},
		remind:function(message, callback, options){
			$.zxxbox();
		}
	});      
	var zxxboxDefault = {
		width:'auto',
		height:'auto',
		zIndex:'2000'
	};
	//$.zxxbox.remind();
	$("#basic").zxxbox();
})(jQuery);