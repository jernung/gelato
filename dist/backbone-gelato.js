/**
 * Backbone Gelato
 * Version: 0.5.7
 * Date: Fri Jun 24 2016 07:44:46 GMT-0400 (EDT)
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

var Gelato = {};

Gelato._BUILD = 'Fri Jun 24 2016 07:44:46 GMT-0400 (EDT)';

Gelato._VERSION = '0.5.7';

Gelato.isLocalhost = function () {
  return location.hostname === 'localhost';
};

Gelato.isWebsite = function () {
  return _.includes(location.protocol, 'http');
};

var GelatoApplication = function (_Backbone$Model) {
  _inherits(GelatoApplication, _Backbone$Model);

  function GelatoApplication() {
    _classCallCheck(this, GelatoApplication);

    Backbone.$('body').prepend('<gelato-application></gelato-application>');
    Backbone.$('gelato-application').append('<gelato-dialogs></gelato-dialogs>');
    Backbone.$('gelato-application').append('<gelato-navbar></gelato-navbar>');
    Backbone.$('gelato-application').append('<gelato-pages></gelato-pages>');
    Backbone.$('gelato-application').append('<gelato-footer></gelato-footer>');
    return _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoApplication).call(this, arguments));
  }

  _createClass(GelatoApplication, [{
    key: 'getHeight',
    value: function getHeight() {
      return Backbone.$('gelato-application').height();
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
      location.reload(forcedReload);
    }
  }]);

  return GelatoApplication;
}(Backbone.Model);

Gelato = Gelato || {};

Gelato.Application = GelatoApplication;

var GelatoView = function (_Backbone$View) {
  _inherits(GelatoView, _Backbone$View);

  function GelatoView(options) {
    _classCallCheck(this, GelatoView);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoView).call(this, options));

    _this2.components = {};
    _this2.dialogs = {};
    return _this2;
  }

  _createClass(GelatoView, [{
    key: '_handleClickNavigate',
    value: function _handleClickNavigate(event) {
      event.preventDefault();
      var $target = Backbone.$(event.currentTarget);
      var href = $target.attr('href');
      var navigate = $target.attr('navigate');
      if (navigate === 'navigate') {
        window.app.router.navigate(href, { trigger: true });
      } else {
        window.app.router.navigate(navigate, { trigger: true });
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
      this.removeDialogs();
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
    key: 'removeDialogs',
    value: function removeDialogs() {
      _.forOwn(this.dialogs, function (dialog) {
        dialog.remove();
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
      _.forOwn(this.components, function (component) {
        component.render();
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
      this.renderComponents();
      return this;
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoCollection).apply(this, arguments));
  }

  _createClass(GelatoCollection, [{
    key: '_handleRequestEvent',
    value: function _handleRequestEvent(options) {
      var _this4 = this,
          _arguments = arguments;

      options = _.clone(options);
      options.error = function () {
        var _options;

        _this4.state = 'standby';
        _this4._triggerState();
        options.error && (_options = options).error.apply(_options, _arguments);
      };
      options.success = function () {
        var _options2;

        _this4.state = 'standby';
        _this4._triggerState();
        options.success && (_options2 = options).success.apply(_options2, _arguments);
      };
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

GelatoCollection.prototype.state = 'standby';

Gelato = Gelato || {};

Gelato.Collection = GelatoCollection;

var GelatoComponent = function (_Gelato$View) {
  _inherits(GelatoComponent, _Gelato$View);

  function GelatoComponent(options) {
    _classCallCheck(this, GelatoComponent);

    options = options || {};
    options.tagName = 'gelato-component';

    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoComponent).call(this, options));

    _this5.container = options.container;
    return _this5;
  }

  _createClass(GelatoComponent, [{
    key: 'renderTemplate',
    value: function renderTemplate(context) {
      if (this.container) {
        Backbone.$(this.container).html(this.$el);
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

    var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoDialog).call(this, options));

    _this6.container = 'gelato-dialogs';
    return _this6;
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
      this.remove();
      Backbone.$(this.container).html(this.$el);
      this.renderModalContainer();
      this.renderTemplate();
      this.dialog = this.$('[role="dialog"]');
      this.dialog.on('hide.bs.modal', this.handleElementHide.bind(this));
      this.dialog.on('hidden.bs.modal', this.handleElementHidden.bind(this));
      this.dialog.on('show.bs.modal', this.handleElementShow.bind(this));
      this.dialog.on('shown.bs.modal', this.handleElementShown.bind(this));
      this.dialog.modal(options);
      return this;
    }
  }, {
    key: 'remove',
    value: function remove() {
      Backbone.$('.modal-backdrop').remove();
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

var GelatoModel = function (_Backbone$Model2) {
  _inherits(GelatoModel, _Backbone$Model2);

  function GelatoModel() {
    _classCallCheck(this, GelatoModel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoModel).apply(this, arguments));
  }

  _createClass(GelatoModel, [{
    key: '_handleRequestEvent',
    value: function _handleRequestEvent(options) {
      var _this8 = this,
          _arguments2 = arguments;

      options = _.clone(options);
      options.error = function () {
        var _options3;

        _this8.state = 'standby';
        _this8._triggerState();
        options.error && (_options3 = options).error.apply(_options3, _arguments2);
      };
      options.success = function () {
        var _options4;

        _this8.state = 'standby';
        _this8._triggerState();
        options.success && (_options4 = options).success.apply(_options4, _arguments2);
      };
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

GelatoModel.prototype.state = 'standby';

Gelato = Gelato || {};

Gelato.Model = GelatoModel;

var GelatoPage = function (_Gelato$View3) {
  _inherits(GelatoPage, _Gelato$View3);

  function GelatoPage(options) {
    _classCallCheck(this, GelatoPage);

    options = options || {};
    options.tagName = 'gelato-page';

    var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoPage).call(this, options));

    _this9.container = 'gelato-pages';
    return _this9;
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoRouter).apply(this, arguments));
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
