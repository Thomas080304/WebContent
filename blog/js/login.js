define('login',[
	'module',
	'exports',
	'domReady',
	'user',
	'api',
	'signature'
],function(module, exports, domReady,user,api,signature){
	var islocale = true;
	var impls = new ef.Interface.implement();
	impls.redraw = function(){
		
	};
	impls.destroy = function(){
		require.undef(module.id);
	};
	impls.o = {
		userName:$('#userName'),
		userPasswrod:$('#password'),
		submitBtn:$('#submitBtn')
	};
	impls.utils = {
		getConfig:function(){
			var def = $.Deferred();
			ef.getJSON({
				url:'data/config.json',
				useLocal:true,
				dataType:'json'
			})
			.success(function(response){
				ef.sessionStorage.put('module',response.module);
				ef.config.webroot = response.webroot;
				api.parser();
				def.resolve();
			})
			.error(function(){
				
			});
			return def.promise();
		},
		checkUser:function(user){
			var _user = impls.utils._getUserFromUI();
			if(_user.name == user.username && _user.password == user.password){
				return _user;
			}
			return false;
		},
		_getUserFromUI:function(){
			return {
				name:impls.o.userName.val(),
				password:impls.o.userPasswrod.val()
			}
		}
	};
	impls.utils.getConfig().then(function(){
		impls.o.submitBtn.on('click',function(){
			ef.getJSON({
				url:api.getAPI('login'),
				useLocal:true,
				dataType:'json'
			})
			.success(function(roles){
				var role = null;
				for(var i in roles){
					role = roles[i];
					if(impls.utils.checkUser(role)){
						signature.signIn(role);
						break;
					}
				}
			})
			.error(function(){

			});
		});
	});	
});