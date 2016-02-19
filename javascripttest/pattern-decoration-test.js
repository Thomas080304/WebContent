window.onload = function(){
    /**
     * create BicycleInterface
     */
    var BicycleInterface = new Interface("BicycleInterface",["assemble","wash","ride","repair","getPrice"]);
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
        },
        getPrice:function(){
            console.info("getPrice");
            return 400.00;
        }
    };
    /**
     * create a BicycleDecorator abstract class
     */
    var BicycleDecoratorAbs = function(bicycle){
        Interface.ensureImplements(bicycle,BicycleInterface);
        this.bicycle = bicycle;
        this.interface = BicycleInterface;//["assemble","wash","ride","repair","getPrice"]
        outerloop:for(var key in this.bicycle){
            if(typeof this.bicycle[key] !== "function"){
                continue outerloop;
            }
            for(var i = 0, len = this.interface.methods.length; i < len; i++){
                var method = this.interface.methods[i];
                console.info("for-->"+method);
                if(key === method){
                    continue outerloop;
                }
            }
            var that = this;
            (function(methodName){
                console.info("anyn-->"+methodName);
                that[methodName] = function(){
                    return that.bicycle[methodName]();
                };
                console.dir(that);
            })(key);
        }
    };
    BicycleDecoratorAbs.prototype = {
        constructor:BicycleDecoratorAbs,
        assemble:function(){
            console.info("assembleAbs");
            return this.bicycle.assemble();
        },
        wash:function(){
            console.info("washAbs");
            return this.bicycle.wash();
        },
        ride:function(){
            console.info("rideAbs");
            return this.bicycle.ride();
        },
        repair:function(){
            console.info("repairAbs");
            return this.bicycle.repair();
        },
        getPrice:function(){
            console.info("getPriceAbs");
            return this.bicycle.getPrice();
        }
    };
    var HeadLightDecorator = function(bicycle){
        HeadLightDecorator.superClass.constructor.call(this,bicycle);
    };
    inheritPrototype(HeadLightDecorator,BicycleDecoratorAbs);
    /**
     * add assemble and getPrice to prototype F(have bicycle--call;F--inheritPrototype)
     */
    HeadLightDecorator.prototype.assemble = function(){
        return this.bicycle.assemble()+"Attach headLight to handlers";
    };
    HeadLightDecorator.prototype.getPrice = function(){
        return this.bicycle.getPrice()+15;
    };
    var TimeWarrantyDecorator = function(bicycle,coverageLengthInYears){
        TimeWarrantyDecorator.superClass.constructor.call(this, bicycle);
        this.coverageLength = coverageLengthInYears;
        this.expDate = new Date();
        var coverageLengthInMs = coverageLength*365*24*60*60*1000;
        this.expDate.setTime(this.expDate.getTime()+coverageLengthInMs);
    };
    TimeWarrantyDecorator.prototype.repair = function(){

    };
    TimeWarrantyDecorator.prototype.getPrice = function(){

    };
    /**
     * create BellDecorator class
     */
    var BellDecorator = function(bicycle){
        BellDecorator.superClass.constructor.call(this,bicycle);
    };
    inheritPrototype(BellDecorator,BicycleDecoratorAbs);
    BellDecorator.prototype.assemble = function(){
        return "beforeBell"+this.bicycle.assemble()+"ringBell";
    };
    BellDecorator.prototype.getPrice = function(){
        return this.bicycle.getPrice()+6;
    };
    BellDecorator.prototype.ringBell = function(){
        return "Bell Ring";
    };
    var speedsterBicycle = new Speedster();
    console.info(speedsterBicycle.getPrice());
    var bellBicycle = new BellDecorator(speedsterBicycle);
    console.info(bellBicycle.getPrice());
    var headLightBicycle = new HeadLightDecorator(bellBicycle);
    console.info(headLightBicycle.getPrice());
    console.info(bellBicycle.ringBell());
    /**
     * create BicycleShop abstract class
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
    /**
     * create AcmeBicycleShop class
     */
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
/**
 * F instance has __Proto__
 * 1.SuperType.prototype
 * 2.constructor
 */
function Object(obj){
    function F(){};
    F.prototype = obj;
    return new F();
}
function inheritPrototype(SubType, SuperType){
    var prototype = Object(SuperType.prototype);
    /**
     * add constructor for new F() instance
     */
    prototype.constructor = SubType;
    SubType.prototype = prototype;
    /**
     * add superClass to SubType
     */
    SubType.superClass = SuperType.prototype;
    if(SuperType.prototype.constructor == Object.prototype.constructor){
        SuperType.prototype.constructor = SubType.superClass;
    }
}