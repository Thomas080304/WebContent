window.onload = function(){
    var DirectoryInterface = new Interface("DirectoryInterface",["showPage"]);
    var PersonnelDirectory = function(parent){
       // this.xhrHandler = XhrManager.createXhrhandler();
        this.parent = parent;
        this.data = null;
        this.currentPage = null;
        var that = this;
        var callback = {
            success:that._configure,
            failuer:function(){
                throw new Error("error");
            }
        };
       // xhrHandler.request("GET","www.baidu.com",callback);
    };
    PersonnelDirectory.prototype = {
        constructor:PersonnelDirectory,
        _configure:function(responseText){
            this.data = eval("("+responseText+")");
            this.currentPage = "a";
        },
        //implements DirectoryInterface
        showPage:function(page){
            document.getElementById("page"+this.currentPage).style.display = "none";
            document.getElementById("page"+this.page).style.display = "block";
            this.cuurentPage = page;
        }
    };
    var PersonnelDirectoryProxy = function(parent){
        this.parent = parent;
        this.directory = null;
        this.warning = null;
        this.interval = null;
        this.initialized = false;
        var that = this;
        EventUtil.addHandler(parent,"mouseover",that._initialize);
    };
    PersonnelDirectoryProxy.prototype = {
        constructory:PersonnelDirectoryProxy,
        _initialize:function(){
            this.warning = document.createElement("div");
            this.parent.appentChild(this.warning);
            this.warning.innerHTML = "loading.....";
            var that = this;
            this.interval = window.setInterval(function(){
                that._checkInitialization();
            },100);
            this.directory = new PersonnelDirectory(this.parent);
        },
        _checkInitialization:function(){
            if(this.directory.currentPage != null){
                window.clearInterval(this.interval);
                this.initialized = true;
                this.parent.removeChild(this.warning);
            }
        },
        //implements DirectoryInterface
        showpage:function(page){
            if(!this.initialized){
                return;
            }
            return this.diretory.showPage(page);
        }
    };

    var DynamicProxy = function(){
        this.args = arguments;
        this.initialized  = false;
        var that = this;
        if(typeof this.class != "function"){
            throw new Error("not a function");
        }
        for(var key in this.class.prototype){
            if(typeof this.class.prototype[key] !== "function"){
                continue;
            }
            (function(methodName){
                that[methodName] = function(){
                    if(!that.initialized){
                        return;
                    }
                    return that.subject[methodName].apply(that.subject, arguments);
                };
            })(key);
        }
    };
    DynamicProxy.prototype = {
        constructor:DynamicProxy,
        _initialize:function(){
            this.subject = {};
            this.class.apply(this.subject,this.args);
            this.subject.__proto__ = this.class.prototype;
            var that = this;
            this.interval = window.setInterval(function(){
                that._checkInitialization();
            },1000);
        },
        _checkInitialization:function(){
            if(this._isInitalized()){
                window.clearInterval(this.interval);
                this.initialized = true;
            }
        },
        _isInitalized:function(){
            throw new Error("can not be used");
        }
    };
    var TestProxy = function(){
        this.class = PersonnelDirectory;
        var that = this;
        var divElem = document.getElementById("proxytest");
        EventUtil.addHandler(divElem,"click",function(){
            that._initialize();
        });
        TestProxy.superType.constructor.apply(this,arguments);
    };
    inheritPrototype(TestProxy,DynamicProxy);
    TestProxy.prototype._isInitalized = function(){
        console.info("TestProxy init");
    };

    var test = new TestProxy();
};
function Interface(name, methods){
    if(arguments.length != 2){
        throw new Error("arguments != 2");
    }
    this.name = name;
    this.methods = [];
    for(var i = 0, len = methods.length; i < len; i++){
        if(typeof methods[i] !== "string"){
            throw new Error("not a string");
        }
        this.methods.push(methods[i]);
    }
}
Interface.ensureImplements = function(instance/*,interfaceName1,,interfaceName2*/){
    for(var i = 1, len = arguments.length; i < len; i++){
        var interfaceName = arguments[i],
            interfaceMethods = interfaceName.methods;
        if(interfaceName.constructor !== Interface){
            throw new Error("not a string");
        }
        for(var j = 0, methlen = interfaceMethods.length; j < methlen; j++){
            var method = interfaceMethods[j];
            if(!instance[method] || typeof instance[method] !== "function"){
                throw new Error("not a string");
            }
        }
    }
};
function Object(obj){
    function F(){}
    F.prototype = obj;
    return new F();
}
function inheritPrototype(SubType, SuperType){
    var prototype = Object(SuperType.prototype);
    prototype.constructor = SubType;
    SubType.prototype = prototype;
    /**
     * add superClass to SubType
     */
    SubType.superType = SuperType.prototype;
    if(SuperType.prototype.constructor == Object.prototype.constructor){
        SuperType.prototype.constructor = SubType.superType;
    }
}