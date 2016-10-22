var Salut = {};
(function(document, Salut) {
	/**
	 * @tools for load script	
	 */
	function _scriptLoaded(script){
		document.body.removeChild(script);
		excuteChain.next();

	}
	function _createScript(url){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = url+'.js';
		var that = this;
		if ('onload' in script) {
			EventUtil.addHandler(script,'load',function(event){
				event = EventUtil.getEvent(event);
				return _scriptLoaded.call(that, script);
			});
		} else {
			EventUtil.addHandler(script,'readystatechange',function(event){
				event = EventUtil.getEvent(event);
				var target = EventUtil.getTarget(event);
				if (/loaded|complete/.test(target.readyState)) {
					EventUtil.removeHandler(target,'readystatechange',arguments.callee);
					_scriptLoaded(script);
				}
			});
		}
		document.body.appendChild(script);
	}
	var pathAndFileName = {};
	function _analyseName(path){
		if(typeof path == 'object'){
			path = path[0];
		}
		var needAnalyse = String(path).indexOf('/') > -1 ? true:false;
		var newPath = path;
		if(needAnalyse){
			if(!pathAndFileName[path]){
				var fileIndex = String(path).lastIndexOf('/')+1;
				newPath = String(path).substr(fileIndex).replace(/\.js$/g, '');
				pathAndFileName[path] = newPath;
			}else{
				return pathAndFileName[path];
			}
		}
		return newPath;
	}
	/**
	 * @tools for load script	
	 */
	var modules = {};//loadedModules path:name
	function require(name,callback){
		var moduleName = _analyseName(name);
		if(moduleName in modules){
			callback && callback.call(this,modules[moduleName]);
			return modules[moduleName];
		}else{
			_createScript(name);
			callback && eventTarget.addHandler('execute',callback);
		}
		
	}
	/**
	 * define block
	 */
	var defineParamObj = {
		'String': _String,
		'Array': _Array,
		'Function': _Function
	}
	//define的第一个参数为数组的情况
	function _Array(array, func) {
		_Function(func, array);
	}
	//define的第一个参数为函数
	function _Function(func, others) {
		var name = _analyseName(_getCurrentScript().src);
		_String(name, func, others||[]);
	}

	/**
	 * require('js/b')..
	 * modules['b'] = function.call
	 * 
	 */
	 var executeStack = [];
	 var dependStack = [];
	function _String(string, func, others){
		var moduleName = _analyseName(string);
		var depends = _analyseDepend(func,others||[]);
		if(dependStack.indexOf(moduleName) < 0){
			dependStack.push(moduleName);
		}
		dependStack =dependStack.concat((depends||[]).map(function(item){
			return item.split('/')[1];
		}));
		//缓存当前函数
		executeStack.push(function(){
			var params = [];
			if(others && others.length > 0){
				others.forEach(function(v){
					params.push(modules[_analyseName(v)]);
				});
			}
			return modules[moduleName] = func.apply(Salut, params);
		});
		//执行当前函数
		_checkIfExecuteStack(moduleName);
		//缓存依赖
		for(var i = 0,len = depends.length; i <len; i++){
			(function(i){
				excuteChain.after(function() {
					var c = require(depends[i]);
					if(c) { this.next(); }
				})
			})(i);
		}
	}
	function _checkIfExecuteStack(lastModule){
		if(dependStack.length-1 == dependStack.indexOf(lastModule)){
			var u = dependStack.length;
			while(u--){
				var params = executeStack[u]();
				if(u === 0){
					eventTarget.fire({type:'execute',message:params});
					executeStack = [];
					dependStack = [];				
				}
			}
		}
	}
	function _analyseDepend(func, others){
		var firstReg = /\.require\((\"|\')[^\)]*(\"|\')\)/g,
			secondReg = /\((\"|\')[^\)]*(\"|\')\)/g,
			lastReplaceRge = /\((\"|\')|(\"|\')\)/g;
		var string = func.toString();
		var allFiles = (string.match(firstReg)|| []).concat(others);
		var newArray = [];
		if(!allFiles.length){
			return newArray;
		}
		allFiles.map(function(file){
			var mFile;
			if(mFile = file.match(secondReg)){
				mFile = mFile[0].replace(lastReplaceRge,'');
			}else{
				mFile = file;
			}
			if(!modules[_analyseName(mFile)]){
				newArray.push(mFile);
			}
		});
		return newArray;
	}
	function _getCurrentScript(){
		if (document.currentScript) {
			//firefox 4+
			return document.currentScript;
		}
	}
	/**
	 * define block end
	 */
	function define(){
		var arg = Array.prototype.slice.call(arguments);
		var paramType = Object.prototype.toString.call(arg[0]).split(' ')[1].replace(/\]/, '');
		defineParamObj[paramType].apply(null, arg);
	}
	Salut.require = require;
	Salut.define = define;
	/**
	 * execute chain
	 */
	 function _Chain() {
		this.cache = [];
		this.cur = 0;
	}
	/**
	 * add function to order stack
	 * @param func (func)
	 * @returns {_Chain}
	 */
	_Chain.prototype.after = function(fn) {
			this.cache.push(fn);
			// this.cur = 0;
			return this;
		}
		/**
		 * To pass the authority to next function excute
		 * @param 
		 * @returns
		 */
	_Chain.prototype.passRequest = function() {
			var result = 'continue';
			while (this.cur < this.cache.length && result === 'continue') {
				result = this.cache[this.cur++].apply(this, arguments);
				if (this.cur === this.cache.length) {
					this.clear();
				}
			}
		}
		/**
		 * an api to excute func in stack
		 * @param 
		 * @returns 
		 */
	_Chain.prototype.next = function() {
			this.excute();
		}
		/**
		 * let use to excute those function
		 * @param 
		 * @returns
		 */
	_Chain.prototype.excute = function() {
		this.passRequest.apply(this, arguments)
	}

	/**
	 * to clear stack all function
	 * @param 
	 * @returns
	 */
	_Chain.prototype.clear = function() {
		this.cache = [];
		this.cur = 0;
	}



	var excuteChain = new _Chain();

	/**	
	 * @error
	 *	var eventTarget = new EventTarget();
	 *	没有修改原型
	 */
	/** event */
	function EventTarget(){
		this.handlers = {};
	}
	EventTarget.prototype = {
		constructor:EventTarget,
		addHandler:function(type,handler){
			if(typeof this.handlers[type] == 'undefined'){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
		},
		fire:function(event){
			if(!event.target){
				event.target = this;
			}
			if(this.handlers[event.type]){
				var handlers = this.handlers[event.type];
				for(var i = 0,len = handlers.length; i < len; i++){
					handlers[i](event.message);
				}
			}
		},
		removeHandler:function(type,handler){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0,len = handlers.length; i < len; i++){
					if(handlers[i] === handler){
						break;
					}
				}
				handlers.splice(i,1);
			}
		}
	};
	var eventTarget = new EventTarget();
	/**
	 * event utils
	 */
	var EventUtil = {

	    addHandler: function(element, type, handler){
	        if (element.addEventListener){
	            element.addEventListener(type, handler, false);
	        } else if (element.attachEvent){
	            element.attachEvent("on" + type, handler);
	        } else {
	            element["on" + type] = handler;
	        }
	    },
	    
	    getButton: function(event){
	        if (document.implementation.hasFeature("MouseEvents", "2.0")){
	            return event.button;
	        } else {
	            switch(event.button){
	                case 0:
	                case 1:
	                case 3:
	                case 5:
	                case 7:
	                    return 0;
	                case 2:
	                case 6:
	                    return 2;
	                case 4: return 1;
	            }
	        }
	    },
	    
	    getCharCode: function(event){
	        if (typeof event.charCode == "number"){
	            return event.charCode;
	        } else {
	            return event.keyCode;
	        }
	    },
	    
	    getClipboardText: function(event){
	        var clipboardData =  (event.clipboardData || window.clipboardData);
	        return clipboardData.getData("text");
	    },
	    
	    getEvent: function(event){
	        return event ? event : window.event;
	    },
	    
	    getRelatedTarget: function(event){
	        if (event.relatedTarget){
	            return event.relatedTarget;
	        } else if (event.toElement){
	            return event.toElement;
	        } else if (event.fromElement){
	            return event.fromElement;
	        } else {
	            return null;
	        }
	    
	    },
	    
	    getTarget: function(event){
	        return event.target || event.srcElement;
	    },
	    
	    getWheelDelta: function(event){
	        if (event.wheelDelta){
	            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
	        } else {
	            return -event.detail * 40;
	        }
	    },
	    
	    preventDefault: function(event){
	        if (event.preventDefault){
	            event.preventDefault();
	        } else {
	            event.returnValue = false;
	        }
	    },

	    removeHandler: function(element, type, handler){
	        if (element.removeEventListener){
	            element.removeEventListener(type, handler, false);
	        } else if (element.detachEvent){
	            element.detachEvent("on" + type, handler);
	        } else {
	            element["on" + type] = null;
	        }
	    },
	    
	    setClipboardText: function(event, value){
	        if (event.clipboardData){
	            event.clipboardData.setData("text/plain", value);
	        } else if (window.clipboardData){
	            window.clipboardData.setData("text", value);
	        }
	    },
	    
	    stopPropagation: function(event){
	        if (event.stopPropagation){
	            event.stopPropagation();
	        } else {
	            event.cancelBubble = true;
	        }
	    }

	};
})(document, Salut);

/*function _createScriptString(callback){
	if(typeof callback != 'object'){
		return;
	}
	var code = callback.toString();
	var script = document.createElement('script');
	script.type = 'text/javascript';
	try{
		script.appendChild(document.createTextNode(code));
	}catch(e){
		script.text = code;
	}
	document.body.appendChild(script);
}
function _loadStyle(url){
	var link = document.createElement('link');
	link.type = 'text/css';
	link.href = url;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
}
function _loadStyleString(css){
	var style = document.createElement('style');
	style.type = 'text/css';
	try{
		style.appendChild(document.createTextNode(css));
	}catch(e){
		style.styleSheet.cssText = css || '*{font-size:12px}';
	}
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(style);
}
*/