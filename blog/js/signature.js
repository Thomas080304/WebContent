define('signature',[
	'user'
],function(user){
	
	return {
		signIn:function($user){
			user._setUser($user);
			ef.status.logined = true;
			window.location.href = "index.html";
		}
	};
});