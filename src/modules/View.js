class GelatoView extends Backbone.View {

  constructor(options) {
    super(options);
    this.views = {};
  }

  _handleClickNavigate(event) {
    event.preventDefault();
    let $target = Backbone.$(event.target);
    let href = $target.attr('href');
    let navigate = $target.attr('navigate');
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
    this.removeViews();
    this.stopListening();
    this.undelegateEvents();
    this.$el.find('*').off();
    this.$el.remove();
    return this;
  }

  removeViews() {
    _.forOwn(
      this.views,
      function(view) {
        view.remove();
      }
    );
    return this;
  }

  render() {
    return this.renderTemplate();
  }

  renderTemplate(context) {
    this.$el.attr('data-name', this.name);
    this.$el.html(Backbone.$(this._parseTemplate(this.template, context)));
    this.$el.find('[navigate]').on('click', _.bind(this._handleClickNavigate, this));
    return this;
  }

}

Gelato = Gelato || {};

Gelato.View = GelatoView;
