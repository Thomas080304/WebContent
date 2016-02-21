define([

],function(){
	var class2type,core_deletedIds = [],core_version = "2.0.3",
		core_hasOwn = class2type.hasOwnProperty,
		core_trim = core_version.trim,
		core_indexOf = core_deletedIds.indexOf,
		core_push = core_deletedIds.push,
	 	class2type = {
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

	var utils = {
		type:function(obj){
			//undefined == null true
			//null == null true
			//NaN == NaN false
			if(obj == null){
				return String(obj);
			}

			//Boolean Number String---typeof---boolean number string
			
			//Function ---> function [object Function]
			//Array ---> object [object Array]
			//Date ---> object [object Date]
			//Object ---> object [object Object]
			//Error ---> object [object Error]
			//RegExp ---> object || function [object RegExp]

			//NaN ---> number [object Number]
			return typeof obj == "object" || typeof obj == "function" ?
					class2type[{}.toString.call(obj)] || "object" :
					typeof obj;
		},
		isFunction:function(fn){
			return utils.type(fn) === "function"
		},
		isArray:Array.isArray,
		isWindow:function(obj){
			//null.xx undefined.xx == wrong
			//NaN.property right
			//window === window.window true
			return obj != null && obj === ojb.window;
		},
		isNumeric:function(obj){
			//parseFloat(123 || "123") ===> 123 others NaN
			return !isNaN(parseFloat(obj)) && isFinite(obj);
		},
		isPlainObject:function(obj){
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window

			if(utils.type(obj) !== "object" || obj.nodeType || utils.isWindow(obj)){
				return false;
				//Array Date Object Error RegExp
			}
			//obj.constructor.prototype
			//Array array.constructor.prototype = []
			//Object o.constructor.prototype = Object;
			try{
			// Support: Firefox <20
			// The try/catch suppresses exceptions thrown when attempting to access
			// the "constructor" property of certain host objects, ie. |window.location|
			// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
				if(obj.constructor && 
					!core_hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){
					return false;
				}
			}catch(e){
				return false;
			}
			
			return true;
		},
		isArraylike:function(obj){
			var length = obj.length,
				type = utils.type(obj);
			if(utils.isWindow(obj)){
				return false;
			}
			/*
			HTMLCollection
			0:div
			1:div
			length: 0
			__proto__: HTMLCollection*/
			if(obj.nodeType && length){
				return true;
			}
			//[1,3,4]
			//{0:"a",1:"b",2:"c",3:"d",length:4}
			
			/*
			Object("ab")
			0: "a"
			1: "b"
			length: 2
			__proto__: String
			[[PrimitiveValue]]: "ab"*/
			return type === "array" || type !== "function" && 
					(length === 0 || 
						typeof length == "number" && length > 0 && (length-1) in obj);
		},
		merge:function(first, second){
			var l = second.length,
				i = first.length,
				j = 0;
			//second {0:"a",1:"b",2:"c",3:"d",length:4} 
			// 	  || {0:"a",1:"b",2:"c",3:"d"}
			if(typeof l === "number"){
				for(; j < l; j++){
					first[i++] = second[j];
				}
			}else{
				while(second[j] !== undefined){
					first[ i++ ] = second[ j++ ];
				}
			}
			first.length = i;
			return first;
		},
		trim: function( text ) {
			return text == null ? "" : core_trim.call( text );
		},
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : core_indexOf.call( arr, elem, i );
		},
		each:function(obj, callback){
			var value,
				i= 0,
				length = obj.length,
				isArray = utils.isArraylike(obj);

			if(isArray){
				//[] || {0:"a",1:"b",length:2}
				for(; i < length; i++){
					value = callback.apply(obj[i],i,obj[i]);
					if(value === false){
						break;
					}
				}
			}else{
				//{0:"a",1:"b"}
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		},
		// results is for internal usage only
		makeArray:function(arr, results){
			var ret = results || [];
			if(arr != null){
				if(utils.isArraylike(Object(arr))){
					utils.merge(ret,typeof arr === "string" ? [arr] : arr);
				}else{
					core_push.call( ret, arr );
				}
			}
			return ret
		}
	};
	return utils;
});