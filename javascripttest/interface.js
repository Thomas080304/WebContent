window.onload = function(){
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
   var CompsiteInterface = new Interface("CompsiteInterface", ["add","remove","getChild"]);
   var FormInterface = new Interface("FormInterface",["save"]);
   function compsiteForm(){

   }

    /**
     * implements interface
     */
   compsiteForm.prototype.add = function(){
       console.info("add");
   };
    compsiteForm.prototype.remove = function(){
        console.info("remove");
    };
    compsiteForm.prototype.getChild = function(){
        console.info("getChild");
    };
    compsiteForm.prototype.save = function(){
        console.info("save");
    };
    /**
     * test
     */
    function test(instance){
        Interface.ensureImplements(instance, CompsiteInterface, FormInterface);

    }
    var ins = new compsiteForm();
    test(ins);
};