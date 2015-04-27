/**
 * @module Application
 * @submodule Models
 */
define([
    'core/modules/GelatoApplication',
    'modules/Router'
], function(GelatoApplication, Router) {

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
        },
        /**
         * @method start
         */
        start: function() {
            this.router.start();
        }
    });

    return Application;

});