window.onload = function(){
    var CompositeInterface = new Interface("CompositeInterface",["add","remove","getChild"]);
    var GalleryItemInterface = new Interface("GalleryItemInterface",["hide","show"]);
    var DynamicGalleryItem = function(id){
        this.children = [];

        this.element = document.createElement("div");
        this.element.id = id;
        this.element.className = "dynamic-gallery";
    };
    DynamicGalleryItem.prototype = {
        constructor:DynamicGalleryItem,
        add:function(child){
            console.info("add");
            Interface.ensureImplements(child,CompositeInterface,GalleryItemInterface);
            this.children.push(child);
            this.element.appendChild(child.getElement());
            var body = document.getElementById("context");
            body.appendChild(this.element);
        },
        remove:function(child){
            console.info("remove");
            for(var i = 0, node; node = this.getChild(i); i++){
                if(node == child){
                    this.children.splice(i,1);
                    break;
                }
            }
            this.element.remove(child.getElement());
        },
        getChild:function(i){
            console.info("getChild");
            return this.children[i];
        },
        hide:function(child){
            console.info("hide");
            for(var i = 0, node; node = this.getChild(i);i++){
                node.hide();
            }
            this.element.style.display = "none";
        },
        show:function(){
            console.info("show");
            this.element.style.display = "block";
            for(var i = 0, node; node = this.getChild(i);i++){
                node.show();
            }
        },
        getElement:function(){
            return this.element;
        }
    };
    var GalleryImage = function(src){
        this.element = document.createElement("img");
        this.element.className = "gallery-image";
        this.element.src = src;
    };
    GalleryImage.prototype = {
        constructor:GalleryImage,
        add:function(){
            console.info("image add");
            throw new Error("can not use this method");
        },
        remove:function(){
            console.info("image remove");
            throw new Error("can not use this method");
        },
        getChild:function(){
            console.info("image getChild");
            throw new Error("can not use this method");
        },
        hide:function(){
            console.info("image hide");
            this.element.style.display = "none";
        },
        show:function(){
            console.info("image show");
            this.element.style.display = "";
        },
        getElement:function(){
            return this.element;
        }
    };

    var topGallery = new DynamicGalleryItem("top-gallery");
    topGallery.add(new GalleryImage("http://image.zhangxinxu.com/image/study/s/s128/mm2.jpg"));
    topGallery.add(new GalleryImage("http://image.zhangxinxu.com/image/study/s/s128/mm2.jpg"));
    topGallery.add(new GalleryImage("http://image.zhangxinxu.com/image/study/s/s128/mm2.jpg"));
    var vacationPhotos = new DynamicGalleryItem("vacation-photos");
    for(var i = 1,len = 5; i < len; i++){
        vacationPhotos.add(new GalleryImage("http://image.zhangxinxu.com/image/study/s/s128/mm2.jpg"));
    }
    topGallery.add(vacationPhotos);
    topGallery.show();
    vacationPhotos.show();
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