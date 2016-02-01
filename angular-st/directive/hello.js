var myModule = angular.module("MyModule",[]);

//<hello></hello>
myModule.directive("hello",function(){

	return {
		restrict:'EA',
		template:'<div>hello everyone!</div>',
		replace:true
	};

});
// <div my-hello></div>
myModule.directive("myHello",function(){

	return {
		restrict:'A',
		template:'<div>hello everyone!!</div>',
		replace:true
	};

});


myModule.controller("myCtrl",["$scope",function($scope){

	$scope.loadData = function(){
		console.info("loader111");
	};
	$scope.methodforload = "testformethod";

}]);
//<loader howToLoad = "loadData2()"></loader>
myModule.controller("myCtrl2",["$scope",function($scope){

	$scope.loadData2 = function(){
		console.info("ladeer222");
	};
}]);
myModule.directive("loader",function(){

	return {
		restrict:'AE',
		controller:function(){

		},
		link:function(scope,element,attrs){
			element.bind(function(){
				scope.apply(attrs.howtoload);
			});
		}
	};

});

myModule.directive("loadMethod",function(){

	return {
		require:'loader',
		restrict:'AE',
		scope:{
			methodForLoad:"="
		},
		link:function(scope, elemnt, attrs,loaderCtrl){
			console.info(elemnt);
			console.info(loaderCtrl);
		}
	};

});

/*myModule.directive("tempHello",function(){

	return {
		restrict:'A',
		templateUrl:'tempHello.html',
		replace:true
	};

});*/