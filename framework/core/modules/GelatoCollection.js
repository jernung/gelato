/**
 * @module Core
 */
define([], function() {
    /**
     * @class GelatoCollection
     * @extends Backbone.Collection
     */
    var GelatoCollection = Backbone.Collection.extend({
        /**
         * @method lazyAdd
         * @param {Array|Object} models
         * @param {Function} callback
         * @param {Object} [options]
         */
        lazyAdd: function(models, callback, options) {
            var self = this;
            models = Array.isArray(models) ? models : [models];
            (function add() {
                self.add(models.splice(0, 199), options);
                if (models.length > 0) {
                    setTimeout(add, 0);
                } else {
                    callback();
                }
            })();
        }
    });

    return GelatoCollection;

});