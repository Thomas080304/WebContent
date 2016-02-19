window.onload = function(){
    function createXHR(){
        if(typeof XMLHttpRequest != "undefined"){
            return new XMLHttpRequest();
        }else if(typeof ActiveXObject != "undefined"){
            if(typeof arguments.callee.activeXString != "string"){
                var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                    i,len;
                for(i = 0,len = version.length; i < len; i++){
                    try{
                        new ActiveXObject(version[i]);
                        arguments.callee.activeXString = version[i];
                        break;
                    }catch (ex){
                        //escape
                    }
                }
                return new ActiveXObject(arguments.callee.activeXString);
            }
        }else{
            throw new Error("NO XHR Object avaliable");
        }
    }
    function createXHRImp(){
        if(typeof XMLHttpRequest != "undefined"){
            createXHRImp = function(){
                return new XMLHttpRequest();
            }
        }else if(typeof ActiveXObject != "undefined"){
            createXHRImp = function(){
                if(typeof arguments.callee.activeXString != "string"){
                    var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                        i,len;
                    for(i = 0,len = version.length; i < len; i++){
                        try{
                            new ActiveXObject(version[i]);
                            arguments.callee.activeXString = version[i];
                            break;
                        }catch (ex){
                            //escape
                        }
                    }
                    return new ActiveXObject(arguments.callee.activeXString);
                }
            }
        }else{
            createXHRImp = function(){
                throw new Error("NO XHR Object avaliable");
            }
        }
        return createXHRImp();
    }
    var createXHRImpDeclare = (function(){
        if(typeof XMLHttpRequest != "undefined"){
            return function(){
                return new XMLHttpRequest();
            }
        }else if(typeof ActiveXObject != "undefined"){
            return function(){
                if(typeof arguments.callee.activeXString != "string"){
                    var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                        i,len;
                    for(i = 0,len = version.length; i < len; i++){
                        try{
                            new ActiveXObject(version[i]);
                            arguments.callee.activeXString = version[i];
                            break;
                        }catch (ex){
                            //escape
                        }
                    }
                    return new ActiveXObject(arguments.callee.activeXString);
                }
            }
        }else{
            return function(){
                throw new Error("NO XHR Object avaliable");
            }
        }
    })();
};