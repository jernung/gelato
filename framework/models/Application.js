/**
 * @module Application
 */
define([
    'core/BaseModel',
    'routers/Router',
    'require.i18n!locale/nls/strings'
], function(BaseModel, Router, Strings) {
    /**
     * @class Application
     * @extends BaseModel
     */
    var Application = BaseModel.extend({
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