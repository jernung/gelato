/**
 * Gelato Framework
 * Version: 0.3.0
 * Date: Fri Apr 29 2016 21:23:19 GMT-0500 (CDT)
 */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'lodash', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'), require('lodash'), require('backbone'));
  } else {
    root.Gelato = factory(root.$, root._, root.Backbone);
  }
}(this, function($, _, Backbone) {
'use strict';

var Gelato = {};

/**
 * @class GelatoApplication
 * @extends {Backbone.Model}
 */
Gelato.Application = Backbone.Model.extend({
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
   * @method locale
   * @param {String} path
   * @param {String} [code]
   * @returns {*}
   */
  locale: function(path, code) {
    var locale = {};
    try {
      locale = require('locale/' + code || app.get('locale'));
    } catch (error) {
      locale = require('locale/default');
    }
    return _.get(locale, path);
  },
  /**
   * @method reload
   * @param {Boolean} [forcedReload]
   */
  reload: function(forcedReload) {
    location.reload(forcedReload);
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

/**
 * @class GelatoView
 * @extends {Backbone.View}
 */
Gelato.View = Backbone.View.extend({
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
   * @param {String} [selector]
   * @returns {GelatoView}
   */
  disableForm: function(selector) {
    this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', true);
    return this;
  },
  /**
   * @param {String} [selector]
   * @returns {GelatoView}
   */
  enableForm: function(selector) {
    this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', false);
    return this;
  },
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
   * @method getContext
   * @param {Object} [context]
   * @returns {Object}
   */
  getContext: function(context) {
    var globals = require('globals') || {};
    globals.app = window.app;
    globals.locale = window.app.locale;
    globals.view = this;
    globals = Backbone.$.extend(true, globals, context || {});
    return globals;
  },
  /**
   * @method hide
   * @returns {GelatoView}
   */
  hide: function() {
    this.$view.hide(arguments.length ? arguments : 0);
    return this;
  },
  /**
   * @method parseTemplate
   * @param {Function} template
   * @param {Object} [context]
   * @returns {Object}
   */
  parseTemplate: function(template, context) {
    if (typeof template === 'function') {
      return template(this.getContext(context));
    }
    return template;
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
    Backbone.$(window).off('resize.View');
    return this;
  },
  /**
   * @method render
   * @returns {GelatoView}
   */
  render: function() {
    this.renderTemplate();
    return this;
  },
  /**
   * @method renderTemplate
   * @param {Object} [context]
   * @returns {GelatoView}
   */
  renderTemplate: function(context) {
    this.$view = Backbone.$(this.parseTemplate(this.template, context));
    this.$el.html(this.$view);
    this.$('a[href]').on('click', this.handleClickHref);
    Backbone.$(window).on('resize.View', (function(event) {
      clearTimeout(this._resize);
      this._resize = setTimeout((function() {
        this._resize = null;
        this.trigger('resize', event);
      }).bind(this), 200);
    }).bind(this));
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

/**
 * @class GelatoCollection
 * @extends {Backbone.Collection}
 */
Gelato.Collection = Backbone.Collection.extend({
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
    options.error = (function() {
      this.state = 'standby';
      this._triggerState();
      if (typeof originalOptions.error === 'function') {
        originalOptions.error.apply(originalOptions, arguments);
      }
    }).bind(this);
    options.success = (function() {
      this.state = 'standby';
      this._triggerState();
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

/**
 * @class GelatoComponent
 * @extends {GelatoView}
 */
Gelato.Component = Gelato.View.extend({
  /**
   * @method renderTemplate
   * @param {Object} [context]
   * @returns {GelatoPage}
   */
  renderTemplate: function(context) {
    return Gelato.View.prototype.renderTemplate.call(this, context);
  },
  /**
   * @method remove
   * @returns {GelatoPage}
   */
  remove: function() {
    return Gelato.View.prototype.remove.call(this);
  }
});

/**
 * @class GelatoDialog
 * @extends {GelatoView}
 */
Gelato.Dialog = Gelato.View.extend({
  /**
   * @property el
   * @type {String}
   */
  el: 'gelato-dialogs',
  /**
   * @property element
   * @type {jQuery}
   */
  element: null,
  /**
   * @method renderTemplate
   * @param {Object} [context]
   * @returns {GelatoDialog}
   */
  renderTemplate: function(context) {
    Gelato.View.prototype.renderTemplate.call(this, context);
    this.element = this.$('[role="dialog"]');
    this.element.on('hide.bs.modal', this.handleElementHide.bind(this));
    this.element.on('hidden.bs.modal', this.handleElementHidden.bind(this));
    this.element.on('show.bs.modal', this.handleElementShow.bind(this));
    this.element.on('shown.bs.modal', this.handleElementShown.bind(this));
    return this;
  },
  /**
   * @method close
   * @returns {GelatoDialog}
   */
  close: function() {
    this.element.modal('hide');
    return this;
  },
  /**
   * @method handleElementHide
   */
  handleElementHide: function() {
    this.trigger('hide');
  },
  /**
   * @method handleElementHidden
   */
  handleElementHidden: function() {
    this.trigger('hidden');
    this.remove();
  },
  /**
   * @method handleElementShow
   */
  handleElementShow: function() {
    this.trigger('show');
  },
  /**
   * @method handleElementShown
   */
  handleElementShown: function() {
    this.trigger('shown');
  },
  /**
   * @method open
   * @param {Object} [options]
   * @returns {GelatoDialog}
   */
  open: function(options) {
    options = _.defaults(
      options || {},
      {
        backdrop: 'static',
        keyboard: false,
        show: true,
        remote: false
      }
    );
    this.render();
    this.element.modal(options);
    return this;
  }
});

/**
 * @class GelatoModel
 * @extends {Backbone.Model}
 */
Gelato.Model = Backbone.Model.extend({
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
    options.error = (function() {
      this.state = 'standby';
      this._triggerState();
      if (typeof originalOptions.error === 'function') {
        originalOptions.error.apply(originalOptions, arguments);
      }
    }).bind(this);
    options.success = (function() {
      this.state = 'standby';
      this._triggerState();
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

/**
 * @class GelatoPage
 * @extends {GelatoView}
 */
Gelato.Page = Gelato.View.extend({
  /**
   * @property el
   * @type {String}
   */
  el: 'gelato-application',
  /**
   * @property title
   * @type {Function|String}

  title: null,
  /**
   * @method renderTemplate
   * @param {Object} [context]
   * @returns {GelatoPage}
   */
  renderTemplate: function(context) {
    document.title = _.result(this, 'title', app.get('title'));
    return Gelato.View.prototype.renderTemplate.call(this, context);
  },
  /**
   * @method remove
   * @returns {GelatoPage}
   */
  remove: function() {
    return Gelato.View.prototype.remove.call(this);
  }
});

/**
 * @class GelatoRouter
 * @extends {Backbone.Router}
 */
Gelato.Router = Backbone.Router.extend({
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
    window.scrollTo(0, 0);
    this.page = new (require(path + '/view'))(options);
    return this.page.render();
  },
  /**
   * @method start
   * @param {Object} [options]
   * @returns {Boolean}
   */
  start: function(options) {
    options = _.defaults(
      options || {},
      {
        pushState: app.isWebsite(),
        root: '/'
      }
    );
    return Backbone.history.start({
      pushState: options.pushState,
      root: options.root
    });
  }
});

return Gelato;
}));
