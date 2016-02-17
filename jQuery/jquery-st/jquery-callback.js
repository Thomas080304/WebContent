

jQuery.Callbacks = function(options){

	var list = [],
		fire = function(){};
	var self = {
		add:function(){},
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
