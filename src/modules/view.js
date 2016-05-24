class GelatoView extends Backbone.View {

  _handleClickNavigate(event) {
    var $target = $(event.target);
    var href = $target.attr('href');
    var navigate = $target.attr('navigate');
    event.preventDefault();
    if (navigate === 'navigate') {
      window.app.router.navigate(href, {trigger: true});
    } else {
      window.app.router.navigate(navigate, {trigger: true});
    }
  }

  _parseTemplate(template, context) {
    return _.isFunction(template) ? template(this.getContext(context)) : template;
  }

  getContext(context) {
    context = $.extend(
      true,
      window.app.context || {},
      context || {}
    );
    context.view = this;
    return context;
  }

  getHeight() {
    return this.$el.height();
  }

  getWidth() {
    return this.$el.width();
  }

  remove() {
    this.stopListening();
    this.undelegateEvents();
    this.$el.find('*').off();
    this.$el.remove();
    return this;
  }

  render() {
    return this.renderTemplate();
  }

  renderTemplate(context) {
    this.$el.attr('data-name', this.name);
    this.$el.html($(this._parseTemplate(this.template, context)));
    this.$el.find('[navigate]').on('click', _.bind(this._handleClickNavigate, this));
    return this;
  }

}

Gelato = Gelato || {};

Gelato.View = GelatoView;
