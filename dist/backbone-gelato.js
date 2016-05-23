/**
 * Backbone Gelato
 * Version: 0.4.1
 * Date: Mon May 23 2016 17:25:34 GMT-0500 (CDT)
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

Gelato._BUILD = 'Mon May 23 2016 17:25:34 GMT-0500 (CDT)';

Gelato._VERSION = '0.4.1';

Gelato.isLocalhost = function () {
  return location.hostname === 'localhost';
};

var GelatoApplication = function (_Backbone$Model) {
  _inherits(GelatoApplication, _Backbone$Model);

  function GelatoApplication() {
    _classCallCheck(this, GelatoApplication);

    Backbone.$('body').prepend('<gelato-application></gelato-application>');
    Backbone.$('gelato-application').append('<gelato-modal></gelato-modal>');
    Backbone.$('gelato-application').append('<gelato-navbar></gelato-navbar>');
    Backbone.$('gelato-application').append('<gelato-page></gelato-page>');
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
  disableForm: function disableForm(selector) {
    this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', true);
    return this;
  },
  /**
   * @param {String} [selector]
   * @returns {GelatoView}
   */
  enableForm: function enableForm(selector) {
    this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', false);
    return this;
  },
  /**
   * @method getHeight
   * @returns {Number}
   */
  getHeight: function getHeight() {
    return this.$view.height();
  },
  /**
   * @method getWidth
   * @returns {Number}
   */
  getWidth: function getWidth() {
    return this.$view.width();
  },
  /**
   * @method handleClickNavigate
   * @param {Event} event
   */
  handleClickNavigate: function handleClickNavigate(event) {
    var $target = $(event.target);
    var href = $target.attr('href');
    var navigate = $target.attr('navigate');
    event.preventDefault();
    if (navigate === 'navigate') {
      window.app.router.navigate(href, { trigger: true });
    } else {
      window.app.router.navigate(navigate, { trigger: true });
    }
  },
  /**
   * @method getContext
   * @param {Object} [context]
   * @returns {Object}
   */
  getContext: function getContext(context) {
    var globalContext = window.app.context || {};
    globalContext.view = this;
    globalContext = $.extend(true, globalContext, context || {});
    return globalContext;
  },
  /**
   * @method hide
   * @returns {GelatoView}
   */
  hide: function hide() {
    this.$view.hide(arguments.length ? arguments : 0);
    return this;
  },
  /**
   * @method parseTemplate
   * @param {Function} template
   * @param {Object} [context]
   * @returns {Object}
   */
  parseTemplate: function parseTemplate(template, context) {
    return _.isFunction(template) ? template(this.getContext(context)) : template;
  },
  /**
   * @method remove
   * @returns {GelatoView}
   */
  remove: function remove() {
    this.stopListening();
    this.undelegateEvents();
    this.$el.find('*').off();
    this.$el.empty();
    return this;
  },
  /**
   * @method render
   * @returns {GelatoView}
   */
  render: function render() {
    this.renderTemplate();
    return this;
  },
  /**
   * @method renderTemplate
   * @param {Object} [context]
   * @returns {GelatoView}
   */
  renderTemplate: function renderTemplate(context) {
    this.$view = $(this.parseTemplate(this.template, context));
    this.$el.html(this.$view);
    this.$('[navigate]').on('click', _.bind(this.handleClickNavigate, this));
    return this;
  },
  /**
   * @method show
   * @returns {GelatoView}
   */
  show: function show() {
    this.$view.show(arguments.length ? arguments : 0);
    return this;
  }
});

var GelatoCollection = function (_Backbone$Collection) {
  _inherits(GelatoCollection, _Backbone$Collection);

  function GelatoCollection() {
    _classCallCheck(this, GelatoCollection);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoCollection).apply(this, arguments));
  }

  _createClass(GelatoCollection, [{
    key: '_handleRequestEvent',
    value: function _handleRequestEvent(options) {
      var self = this;
      var originalOptions = _.clone(options);
      options.error = function () {
        self.state = 'standby';
        self._triggerState();
        if (typeof originalOptions.error === 'function') {
          originalOptions.error.apply(originalOptions, arguments);
        }
      };
      options.success = function () {
        self.state = 'standby';
        self._triggerState();
        if (typeof originalOptions.success === 'function') {
          originalOptions.success.apply(originalOptions, arguments);
        }
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
  renderTemplate: function renderTemplate(context) {
    return Gelato.View.prototype.renderTemplate.call(this, context);
  },
  /**
   * @method remove
   * @returns {GelatoPage}
   */
  remove: function remove() {
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
  renderTemplate: function renderTemplate(context) {
    Gelato.View.prototype.renderTemplate.call(this, context);
    this.element = this.$('[role="dialog"]');
    this.element.on('hide.bs.modal', _.bind(this.handleElementHide, this));
    this.element.on('hidden.bs.modal', _.bind(this.handleElementHidden, this));
    this.element.on('show.bs.modal', _.bind(this.handleElementShow, this));
    this.element.on('shown.bs.modal', _.bind(this.handleElementShown, this));
    return this;
  },
  /**
   * @method close
   * @returns {GelatoDialog}
   */
  close: function close() {
    this.element.modal('hide');
    return this;
  },
  /**
   * @method handleElementHide
   */
  handleElementHide: function handleElementHide() {
    this.trigger('hide');
  },
  /**
   * @method handleElementHidden
   */
  handleElementHidden: function handleElementHidden() {
    this.trigger('hidden');
    this.remove();
  },
  /**
   * @method handleElementShow
   */
  handleElementShow: function handleElementShow() {
    this.trigger('show');
  },
  /**
   * @method handleElementShown
   */
  handleElementShown: function handleElementShown() {
    this.trigger('shown');
  },
  /**
   * @method open
   * @param {Object} [options]
   * @returns {GelatoDialog}
   */
  open: function open(options) {
    options = _.defaults(options || {}, {
      backdrop: 'static',
      keyboard: false,
      show: true,
      remote: false
    });
    this.render();
    this.element.modal(options);
    return this;
  }
});

var GelatoModel = function (_Backbone$Model2) {
  _inherits(GelatoModel, _Backbone$Model2);

  function GelatoModel() {
    _classCallCheck(this, GelatoModel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GelatoModel).apply(this, arguments));
  }

  _createClass(GelatoModel, [{
    key: '_handleRequestEvent',
    value: function _handleRequestEvent(options) {
      var self = this;
      var originalOptions = _.clone(options);
      options.error = function () {
        self.state = 'standby';
        self._triggerState();
        if (typeof originalOptions.error === 'function') {
          originalOptions.error.apply(originalOptions, arguments);
        }
      };
      options.success = function () {
        self.state = 'standby';
        self._triggerState();
        if (typeof originalOptions.success === 'function') {
          originalOptions.success.apply(originalOptions, arguments);
        }
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

/**
 * @class GelatoPage
 * @extends {GelatoView}
 */
Gelato.Page = Gelato.View.extend({
  /**
   * @property el
   * @type {String}
   */
  el: 'gelato-page',
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
  renderTemplate: function renderTemplate(context) {
    document.title = _.result(this, 'title');
    return Gelato.View.prototype.renderTemplate.call(this, context);
  },
  /**
   * @method remove
   * @returns {GelatoPage}
   */
  remove: function remove() {
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
  go: function go(path, options) {
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
  start: function start(options) {
    options = _.defaults(options || {}, {
      pushState: !Gelato.isLocalhost(),
      root: '/'
    });
    return Backbone.history.start({
      pushState: options.pushState,
      root: options.root
    });
  }
});

/**
 * @class Storage
 * @param {String} [prefix]
 * @constructor
 */
Gelato.Storage = function (prefix) {
  this.prefix = prefix || '';
};

/**
 * @method clear
 * @param {String} key
 */
Gelato.Storage.prototype.clear = function (key) {
  window.localStorage.clear();
};

/**
 * @method has
 * @param {String} key
 * @returns {Boolean}
 */
Gelato.Storage.prototype.has = function (key) {
  return window.localStorage.getItem(this.prefix + key) ? true : false;
};

/**
 * @method get
 * @param {String} key
 * @returns {*}
 */
Gelato.Storage.prototype.get = function (key) {
  try {
    return JSON.parse(window.localStorage.getItem(this.prefix + key));
  } catch (error) {
    return null;
  }
};

/**
 * @method remove
 * @param {String} key
 */
Gelato.Storage.prototype.remove = function (key) {
  window.localStorage.removeItem(this.prefix + key);
};

/**
 * @method set
 * @param {String} key
 * @param {*} value
 */
Gelato.Storage.prototype.set = function (key, value) {
  window.localStorage.setItem(this.prefix + key, JSON.stringify(value));
};
return Gelato;
}));
