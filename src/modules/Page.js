class GelatoPage extends Gelato.View {

  constructor(options) {
    options = options || {};
    options.tagName = 'gelato-page';
    super(options);
  }

  renderTemplate(context) {
    Gelato.View.prototype.renderTemplate.call(this, context);
    document.title = _.result(this, 'title', window.app.get('name'));
    Backbone.$('gelato-pages').html(this.$el);
    return this;
  }

}

Gelato = Gelato || {};

Gelato.Page = GelatoPage;
