class GelatoCollection extends Backbone.Collection {

  _handleRequestEvent(options) {
    let originalOptions = _.clone(options);
    options.error = () => {
      this.state = 'standby';
      this._triggerState();
      if (_.isFunction(originalOptions.error)) {
        originalOptions.error.apply(originalOptions, arguments);
      }
    };
    options.success = () => {
      this.state = 'standby';
      this._triggerState();
      if (_.isFunction(originalOptions.success)) {
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
    return Backbone.Collection.prototype.fetch.call(this, options);
  }

}

GelatoCollection.prototype.state = 'standby';

Gelato = Gelato || {};

Gelato.Collection = GelatoCollection;
