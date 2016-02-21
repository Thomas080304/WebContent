
core_rnotwhite = /\S+/g,
var optionsCache = {};
function createOptions(options){//options = "once memory"
	var object = optionsCache[options] = {};
	//options.match(core_rnotwhite) ==> ["once", "memory"]
	jQuery.forEach(options.match(core_rnotwhite) || [],function(_,flag){
		object[ flag ] = true;
	});
	return object;
}
jQuery.Callbacks = function(options){
	options = typeof options === "String" ?
			  (optionsCache[options] || createOptions(options)) :
			  jQuery.extend({},options);
	var list = [],
		fire = function(){

		};
	//previte
	var self = {
		//add(aa,bb)
		//add([aa,bb])
		add:function(){
			if(list){
				/*
				add({a:function(){},b:function(){},length:2})
				add(aa,bb);	
				add([aa,bb]);
				*/
				(function add(args){
					jQuery.each(args,function(_,arg){
						var type = jQuery.type(arg);
						if(type === "function"){
							list.push(arg);
						}else if(arg && arg.length && type !== "string"){
							add(arg);
						}
					});
				})(arguments);
			}
		},
		remove:function(){},
		has:function(){},
		empty:function(){},
		disable:function(){},
		disabled:function(){},
		lock:function(){},
		locked:function(){},
		fireWith:function(){},
		fire:function(){},
		fired:function(){},
	};
	return self;
};

