class GelatoRouter extends Backbone.Router {

  execute(callback, args, name) {
    if (this.page) {
      this.page.remove();
    }

    this.trigger('navigate:before', args, name);
    callback && callback.apply(this, args);
    this.trigger('navigate:after', args, name);
  }

  getQueryString() {
    const location = window.location;

    let query = '';
    if (location.hash.length) {
      query = location.hash.substring(location.hash.indexOf('?') + 1);
    } else {
      query = location.search.substring(1);
    }

    const params = query.split('&');
    for (let i = 0; i < params.length; i++) {
      const pair = params[i].split('=');

      if (pair[0] === name) {
        return pair[1];
      }
    }

    return null;
  }

  isRunning() {
    return Backbone.History.started;
  }

  start(options) {
    return Backbone.history.start(options);
  }

}

Gelato = Gelato || {};

Gelato.Router = GelatoRouter;
