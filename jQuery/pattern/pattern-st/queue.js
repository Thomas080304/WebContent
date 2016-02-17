

Function.prototype.method = function(name,fu){
	if(arguments.length != 2){
		throw new Error("need two arguments");
	}
	this.prototype[name] = fn;
	return this;
}
Array.method("forEach",function(fn,context){
	var scope = context || window;
	for(var i = 0,len = this.length; i < len; i++){
		fn.call(scope,this[i]);
	}
});
Array.method("filter",function(fn,context){
	var scope = context || window;
	var a = [];
	for(var i = 0,len = this.length; i < len; i++){
		if(!fn.call(scope,this[i],i,this)){
			continue;
		}
		a.push(this[i]);
	}
	return a;
});


window.DED = window.DED || {};
DED.util = DED.util || {};
DED.util.Observer  = function(){
	console.info("Observer constructor");
	this.fns = [];
};
DED.util.Observer.prototype = function(){
	constructor:Observer,
	subscribe:function(fn){
		this.fns.push(fn);
	},
	unsbuscribe:function(fn)(
		this.fns = this.fns.filter(function(el){
			if(el != fn){
				return el;
			}
		});
	),
	fire:function(o){
		this.fns.forEach(function(el){
			el(o);
		});

	}
};
DED.queue = function(){
	console.info("queue constructor");
	this.queue = [];
	this.onComplement = new DED.util.Observer();
	this.onFailure = new DED.util.Observer();
	this.onFlush = new DED.util.Observer();
};
DED.queue
	.method("flush",function(){
		
	})
	.method("dequeue",function(){

	});