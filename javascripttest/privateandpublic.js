window.onload = function(){
    function Book(id){
        var _id, _name, _author;// private instance
        this.setId = function(id){
            _id = id;
        };
        this.getId = function(){
            return _id;
        };
    }
    Book.sayName = function(){//public static
        console.info("sayName test");
    };
    var book = new Book(99-99999);
    console.dir(book);
    var book2 = new Book(99-88888);
   console.info("book2");
    Book.sayName();

    (function(){
       var _name = "";// private static
       window.Person = function(name){//全局
            _name = name;
        };
        Person.prototype.getName = function(){
            return _name;
        };
        Person.prototype.setName = function(name){
            _name = name;
        };
        Person.sayName = function(){// public static
            console.info("Person sayName test");
        };
    })();
    Person.sayName();
    var person = new Person("Thomas");
    console.info(person.getName());
    var person2 = new Person("rose");
    console.info(person.getName());
    console.info(person2.getName());
     var Personton = (function(){
         var _name = "";//private static
         var Personton = function(name){//create a object
             _name = name;
         };
         Personton.prototype.getName = function(){
             return _name;
         };
         Personton.prototype.setName = function(name){
             _name = name;
         };
         Personton.sayName = function(name){
             var temp = "";
             if(typeof name == "string"){
                temp = name.toLowerCase();
                if(temp.indexOf("tho") == 0){
                    console.info("Thommm is coming");
                    _name = name;
                    console.info(_name);
                }
             }
         };
         return Personton;
     })();
    Personton.sayName("Thommm");
    var personton = new Personton("Thomas2");
    console.info(personton.getName());
    var personton = new Personton("rose2");
    console.info(personton.getName());
    console.info(personton.getName());

    var Persontom = (function(){
        var _name = "";
        var Persontom = function(name){
            _name = name;
        };
        return {
            Persontom:Persontom,
            getName:function(){
                return _name;
            },
            setName:function(name){
                _name = name;
            }
        }
    })();
    var persontom = Persontom.Persontom("Thomas3");
    console.info(Persontom.getName());
    var persontom2 = Persontom.Persontom("rose3");
    console.info(Persontom.getName());

    /**
     * lazyload
     */
    var Persontomm = (function(){
        var uniqueInstance = null;
        var _name = "";
        function Persontomm(name){
            _name = name;
            return {
                getName:function(){
                    return _name;
                },
                setName:function(name){
                    _name = name;
                }
            };
        }
        return {
            getInstance:function(name){
                if(!uniqueInstance){
                    uniqueInstance = Persontomm(name);
                }
                return uniqueInstance;
            }
        }
    })();
    var persontomm = Persontomm.getInstance("th000");
    console.info(persontomm.getName());
};