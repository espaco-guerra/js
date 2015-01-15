/*global chai:false*/
/*global $:false*/

describe('Utilities', function(){
  describe('#forceProtocol(protocol, uri)', function(){
    it('should return uri with protocol prefix for uri without protocol', function(){
      var newUri = $.espacoGuerra.util.forceProtocol('ws', 'localhost');
      chai.assert.equal('ws://localhost', newUri);
    });
  });
});
