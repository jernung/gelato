/**
 * @module Application
 * @submodule Models
 */
define([
    'core/modules/GelatoApplication',
    'core/modules/GelatoDialog',
    'core/modules/GelatoSidebar'
], function(GelatoApplication, GelatoDialog, GelatoSidebar) {

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
            this.dialog = new GelatoDialog();
            this.sidebar = new GelatoSidebar();
        }
    });

    return Application;

});