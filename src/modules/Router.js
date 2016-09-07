class GelatoRouter extends Backbone.Router {

  execute(callback, args, name) {
    if (this.page) {
      this.page.remove();
    }

    this.trigger('navigate:before', args, name);
    callback && callback.apply(this, args);
    this.trigger('navigate:after', args, name);
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
