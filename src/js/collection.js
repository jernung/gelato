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
