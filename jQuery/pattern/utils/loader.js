/**
 * Created by Administrator on 2015/10/31.
 */
 (function(window){
 	var doc = window.document,
 		header = doc.header || doc.getElementsByTagName('header')[0];
 	var slice = Array.prototype.slice,
 		split = String.prototype.split,
 		toString = Object.prototype.toString;
 	//define module
 	var types = {
 		'String':_string,
 		'Array':_array,
 		'Function':_function
 	};
 	var dependArray = [],
 		executeStack = [];

 	/*
	 * define('',[],function(){});
	 * define([],function(){})
	 * define(function(){})
 	 */
 	var define = function(){
 		var arg = slice.call(arguments);
 		var type = (split.call(toString.call(arg[0]),' ')[1]).replace(/\]/,'');
 		if(type && types[type]){
 			types[type].call(null,arg);
 		}
 	}
 	function _string(id,deps,callback){
 		//find cache
 		var _id = _analyseName(id);
 		
 		var _deps = _analyseDepend(callback,deps);
 		if(dependArray.indexOf(_id) < 0){
 			dependArray.push(_id);
 		}
 		dependArray = dependArray.concat((_deps|| []),map(function(v){
 			return v.split('/')[1];
 		}))
 		executeStack.push(function(){
 			var params = [];
 			if(deps && deps.length){
 				others.forEach(function(v){
 					params.push(modules[_analyseName[v]]);
 				});
 			}
 			return modules[string] = callback.apply(window,params)
 		});
 		_excuteRequire(string);
 		for(var i = 0,len = _deps.length; i < len; i++){
 			(function(i){
 				excuteChain.after(function() {
					var c = require(depends[i]);
					if(c) { this.next(); }
				})
 			})(i);
 		}

 	}
 	function _excuteRequire(string){
 		if(dependArray.length -1 === dependArray.indexOf(string)){
 			var u = executeStack.length;
 			while(u--){
 				var parames = executeStack[u]();
 				if(u === 0){
 					Events.trigger('excute', params);
					excuteStack = [];
					dependArray = [];
 				}
 			}
 		}
 	}
 	/*
 	 * 缓存
 	 */
 	var pathAndFileName = {};
 	function _analyseName(path){
 		//require(['js/a']);
 		if(typeof path === 'object'){
 			path = path[0];
 		}
 		var needAnalyse = String(path).indexOf('/') > -1 ? true : false;
 		var newPath = path;
 		if(needAnalyse){
 			if(!pathAndFileName[path]){
 				var fileIndex = path.lastIndexOf('/')+1;
 				newPath = path.substr(fileIndex).replace(/\.js$/g,'');
 				pathAndFileName[path] = newPath;
 			}else{
 				return pathAndFileName[path];
 			}
 		}
 		return newPath;
 	}
 	var modules = {};
 	function _analyseDepend(func,others){
 		var firstReg = /\.require\((\"|\')[^\)]*(\"|\')\)/g,
			secondReg = /\((\"|\')[^\)]*(\"|\')\)/g,
			lastReplaceRge = /\((\"|\')|(\"|\')\)/g;
		var string = func.toString();
		var allFiles = (string.match(firstReg) || []).concat(others);
		var newArray = [];
		if(!allFiles.length){
			return newArray;
		}
		allFiles.map(function(v){
			var m = [];
			if(m = v.match(secondReg)){
				m = m[0].replace(lastReplaceRge,'');
			}else{
				m = v;
			}
			if(!modules[_analyseName(m)]){
				newArray.push(m);
			}
		});
		return newArray;
 	}
 	

 	//加载器
 	var require = functon(name, func){
 		var _id = _analyseName(name);
 		if(_id in modules){
 			func && func.call(this,modules[_id]);
 		}else{
 			_createScript(name);

 		}
 	};
 	function _createScript(path){
 		var script = doc.createElement('script');
 		var that = this;
 		script.async = true;
 		script.src = path+'.js';
 		if('onload' in script){
 			script.onload = function(evnet){
 				return _scriptLoaded.call(that,script);
 			}
 		}else{
 			script.onreadystatechange = function(){
 				if (/loaded|complete/.test(node.readyState)) {
					// todo
					/*me.next();
					_scriptLoaded(script);*/
				}
 			};
 		}
 		hader.appendChild(script);
 	}
 	function _scriptLoaded(script){
 		header.removeChild(script);
 		// todo excuteChain.next();
 	}

 	function _Chain(){
 		this.cache= [];
 		this.cur = 0;
 	}
 	_Chain.prototype.after = function(callback){
 		this.cache.push(callback);
 		return this;
 	};
 	_Chain.prototype.parssRequest = function(){
 		var result = 'continue';
 		if(this.cur < this.cache.length && result == 'continue'){
 			result = this.cache[cur++].apply(this,arguments);
 			if(this.cur === this.cache.length){
 				this.clear();
 			}
 		}
 	};
 	_Chain.prototype.clear = function(){
 		this.cache = [];
 		this.cur = 0;
 	};
 	_Chain.prototype.next = function(){
 		this.excute();
 	};
 	_Chain.prototype.excute = functon(){
 		this.parssRequest.apply(this,arguments);
 	};

 	var excuteChain = new _Chain();

 	var Events = (function(){

 		var func = [];

 		function _on(name,fn){
 			func.push({
 				name:name,
 				callback:fn
 			});
 		}

 		function _trigger(name,arg){
 			for(var i = 0,len = func.length; i < len; i++){
 				if(func[i].name === name){
 					func[i].callback.call(Salut,arg);
 					func.splice(i,1);
 				}
 			}
 		}

 		function _clear(){
 			func = [];
 		}
 		return {
 			on:_on,
 			trigger:_trigger
 		};
 	})();
 })(window);
