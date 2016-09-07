class GelatoPage extends Gelato.View {

  constructor(options) {
    options = options || {};
    options.tagName = 'gelato-page';

    super(options);

    this.container = 'gelato-pages';
  }

  renderTemplate(context) {
    if (this.title) {
      document.title = _.result(this, 'title');
    }

    if (this.container) {
      Backbone.$(this.container).html(this.$el);
    }

    Gelato.View.prototype.renderTemplate.call(this, context);

    return this;
  }

}

Gelato = Gelato || {};

Gelato.Page = GelatoPage;
