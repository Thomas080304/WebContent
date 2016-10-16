/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "InterfaceUtil":"lib/jQuery/InterfaceUtil",
        "ExtendUtil":"lib/jQuery/ExtendUtil"
    }
});
define([
    "jquery",
    "InterfaceUtil",
    "ExtendUtil"
],function($,Interface,extend){
    /*
        define interface
    */
    var BicycleInterface = new Interface("BicycleInterface",["assemble","wash","ride","repair","getPrice"]);
    /*
        define a Class Speedster
        @ implments BicycleInterface
    */
    var Speedster = function(){
        //implements BicycleInterface
        console.info("Speedster constructor");
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
    /*Decorator class abstract*/
    var BicycleDecoratorAbs = function(bicycle){
        //implements BicycleInterface
        Interface.ensureImplements(bicycle,BicycleInterface);
        this.bicycle = bicycle;
        this.interface = BicycleInterface;
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
        //继承父类的实例方法
        HeadLightDecorator.SuperClass.constructor.call(this,bicycle);
    };
    //继承父类的原型方法
    extend(HeadLightDecorator,BicycleDecoratorAbs);
    //修改被包装对象的方法
    HeadLightDecorator.prototype.assemble = function(){
        return this.bicycle.assemble()+"Attach headLight to handlers";
    };
    HeadLightDecorator.prototype.getPrice = function(){
        return this.bicycle.getPrice()+15;
    };
    var BellDecorator = function(bicycle){
        BellDecorator.SuperClass.constructor.call(this,bicycle);
    };
    extend(BellDecorator,BicycleDecoratorAbs);
    BellDecorator.prototype.assemble = function(){
        return "beforeBell"+this.bicycle.assemble()+"ringBell";
    };
    BellDecorator.prototype.getPrice = function(){
        return this.bicycle.getPrice()+6;
    };
    //给被包装的对象添加新的方法
    BellDecorator.prototype.ringBell = function(){
        return "Bell Ring";
    };
    /*
     Speedster
         __proto__: Speedster
             assemble: function (){}
             constructor: function (){}
             getPrice: function (){}
             repair: function (){}
             ride: function (){}
             wash: function (){}
             __proto__: Object
     */
    var speedsterBicycle = new Speedster();
    console.info(speedsterBicycle.getPrice());
    /*
     BellDecorator
         bicycle: Speedster
         constructor: function (){}
         interface: Interface
         __proto__: F
             assemble: function (){}
             constructor: function (bicycle){}
             getPrice: function (){}
             ringBell: function (){}
             __proto__: BicycleDecoratorAbs
                 assemble: function (){}
                 constructor: function (bicycle){}
                 getPrice: function (){}
                 repair: function (){}
                 ride: function (){}
                 wash: function (){}
                 __proto__: Object
     */
    var bellBicycle = new BellDecorator(speedsterBicycle);
    console.info(bellBicycle.getPrice());
    /*
     HeadLightDecorator
         bicycle: BellDecorator
         constructor: function (){}
         interface: Interface
         ringBell: function (){return this.bicycle[methodName]();}
         __proto__: F
             assemble: function (){}
             constructor: function (bicycle){}
             getPrice: function (){}
             ringBell: function (){}
             __proto__: BicycleDecoratorAbs
                 assemble: function (){}
                 constructor: function (bicycle){}
                 getPrice: function (){}
                 repair: function (){}
                 ride: function (){}
                 wash: function (){}
                 __proto__: Object
     */
    var headLightBicycle = new HeadLightDecorator(bellBicycle);
    console.info(headLightBicycle.getPrice());
    console.info(bellBicycle.ringBell());
    /*replace method*/
    var TimeWarrantyDecorator = function(bicycle,coverageLengthInYears){
        TimeWarrantyDecorator.SuperClass.constructor.call(this, bicycle);
        this.coverageLength = coverageLengthInYears;
        this.expDate = new Date();
        var coverageLengthInMs = coverageLength*365*24*60*60*1000;
        this.expDate.setTime(this.expDate.getTime()+coverageLengthInMs);
    };
    extend(TimeWarrantyDecorator,BicycleDecoratorAbs);
    TimeWarrantyDecorator.prototype.repair = function(){
        var repairInstructions;
        var currentDate = new Date();
        if(currentDate < this.expDate){
            /*replace the BicycleDecoratorAbs method*/
            repairInstructions = "this bicycle is currently coverd by";
        }else{
            repairInstructions = this.bicycle.repair();
        }
        return repairInstructions;
    };
    TimeWarrantyDecorator.prototype.getPrice = function(){

    };
});