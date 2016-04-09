(function($){
	'use strict';
	var that,
		defaultOptions = {
			href:'.submenu'
		};
	function clearOthers(currentSub){
		that.el.find(defaultOptions.href).not(currentSub).slideUp().parent().removeClass('open');
	}
	var accordion = '[data-toggle="accordion"]';
	var Accordion = function(el,data){
		that = this;
		$.extend(defaultOptions,data);
		this.el = $(el);
		this.el.on('click',accordion,this.show);
	};
	Accordion.prototype.show = function(e){
		var	$this = $(this),
		$currentNext = $this.next();
		$currentNext.slideToggle();
		$this.parent().toggleClass("open");
		clearOthers($currentNext);
	};
	$.fn.extend({accordion2:function(){
		return new Accordion(this,arguments[0]);
	}});
})(jQuery);