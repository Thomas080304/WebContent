(function(window, undefined){
	/*
		Interface uitl
	*/
	var Interface = function(name,methods){
        if(arguments.length !=  2){
            throw new Error("arguments != 2");
        }
        this.name = name;
        this.methods = [];
        for(var i = 0,len = methods.length; i < len; i++){
            if(typeof methods[i] !== "string"){
                throw new Error(methods[i]+"is not a string");
            }
            this.methods.push(methods[i]);
        }
    };
    Interface.ensureImplements = function(instance){
        for(var i = 1,len = arguments.length; i < len; i++){
            var interface = arguments[i];
            if(interface.constructor !== Interface){
                throw new Error("please user InterfaceUtil to create interface");
            }
            var methods = interface.methods,
                methlen = methods.length,
                j;
            for(j = 0;j < methlen; j++){
                var method = methods[j];
                if(!instance[method] || typeof instance[method] !== "function"){
                    throw new Error("please implement the method in instance,methodName: "+method);
                }
            }
        }
    };
    /*
		extend util
    */
    function _Object(obj){
        /**
         * SuperType.prototype(SuperType)
         *      constructor:SuperType
         *      __proto__:Object
         */
        function F(){}
        /**
         * F.prototype(F)
         *      constructor:F
         *      __proto__:Object
         */
        F.prototype = obj;
        /**
         * F.prototype == SuperType.prototype
         *      constructor:SuperType
         *      __proto__:Object
         */
        return new F();
        /**
         * new F()
         *      __proto__:F.prototype
         */
    }
    var extend = function(SubType, SuperType){
        /**
         * prototype = new F()
         *      __proto__:F.prototype
         */
        var prototype = _Object(SuperType.prototype);
        /**
         * prototype = new F()
         *      construtor:SubType
         *      __proto__:F.prototype
         */
        prototype.constructor = SubType;
        /**
         * SubType.prototype
         *      constructor:SubType
         *      __proto__:Object
         */
        /**
         * SubType.prototype = prototype
         */
        SubType.prototype = prototype;
        SubType.SuperClass = SuperType.prototype;
        if(SuperType.prototype.constructor === Object.prototype.constructor){
            SuperType.prototype.constructor = SuperType;
        }
    };

    /**
	 *	validate Interface
     */
    var ValidateInterface = new Interface("ValidateInterface",["add","start"]);
    /*
		validate class
    */
   	var Validate = function(){
    	this.cache = [];
    };
    Validate.prototype = {
    	//implements ValidateInterface
    	constructor:Validate,
    	add:function(){
    		console.info("add");
    	},
    	fire:function(){
    		console.info("star");
    	}
    };
    /*
    	validate factory
    */
    var validateFactory = function(){
    	var validate = new Validate();
    	Interface.ensureImplements(validate,ValidateInterface);

    	validate.add(registerForm.userName,"isNonEmpty","有户名不能为空");
    	return validate.fire();
    };
    var registerForm = document.getElementById("regform");
    registerForm.onsubmit = function(){
    	var errorMsg = validateFactory();
    	if(errorMsg){
    		alert(errorMsg);
    		return false;
    	}
    };
})(window);