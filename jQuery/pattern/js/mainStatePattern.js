/**
 * Created by thomas on 2016/8/17.
 * 
 */
 require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "bootstrap":"lib/bootstrap-lib/js/bootstrap",
        "InterfaceUtil":"jQuery/pattern/utils/InterfaceUtil",
        "ExtendUtil":"jQuery/pattern/utils/ExtendUtil",
        "XHRUtil":"jQuery/pattern/utils/XHRUtil",
        "EventUtil":"jQuery/pattern/utils/EventUtil"
    },
    shim:{
    	"bootstrap":["jquery"]
    }
});

define([
	'jquery',
	'XHRUtil',
	'InterfaceUtil',
	'EventUtil',
	'ExtendUtil'
],function($,XHRUtil,Interface,EventUtil,extend){
	var element = $('#file').get(0);
	EventUtil.addHandler(element,'change',function(e){
		var files = EventUtil.getTarget(e).files,
		len = files.length,
		i = 0,file,info = {};
		if(files && len){
			while(i < len){
				file = files[i];
				info.name = file.name;
				info.size = file.size +'B';
				info.type = file.type.replace(/\W/g,'');
				info.id = file.lastModified+info.size+info.type;
				new Download(info);
				i++;
			}
		}
	});

	var StateInterface = new Interface('StateInterface',['download','pause','fail','finish']);
	var Download = function(){
		this.currentState = new ReadyState(this);
	};
	Download.prototype.setState = function(newSate){
		Interface.ensureImplements(newSate,StateInterface);
		this.currentState = newSate;
	};
	Download.prototype.download = function(){
		this.currentState.download();
	};
	Download.prototype.pause = function(){
		this.currentState.pause();
	};
	Download.prototype.fail = function(){
		this.currentState.fail();
	};
	Download.prototype.finish = function(){
		this.currentState.finish();
	};
	Download.prototype.getReadyState = function(){
		return new ReadyState(this);
	};
	Download.prototype.getDownloadingState = function(){
		return new DownloadingState(this);
	};
	Download.prototype.getDownloadPausedState = function(){
		return new DownloadPausedState(this);
	};
	Download.prototype.getDownloadedState = function(){
		return new DownloadedState(this);
	};
	Download.prototype.getDownloadedFailedState = function(){
		return new DownloadedFailedState(this);
	};

	var StateAbs = function(context){
		this.name = 'state abstract class as super class';
		this.context = context;
	};
	StateAbs.prototype = {
		constructor:StateAbs,
		download:function(){
			throw new Error('this method must be override');
		},
		pause:function(){
			throw new Error('this method must be override');
		},
		fail:function(){
			throw new Error('this method must be override');
		},
		finish:function(){
			throw new Error('this method must be override');
		}
	};
	/**
	 */
	var ReadyState = function(context){
		 ReadyState.SuperClass.constructor.call(this);
		 this.context = context;
	};
	extend(ReadyState,StateAbs);
	ReadyState.prototype.download = function(){
		this.context.setState(this.context.getDownloadingState());
	};
	ReadyState.prototype.pause = function(){
		throw new Error("还没开始下载，不能暂停!");
	};
	ReadyState.prototype.fail = function(){
		throw new Error("文件还没开始下载，怎么能说失败呢!");
	};
	ReadyState.prototype.finish = function(){
		throw new Error("文件还没开始下载，当然也不能结束了!");
	};
	/**
	 */
	var DownloadingState = function(context){
		DownloadingState.SuperClass.constructor.call(this);
		this.context = context;
	};
	extend(DownloadingState,StateAbs);
	DownloadingState.prototype.download = function(){
		throw new Error("文件已经正在下载中了!");
	};
	DownloadingState.prototype.pause = function(){
		this.context.setState(this.context.getDownloadPausedState());
	};
	DownloadingState.prototype.fail = function(){
		this.context.setState(this.context.getDownloadedFailedState());
	};
	DownloadingState.prototype.finish = function(){
		this.context.setState(this.context.getDownloadedFailedState());
	};
	/**
	 */
	var DownloadPausedState = function(context){
		DownloadPausedState.SuperClass.constructor.call(this);
		this.context = context;
	};
	extend(DownloadPausedState,StateAbs);
	DownloadPausedState.prototype.download = function(){
		this.context.setState(this.context.getDownloadingState());
	};
	DownloadPausedState.prototype.pause = function(){
		throw new Error("已经暂停了，咋还要暂停呢!");
	};
	DownloadPausedState.prototype.fail = function(){
		this.context.setState(this.context.getDownloadedFailedState());
	};
	DownloadPausedState.prototype.finish = function(){
		this.context.setState(this.context.getDownloadedState());
	};
	/**
	 */
	var DownloadedState = function(context){
		DownloadedState.SuperClass.constructor.call(this);
		this.context = context;
	};
	extend(DownloadedState,StateAbs);
	DownloadedState.prototype.download = function(){
		console.log("重新下载!");
	};
	DownloadedState.prototype.pause = function(){
		throw new Error("对下载完了，还暂停啥？");
	};
	DownloadedState.prototype.fail = function(){
		throw new Error("都下载成功了，咋会失败呢？");
	};
	DownloadedState.prototype.finish = function(){
 		throw new Error("下载成功了，不能再为成功了吧!");
	};
	/**
	 */
	var DownloadFailedState = function(context){
		DownloadFailedState.SuperClass.constructor.call(this);
		this.context = context;
	};
	DownloadFailedState.prototype.download = function(){
		console.log("尝试重新下载!");
	};
	DownloadingState.prototype.pause = function(){
		throw new Error("失败的下载，也不能暂停!");
	};
	DownloadFailedState.prototype.fail = function(){
		throw new Error("都失败了，咋还失败呢!");
	};
	DownloadFailedState.prototype.finish = function(){
 		throw new Error("失败的下载，肯定也不会成功!");
	};
	



});