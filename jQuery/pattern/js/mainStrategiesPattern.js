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
		isNonEmpty:function(){

		},
		minLength:function(){

		},
		maxLength:function(){

		},
		isMobile:function(){

		},
		isEmail:function(){

		},
		between:function(){

		},
		onlyEn:function(){

		},
		onlyZh:function(){

		},
		onlyNum:function(){

		},
		onlyInt:function(){

		},
		isChecked:function(){

		}
	};

	var Validate = function(){
		
	};
	Validate.prototype = {
		//分离外部数据
		init:function(){
			//getContext
		},
		addRule:function(){
			//search for dom
		},
		validate:function(){
			//validate
		}
	};
	Validate.DEFAULT = {

	};
	//享元模式
	var validateManager = {
		init:function(){}
	};
	function Plugin(options){
		if(){

		}
	}
	$.fn.validate = Plugin;
	$.fn.validate.constructor = Validate;

 });