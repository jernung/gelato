/**
 * @module Framework
 */
define(['core/BaseView', 'require.text!templates/default.html'], function(BaseView, Template) {
    /**
     * @class DefaultView
     * @extends BaseView
     */
    var DefaultView = BaseView.extend({
        /**
         * @method render
         * @returns {DefaultView}
         */
        render: function() {
            this.renderTemplate(Template);
            return this;
        }
    });

    return DefaultView;

});