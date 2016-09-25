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

  getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length == 2) {
      return parts.pop().split(';').shift();
    }
  }

  getHeight() {
    return Backbone.$('gelato-application').height();
  }

  getQueryString(name, url) {
    const href = url ? url : window.location.href;
    const expression = new RegExp( '[?&]' + name + '=([^&#]*)', 'i' );
    const result = expression.exec(href);

    return result ? result[1] : null;
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
    document.location.reload(forcedReload);
  }

  setCookie(name, value, days) {
    let expires = '';

    if (days) {
      const date = new Date();

      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toGMTString();
    }

    document.cookie = name + '=' + value + expires + '; path=/';
  }

}

Gelato = Gelato || {};

Gelato.Application = GelatoApplication;
