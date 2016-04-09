define('role',[
	'locale'
],function(){
	var _roleList = {
		user://普通用户
        {
            value: 6,
            type: "user",
            label: $.i18n.prop("role.user"),
            default: "setting.user"
        },
        sys://系统管理员
        {
            value: 8,
            type: "sys_admin",
            label: $.i18n.prop("role.sys"),
            default: "dashboard"
        },
        sec://安全管理员
        {
            value: 9,
            type: "sec_admin",
            label: $.i18n.prop("role.sec"),
            default: "setting.user"
        },
        audit://安全审计员
        {
            value: 10,
            type: "audit_admin",
            label: $.i18n.prop("role.audit"),
            default: "log"
        },
        ecloud://超级用户
        {
            value: 88,
            type: "admin",
            label: $.i18n.prop("role.ecloud"),
            default: "dashboard"
        }
	};
	return {
		getAllRoles:function(){
            var roleList = [];
            for(var roleName in _roleList){
                roleList.push(_roleList[roleName]);
            }
            return roleList;
        }
	};
});