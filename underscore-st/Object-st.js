window.onload = function(){
	/*-----------------------------------------------------------------------------------------------
		Object
		constructor
		hasOwnProperty
		isPrototypeOf
		propertyIsEnumerable
		valueOf
		toString
		toLocaleString
	*/
	function hasPrototypeProperty(obj, name){
		return !obj.hasOwnProperty(name) && (name in obj);
	}
	/*----------------------------------------------------------------------------------------------
		获得实例上可以枚举的属性
		Object.keys
		Object.getOwnPropertyNames
	*/
	
};