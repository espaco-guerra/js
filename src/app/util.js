/*global $:false*/
$.espacoGuerra.util = (function() {
  var forceProtocol = function(desiredProtocol, uri) {
    var match = uri.match(/^([^:]+):\/\//);
    var protocol = match === null ? null : match[1];
    if(match === null) {
      return desiredProtocol + '://' + uri;
    } else if(protocol === desiredProtocol) {
      return uri;
    } else {
      return uri.replace(protocol, desiredProtocol);
    }
  };

  return {
    forceProtocol: forceProtocol
  };
})();
