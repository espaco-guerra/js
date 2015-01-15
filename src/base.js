/*global $:false*/
$.espacoGuerra.initializeOn = function(div) {
  var parent = $(div);
  // Draw empty world and set up initial size;
};

$.espacoGuerra.joinGame = function(uri) {
  var socket = new WebSocket($.espacoGuerra.util.forceProtocol('ws', uri));
  socket.onmessage = function(event) {
    return event.data;
  };
};
