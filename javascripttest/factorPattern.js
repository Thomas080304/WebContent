window.onload = function(){
    /**
     * create BicycleInterface
     */
    var BicycleInterface = new Interface("BicycleInterface",["assemble","wash","ride","repair"]);
    /**
     * implements BicycleInterface
     */
    var Speedster = function(){
        //implements BicycleInterface
    };
    Speedster.prototype = {
        constructor:Speedster,
        assemble:function(){
            console.info("assemble");
        },
        wash:function(){
            console.info("wash");
        },
        ride:function(){
            console.info("ride");
        },
        repair:function(){
            console.info("repair");
        }
    };
    /**
     * create BicycleShop interface
     */
    var BicycleShop = function(){

    };
    BicycleShop.prototype = {
        constructor:BicycleShop,
        sellBicycle:function(model){
            var bicycle = this.createBicycle(model);
            bicycle.assemble();
            bicycle.wash();
            return bicycle;
        },
        createBicycle:function(){
            throw new Error("not implement and should not be used");
        }
    };

    var AcmeBicycleShop = function(){

    };
    /**
     * extend BicycleShop and implements BicycleShop interface-method
     */
    inheritPrototype(AcmeBicycleShop,BicycleShop);
    AcmeBicycleShop.prototype.createBicycle = function(model){
        var bicycle = null;
        switch(model){
            case "the Speedster":
                bicycle = new Speedster();//small class
                break;
            case "the Lowrider":
                bicycle = new Lowrider();
                break;
            case "the Comfort Cruiser":
            default:
                bicycle = new ComfortCruiser();
                break;
        }
        /**
         * check bicycle instance had implments all BicycleInterface methods
         */
        Interface.ensureImplements(bicycle, BicycleInterface);
        return bicycle;
    };
    var tet = new AcmeBicycleShop();
    var tt = tet.sellBicycle("the Speedster");
    /**
     * XHR
     */
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
    function F(){};
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
    SubType.SuperType = SuperType.prototype;
    if(SuperType.prototype.constructor == Object.prototype.constructor){
        SuperType.prototype.constructor = SuperType;
    }
}