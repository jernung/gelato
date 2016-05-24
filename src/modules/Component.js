class GelatoComponent extends Gelato.View {

  constructor(options) {
    options = options || {};
    options.tagName = 'gelato-component';
    super(options);
  }
  
}

Gelato = Gelato || {};

Gelato.Component = GelatoComponent;
