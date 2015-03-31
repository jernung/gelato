var exec = require('cordova/exec');

module.exports = {
    /**
     * @method initialize
     * @param {Array|String} productIds
     * @param {Function} [callbackSuccess]
     * @param {Function} [callbackError]
     */
    initialize: function(productIds, callbackSuccess, callbackError) {
        productIds = Array.isArray(productIds) ? productIds : [productIds];
        exec(callbackSuccess, callbackError, 'GelatoPluginGoogleBilling', 'initialize', [productIds]);
    },
    /**
     * @method getProducts
     * @param {Function} [callbackSuccess]
     *
     * @param {Function} [callbackError]
     */
    getProducts: function(callbackSuccess, callbackError) {
        exec(callbackSuccess, callbackError, 'GelatoPluginGoogleBilling', 'getProducts', []);
    },
    /**
     * @method getPurchases
     * @param {Function} [callbackSuccess]
     * @param {Function} [callbackError]
     */
    getPurchases: function(callbackSuccess, callbackError) {
        exec(callbackSuccess, callbackError, 'GelatoPluginGoogleBilling', 'getPurchases', []);
    }
};