define('locale',[
	'module',
	'exports'
],function(module, exports){
	var Locale = function(){
		this.name = "locale data";
	};
	Locale.prototype.config = {
		name:['locale','server','error'],
		path:'i18n/',
		mode:'map',
		cache:false,
		language:'zh',
		callback:function(){}
	};
	Locale.prototype.setLanguage = function(lang){
		this.language = lang ? lang:this.language;
		this._create();
		return this;
	};
	Locale.prototype._create = function(){
		$.i18n.properties(this.config);
	};
	return (new Locale).setLanguage();
});