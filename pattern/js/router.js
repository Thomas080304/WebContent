require.config({
	baseUrl:'.',
	paths:{
		'jquery':'../lib/jQuery/jquery-1.11.3',
		"InterfaceUtil":"utils/InterfaceUtil",
        "ExtendUtil":"utils/ExtendUtil",
        "EventUtil":"utils/EventUtil"
	},
	shim:{

	}

});
define([
	'jquery',
	'InterfaceUtil',
	'ExtendUtil',
	'EventUtil'
],function($, Interface, extend, EventUtil){
	/**
	 * 观察者模式/状态模式
	 */
	var Router = function(){
		this.routers = {};
		this.currentUrl = '';
	};
	Router.prototype = {
		constructor:Router,
		route:function(path, callback){
			//add
			this.routers[path] = callback || function(){};
		},
		refresh:function(){
			//fire
			this.currentUrl = window.location.hash.slice(1) || '/';
			this.routers[this.currentUrl]();
		},
		init:function(){
			//fire 桥接模式
			EventUtil.addHandler(window,'onload', this.refresh.bind(this));
			EventUtil.addHandler(window,'hashchange', this.refresh.bind(this));
		}
	};
	
	window.Router = new Router();
    window.Router.init();
    
    var content = document.querySelector('body');
    // change Page anything
    
    window.changeBgColor = function (color) {
        content.style.backgroundColor = color;
    }
    window.Router.route('/', function() {
        window.changeBgColor('white');
    });
    window.Router.route('/blue', function() {
        window.changeBgColor('blue');
    });
    window.Router.route('/green', function() {
        window.changeBgColor('green');
    });
});