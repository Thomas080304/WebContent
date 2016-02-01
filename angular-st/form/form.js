var myModule = angular.module("NgShowcaseApp",[]);

myModule.controller("ctrl.show.form",["$scope",function($scope){
	var vm = $scope.vm = {};
	vm.types = [
		'alert-success',
		'alert-info',
		'alert-warning',
		'alert-danger'
	];

	vm.alerts = [
		{type:'alert-success',msg:'操作成功,请继续下一步!'},
		{type:'alert-danger',msg:'提交失败,修改内容并尝试重新提交!'}
	];

	vm.closeAlert = function(index){
		vm.alerts.splice(index,1);
	};

	vm.addAlert = function(type,msg){
		if(type === undefined || msg === undefined){
			vm.alerts.push({type:'alert-danger',msg:'请选择类型或者填写信息!'});
		}else{
			vm.alerts.push({type:type,msg:msg});
		}
	};
}]);