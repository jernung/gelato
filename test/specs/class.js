var expect = chai.expect;
var GelatoClass = require('gelato/class');

describe('GelatoClass', function() {
    var gelatoClass;

    beforeEach(function() {
        gelatoClass = new GelatoClass();
    });

    it('should extend backbone events', function() {
        gelatoClass.on('update', function(value) {
            expect(value).to.equal('bob');
        });
        gelatoClass.trigger('update', 'bob');
    });

    afterEach(function() {
        gelatoClass = undefined;
    });

});
