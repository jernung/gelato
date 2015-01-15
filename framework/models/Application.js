/**
 * @module Application
 */
define([
    'gelato/GelatoModel',
    'routers/Router',
    'require.i18n!locale/nls/strings'
], function(GelatoModel, Router, Strings) {
    /**
     * @class Application
     * @extends GelatoModel
     */
    var Application = GelatoModel.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {
            this.router = new Router();
            this.strings = Strings;
        }
    });

    return Application;

});