/**
 * Created by Administrator on 2016/4/11.
 */
 require.config({
 	baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        'Interface':'jQuery/pattern/utils/InterfaceUtil'
        /*,
        "AceBicycleShop":"jQuery/pattern/js/factory/mainFactory-AceBicycleShop"*/
    }
 });
 define([
 	'jquery',
 	'Interface'
],function($, Interface){
	/*Interface*/
	var ValidateInterface = new Interface('ValidateInterface',['addRule','validate']);
	/*Strategies*/
	var RULES = {
		//桥接模式
		isNonEmpty:function(value, errorMsg){
			if(value === ''){
				return errorMsg;
			}
		},
		//桥接模式
		minLength:function(value, length, errorMsg){
			if(value.length < length){
				return errorMsg;
			}
		},
		maxLength:function(value, length, errorMsg){
			if (value.length < length) {
                return errorMsg;
            }
		},
		//桥接模式
		isMobile:function(value, errorMsg){
			if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
				return errorMsg;
			}
		},
		isEmail:function(value, errorMsg){
			if (!/(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(value)) {
                return errorMsg;
            }
		},
		between:function(value, range, errorMsg){
			var min = parseInt(range.split('-')[0]);
            var max = parseInt(range.split('-')[1]);
            if (value.length < min || value.length > max) {
                return errorMsg;
            }
		},
		onlyEn:function(value, errorMsg){
			if (!/^[A-Za-z]+$/.test(value)) {
				return errorMsg;
            }
		},
		onlyZh:function(value, errorMsg){
			if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
                return errorMsg;
            }
		},
		onlyNum:function(value, errorMsg){
			if (!/^[0-9]+([.][0-9]+){0,1}$/.test(value)) {
                return errorMsg;
            }
		},
		onlyInt:function(value, errorMsg){
			if (!/^[0-9]*$/.test(value)) {
                return errorMsg;
            }
		},
		isChecked:function(value, errorMsg, el){
			var i = 0;
            var $collection = $(el).find('input:checked');
            if(!$collection.length){
                return errorMsg;
            }
		}
	};
	var STATUS2STYLE = {
		0:'tip',
		1:'success',
		2:'error'
	};
	/*观察者*/
	var Validate = function(){
		this.cache = [];
	};
	Validate.prototype = {
		addRule:function(dom, rules){
			//add <--- jquery callback
			var that = this;
			//js独立作用域
			for(var i = 0,rule;rule=rules[i++];){
				/*rule = {
					strategy:'isNonEmpty||between:6-16'	
					errorMsg:''
				};*/
				(function add(rule){
					//strategyArg = [strategy,value];
					var strategyArg = rule.strategy.split(':');
					var errorMsg = rule.errorMsg;
					that.cache.push(function(){
						var strategy = strategyArg.shift();
						strategyArg.unshift($(dom).val());
						strategyArg.push(errorMsg);
						strategyArg.push(dom);
						//strategyArg = [value,length,errorMsg];
						//strategyArg = [value,length,dom];
						if(!RULES[strategy]){
							$.error('not find the'+strategy);
						}
						return {
							errorMsg:RULES[strategy].apply(dom, strategyArg),
							dom:dom	
						}
					});
				})(rule);
			}
		},
		validate:function(){
			//fire
			for(var i = 0, validFun; validFun= this.cache[i++];){
				var result = validFun();
				if(Validate.DEFAULT.successTip){
					new Validate().showMsg(result.dom,'',1);
				}
				if(result.errorMsg){
					return result;
				}
			}
			return true;
		},
		showMsg:function(dom, errorMsg ,status){
			var $dom = $(dom),style,
				$parent = $dom.parent(),
				$msg = $parent.find('.valid_message');
			if(status in STATUS2STYLE){
				style = STATUS2STYLE[status];
			}else{
				style = STATUS2STYLE[0];
			}
			$msg.remove();
			$parent
			.removeClass('success tip error')
			.addClass(style)
			.append('<span class="valid_message">'+errorMsg+'</span>');
		}
	};
	Validate.DEFAULT = {
		type: null,
        onBlur: null,
        onFocus: null,
        onChange: null,
        successTip: true
	};
	//享元？桥接？
	var validateManager = {
		init:function(options){
			/*options{
				onFocus:function(){},
				onBlur:function(){}
			}*/
			var $this = $(this),
				$body = $(document.body),
				requires = $body.find('.required');
			var option = $.extend({},Validate.DEFAULT,typeof options == 'object' && options);
			var validator = new Validate();
			$body.on({
				focus:function(){
					var $this = $(this);
					var dataTip = $this.attr('data-tip') || '';
					var dataStatus = $this.attr('data-status');
					if(dataStatus == undefined || !parseInt(dataStatus)){
						validator.showMsg(this,dataTip);
					}
					option.onFocus ? option.onFocus.call($this, arguments):'';
				},
				blur:function(){
					var $that = $(this);
					var rules = [];
					var dataValid = $that.attr('data-valid').split('||');
					var dataError = $that.attr('data-error').split('||');
					for(var i = 0,len = dataValid.length; i < len; i++){
						var args = dataValid[i].split(':');
						//strategyArg = [value,length,errorMsg];
						//strategyArg = [value,length,dom];
						var strategy = args.shift();
						args.unshift($this.val());
						args.push(dataError[i]);
						args.push(this);
						var errorMsg = RULES[strategy].apply(this, args);
						if(errorMsg){
							$this.attr('data-status', 0);
							validator.showMsg(this,errorMsg,2);
							break;
						}
						if(!errorMsg){
							$this.attr('data-status', 1);
							option.successTip ? validator.showMsg($this, '', 1) : 
												$this.parent().find('.valid_message').remove();
						}
					}
				},
				change:function(){

				}
			},'.required');
		},
		submitValidate:function(){
			var $form = $(this);
			var requires = $form.find('.required');
			var validator = new Validate();
			$.each(requires,function(index, dom){
				var $dom = $(dom);
				var rules = [];
				var dataValid = $dom.attr('data-valid').split('||');
				var dataError = $dom.attr('data-error').split('||');
				for(var i = 0,len = dataValid.length; i < len; i++){
					rules.push({
						strategy:dataValid[i],	
						errorMsg:dataError[i]
					});
				}
				validator.addRule(dom, rules);
			});
			var result = validator.validate();
			/*result = {
				errorMsg:'12345',
				dom:dom
			};*/
			if(result.errorMsg){//result存在
				validator.showMsg(result.dom, result.errorMsg, 2);
				return false;
			}
			return true;
		}
	};
	function Plugin(options){
		//传入大量的可选参数，用对象传递
		var method = arguments[0];
		if(validateManager[options]){
			method = validateManager[options];
		}else if($.isPlainObject(options)){
			method = validateManager.init;
		}else{
			throw new Error('can not find the validate');
		}
		return method.apply(this, arguments);
	}
	$.fn.validate = Plugin;
	$.fn.validate.constructor = Validate;

	$('form').validate({
		onFocus: function() {
		  this.parent().addClass('active');
		  return false;
		},
		onBlur: function() {
		  var $parent = this.parent();
		  var _status = parseInt(this.attr('data-status'));
		  $parent.removeClass('active');
		  if (!_status) {
		    $parent.addClass('error');
		  }
		  return false;
		}
  	});

  	$('form').on('submit', function(event) {
	    event.preventDefault();
	    $(this).validate('submitValidate');
  	});

  	/*---------------------------------------------
  		单例的测试
  	
  	var singleTon = (function(){
  		var _uniqueInstance = null,
  			_name = '';

  		var Test = function(){
  			console.log('Test constructor');
  		};
  		Test.prototype = {
  			constructor:Test,
  			method1:function(){}
  		};
  		return {
  			getInstance:function(){
  				if(!_uniqueInstance){
  					_uniqueInstance = new Test();
  				}
  				return _uniqueInstance;
  			}
  		};
  	})();
  	*/
 });