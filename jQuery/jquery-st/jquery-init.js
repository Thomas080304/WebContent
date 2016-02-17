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

	jQuery.extend({
		expando:"unique",
		noConflict:function(){},
		isReady:false,
		readyWait:1,
		holdReady:function(){},
		ready:function(){},
		isFunction:function(){},
		isArray:function(){},
		isWindow:function(){},
		isNumeric:function(){},
		type:function(){},
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