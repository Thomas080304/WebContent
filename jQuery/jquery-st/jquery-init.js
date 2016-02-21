(function(window, undefined){

	var jQuery = function(selector, context){

		return new jQuery.fn.init(selector, context, rootjQuery);
	};
	jQuery.fn = jQuery.prototype = {
		constructor:jquery,
		init:function(selector, context, rootjQuery){

		},
		version:version
	};

	jQuery.fn.init.prototype = jQuery.prototype;

	jQuery.extend = jQuery.fn.extend = function(){
		//very important
	};
	// [[Class]] -> type pairs
	var class2type = {
		"[object Boolean]":"boolean",
		"[object Number]":"number",
		"[object String]":"string",
		"[object Function]":"function",
		"[object Date]":"date",
		"[object Array]":"array",
		"[object Object]":"object",
		"[object Error]":"error",
		"[object RegExp]":"regexp"
	};
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	jQuery.extend({
		expando:"unique",
		noConflict:function(){},
		isReady:false,
		readyWait:1,
		holdReady:function(){},
		ready:function(){},
		isFunction:function(fn){
			//todo type
			return jQuery.type() === "function"
		},
		isArray:function(){},
		isWindow:function(){},
		isNumeric:function(){},
		type:function(obj){
			var class2type = {
				"[object Boolean]":"boolean",
				"[object Number]":"number",
				"[object String]":"string",
				"[object Function]":"function",
				"[object Date]":"date",
				"[object Array]":"array",
				"[object Object]":"object",
				"[object Error]":"error",
				"[object RegExp]":"regexp"
			};
			//undefined == null true
			//null == null true
			//NaN == NaN false
			if(obj == null){
				return String(obj);
			}

			//Boolean Number String---typeof---boolean number string
			//Function Array Date Object Error
			//Function ---> function [object Function]
			//Array ---> object [object Array]
			//Date ---> object [object Date]
			//Object ---> object [object Object]
			//Error ---> object [object Error]
			//RegExp ---> object || function [object RegExp]
			return typeof obj == "object" || typeof obj == "function" ?
					class2type[{}.toString.call(obj)] || "object" :
					typeof obj;
		},
		isPlainObject:function(){},
		isEmptyObject:function(){},
		error:function(){},
		parseHTML:function(){},
		parseJSON:function(){},
		parseXML:function(){},
		noop:function(){},
		globalEval:function(){},
		camelCase:function(){},
		nodeName:function(){},
		each:function(){},
		trim:function(){},
		makeArray:function(){},
		inArray:function(){},
		merge:function(){},
		grep:function(){},
		map:function(){},
		guid:1,
		proxy:function(){},
		access:function(){},
		now:function(){}
	});

})(window);