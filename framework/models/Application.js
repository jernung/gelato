/**
 * @module Application
 * @submodule Models
 */
define([
    'core/models/GelatoApplication',
    'routers/Router',
    'require.i18n!locale/nls/strings'
], function(GelatoApplication, Router, Strings) {

    /**
     * @class Application
     * @extends GelatoApplication
     */
    var Application = GelatoApplication.extend({
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