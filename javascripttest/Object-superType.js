/**
 * Created by Administrator on 2015/9/5.
 */
window.onload = function(){
    /**
     * Prototype chain
     */
    function SuperTypeProtoChain(name){
        this.superName = name;
        this.colors = ["red","blue","green"];
    }
    SuperTypeProtoChain.prototype.sayName = function(){
        console.info(this.superName);
    };
    function SubTypeProtoChain(age){
        this.age = age;
    }

    /**
     * SubTypeProtoChain.prototype
     *  new SuperTypeProtoChain("Thomas") instance has __Proto__ and some instance-property
     */
    SubTypeProtoChain.prototype = new SuperTypeProtoChain("Thomas");
    /**
     * add constructor property to SuperTypeProtoChain instance to inditify the instance
     */
    SubTypeProtoChain.prototype.constructor = SubTypeProtoChain;
    //test
    var subTypeProtoChain = new SubTypeProtoChain(12);
    console.info(subTypeProtoChain.colors);
    console.info(subTypeProtoChain.superName);
    subTypeProtoChain.sayName();
    /**
     * Constructor stealing
     */
    function SuperTypeConstealing(name){
        this.superName = name;
        this.colors = ["red","blue","green"];
    }
    SuperTypeConstealing.prototype.sayName = function(){
        console.info(this.superName);
    };
    function SubTypeConstealing(age,name){
        //SuperType is related with SubType
        SuperTypeConstealing.call(this,name);
        this.age = age;
    }
    var subTypeConstealing = new SubTypeConstealing(12,"tt");
    console.info(subTypeConstealing.superName);
    console.info(subTypeConstealing.sayName);//can not steal SuperTypeConstealing prototype-object
    subTypeConstealing.colors.push("black");
    var subTypeConstealing2 = new SubTypeConstealing(15,"uu");
    /**
     * different instance has different instance-property
     */
    console.info(subTypeConstealing.colors);
    console.info(subTypeConstealing2.colors);
    /**
     * combine
     */
    function SuperTypeProtoComb(name){
        this.superName = name;
        this.colors = ["red","blue","green"];
    }
    SuperTypeProtoComb.prototype.sayName = function(){
        console.info(this.superName);
    };
    function SubTypeProtoComb(age, name){
        /**
         * second time to init SuperTypeProtoComb instance-property
         */
        SuperTypeProtoComb.call(this,name);
        this.age = age;
    }

    /**
     * first time to init SuperTypeProtoComb instance-property and prototype object
     * @type {Window.SuperTypeProtoComb}
     */
    SubTypeProtoComb.prototype = new SuperTypeProtoComb();//no need to add param
    /**
     * add constructor to new SuperTypeProtoComb() object
     * @type {SubTypeProtoComb}
     */
    SubTypeProtoComb.prototype.constructor = SubTypeProtoComb;
	var tt = new SubTypeProtoComb("tt",12);
	console.dir(tt);
    /**
     * prototype original
     */
    function Object(obj){
        function F(){}
        F.prototype = obj;
        return new F();
    }

    /**
     * parasitic
     */
    function inheritPrototype(SubType, SuperType){
        var prototype = Object(SuperType.prototype);
        prototype.constructor = SubType;
        SubType.prototype = prototype;
        /**
         * add superClass to SubType
         */
        SubType.superType = SuperType.prototype;
        if(SuperType.prototype.constructor == Object.prototype.constructor){
            SuperType.prototype.constructor = SuperType;
        }
    }
    function createAnother(original){
        var clone = Object(original);
        clone.sayHi = function(){
            console.info("Say Hi");
        };
        return clone;
    }
    function SuperTypeParaComb(name){
        this.superName = name;
        this.colors = ["red","blue","green"];
    }
    function SubTypeParaComb(age,name){
        SubTypeParaComb.superType.constructor.call(this,name);
    }
    inheritPrototype(SubTypeParaComb, SuperTypeParaComb);
    new SubTypeParaComb(100,"tt");

};