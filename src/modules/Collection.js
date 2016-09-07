class GelatoCollection extends Backbone.Collection {

  _handleRequestEvent(options) {
    const clonedOptions = _.clone(options);

    options.error = () => {
      this.state = 'standby';
      this._triggerLoad();
      this._triggerState();

      clonedOptions.error && clonedOptions.error(...arguments);
    };

    options.success = () => {
      this.state = 'standby';
      this._triggerLoad();
      this._triggerState();

      clonedOptions.success && clonedOptions.success(...arguments);
    };
  }

  _triggerLoad() {
    if (!this.loaded) {
      this.loaded = true;
      this.trigger('load', this);
    }
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

GelatoCollection.prototype.loaded = false;
GelatoCollection.prototype.state = 'standby';

Gelato = Gelato || {};

Gelato.Collection = GelatoCollection;
