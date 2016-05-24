class GelatoRouter extends Backbone.Router {

  start(options) {
    options = options || {};
    options.pushState = options.pushState || Gelato.isWebsite();
    options.root = options.root || '/';
    return Backbone.history.start({
      pushState: options.pushState,
      root: options.root
    });
  }

}

Gelato = Gelato || {};

Gelato.Router = GelatoRouter;
