/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "InterfaceUtil":"jQuery/pattern/utils/InterfaceUtil",
        "EventUtil":"jQuery/pattern/utils/EventUtil"
    }
});
define([
	"InterfaceUtil",
	"EventUtil"
],function(Interface,EventUtil){
	//CommandInterface
	var CommandInterface = new Interface("CommandInterface",["execute","undo"]);
	//command class
	var MoveupCommand = function(receiver){//implements CommandInterface
		this.receiver = receiver;
	};
	MoveupCommand.prototype.execute = function(){
		this.receiver.move(0,-10);
	};
	MoveupCommand.prototype.undo = function(){
		this.receiver.move(0,10);
	};
	var UndoCommandDecorator = function(command, undoStack){//decorator implements CommandInterface
		Interface.ensureImplements(command,CommandInterface);
		this.command = command;
		this.undoStack = undoStack;
	};
	UndoCommandDecorator.prototype.execute = function(){
		this.undoStack.push(this.command);
		this.command.execute();
	};
	UndoCommandDecorator.prototype.undo = function(){
		this.command.undo();
	};
	var Cursor = function(width,height,parent){
		this.width = width;
		this.height = height;
		this.position = {
			x:width/2,
			y:height/2
		};
		this.canvas = document.createElement("canvas");
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		parent.appendChild(this.canvas);
		this.ctx = this.canvas.getContext("2d");
		this.ctx.fillStyle = "#cc0000";
		this.move(0,0);
	};
	Cursor.prototype.move = function(x,y){
		this.position.x += x;
		this.position.y += y;
		this.ctx.clearRect(0,0,this.width,this.height);
		this.ctx.fillRect(this.position.x,this.position.y,100,100);
	};

	//create UI
	var CommandButton = function(label,command,parent){
		Interface.ensureImplements(command,CommandInterface);
		this.element = document.createElement("button");
		this.element.innerHTML = label;
		parent.appendChild(this.element);
		EventUtil.addHandler(this.element,"click",function(){
			command.execute();
		});
	};

	var UndoButton = function(label,parent,undoStack){
		this.element = document.createElement("button");
		this.element.innerHTML = label;
		parent.appendChild(this.element);
		EventUtil.addHandler(this.element,"click",function(){
			if(undoStack.length === 0){
				return;
			}
			var lastCommand = undoStack.pop();
			lastCommand.undo();
		});
	};

	/*
		test
	*/
	var body = document.getElementsByTagName("body")[0];
	var cursor = new Cursor(400,400,body);
	var undoStack = [];
	var moveupCommand = new MoveupCommand(cursor);
	var moveupCommandDecorator = new UndoCommandDecorator(moveupCommand, undoStack);
	var CommandButton = new CommandButton("up",moveupCommandDecorator,body);
	var undoCommandButton = new UndoButton("undo",body,undoStack);
});