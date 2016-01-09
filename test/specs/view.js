var expect = chai.expect;
var View = require('gelato/view');

describe('GelatoView', function() {
    var view;

    before(function() {
        Backbone.$('gelato-application').append('<test-view></test-view>');
    });

    beforeEach(function() {
        view = new View();
        view.template = "<gelato-view data-name='test'></gelato-view>";
        view.setElement('test-view').render()
    });

    it('remove()', function() {
        view.remove();
        expect(Backbone.$('test-view > gelato-view')).to.have.length(0);
    });

    it('render()', function() {
        expect(Backbone.$('test-view > gelato-view')).to.have.length(1);
    });

    it('resize()', function(done) {
        view.on('resize', function(event) {
            expect(event.type).to.equal('resize');
            done();
        });
        Backbone.$(window).resize();
    });

    afterEach(function() {
        view.remove();
    });

    after(function() {
        Backbone.$('test-view').remove();
    });

});
