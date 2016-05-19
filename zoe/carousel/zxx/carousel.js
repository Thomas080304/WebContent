/**
 *	create by thomas 2016/5/8.
 */
 ;(function(factory){
 	if (typeof define === 'function' && define.amd) {
        // AMD
        define(["jQuery"], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jQuery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
 })(function($){
 	var isAnimation = typeof history.pushState == "function";
 	$.scroll = function(elements, options){
 		$(elements).scroll(options);
 	}
 	$.extend($.scroll,{
 		getRelative:function(trigger, params){
			trigger = $(trigger);
			if (trigger.length == 0) return $();
			var arrTarget = [], isMoreToOne = false;
			trigger.each(function(index, element){
				var selector = $(this).attr(params.attribute) || ($(this).attr("href") || "").split("#")[1];
				if (selector && arrTarget[selector] != true)  {
					var target = $();
					if (/^\w+$/.test(selector)) {
						target = $("#" + selector);
						// 如果属性值作为id没有对应元素，就作为类名选择器使用
						if (target.length === 0) {
							target = $("." + selector);
						}
						// 如果类名选择器也没有对应的元素，作为选择器使用
						if (target.length === 0) {
							target = $(selector);
						}
					} else {
						// 纯选择器
						target = $(selector);
					}

					target.each(function(index, element) {
						arrTarget.push(element);	
					});					
					
					// 设置标志量，避免重复
					arrTarget[selector] = true;
				}
			});
			return $(arrTarget);
 		},
 		transition: function(target, duration, isReset) {
			var transform = "transform " + duration + "ms linear";
			if (isAnimation == false) return;
			// CSS3 transition设置
			if (isReset == true) {
				target.css("webkitTransition", "none").css("transition", "none")
					.data("hasTransition", false);
			} else if (!target.data("hasTransition")) {
				target.css({
					webkitTransition: "-webkit-" + transform,
					webkitBackfaceVisibility: "hidden",
					transition: transform,
					BackfaceVisibility: "hidden"
				}).data("hasTransition", true);
			}
			//transition: transform 200ms linear
		},
 		translate: function(target, key, value) {
			// 偏移值设置
			var valueTransform = "translate"+ key +"("+ value +")";
			isAnimation? 
			target.css("webkitTransform", valueTransform).css("transform", valueTransform):
			target.css(key == "X"? { left: value }: { top: value });
			//transform: translateX(250)
			//css({left:250px})
		},
 		animation:function(targetHide, targetShow, params){
			var container = null, that = this, noAnimate = params.animation == "none";
			var funTransform = function(target, key, value) {
				// 如果value是纯数值
				if (parseInt(value) === value) value += "px";
				// IE10+等现代浏览器
				if (isAnimation) {
					// CSS3驱动动画					
					that.transition(target, params.duration, noAnimate);
					// 动画触发等
					that.translate(target, key, value);
					// console.log(value);
				} else {
					// IE6-IE9这些老弱病残
					// left/top
					target[noAnimate? "css": "animate"](key == "X"? {
						left: value
					}: {
						top: value	
					}, params.duration);
					//$().css({left:250});
					//$().animate({left:250});
				}
			};
			if (params.duration && params.animation != "none") {
				params.isAnimating = true;
				// 为了简便，不走回调，直接定时器还原点击
				var durationObj = {
					"slow": 200,
					"normal": 400,
					"fast": 600	
				}, durationMs = durationObj[params.duration] || params.duration;
				
				if (params.direction == "sync") {
					if (targetHide && targetShow) {
						durationMs = 800;
					} else if (targetHide || targetShow) {
						durationMs = 400;
					} else {
						durationMs = 0;	
					}
				}

				setTimeout(function() {
					params.isAnimating = false;	
				}, durationMs);
			}
			if(params.container && params.container.length){
				var position = params.container.data("position");
				container = params.container.get(0);
				funTransform(params.container, "X", -1 * position.left)
			}

 		}
 	});
 	$.fn.scroll = function(options){
 		var defaults = {
 			container:null,
 			classPrev:'prev',
 			classNext:'next',
 			attribute:'data-rel',
 			classDisabled:'disabled',
 			animation:'auto',
 			duration:250,
 			onSwitch:$.noop
 		};

 		var params = $.extend({},defaults,options);
 		var indexSelected = params.indexSelected || -1,
			numSwitch = parseInt(params.number) || 1;
		var self = $(this);
		params.isAnimating = false;
		if (self.length == 0) {			
			if (params.container == null) return self;
		}
		eleRelatives = $.scroll.getRelative(self, params);
		if ((lenRelatives = eleRelatives.length) == 0) return self;
		//indexSelected
		//prev and next btn
		var funStatePrevNext = function(indexWill) {
			// 后退按钮的状态
			if (indexWill <= 0) {
				elePrev.addClass(params.classDisabled).removeAttr("title").attr("disabled", "disabled");
			} else {
				elePrev.removeClass(params.classDisabled).attr("title", elePrev.data("title")).removeAttr("disabled");
			}
			// 前进按钮的状态
			// 规则如下：
			// (总条目 - indexSelected位置值) / 每次切换的条数 是否大于 1
			if ((lenRelatives - indexWill) / numSwitch > 1) {
				eleNext.removeClass(params.classDisabled).attr("title", eleNext.data("title")).removeAttr("disabled");
			} else {
				eleNext.addClass(params.classDisabled).removeAttr("title").attr("disabled", "disabled");
			}
		}
		if(indexSelected == -1){
			eleRelatives.each(function(index, element){
				if (indexSelected != -1) return;
				if ($(element).css("display") != "none") {
					indexSelected = index;
				}
			});
		}
		var funSwitchable = function(indexWill){
			if (indexWill == indexSelected) {
				return;
			}
			var eleWillRelative = eleRelatives.slice(indexWill, indexWill + numSwitch);			
			var eleSelected = null, eleWillSelect = null, eleRelative = null;
			if(params.container){
				// 获取相对父元素的偏移
				var position = eleWillRelative.position();
				// 定位
				params.container = $(params.container);
				// 位置存储（动画终点位置）
				params.container.data("position", position);
				// 容器动画
				$.scroll.animation(null, null, params);					
				// 按钮状态					
				funStatePrevNext(indexWill);
			}
			params.onSwitch.call(this, eleWillRelative);
			indexSelected = indexWill;
		};
		var elePrev = $(), eleNext = $();
		elePrev = self.eq(0), eleNext = self.eq(1);
		elePrev.data("title", elePrev.attr("title"));
		eleNext.data("title", eleNext.attr("title"));
		funStatePrevNext(indexSelected);
		self.each(function(index, element){
			$(element).data("index", index);
			$(element).bind('click',function(){
				var indexWill, eleWill;
				if (params.isAnimating == true) return false;
				if ($(this).attr("disabled")) return false;
				if (index == 0) {
					indexWill = indexSelected - numSwitch;
					indexWill = Math.max(0, indexWill);
				} else if (index == 1) {
					indexWill = indexSelected + numSwitch;
					indexWill = Math.min(indexWill, lenRelatives - 1);
				}
				funSwitchable.call(this, indexWill);
			});
		});
 	};

 });