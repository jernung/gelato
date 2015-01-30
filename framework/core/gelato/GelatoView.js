/**
 * @module Framework
 */
define([], function() {
    /**
     * @class GelatoView
     * @extends Backbone.View
     */
    var GelatoView = Backbone.View.extend({
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoView}
         */
        renderTemplate: function(template) {
            this.$el.html(Handlebars.compile(template)(app.strings));
            this.$('.navigate').on('vclick', this.handleNavigateClicked);
            return this;
        },
        /**
         * @method handleNavigateClicked
         * @param {Event} event
         */
        handleNavigateClicked: function(event) {
            event.preventDefault();
            var url = $(event.currentTarget).data('url').replace('#', app.isLocal() ? '/#' : '');
            var replace = $(event.currentTarget).data('replace');
            var trigger = $(event.currentTarget).data('trigger');
            app.router.navigate(url, {
                replace: replace === undefined ? false : replace,
                trigger: trigger === undefined ? true : trigger
            });
        }
    });

    return GelatoView;

});