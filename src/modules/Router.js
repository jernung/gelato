class GelatoRouter extends Backbone.Router {

  execute(callback, params) {
    if (this.page) {
      this.page.remove();
    }
    callback.apply(this, params);
  }

  start(options) {
    options = options || {};
    return Backbone.history.start({
      pushState: options.pushState,
      root: options.root
    });
  }

}

Gelato = Gelato || {};

Gelato.Router = GelatoRouter;
