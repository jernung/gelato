describe('GelatoApplication', function() {
  var application;

  beforeEach(function() {
    application = new Gelato.Application();
    $('body').css({height: 1000, width: 500});
  });

  it(
    'should create application elements in the body',
    function() {
      expect($('gelato-application')).to.have.length(1);
      expect($('gelato-application > gelato-dialogs')).to.have.length(1);
      expect($('gelato-application > gelato-footer')).to.have.length(1);
      expect($('gelato-application > gelato-navbar')).to.have.length(1);
      expect($('gelato-application > gelato-pages')).to.have.length(1);
    }
  );

  it(
    'should be able to get the window dimensions',
    function() {
      expect(application.getWidth()).to.equal(500);
      expect(application.getHeight()).to.equal(1000);
    }
  );

  it(
    'should be able to get the window orientation',
    function() {
      expect(application.isLandscape()).to.be.false;
      expect(application.isPortrait()).to.be.true;
    }
  );

  afterEach(function() {
    $('gelato-application').remove();
    application = null;
  });

});
