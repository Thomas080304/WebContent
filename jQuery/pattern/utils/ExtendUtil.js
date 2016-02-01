/**
 * Created by Administrator on 2015/10/31.
 */
define([

],function(){
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
    return extend;
});