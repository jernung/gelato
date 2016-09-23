class GelatoApplication extends Backbone.View {

  constructor(options) {
    options = options || {};
    options.tagName = 'gelato-application';

    super(options);
  }

  render() {
    $(document.body).prepend(this.el);
    this.$el.append('<gelato-navbar></gelato-navbar>');
    this.$el.append('<gelato-pages></gelato-pages>');
    this.$el.append('<gelato-footer></gelato-footer>');
    this.$el.append('<gelato-dialogs></gelato-dialogs>');

    return this;
  }

  getHeight() {
    return Backbone.$('gelato-application').height();
  }

  getWidth() {
    return Backbone.$('gelato-application').width();
  }

  isLandscape() {
    return this.getWidth() > this.getHeight();
  }

  isPortrait() {
    return this.getWidth() <= this.getHeight();
  }

}

Gelato = Gelato || {};

Gelato.Application = GelatoApplication;
