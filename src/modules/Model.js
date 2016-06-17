class GelatoModel extends Backbone.Model {

  _handleRequestEvent(options) {
    options = _.clone(options);
    options.error = () => {
      this.state = 'standby';
      this._triggerState();
      options.error && options.error(...arguments);
    };
    options.success = () => {
      this.state = 'standby';
      this._triggerState();
      options.success && options.success(...arguments);
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
