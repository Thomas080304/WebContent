(function(window, document, undefined){

	window.angular = window.angular || (window.angular = {});

	if(window.angular.bootstrap){
		//AngularJS is already loaded, so we can return here...
	    console.log('WARNING: Tried to load angular more than once.');
	    return;
	}

	bindJQuery();

	publishExternalAPI(angular);

	jqLite(document).ready(function() {
    	angularInit(document, bootstrap);
  	});

})(window, document);


/*------------------------------------------------------
	publishExternalAPI
*/
function publishExternalAPI(angular){
/*-------------------------------------------------------
	extend utils
*/
	extend(angular,{
		'bootstrap': bootstrap,
	    'copy': copy,
	    'extend': extend,
	    'equals': equals,
	    'element': jqLite,
	    'forEach': forEach,
	    'injector': createInjector,
	    'noop':noop,
	    'bind':bind,
	    'toJson': toJson,
	    'fromJson': fromJson,
	    'identity':identity,
	    'isUndefined': isUndefined,
	    'isDefined': isDefined,
	    'isString': isString,
	    'isFunction': isFunction,
	    'isObject': isObject,
	    'isNumber': isNumber,
	    'isElement': isElement,
	    'isArray': isArray,
	    'version': version,
	    'isDate': isDate,
	    'lowercase': lowercase,
	    'uppercase': uppercase,
	    'callbacks': {counter: 0},
	    '$$minErr': minErr,
	    '$$csp': csp
	});
/*------------------------------------------------------
	set up module
*/
	angularModule = setupModuleLoader(window);
	function setupModuleLoader(window){
		function ensure(obj, name, factory) {
			return obj[name] || (obj[name] = factory());
		}
		return ensure(angular, 'module', function() {//angular.module = (function(){})();
			var modules = {};
			return function module(name, requires, configFn){
				//angular.module("MyModule",[]) = (module = function(){]})
				return ensure(modules, name, function(){
					if (!requires) {
			          throw $injectorMinErr('nomod', "Module '{0}' is not available! You either misspelled " +
			             "the module name or forgot to load it. If registering a module ensure that you " +
			             "specify the dependencies as the second argument.", name);
			        }
			        var invokeQueue = [];
			        var configBlocks = [];
			        var runBlocks = [];

			        var config = invokeLater('$injector', 'invoke', 'push', configBlocks);
			        var moduleInstance = {
			          _invokeQueue: invokeQueue,
			          _configBlocks: configBlocks,
			          _runBlocks: runBlocks,
			          requires: requires,
			          name: name,
			          provider: invokeLater('$provide', 'provider'),
			          factory: invokeLater('$provide', 'factory'),
			          service: invokeLater('$provide', 'service'),
			          value: invokeLater('$provide', 'value'),
			          constant: invokeLater('$provide', 'constant', 'unshift'),
			          animation: invokeLater('$animateProvider', 'register'),
			          filter: invokeLater('$filterProvider', 'register'),
			          controller: invokeLater('$controllerProvider', 'register'),
			          directive: invokeLater('$compileProvider', 'directive'),
			          config: config,
			          run: function(block) {
			            runBlocks.push(block);
			            return this;
			          }
			        };

			        if (configFn) {
			          config(configFn);
			        }
			        return  moduleInstance;
				});
			});
		});
	}
/*------------------------------------------------------
	regeist ngLocale
*/
	/*var myModule = angular.module("myModule",[]);
	myModule.provider("testServervice",function(){
		return {
			$get:function(){
				var name = "123";
				function getName(){
					return name;
				}
				return {
					getName:getName
				}
			}
		}
	});*/
	try {
    	angularModule('ngLocale');
 	} catch (e) {
    	angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
 	}

 	angularModule('ng',['ngLocale'],['$provide',function ngModule($provide){
 		//regeist ng directive and provider
 	}]);
}
/*----------------------------------------------------------------------------
	angularInit
*/
function angularInit(element, bootstrap){
	if (appElement) {
    	config.strictDi = getNgAttribute(appElement, "strict-di") !== null;
    	bootstrap(appElement, module ? [module] : [], config);
 	}
}
/*---------------------------------------------------------------------------
	bootstrap
*/
function bootstrap(element, modules, config){
	var doBootstrap = function() {
    var injector = createInjector(modules, config.strictDi);
    injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector',
       function(scope, element, compile, injector) {
        scope.$apply(function() {

        	element.data('$injector', injector);
        	compile(element)(scope);
        });
      }]
    );
    return injector;
  };
}
/*-----------------------------------------------------------------------------
	createInjector
*/
function createInjector(modulesToLoad, strictDi){


/*-----------------------------------------------------------------------------
	provider
*/
	function provider(name, provider_) {
    assertNotHasOwnProperty(name, 'service');
    if (isFunction(provider_) || isArray(provider_)) {
      provider_ = providerInjector.instantiate(provider_);
    }
    if (!provider_.$get) {
      throw $injectorMinErr('pget', "Provider '{0}' must define $get factory method.", name);
    }
    return providerCache[name + providerSuffix] = provider_;
  }
 /*-------------------------------------------------------------------------------
 	internal
 */
  	function createInternalInjector(cache, factory){
  		return {
	      invoke: invoke,
	      instantiate: instantiate,
	      get: getService,
	      annotate: annotate,
	      has: function(name) {
	        return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
	    }
    };
  	}
}