/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "Interface":"web/jQuery/utils/InterfaceUtil"
    }
});
define([
    "jquery",
    "Interface"
],function($,Interface){
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
});