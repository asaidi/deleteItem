// ---------------------------------
// ---------- Plugin Name ----------
// ---------------------------------
// Brief plugin description
// ------------------------

;
(function($, window, document, undefined) {

	var pluginName = 'deleteItem',
		defaults = {
			onComplete: null,
			target: null
	};
	// Create the plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this._name = pluginName;
		this._defaults = $.fn.deleteItem.defaults;
		this.options = $.extend({}, this._defaults, options);

		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		// Initialization logic
		init: function() {
			this.buildCache();
			this.bindEvents();
			this.$target = this.options.target
		},
		// Remove plugin instance completely
		destroy: function() {
			this.unbindEvents();
			this.$element.removeData();
		},
		// Cache DOM nodes for performance
		buildCache: function() {
			this.$element = $(this.element);
		},
		// Bind events that trigger methods
		bindEvents: function() {
			var plugin = this;
			plugin.$element.on('click' + '.' + this._name, function() {
				plugin._itemDelete.call(plugin);
			});
		},
		// Unbind events that trigger methods
		unbindEvents: function() {
			this.$element.off('.' + this._name);
		},
		// Remove item method
		_itemDelete: function() {
			if ( (this.$target !== undefined) ) {
				this.$target.remove();
				this.callback();
				this.destroy();
			} else {
				console.log('Please specify a dom element as a target to be deleted !');
			}
		},
		// Callback method
		callback: function() {
			// Cache onComplete option
			var onComplete = this.options.onComplete;
			if (typeof onComplete === 'function') {
				onComplete.call(this.element);
			}
		}

	});

	$.fn.deleteItem = function(options) {
		this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
		return this;
	};

})(jQuery, window, document);