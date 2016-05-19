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
 	$.tab = function(elements, options){
 		$(elements).scroll(options);
 	}
 	$.extend($.tab,{
 		getRelative:function(trigger, params){
			trigger = $(trigger);
			if (trigger.length == 0) return $();
			var arrTarget = [];
			trigger.each(function(index, element) {
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
					
					arrTarget[selector] = true;
				} else if (arrTarget[selector] == true) {
					isMoreToOne = true;
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
			if((targetShow && targetShow.length) || (targetHide && targetHide.length)){
				switch(params.animation){
					case 'translate': {
						var indexHide = targetHide.data('index'),
							indexShow = targetShow.data('index');
						var objDirection = {
							"vertical": "Y",
							"horizontal": "X"	
						};
						if(indexHide != undefined && indexShow != undefined){
							var hundred = 100, isNext = true;
							isNext = indexHide < indexShow;
							hundred = (isNext * 2 - 1 ) * 100;
							that.transition(targetShow.show(), params.duration, true);
							// 要显示的元素乾坤大挪移到我们希望的位置
							that.translate(targetShow, objDirection[params.direction], hundred + "%");
							// 动画触发了，一个移走，一个移入
							setTimeout(function() {
								funTransform(targetHide, objDirection[params.direction], -1 * hundred + "%");
								funTransform(targetShow, objDirection[params.direction], "0%");	
							}, 17);
							
							// 清除触发源
							params.prevOrNext = null;
						}
						break;
					}
					default:{
						if (targetHide) targetHide.hide();
						if (targetShow) targetShow.show();
					}
				}
				
			}
			/*if(params.container && params.container.length){
				var position = params.container.data("position");
				container = params.container.get(0);
				funTransform(params.container, "X", -1 * position.left)
			}*/

 		}
 	});
 	$.fn.tab = function(options){
 		var defaults = {
 			direction:'horizontal',
 			container:null,
 			eventType:'click',
 			hoverDelay:200,
 			classAdd:'',
 			classRemove:'',
 			classPrefix:'',
 			attribute:'data-rel',
 			classDisabled:'disabled',
 			animation:'auto',
 			duration:250,
 			toggle:false,
 			number: "auto",
 			onSwitch:$.noop
 		};

 		var params = $.extend({},defaults,options);
 		$.each(["disabled", "prev", "play", "pause", "next"], function(index, key) {
			key = $.trim(key);
			var upperKey = key.slice(0, 1).toUpperCase() + key.slice(1),
				paramsKey = "class" + upperKey,
				lastChar = params.classPrefix.slice(-1);
			if (params[paramsKey] === undefined) {
				if (params.classPrefix) {
					// 根据classPrefix中是否含关键字符（下划线或短横线）做判断
					if (/\-/g.test(params.classPrefix)) {
						params[paramsKey] = lastChar == "-"? 
							(params.classPrefix + key): [params.classPrefix, key].join("-");	
					} else if (/_/g.test(params.classPrefix)) {
						params[paramsKey] = lastChar == "_"? 
							(params.classPrefix + key): [params.classPrefix, key].join("_");	
					} else {
						// 驼峰-大小写组合
						params[paramsKey] = params.classPrefix + upperKey;
					}
				} else {
					params[paramsKey] = key;
				}
			}
		});
 		var indexSelected = params.indexSelected || -1,
			numSwitch = parseInt(params.number) || 1,
			hoverTimer = null,
			autoPlayTimer = null,
			eleRelatives = $(),
			lenRelatives = 0;
		var self = $(this);
		params.isAnimating = false;
		if (self.length == 0) {			
			if (params.container == null) return self;
		}
		eleRelatives = $.tab.getRelative(self, params);
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
		if (indexSelected == -1 && params.toggle == false) {
			if (params.classAdd) {
				self.each(function(index, element) {
					if (indexSelected != -1) return;
                   	if ($(element).hasClass(params.classAdd)) indexSelected = index;
                });	
			}
		}
		var funSwitchable = function(indexWill){
			if (indexWill == indexSelected) {
				return;
			}
			var eleWillRelative = eleRelatives.slice(indexWill, indexWill + numSwitch);			
			var eleSelected = null, eleWillSelect = null, eleRelative = null;
			if(indexWill != indexSelected){
				eleWillSelect = self.eq(indexWill);
				if(indexSelected >= 0){
					eleSelected = self.eq(indexSelected);
					eleRelative = eleRelatives.eq(indexSelected, indexSelected+numSwitch);

				}
				eleWillSelect.addClass(params.classAdd).removeClass(params.classRemove);
				eleSelected.removeClass(params.classRemove).removeClass(params.classAdd);
				$.tab.animation(eleRelative, eleWillRelative, params);
			}
			params.onSwitch.call(this, eleWillRelative);
			indexSelected = indexWill;
		};
		
		self.each(function(index, element){
			$(element).data("index", index);
			if(params.eventType == 'click'){
				$(element).bind('click',function(){
					if (params.isAnimating == true) return false;
					//选项
					params.prevOrNext = $(this);
					funSwitchable.call(element, index);
					//组织a标签的默认行为
					if (this.id !== $(this).attr(params.attribute) && (element && element.href)) {
						return false;
					}
				});
			}else if(/^hover|mouseover$/.test(params.eventType)){
				$(element).hover(
				function(){
					if(params.isAnimating) return;
					clearTimeout(hoverTimer);
					hoverTimer = setTimeout(function(){
						funSwitchable.call(element,index);
					},parseInt(params.hoverDelay || 0));
				},
				function(){
					clearTimeout(hoverTimer);
				});
			}
			
		});
		eleRelatives.each(function(index, element) {
			$(element).data("index", index);	
		});
		var funPlayPrev = function(trigger){
			var indexWill = indexSelected - 1;
			if (indexWill < 0) {
				indexWill = lenRelatives -1;
			}
			funSwitchable.call(trigger || self.get(indexWill), indexWill);
		};
		var funPlayNext = function(trigger){
			var indexWill = indexSelected + 1;
			if (indexWill >= lenRelatives) {
				indexWill = 0;
			}
			funSwitchable.call(trigger || self.get(indexWill), indexWill);
		};
		var funAutoPlay = function(){
			clearTimeout(autoPlayTimer);
			if(funAutoPlay.flagAutoPlay == true){
				autoPlayTimer = setTimeout(function(){
					funPlayNext();
					funAutoPlay();
				},params.autoTime);
			}
		};
		//auto
		if(params.container){
			var htmlTempOperate = '';
			self.length && $.each(["Prev", "Pause", "Next"],function(index, key){
				if (params.autoTime == 0 && key == "Pause") return;
				htmlTempOperate = htmlTempOperate+'<a href="javascript:" class="'+ params["class" + key] +'" data-type="'+ key.toLowerCase() +'"></a>';
			});
			params.container.append(htmlTempOperate).delegate('a','click',function(){
				if (params.isAnimating == true) return false;
				var type = $(this).attr("data-type"), 
					classType = params["class" + type.slice(0, 1).toUpperCase() + type.slice(1)],
					indexWill = indexSelected;
				switch(type){
					case "prev": {
							//选项
							params.prevOrNext = $(this);
							funPlayPrev();
							if (params.autoTime) funAutoPlay();
							break;	
						}
						case "play": {
							funAutoPlay.flagAutoPlay = true;
							$(this).attr("data-type", "pause").removeClass(classType).addClass(params.classPause);
							funAutoPlay();
							break;	
						}
						case "pause": {
							funAutoPlay.flagAutoPlay = false;
							$(this).attr("data-type", "play").removeClass(classType).addClass(params.classPlay);
							funAutoPlay();
							break;	
						}
						case "next": {
							params.prevOrNext = $(this);
							funPlayNext();
							if (params.autoTime) funAutoPlay();
							break;	
						}
				}
				//阻止默认行为
				return false;
			});
		}
		if(params.autoTime){
			if(params.hoverStop !== false){
				var arrHoverPlay = [self, eleRelatives, params.container];
				$.each(arrHoverPlay,function(index, target){
					if(target){
						$(target).hover(
						function(event){
							if (event.pageX !== undefined || params.eventType == "click"){
								clearTimeout(autoPlayTimer);
							} 
						},
						function(event){
							if (event.pageX !== undefined || params.eventType == "click"){
								funAutoPlay();
							} 
						});
					}
				});
			}
			funAutoPlay.flagAutoPlay = true;
			funAutoPlay();
		}
 	};

 });