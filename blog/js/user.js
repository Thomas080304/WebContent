define('user',[
	'role'
],function(roleModule){

	return {
		_setUser:function(user){
			this._username = user.username;
			this._name = user.name;
			this.getUserRole(user.role);
			ef.sessionStorage.put('user',user);
		},
		getUserRole:function(roleValue){
			var currentRole=null,option;
			var roleList = roleModule.getAllRoles();
			for(var index in roleList){
				option = roleList[index];
				if(roleValue == option.value){
					currentRole = option;
					break;
				}
			}
			return currentRole;
		},

		getToken:function(){
			var user = ef.sessionStorage.get('user');
			return user ? user.token: "usertoken"
		},
		_username:'',
		_name:'',
		_role:'',
		token:''
	};
});