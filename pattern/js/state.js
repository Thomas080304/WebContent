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
	//manager factory for change state
	var Light = function(){
		this.currentState = null;
	};
	Light.prototype = {
		constructor:Light,
		init:function(state){
			this.setState(state);
		},
		setState:function(state){
			Interface.ensureImplements(state, StateInterface);
			this.currentState = state;
		},
		buttonPress:function(){
			console.log('Light button press');
			this.currentState.buttonPress();
		}
	};

	//Interface for state
	var StateInterface = new Interface('StateInterface',['buttonPress']);

	var OffState = function(light){
		this.light = light;
		this.name = 'OffState';
	};
	OffState.prototype = {
		constructor:OffState,
		buttonPress:function(){
			console.log('OffState state change');
			this.light.setState(new WeakState(this.light));
		}
	};
	var WeakState = function(light){
		this.light = light;
	};
	WeakState.prototype = {
		constructor:WeakState,
		buttonPress:function(){
			console.log('WeakState state change');
		}
	};
	var light = new Light();
	light.init(new OffState(light));
	
	$('#stateBtn').on('click',function(){
		light.buttonPress.call(light);
	});












	
});