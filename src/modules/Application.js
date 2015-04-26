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
            this.router = new Router({app: this});
        },
        /**
         * @method start
         */
        start: function() {
            this.router.start();
            //DEBUGGING: append app namespace to window
            if (gelato.isCordova() || gelato.isLocal()) {
                window.app = this;
            }
        }
    });

    return Application;

});