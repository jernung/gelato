class GelatoView extends Backbone.View {

  constructor(options) {
    super(options);

    this.components = {};
  }

  _handleClickNavigate(event) {
    event.preventDefault();
    const $target = Backbone.$(event.currentTarget);
    const href = $target.attr('href');
    const navigate = $target.attr('navigate');

    if (href === '#') {
      return;
    }

    if (navigate === 'navigate') {
      window.app.router.navigate(navigate, {trigger: true});
    } else {
      document.location.href = href;
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

  hide() {
    this.$el.hide();
    return this;
  }

  remove() {
    this.removeComponents();
    this.stopListening();
    this.undelegateEvents();
    this.$el.find('*').off();
    this.$el.remove();

    return this;
  }

  removeComponents() {
    _.forOwn(
      this.components,
      function(component) {
        component.remove();
      }
    );

    return this;
  }

  render() {
    return this.renderTemplate();
  }

  renderComponents() {
    _.forOwn(
      this.components,
      function(component) {
        component.render();
      }
    );

    return this;
  }

  renderTemplate(context, element) {
    this.$el.attr('data-name', this.name);

    if (element) {
      this.$(element).html(Backbone.$(this._parseTemplate(this.template, context)));
    } else {
      this.$el.html(Backbone.$(this._parseTemplate(this.template, context)));
    }

    this.$('[navigate]').on('click', _.bind(this._handleClickNavigate, this));
    this.delegateEvents();
    this.renderComponents();

    return this;
  }

  show() {
    this.$el.show();

    return this;
  }

}

Gelato = Gelato || {};

Gelato.View = GelatoView;
