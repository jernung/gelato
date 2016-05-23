class GelatoModel extends Backbone.Model {

  _handleRequestEvent(options) {
    var self = this;
    var originalOptions = _.clone(options);
    options.error = function() {
      self.state = 'standby';
      self._triggerState();
      if (typeof originalOptions.error === 'function') {
        originalOptions.error.apply(originalOptions, arguments);
      }
    };
    options.success = function() {
      self.state = 'standby';
      self._triggerState();
      if (typeof originalOptions.success === 'function') {
        originalOptions.success.apply(originalOptions, arguments);
      }
    };
  }

  _triggerState() {
    this.trigger('state', this.state, this);
    this.trigger('state:' + this.state, this);
  }

  fetch(options) {
    options = options || {};
    this.state = 'fetching';
    this._triggerState();
    this._handleRequestEvent(options);
    return Backbone.Model.prototype.fetch.call(this, options);
  }

  save(attributes, options) {
    options = options || {};
    this.state = 'saving';
    this._triggerState();
    this._handleRequestEvent(options);
    return Backbone.Model.prototype.save.call(this, attributes, options);
  }

}

GelatoModel.prototype.state = 'standby';

Gelato = Gelato || {};

Gelato.Model = GelatoModel;
