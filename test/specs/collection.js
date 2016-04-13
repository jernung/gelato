describe('GelatoCollection', function() {
    var collection, server;

    before(function() {
        server = sinon.fakeServer.create();
        server.autoRespond = true;
        server.respondWith(
            "GET",
            "fake/path",
            [
                200,
                {"Content-Type":"application/json"},
                '[{"name": "josh"}]'
            ]
        );
    });

    it('should trigger state events', function(done) {
        collection = new Gelato.Collection();
        collection.url = 'fake/path';
        expect(collection.state).to.equal('standby');
        collection.on('state:fetching', function() {
            expect(collection.state).to.equal('fetching');
        });
        collection.on('state:standby', function() {
            expect(collection.state).to.equal('standby');
            expect(collection.length).to.equal(1);
            done();
        });
        collection.fetch();
    });

    after(function() {
        server.restore();
    });

});
