(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("gelato/application", function(exports, require, module) {
/**
 * @class GelatoApplication
 * @extends {Backbone.Model}
 */
module.exports = Backbone.Model.extend({
    /**
     * @property gelato
     * @type {Object}
     */
    gelato: {
        timestamp: '1448408377',
        version: '0.1.0'
    },
    /**
     * @method getHeight
     * @returns {Number}
     */
    getHeight: function() {
        return Backbone.$('gelato-application').height();
    },
    /**
     * @method getLocalStorage
     * @param {String} key
     */
    getLocalStorage: function(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    /**
     * @method getPlatform
     * @returns {String}
     */
    getPlatform: function() {
        return window.device ? window.device.platform : 'Website';
    },
    /**
     * @method getSetting
     * @param {String} key
     * @returns {Boolean|Number|Object|String}
     */
    getSetting: function(key) {
        return JSON.parse(localStorage.getItem('application-' + key));
    },
    /**
     * @method getWidth
     * @returns {Number}
     */
    getWidth: function() {
        return Backbone.$('gelato-application').width();
    },
    /**
     * @method isAndroid
     * @returns {Boolean}
     */
    isAndroid: function() {
        return this.getPlatform() === 'Android';
    },
    /**
     * @method isDevelopment
     * @returns {Boolean}
     */
    isDevelopment: function() {
        return location.hostname === 'localhost';
    },
    /**
     * @method isIOS
     * @returns {Boolean}
     */
    isIOS: function() {
        return this.getPlatform() === 'iOS';
    },
    /**
     * @method isLandscape
     * @returns {Boolean}
     */
    isLandscape: function() {
        return this.getWidth() > this.getHeight();
    },
    /**
     * @method isPortrait
     * @returns {Boolean}
     */
    isPortrait: function() {
        return this.getWidth() <= this.getHeight();
    },
    /**
     * @method isProduction
     * @returns {Boolean}
     */
    isProduction: function() {
        return location.hostname !== 'localhost';
    },
    /**
     * @method isWebsite
     * @returns {Boolean}
     */
    isWebsite: function() {
        return this.getPlatform() === 'Website';
    },
    /**
     * @method reload
     */
    reload: function() {
        location.reload(true);
    },
    /**
     * @method getLocalStorage
     * @param {String} key
     */
    removeLocalStorage: function(key) {
        localStorage.removeItem(key);
    },
    /**
     * @method removeSetting
     * @param {String} key
     */
    removeSetting: function(key) {
        localStorage.removeItem('application-' + key);
    },
    /**
     * @method setLocalStorage
     * @param {String} key
     * @param {Array|Number|Object|String} value
     */
    setLocalStorage: function(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    /**
     * @method setSetting
     * @param {String} key
     * @param {Boolean|Number|Object|String} value
     */
    setSetting: function(key, value) {
        localStorage.setItem('application-' + key, JSON.stringify(value));
    }
});

});

require.register("gelato/collection", function(exports, require, module) {
/**
 * @class GelatoCollection
 * @extends {Backbone.Collection}
 */
module.exports = Backbone.Collection.extend({
    /**
     * @property state
     * @type {String}
     */
    state: 'standby',
    /**
     * @method fetch
     * @param {Object} [options]
     */
    fetch: function(options) {
        options = options || {};
        this.state = 'fetching';
        this._triggerState();
        this._handleRequestEvent(options);
        return Backbone.Collection.prototype.fetch.call(this, options);
    },
    /**
     * @method _handleRequestEvent
     * @param {Object} options
     * @private
     */
    _handleRequestEvent: function(options) {
        var originalOptions = _.clone(options);
        options.complete = (function() {
            this._triggerState();
            if (typeof originalOptions.complete === 'function') {
                originalOptions.complete.apply(originalOptions, arguments);
            }
        }).bind(this);
        options.error = (function() {
            this.state = 'standby';
            if (typeof originalOptions.error === 'function') {
                originalOptions.error.apply(originalOptions, arguments);
            }
        }).bind(this);
        options.success = (function() {
            this.state = 'standby';
            if (typeof originalOptions.success === 'function') {
                originalOptions.success.apply(originalOptions, arguments);
            }
        }).bind(this);
    },
    /**
     * @method _triggerState
     * @private
     */
    _triggerState: function() {
        this.trigger('state', this.state, this);
        this.trigger('state:' + this.state, this);
    }
});

});

require.register("gelato/component", function(exports, require, module) {
var GelatoView = require('./view');

/**
 * @class GelatoComponent
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @method renderTemplate
     * @param {Object} [context]
     * @returns {GelatoPage}
     */
    renderTemplate: function(context) {
        return GelatoView.prototype.renderTemplate.call(this, context);
    },
    /**
     * @method remove
     * @returns {GelatoPage}
     */
    remove: function() {
        return GelatoView.prototype.remove.call(this);
    }
});

});

require.register("gelato/model", function(exports, require, module) {
/**
 * @class GelatoModel
 * @extends {Backbone.Model}
 */
module.exports = Backbone.Model.extend({
    /**
     * @property state
     * @type {String}
     */
    state: 'standby',
    /**
     * @method fetch
     * @param {Object} [options]
     */
    fetch: function(options) {
        options = options || {};
        this.state = 'fetching';
        this._triggerState();
        this._handleRequestEvent(options);
        return Backbone.Model.prototype.fetch.call(this, options);
    },
    /**
     * @method save
     * @param [attributes]
     * @param [options]
     */
    save: function(attributes, options) {
        options = options || {};
        this.state = 'saving';
        this._triggerState();
        this._handleRequestEvent(options);
        return Backbone.Model.prototype.save.call(this, attributes, options);
    },
    /**
     * @method _handleRequestEvent
     * @param {Object} options
     * @private
     */
    _handleRequestEvent: function(options) {
        var originalOptions = _.clone(options);
        options.complete = (function() {
            this._triggerState();
            if (typeof originalOptions.complete === 'function') {
                originalOptions.complete.apply(originalOptions, arguments);
            }
        }).bind(this);
        options.error = (function() {
            this.state = 'standby';
            if (typeof originalOptions.error === 'function') {
                originalOptions.error.apply(originalOptions, arguments);
            }
        }).bind(this);
        options.success = (function() {
            this.state = 'standby';
            if (typeof originalOptions.success === 'function') {
                originalOptions.success.apply(originalOptions, arguments);
            }
        }).bind(this);
    },
    /**
     * @method _triggerState
     * @private
     */
    _triggerState: function() {
        this.trigger('state', this.state, this);
        this.trigger('state:' + this.state, this);
    }
});

});

require.register("gelato/page", function(exports, require, module) {
var GelatoView = require('./view');

/**
 * @class GelatoPage
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property el
     * @type {String}
     */
    el: 'gelato-application',
    /**
     * @property title
     * @type {Function|String}
     */
    title: null,
    /**
     * @method renderTemplate
     * @param {Object} [context]
     * @returns {GelatoPage}
     */
    renderTemplate: function(context) {
        document.title = _.result(this, 'title', app.get('title'));
        return GelatoView.prototype.renderTemplate.call(this, context);
    },
    /**
     * @method remove
     * @returns {GelatoPage}
     */
    remove: function() {
        return GelatoView.prototype.remove.call(this);
    }
});

});

require.register("gelato/router", function(exports, require, module) {
/**
 * @class GelatoRouter
 * @extends {Backbone.Router}
 */
module.exports = Backbone.Router.extend({
    /**
     * @property page
     * @type {String}
     */
    page: null,
    /**
     * @method go
     * @param {String} path
     * @param {Object} [options]
     * @returns {GelatoPage}
     */
    go: function(path, options) {
        if (this.page) {
            this.page.remove();
        }
        this.page = new (require(path + '/view'))(options);
        return this.page.render();
    },
    /**
     * @method start
     * @returns {Boolean}
     */
    start: function() {
        return Backbone.history.start({
            pushState: app.isWebsite(),
            root: '/'
        });
    }
});

});

require.register("gelato/view", function(exports, require, module) {
/**
 * @class GelatoView
 * @extends {Backbone.View}
 */
module.exports = Backbone.View.extend({
    /**
     * @property $view
     * @type {jQuery}
     */
    $view: null,
    /**
     * @property template
     * @type {Function}
     */
    template: null,
    /**
     * @method getHeight
     * @returns {Number}
     */
    getHeight: function() {
        return this.$view.height();
    },
    /**
     * @method getWidth
     * @returns {Number}
     */
    getWidth: function() {
        return this.$view.width();
    },
    /**
     * @method handleClickHref
     * @param {Event} event
     */
    handleClickHref: function(event) {
        var target = Backbone.$(event.target);
        var href = target.attr('href');
        if (window.app !== undefined &&
            window.app.router !== undefined &&
            href !== undefined &&
            href.indexOf('#') !== 0 &&
            href.indexOf('http://') !== 0 &&
            href.indexOf('https://') !== 0) {
            event.preventDefault();
            window.app.router.navigate(href, {
                replace: target.data('replace') || false,
                trigger: target.data('trigger') || true
            });
        }
    },
    /**
     * @method handleResize
     * @param {Event} event
     */
    handleResize: function(event) {
        this.trigger('resize', event);
    },
    /**
     * @method getContext
     * @param {Object} [context]
     * @returns {Object}
     */
    getContext: function(context) {
        var globals = require('globals') || {};
        globals.app = window.app;
        globals.view = this;
        globals = Backbone.$.extend(true,  globals, context || {});
        return globals;
    },
    /**
     * @method hide
     * @returns {GelatoPage}
     */
    hide: function() {
        this.$view.hide(arguments.length ? arguments : 0);
        return this;
    },
    /**
     * @method remove
     * @returns {GelatoView}
     */
    remove: function() {
        this.stopListening();
        this.undelegateEvents();
        this.$el.find('*').off();
        this.$el.empty();
        Backbone.$(window).off('resize', this.handleResize.bind(this));
        return this;
    },
    /**
     * @method renderTemplate
     * @param {Object} [context]
     * @returns {GelatoView}
     */
    renderTemplate: function(context) {
        this.$view = Backbone.$(this.template(this.getContext(context)));
        this.$el.html(this.$view);
        this.$('a[href]').on('click vclick', this.handleClickHref.bind(this));
        Backbone.$(window).off('resize', this.handleResize.bind(this));
        Backbone.$(window).on('resize', this.handleResize.bind(this));
        return this;
    },
    /**
     * @method show
     * @returns {GelatoView}
     */
    show: function() {
        this.$view.show(arguments.length ? arguments : 0);
        return this;
    }
});

});

