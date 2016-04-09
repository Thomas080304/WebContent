define('api',[
	'api.config',
	'module',
	'exports'
],function(apiConfig,module,exports){
	var impls = new ef.Interface.implement();
	impls.redraw = function(){

	};
	impls.destroy = function(){
		require.undef(module.id);
	};
	impls.parser = function(){
		this._init();
	};
	impls.getAPI = function(name){
		var _url = '';
		for(var i in apiConfig){
			var option = apiConfig[i];
			if(name == option.name){
				_url = option.url;
				break;
			}
		}
		return this.getUrl(_url);
	};
	impls.getUrl = function(url){
		var startReg=/^(\/*)/;
        var endReg=/(\/*$)/;
        return ef.config.webroot.replace(endReg,"")+"/"+url.replace(startReg,"");
	};
	impls._init = function(){
		for(var i in apiConfig){
			var option = apiConfig[i]; 
			$.mockjax({
				url:option.url,
                proxy:option.proxy,
                responseText:null,
                responseTime:100
			});
		}
	};
	return impls;
});