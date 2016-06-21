class GelatoRouter extends Backbone.Router {

  execute(callback, params) {
    if (this.page) {
      this.page.remove();
    }
    callback.apply(this, params);
  }

  start(options) {
    return Backbone.history.start(options);
  }

}

Gelato = Gelato || {};

Gelato.Router = GelatoRouter;
