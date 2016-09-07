class GelatoComponent extends Gelato.View {

  constructor(options) {
    options = options || {};
    options.tagName = 'gelato-component';

    super(options);

    this.container = options.container;
  }

  renderTemplate(context) {
    if (this.container) {
      Backbone.$(this.container).html(this.$el);
    }

    Gelato.View.prototype.renderTemplate.call(this, context);

    return this;
  }

}

Gelato = Gelato || {};

Gelato.Component = GelatoComponent;
