/**
 * Created by thomas on 2016/4/29.
 * 
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "InterfaceUtil":"jQuery/pattern/utils/InterfaceUtil",
        "ExtendUtil":"jQuery/pattern/utils/ExtendUtil"
    }
});

define([
	'jquery',
	'InterfaceUtil',
	'ExtendUtil'
],function($, Interface, extend){
	
	$.extend($.fn,{
		validate:function(options){
			var validator = new $.validator(options, this[0]);
			$.data(this[0],'validator',validator);
		},
		rules:function(){
			var element = this[0];
			var data = $.extend({},$.validator.staticRules());
			return data;
		}
	});
	/**
	 * 组合模式
	 */
	$.validator = function(options, form){
		//处理参数配置
		this.settings = $.extend( true, {}, $.validator.defaults, options );
		this.currentForm = form;
		this.init();
	}
	$.extend($.validator,{
		defaults:{
			messages: {},
			rules: {},
			onfocusin:function(element){
				this.lastActive = element;
			},
			onfocusout:function(){

			},
			onkeyup:function(element, event){
				this.element(element);
			}
		},
		prototype:{
			init:function(){
				//重置容器
				var rules;
				rules = this.settings.rules;//format
				function delegate(event){
					//事件委托改变了this的指向
					var validator = $.data(this[0].form,'validator'),
						eventType = 'on'+event.type.replace(/^validate/, ""),
						settings = validator.settings;
					if(settings[eventType]){
						settings[eventType].call(validator,this[0],event);
					}
				}
				$(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'], [type='radio'], [type='checkbox']",
					"focusin focusout keyup", delegate);//事件委托
			},
			element:function(element){
				//clearn element validate
				this.check(element) == false;
			},
			clean:function(){
				
			},
			check:function(){
				
			},
			staticRules:function(element){
				var rules = {},
					validator = $.data(element.form,'validator');
				if(validator.settings.rules){
					rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
				}
				return rules;
			},
			normalizeRule:function(data){
				if(typeof data == 'string'){

				}
				return data;
			}
		}
	});
	$.extend($.fn,{
		validateDelegate:function(delegate, type, handler){
			reurn this.bind(type,function(){
				var target = $(event.target);
				if ( target.is(delegate) ) {
					return handler.apply(target, arguments);
				}
			});
		}
	});






});