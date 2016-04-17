window.onload = function(){

	/*
		LightInterface
		buttonPress
		状态类重写btttonPress方法
	*/
	/*弱光类*/
	var WeakLightState = function(light){//桥接
		this.name = 'WeakLightState';
		this.light = light;
	};
	WeakLightState.prototype.buttonPress = function(){
		console.log('this is changing to StrongLightState');
		this.light.setState(this.light.strongLightState);
	};
	/*强光类*/
	var StrongLightState = function(light){
		this.name = 'StrongLightState';
		this.light = light;
	};
	StrongLightState.prototype.buttonPress = function(){
		console.log('this is changing to OffLightState');
		this.light.setState(this.light.offLightState);
	};
	/*关灯类*/
	var OffLightState = function(light){
		this.name = 'OffLightState';
		this.light = light;
	};
	OffLightState.prototype.buttonPress = function(){
		console.log('weakLightState');
	};
	/*状态的管理工厂*/
	var LightManager = function(){//桥接
		this.name = 'LightManager';
		this.weakLightState = new WeakLightState();
		this.strongLightState = new StrongLightState();
		this.offLightState = new OffLightState();
		this.button = null;
	};	
	LightManager.prototype.init = function(el){
		var button = document.createElement('button'),
			that = this;


	};














};













