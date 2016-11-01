/**
 * Backbone Gelato
 * Version: 0.5.17
 * Date: Tue Nov 01 2016 10:38:36 GMT+0800 (CST)
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gelato = {};

if ($ === undefined) {
  throw 'Gelato requires jQuery as a dependency.';
} else {
  window.jQuery = window.$ = $;
}

if (_ === undefined) {
  throw 'Gelato requires Lodash as a dependency.';
} else {
  window._ = _;
}

if (Backbone === undefined) {
  throw 'Gelato requires Backbone as a dependency.';
} else {
  window.Backbone = Backbone;
}

function getQueryString(name) {
  var location = window.location;

  var query = '';
  if (location.hash.length) {
    query = location.hash.substring(location.hash.indexOf('?') + 1);
  } else {
    query = location.search.substring(1);
  }

  var params = query.split('&');
  for (var i = 0; i < params.length; i++) {
    var pair = params[i].split('=');

    if (pair[0] === name) {
      return pair[1];
    }
  }

  return null;
}

function getScreenHeight() {
  return $(window).height();
}

function getScreenWidth() {
  return $(window).width();
}

function isCordova() {
  return _.isObject(window.cordova);
}

function isFileSystem() {
  return location.protocol === 'file:';
}

function isLocalhost() {
  return location.hostname === 'localhost';
}

function isWebsite() {
  return _.includes(['http:', 'https:'], location.protocol);
}

function setCookie(name, value, days) {
  var expires = '';

  if (days) {
    var date = new Date();

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  }

  document.cookie = name + '=' + value + expires + '; path=/';
}

Gelato.getQueryString = getQueryString;

Gelato.getScreenHeight = getScreenHeight;

Gelato.getScreenWidth = getScreenWidth;

Gelato.isCordova = isCordova;

Gelato.isLocalhost = isLocalhost;

Gelato.isWebsite = isWebsite;

Gelato._BUILD = 'Tue Nov 01 2016 10:38:36 GMT+0800 (CST)';

Gelato._VERSION = '0.5.17';

var GelatoApplication = function (_Backbone$View) {
  _inherits(GelatoApplication, _Backbone$View);

  function GelatoApplication(options) {
    _classCallCheck(this, GelatoApplication);

    options = options || {};
    options.tagName = 'gelato-application';

    return _possibleConstructorReturn(this, (GelatoApplication.__proto__ || Object.getPrototypeOf(GelatoApplication)).call(this, options));
  }

  _createClass(GelatoApplication, [{
    key: 'render',
    value: function render() {
      $(document.body).prepend(this.el);
      this.$el.append('<gelato-navbar></gelato-navbar>');
      this.$el.append('<gelato-pages></gelato-pages>');
      this.$el.append('<gelato-footer></gelato-footer>');
      this.$el.append('<gelato-dialogs></gelato-dialogs>');

      return this;
    }
  }, {
    key: 'getCookie',
    value: function getCookie(name) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');

      if (parts.length == 2) {
        return parts.pop().split(';').shift();
      }
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return Backbone.$('gelato-application').height();
    }
  }, {
    key: 'getQueryString',
    value: function getQueryString(name, url) {
      var href = url ? url : window.location.href;
      var expression = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
      var result = expression.exec(href);

      return result ? result[1] : null;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return Backbone.$('gelato-application').width();
    }
  }, {
    key: 'isLandscape',
    value: function isLandscape() {
      return this.getWidth() > this.getHeight();
    }
  }, {
    key: 'isPortrait',
    value: function isPortrait() {
      return this.getWidth() <= this.getHeight();
    }
  }, {
    key: 'reload',
    value: function reload(forcedReload) {
      document.location.reload(forcedReload);
    }
  }, {
    key: 'setCookie',
    value: function setCookie(name, value, days) {
      var expires = '';

      if (days) {
        var date = new Date();

        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toGMTString();
      }

      document.cookie = name + '=' + value + expires + '; path=/';
    }
  }]);

  return GelatoApplication;
}(Backbone.View);

Gelato = Gelato || {};

Gelato.Application = GelatoApplication;

var GelatoView = function (_Backbone$View2) {
  _inherits(GelatoView, _Backbone$View2);

  function GelatoView(options) {
    _classCallCheck(this, GelatoView);

    var _this2 = _possibleConstructorReturn(this, (GelatoView.__proto__ || Object.getPrototypeOf(GelatoView)).call(this, options));

    _this2.components = {};
    _this2.parent = null;
    return _this2;
  }

  _createClass(GelatoView, [{
    key: '_handleClickNavigate',
    value: function _handleClickNavigate(event) {
      event.preventDefault();
      var $target = Backbone.$(event.currentTarget);
      var href = $target.attr('href').replace(Backbone.history.root, '');
      var navigate = $target.attr('navigate').replace(Backbone.history.root, '');

      if (href === '#') {
        return;
      }

      if (navigate === 'navigate') {
        window.app.router.navigate(href, { trigger: true });
      } else {
        document.location.href = href;
      }
    }
  }, {
    key: '_parseTemplate',
    value: function _parseTemplate(template, context) {
      return _.isFunction(template) ? template(this.getContext(context)) : template;
    }
  }, {
    key: 'getContext',
    value: function getContext(context) {
      context = $.extend(true, window.app.context || {}, context || {});

      context.view = this;

      return context;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.$el.height();
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.$el.width();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.$el.hide();
      return this;
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.removeComponents();
      this.stopListening();
      this.undelegateEvents();
      this.$el.find('*').off();
      this.$el.remove();

      return this;
    }
  }, {
    key: 'removeComponents',
    value: function removeComponents() {
      _.forOwn(this.components, function (component) {
        component.remove();
      });

      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderTemplate();
    }
  }, {
    key: 'renderComponents',
    value: function renderComponents() {
      var _this3 = this;

      _.forOwn(this.components, function (component) {
        component.parent = _this3;

        if (component.autoRender) {
          component.render();
        }
      });

      return this;
    }
  }, {
    key: 'renderTemplate',
    value: function renderTemplate(context, element) {
      this.$el.attr('data-name', this.name);

      if (element) {
        this.$(element).html(Backbone.$(this._parseTemplate(this.template, context)));
      } else {
        this.$el.html(Backbone.$(this._parseTemplate(this.template, context)));
      }

      this.$('[navigate]').on('click', _.bind(this._handleClickNavigate, this));

      this.delegateEvents();
      this.stopListening();

      return this.renderComponents();
    }
  }, {
    key: 'show',
    value: function show() {
      this.$el.show();

      return this;
    }
  }]);

  return GelatoView;
}(Backbone.View);

Gelato = Gelato || {};

Gelato.View = GelatoView;

var GelatoCollection = function (_Backbone$Collection) {
  _inherits(GelatoCollection, _Backbone$Collection);

  function GelatoCollection() {
    _classCallCheck(this, GelatoCollection);

    return _possibleConstructorReturn(this, (GelatoCollection.__proto__ || Object.getPrototypeOf(GelatoCollection)).apply(this, arguments));
  }

  _createClass(GelatoCollection, [{
    key: '_handleRequestEvent',
    value: function _handleRequestEvent(options) {
      var _this5 = this,
          _arguments = arguments;

      var clonedOptions = _.clone(options);

      options.error = function () {
        _this5.state = 'standby';
        _this5._triggerLoad();
        _this5._triggerState();

        clonedOptions.error && clonedOptions.error.apply(clonedOptions, _arguments);
      };

      options.success = function () {
        _this5.state = 'standby';
        _this5._triggerLoad();
        _this5._triggerState();

        clonedOptions.success && clonedOptions.success.apply(clonedOptions, _arguments);
      };
    }
  }, {
    key: '_triggerLoad',
    value: function _triggerLoad() {
      if (!this.loaded) {
        this.loaded = true;
        this.trigger('load', this);
      }
    }
  }, {
    key: '_triggerState',
    value: function _triggerState() {
      this.trigger('state', this.state, this);
      this.trigger('state:' + this.state, this);
    }
  }, {
    key: 'fetch',
    value: function fetch(options) {
      options = options || {};

      this.state = 'fetching';
      this._triggerState();
      this._handleRequestEvent(options);

      return Backbone.Collection.prototype.fetch.call(this, options);
    }
  }]);

  return GelatoCollection;
}(Backbone.Collection);

GelatoCollection.prototype.loaded = false;
GelatoCollection.prototype.state = 'standby';

Gelato = Gelato || {};

Gelato.Collection = GelatoCollection;

var GelatoComponent = function (_Gelato$View) {
  _inherits(GelatoComponent, _Gelato$View);

  function GelatoComponent(options) {
    _classCallCheck(this, GelatoComponent);

    options = options || {};
    options.tagName = 'gelato-component';

    var _this6 = _possibleConstructorReturn(this, (GelatoComponent.__proto__ || Object.getPrototypeOf(GelatoComponent)).call(this, options));

    _this6.autoRender = _.defaultTo(options.autoRender, true);
    _this6.container = options.container;
    return _this6;
  }

  _createClass(GelatoComponent, [{
    key: 'renderTemplate',
    value: function renderTemplate(context) {
      if (this.container) {
        this.parent.$(this.container).html(this.$el);
      }

      Gelato.View.prototype.renderTemplate.call(this, context);

      return this;
    }
  }]);

  return GelatoComponent;
}(Gelato.View);

Gelato = Gelato || {};

Gelato.Component = GelatoComponent;

var GelatoDialog = function (_Gelato$View2) {
  _inherits(GelatoDialog, _Gelato$View2);

  function GelatoDialog(options) {
    _classCallCheck(this, GelatoDialog);

    options = options || {};
    options.tagName = 'gelato-dialog';

    var _this7 = _possibleConstructorReturn(this, (GelatoDialog.__proto__ || Object.getPrototypeOf(GelatoDialog)).call(this, options));

    _this7.container = 'gelato-dialogs';
    return _this7;
  }

  _createClass(GelatoDialog, [{
    key: 'renderModalContainer',
    value: function renderModalContainer() {
      this.$el.html('<div class="modal fade" tabindex="-1" role="dialog"></div>');
      this.$('[role="dialog"]').html('<div class="modal-dialog"><div class="modal-content"></div></div>');
    }
  }, {
    key: 'renderTemplate',
    value: function renderTemplate(context) {
      Gelato.View.prototype.renderTemplate.call(this, context, '.modal-content');

      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      this.dialog.modal('hide');

      return this;
    }
  }, {
    key: 'handleElementHide',
    value: function handleElementHide() {
      this.trigger('modal:hide');
    }
  }, {
    key: 'handleElementHidden',
    value: function handleElementHidden() {
      this.trigger('modal:hidden');
      this.remove();
    }
  }, {
    key: 'handleElementShow',
    value: function handleElementShow() {
      this.trigger('modal:show');
    }
  }, {
    key: 'handleElementShown',
    value: function handleElementShown() {
      this.trigger('modal:shown');
    }
  }, {
    key: 'open',
    value: function open(options) {
      if (window.app.dialog) {
        return;
      }

      Backbone.$(this.container).html(this.$el);
      this.renderModalContainer();
      this.renderTemplate();
      this.dialog = this.$('[role="dialog"]');
      this.dialog.on('hide.bs.modal', this.handleElementHide.bind(this));
      this.dialog.on('hidden.bs.modal', this.handleElementHidden.bind(this));
      this.dialog.on('show.bs.modal', this.handleElementShow.bind(this));
      this.dialog.on('shown.bs.modal', this.handleElementShown.bind(this));
      this.dialog.modal(options);

      window.app.dialog = this.dialog;

      return this;
    }
  }, {
    key: 'remove',
    value: function remove() {
      Backbone.$('.modal-backdrop').remove();

      window.app.dialog = null;

      return Gelato.View.prototype.remove.call(this);
    }
  }]);

  return GelatoDialog;
}(Gelato.View);

Gelato = Gelato || {};

Gelato.Dialog = GelatoDialog;

/**
 * Class for handling localization strings.
 */

var GelatoLocale = function () {

  /**
   * Create a new locale instance.
   * @param {object} primary
   * @param {object} [secondary]
   */

  function GelatoLocale(primary, secondary) {
    _classCallCheck(this, GelatoLocale);

    this.set(primary, secondary);
  }

  /**
   * Get the locale value at the provided path.
   * @param {string} path
   * @returns {string}
   */


  _createClass(GelatoLocale, [{
    key: 'get',
    value: function get(path) {
      return _.get(this._primary, path) || _.get(this._secondary, path);
    }

    /**
     * Set primary and secondary locale objects.
     * @param {object} primary
     * @param {object} [secondary]
     */

  }, {
    key: 'set',
    value: function set(primary, secondary) {
      this._primary = primary;
      this._secondary = secondary;
    }
  }]);

  return GelatoLocale;
}();

Gelato = Gelato || {};

Gelato.Locale = GelatoLocale;

var GelatoModel = function (_Backbone$Model) {
  _inherits(GelatoModel, _Backbone$Model);

  function GelatoModel() {
    _classCallCheck(this, GelatoModel);

    return _possibleConstructorReturn(this, (GelatoModel.__proto__ || Object.getPrototypeOf(GelatoModel)).apply(this, arguments));
  }

  _createClass(GelatoModel, [{
    key: '_handleRequestEvent',
    value: function _handleRequestEvent(options) {
      var _this9 = this,
          _arguments2 = arguments;

      var clonedOptions = _.clone(options);

      options.error = function () {
        _this9.state = 'standby';
        _this9._triggerLoad();
        _this9._triggerState();

        clonedOptions.error && clonedOptions.error.apply(clonedOptions, _arguments2);
      };

      options.success = function () {
        _this9.state = 'standby';
        _this9._triggerLoad();
        _this9._triggerState();

        clonedOptions.success && clonedOptions.success.apply(clonedOptions, _arguments2);
      };
    }
  }, {
    key: '_triggerLoad',
    value: function _triggerLoad() {
      if (!this.loaded) {
        this.loaded = true;
        this.trigger('load', this);
      }
    }
  }, {
    key: '_triggerState',
    value: function _triggerState() {
      this.trigger('state', this.state, this);
      this.trigger('state:' + this.state, this);
    }
  }, {
    key: 'fetch',
    value: function fetch(options) {
      options = options || {};

      this.state = 'fetching';
      this._triggerState();
      this._handleRequestEvent(options);

      return Backbone.Model.prototype.fetch.call(this, options);
    }
  }, {
    key: 'save',
    value: function save(attributes, options) {
      options = options || {};

      this.state = 'saving';
      this._triggerState();
      this._handleRequestEvent(options);

      return Backbone.Model.prototype.save.call(this, attributes, options);
    }
  }]);

  return GelatoModel;
}(Backbone.Model);

GelatoModel.prototype.loaded = false;
GelatoModel.prototype.state = 'standby';

Gelato = Gelato || {};

Gelato.Model = GelatoModel;

var GelatoPage = function (_Gelato$View3) {
  _inherits(GelatoPage, _Gelato$View3);

  function GelatoPage(options) {
    _classCallCheck(this, GelatoPage);

    options = options || {};
    options.tagName = 'gelato-page';

    var _this10 = _possibleConstructorReturn(this, (GelatoPage.__proto__ || Object.getPrototypeOf(GelatoPage)).call(this, options));

    _this10.container = 'gelato-pages';
    return _this10;
  }

  _createClass(GelatoPage, [{
    key: 'renderTemplate',
    value: function renderTemplate(context) {
      if (this.title) {
        document.title = _.result(this, 'title');
      }

      if (this.container) {
        Backbone.$(this.container).html(this.$el);
      }

      Gelato.View.prototype.renderTemplate.call(this, context);

      return this;
    }
  }]);

  return GelatoPage;
}(Gelato.View);

Gelato = Gelato || {};

Gelato.Page = GelatoPage;

var GelatoRouter = function (_Backbone$Router) {
  _inherits(GelatoRouter, _Backbone$Router);

  function GelatoRouter() {
    _classCallCheck(this, GelatoRouter);

    return _possibleConstructorReturn(this, (GelatoRouter.__proto__ || Object.getPrototypeOf(GelatoRouter)).apply(this, arguments));
  }

  _createClass(GelatoRouter, [{
    key: 'execute',
    value: function execute(callback, args, name) {
      if (this.page) {
        this.page.remove();
      }

      this.trigger('navigate:before', args, name);
      callback && callback.apply(this, args);
      this.trigger('navigate:after', args, name);
    }
  }, {
    key: 'isRunning',
    value: function isRunning() {
      return Backbone.History.started;
    }
  }, {
    key: 'start',
    value: function start(options) {
      return Backbone.history.start(options);
    }
  }]);

  return GelatoRouter;
}(Backbone.Router);

Gelato = Gelato || {};

Gelato.Router = GelatoRouter;

var GelatoStorage = function () {
  function GelatoStorage(prefix) {
    _classCallCheck(this, GelatoStorage);

    this._storage = window.localStorage;
    this._prefix = prefix || '';
  }

  _createClass(GelatoStorage, [{
    key: 'clear',
    value: function clear() {
      this._storage.clear();
    }
  }, {
    key: 'has',
    value: function has(key) {
      return this._storage.getItem(this._prefix + key) ? true : false;
    }
  }, {
    key: 'get',
    value: function get(key) {
      try {
        return JSON.parse(this._storage.getItem(this._prefix + key));
      } catch (error) {
        return null;
      }
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      this._storage.removeItem(this._prefix + key);
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      this._storage.setItem(this._prefix + key, JSON.stringify(value));
    }
  }]);

  return GelatoStorage;
}();

Gelato = Gelato || {};

Gelato.Storage = GelatoStorage;
return Gelato;
}));
