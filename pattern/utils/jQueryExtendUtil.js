define([

],function(){

	var jQuery = {
		// [[Class]] -> type pairs
		class2type = {},
		core_hasOwn = class2type.hasOwnProperty,
		core_toString = class2type.toString,
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},
		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			// Support: Firefox <20
			// The try/catch suppresses exceptions thrown when attempting to access
			// the "constructor" property of certain host objects, ie. |window.location|
			// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
			try {
				if ( obj.constructor &&
						!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
					return false;
				}
			} catch ( e ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},
		isWindow: function( obj ) {
			/* jshint eqeqeq: false */
			return obj != null && obj == obj.window;
		},
		type: function( obj ) {
			if ( obj == null ) {
				return String( obj );
			}
			// Support: Safari <= 5.1 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ core_toString.call(obj) ] || "object" :
				typeof obj;
		}

	};

	var extend = function extend(){
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1;
			length = arguments.length;
			deep = false;
		//deep
		if(typeof target === "Boolean"){
			deep = target;//true false
			target = arguments[1];
			i = 2;
		}
		// "aa",{a:{b:{c:1}}}  function aa(){},{a:{b:{c:1}}}
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}
		if(length === i){
			target = this;
			--i;
		}
		for(; i < length; i++){//start from thr args
			/*var options = arguments[i];*/
			if((options = arguments[i]) != null){
				//options = {a:{},b:function,bb:['a',{c:function}]}
				for(name in options){
					var src = target[name];//add or target exit
					var copy = options[name];

					// Prevent never-ending loop{a:{}},{a:{a:{}}}
					if(src == copy){
						continue;
					}
					//{a:[1,2,3]},{a:[5,6,7]} ==> {a:[1,2,3,4,5,6,7]}
					//{a:{aa:"aa"}},{a:{bb:"bb"}} ==> {a:{aa:"aa",bb:"bb"}}
					if(deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ){
						if(copyIsArray){//copy = [5,6,7]
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];//[1,2,3]
						}else{
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
						target[name] = jQuery.extend(deep,clone,copy);//clone = {} copy = {b:1}
					}else if(copy !== undefined){
						target[name] = copy;//{a:{b:{c:1}}}
					}
				}
			}
		}
		return target;
	}
	return extend;
});