/*
	AlertWin.defaultOptions = {
		title:'对话框',
		shut:'X',
		index:2000,
		opacity:0.5,

		width:'auto',
		height:'auto',

		btnClose:true,

		fix:false,
		bgclose:false,
		drag:false,

		onshow:$.noop,
		onclose:$.noop,

		delay:0
	};
	$.fn.extend({
		alertWin:function(){
			return this.each(function(){
				new AlertWin();
			});
		}
	});
*/
(function(){
	'use strict'
	//var ModalInterface = new Interface("ModalInterface",['show','hide','toggle','resize']);
	var Modal = function(element, options){//this = Modal self
		this.options = options;
		this.$body = $(document.body);
		this.$window = $(window);
		this.$element = $(element);//Modal self
		this.$backup = $('.mask-layer');//mask layer
		this.isShow = null;
	};
	Modal.prototype.show = function(){
		this.isShow = true;
		//居中
		this.$element.addClass('in');
		this.$backup.addClass('in');
		this.handleUpdate();
		this.resize();
		//change this to Modal function
		this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
		this.backdrop();
		this.drage();
		this.fixed();
	};
	Modal.prototype.hide = function(){
		this.isShow = false;
		this.$element.removeClass('in');
		this.$backup.removeClass('in');	
	};
	Modal.prototype.toggle = function(){
		return this.isShow ? this.hide() : this.show();
	};
	Modal.prototype.resize = function(){
		if(this.isShow){
			$(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this));
		}else{
			$(window).off('resize.bs.modal');
		}
	};
	Modal.prototype.backdrop = function(){
		var options = $.extend(Modal.DEFAULTS, this.options);
		this.$backup.css({
			cursor:'default'
		});
		if(options.bgclick){
			this.$element.css({
				cursor:'pointer'
			});
			this.$backup.on('click.dismiss.bs.modal', $.proxy(this.hide, this));
		}
	};
	Modal.prototype.drage = function(){
		var options = $.extend(Modal.DEFAULTS, this.options);//move
		var drag = false;
		$(document).unbind('mouseover').unbind('mouseup');
		if(options.candrag && !options.bgclick){
			var currentX = 0,currentY = 0;
			var diaL = this.$element.css('left'),
				diaT = this.$element.css('top');
			this.$element.on('mousedown',function(e){
				if(e.target == this){
					drag = true;
					currentX = e.pageX;
					currentY = e.pageY;
				}
			}).css({cursor:'move'});
			$(document).on('mousemove',function(e){
				if(drag){
					var nowX = e.pageX,nowY = e.pageY;
					var disX = (nowX-currentX),disY = (nowY-currentY);
					$('.modal-wrapper').css({'top':parseInt(diaT)+disY}).css({'left':parseInt(diaL)+disX});
				}
			});	
			$(document).on('mouseup',function(){
				drag = false;
				diaL = $('.modal-wrapper').css('left');
				diaT = $('.modal-wrapper').css('top');
				$('.modal-wrapper').removeClass('cursor');
			});
		}
	};
	Modal.prototype.fixed = function(){
		var options = $.extend(Modal.DEFAULTS, this.options);
		if(options.fixed){
			this.$element.css({
				position:'fixed'
			});
		}
	};
	Modal.prototype.handleUpdate = function(){
		var winW = this.$window.width(),winH = this.$window.height();
		var bodyH = this.$body.height();
		if(bodyH < winH){
			bodyH = winH;
		}
		var diaH = this.$element.outerHeight(),
			diaW = this.$element.outerWidth();
		var isOverflow = winH < diaH;
		var t,l;
		if(!isOverflow){
			t = (winH-diaH)/2;
			l = (winW-diaW)/2;
		}else{
			t = 30;
			l = (winW-diaW)/2;
		}
		
		this.$element.css({
			top:t,
			left:l
		});

	};
	Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true,
	    candrag:false,
	    bgclick:true,
	    fixed:true
	};
	function Plugin(option, _relatedTarget) {
	    return this.each(function () {//this = Modal self
	      var $this   = $(this);
	      var data    = $this.data('bs.modal');
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
	      if (!data){
	      	$this.data('bs.modal', (data = new Modal(this, options)));//this ==Modal self
	      } 
	      if (typeof option == 'string'){
	      	data[option](_relatedTarget)//_relatedTarget = button
	      }else if (options.show){
	      	data.show(_relatedTarget);//this = Model self
	      } 
	    });
	}

	var old = $.fn.modal;

	$.fn.modal             = Plugin;
	$.fn.modal.Constructor = Modal;
	$.fn.modal.noConflict = function () {
	    $.fn.modal = old
	    return this
	};
	function getTargetFromTrigger($trigger) {
	    var href;
	    var target = $trigger.attr('data-target')
	      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

	    return $(target);
	}
	$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){
		var $this   = $(this);
		if (!$this.attr('data-target')) e.preventDefault();
		var $target = getTargetFromTrigger($this);//Modal self
	    var data    = $target.data('bs.modal');
	    var option  = data ? 'toggle' : $this.data();//method
	    Plugin.call($target, option,this);
	});
})(jQuery);

