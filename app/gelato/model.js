/**
 * @class GelatoModel
 * @extends {Backbone.Model}
 */
module.exports = Backbone.Model.extend({
    /**
     * @method constructor
     * @constructor
     */
    constructor: function() {
        Backbone.Model.apply(this, arguments);
    },
    /**
     * @method fetch
     * @param {Object} [options]
     */
    fetch: function(options) {
        options = options || {};
        this.state = 'fetching';
        this.trigger('state', 'fetching', this);
        this.trigger('state:fetching', this);
        options.error = this._onRequestError.bind(this);
        options.success = this._onRequestSuccess.bind(this);
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
        this.trigger('state', 'saving', this);
        this.trigger('state:saving', this);
        options.error = this._onRequestError.bind(this);
        options.success = this._onRequestSuccess.bind(this);
        return Backbone.Model.prototype.save.call(this, attributes, options);
    },
    /**
     * @property standby
     * @type {String}
     */
    state: 'standby',
    /**
     * @method _onRequestError
     * @private
     */
    _onRequestError: function() {
        this.state = 'standby';
        this.trigger('state', 'standby', this);
        this.trigger('state:standby', this);
    },
    /**
     * @method _onRequestSuccess
     * @private
     */
    _onRequestSuccess: function() {
        this.state = 'standby';
        this.trigger('state', 'standby', this);
        this.trigger('state:standby', this);
    }
});
