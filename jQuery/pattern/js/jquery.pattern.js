(function($){

	var Validate = function(){

	};
	
	//jquery的实例扩展多个方法
	$.fn.extend({
		validate:function(options){
			return this.each(function(options){
				var validator = this.data('validator');
				if(!validator){
					this.data('validator',new Validate(options));
				} 
			});
		},
		isValid:function(){
			return false;
		}
	});
	//给jquery的实例扩展多个方法
	$.extend($.fn,{
		validate:function(){},
		isValid:function(){}
	});


	//通过事件触发
	function Plugin(option, _relatedTarget) {
	    return this.each(function () {//this = Modal self
	      var $this   = $(this);
	      var data    = $this.data('bs.modal');
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
	      if (!data){
	      	$this.data('bs.modal', (data = new Modal(this, options)));//this ==Modal self
	      } 
	      if (typeof option == 'string'){
	      	data[option](_relatedTarget)//_relatedTarget = button
	      }else if (options.show){
	      	data.show(_relatedTarget);//this = Model self
	      } 
	    });
	}

	var old = $.fn.modal;

	$.fn.modal             = Plugin;
	$.fn.modal.Constructor = Modal;
	$.fn.modal.noConflict = function () {
	    $.fn.modal = old
	    return this
	};
	function getTargetFromTrigger($trigger) {
	    var href;
	    var target = $trigger.attr('data-target')
	      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

	    return $(target);
	}
	$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){
		var $this   = $(this);
		if (!$this.attr('data-target')) e.preventDefault();
		var $target = getTargetFromTrigger($this);//Modal self
	    var data    = $target.data('bs.modal');
	    var option  = data ? 'toggle' : $this.data();//method
	    Plugin.call($target, option,this);
	});
})(jQuery)

/*-----------------------------------------------------------------------------------------------------

*/
$("#elem").validate({
  propertyName: "a custom value"
});

/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in our plugin).

    // Create the defaults once
    var pluginName = "validate",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // We already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );

/*-----------------------------------------------------------------------------------------------------
	UI Widget-factory
*/
var collection = $("#elem").validate({
  foo: false
});
collection.validate("methodB");
/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

    // define our widget under a namespace of your choice
    // with additional parameters e.g.
    // $.widget( "namespace.widgetname", (optional) - an
    // existing widget prototype to inherit from, an object
    // literal to become the widget's prototype );

    $.widget( "validate" , {

        //Options to be used as defaults
        options: {
            someValue: null
        },

        //Setup widget (e.g. element creation, apply theming
        // , bind events etc.)
        _create: function () {

            // _create will automatically run the first time
            // this widget is called. Put the initial widget
            // setup code here, then we can access the element
            // on which the widget was called via this.element.
            // The options defined above can be accessed
            // via this.options this.element.addStuff();
        },

        // Destroy an instantiated plugin and clean up
        // modifications the widget has made to the DOM
        destroy: function () {

            // this.element.removeStuff();
            // For UI 1.8, destroy must be invoked from the
            // base widget
            $.Widget.prototype.destroy.call( this );
            // For UI 1.9, define _destroy instead and don't
            // worry about
            // calling the base widget
        },

        methodB: function ( event ) {
            //_trigger dispatches callbacks the plugin user
            // can subscribe to
            // signature: _trigger( "callbackName" , [eventObject],
            // [uiObject] )
            // e.g. this._trigger( "hover", e /*where e.type ==
            // "mouseenter"*/, { hovered: $(e.target)});
            this._trigger( "methodA", event, {
                key: value
            });
        },

        methodA: function ( event ) {
            this._trigger( "dataChanged", event, {
                key: value
            });
        },

        // Respond to any changes the user makes to the
        // option method
        _setOption: function ( key, value ) {
            switch ( key ) {
            case "someValue":
                // this.options.someValue = doSomethingWith( value );
                break;
            default:
                // this.options[ key ] = value;
                break;
            }

            // For UI 1.8, _setOption must be manually invoked
            // from the base widget
            $.Widget.prototype._setOption.apply( this, arguments );
            // For UI 1.9 the _super method can be used instead
            // this._super( "_setOption", key, value );
        }
    });

})( jQuery, window, document );