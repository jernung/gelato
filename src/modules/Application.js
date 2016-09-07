class GelatoApplication extends Backbone.Model {

  constructor() {
    Backbone.$('body').prepend('<gelato-application></gelato-application>');
    Backbone.$('gelato-application').append('<gelato-dialogs></gelato-dialogs>');
    Backbone.$('gelato-application').append('<gelato-navbar></gelato-navbar>');
    Backbone.$('gelato-application').append('<gelato-pages></gelato-pages>');
    Backbone.$('gelato-application').append('<gelato-footer></gelato-footer>');

    super(arguments);
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

  reload(forcedReload) {
    location.reload(forcedReload);
  }

}

Gelato = Gelato || {};

Gelato.Application = GelatoApplication;
