/*global chai:false*/
/*global $:false*/
require('../test_helper.js');
require('../../src/app/util.js');

describe('Utilities', function(){
  describe('#forceProtocol(protocol, uri)', function(){
    it('should return uri with protocol prefix for uri without protocol', function(){
      var newUri = $.espacoGuerra.util.forceProtocol('ws', 'localhost');
      chai.assert.equal('ws://localhost', newUri);
    });
    it('should return uri with protocol prefix for uri with same protocol', function(){
      var newUri = $.espacoGuerra.util.forceProtocol('ws', 'ws://localhost');
      chai.assert.equal('ws://localhost', newUri);
    });
    it('should return uri with protocol prefix for uri with other protocol', function(){
      var newUri = $.espacoGuerra.util.forceProtocol('ws', 'http://localhost');
      chai.assert.equal('ws://localhost', newUri);
    });
  });
});
