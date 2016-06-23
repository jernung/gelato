class GelatoDialog extends Gelato.View {

  constructor(options) {
    options = options || {};
    options.tagName = 'gelato-dialog';
    super(options);
    this.container = 'gelato-dialogs';
  }

  renderModalContainer() {
    this.$el.html('<div class="modal fade" tabindex="-1" role="dialog"></div>');
    this.$('[role="dialog"]').html('<div class="modal-dialog"><div class="modal-content"></div></div>');
  }

  renderTemplate(context) {
    Gelato.View.prototype.renderTemplate.call(this, context, '.modal-content');
    return this;
  }

  close() {
    this.dialog.modal('hide');
    return this;
  }

  handleElementHide() {
    this.trigger('hide');
  }

  handleElementHidden() {
    this.trigger('hidden');
  }

  handleElementShow() {
    this.trigger('show');
  }

  handleElementShown() {
    this.trigger('shown');
  }

  open(options) {
    this.remove();
    Backbone.$(this.container).html(this.$el);
    this.renderModalContainer();
    this.renderTemplate();
    this.dialog = this.$('[role="dialog"]');
    this.dialog.on('hide.bs.modal', this.handleElementHide.bind(this));
    this.dialog.on('hidden.bs.modal', this.handleElementHidden.bind(this));
    this.dialog.on('show.bs.modal', this.handleElementShow.bind(this));
    this.dialog.on('shown.bs.modal', this.handleElementShown.bind(this));
    this.dialog.modal(options);
    return this;
  }

  remove() {
    Backbone.$('.modal-backdrop').remove();
    return Gelato.View.prototype.remove.call(this);
  }

}

Gelato = Gelato || {};

Gelato.Dialog = GelatoDialog;
