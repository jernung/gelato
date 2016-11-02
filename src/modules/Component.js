class GelatoComponent extends Gelato.View {

  constructor(options) {
    options = options || {};
    options.tagName = 'gelato-component';

    super(options);

    this.autoRender = _.defaultTo(options.autoRender, true);
    this.container = options.container;
  }

  renderTemplate(context) {
    this.parent.find(this.container).html(this.$el);

    Gelato.View.prototype.renderTemplate.call(this, context);

    return this;
  }

}

Gelato = Gelato || {};

Gelato.Component = GelatoComponent;
