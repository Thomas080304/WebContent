require.config({
	baseUrl:'.',
	paths:{
		'jquery':'../lib/jQuery/jquery-1.11.3',
		"InterfaceUtil":"utils/InterfaceUtil",
        "ExtendUtil":"utils/ExtendUtil"
	},
	shim:{

	}

});
define([
	'jquery',
	'InterfaceUtil',
	'ExtendUtil'
],function($, Interface, extend){
	/**
	 *	Interface define
	 */
	var CompositeInterface = new Interface('CompositeInterface',['add','remove','getChild']);
	var FolderAndFileInterface = new Interface('FolderAndFileInterface',['scan']);
	/**
	 *	Class for folder
	 */
	var FolderClass = function(name){
		this.name = name;
		this.cache = [];
		this.parent = null;
	};
	FolderClass.prototype = {
		constructor: FolderClass,
		add:function(child){
			console.log('folder add');
			Interface.ensureImplements(
				child,
				CompositeInterface,
				FolderAndFileInterface);
			this.cache.push(child);
			child.parent = this;
		},
		remove:function(){
			if(!this.parent){
				return;
			}
			console.log('folder remove',this.name);
			for(var i = 0, node; node = this._getParentCache(i); i++){
				if(node == this){
					this._removeNodeCache(i);
					break;
				}
			}
		},
		getChild:function(i){
			console.log('folder getChild');
			return this.cache[i];
		},
		scan:function(){
			console.log('folder scan'+this.name);
			for(var i = 0, node; node = this.getChild(i); i++){
				node.scan();
			}
		},
		_getParentCache:function(i){
			return this.parent.cache[i];
		},
		_removeNodeCache:function(i){
			this.parent.cache.splice(i,1);
		}
	};
	/**
	 * Class for file
	 */
	var FileClass = function(name){
		this.name = name;
		this.parent = null;
	};
	FileClass.prototype = {
		constructor:FileClass,
		add:function(){
			throw new Error('file type can not add something');
		},
		remove:function(){
			if(!this.parent){
				return;
			}
			console.log('remove file',this.name);
			for(var i = 0, node; node = this._getParentCache(i); i++){
				if(node == this){
					this._removeNodeCache(i);
					break;
				}
			}
		},
		getChild:function(){
			throw new Error('file type can not getChild something');
		},
		scan:function(){
			console.log('file scan',this.name);
		},
		getParent:function(){
			return this.parent;
		},
		_getParentCache:function(i){
			return this.parent.cache[i];
		},
		_removeNodeCache:function(i){
			this.parent.cache.splice(i,1);
		}
	};

	/**
	 *	test
	 */
	var folder1 = new FolderClass('i循环文件夹');
	for(var i = 0; i < 10; i++){
		folder1.add(new FileClass('fileName'+i));
	}
	var folder2 = new FolderClass('手动添加文件夹');
	var file1 = new FileClass('手动添加文件-1');
	var file2 = new FileClass('手动添加文件-2');
	folder2.add(file2);
	var topFolder = new FolderClass('最外层的文件夹');
	topFolder.add(file1);
	topFolder.add(folder2);
	topFolder.add(folder1);
	//scan
	topFolder.scan();
	//file2.remove();
	
	folder2.remove();
	file2.remove();

});