/*global $:false*/
/*global G_vmlCanvasManager:false*/
/*global console:false*/
var newPainter = function() {
  var newWorldPainter = function(world, canvas) {
    var context = canvas.getContext('2d');
    var canvasDimensions = [canvas.width, canvas.height];

    var drawBody = function(bodyName) {
      var body = world.bodies[bodyName];
      var position = body.position.map(function(coordinate, index) {
        var toCanvas = (coordinate * canvasDimensions[index]) / world.dimensions[index];
        return toCanvas + canvasDimensions[index] / 2;
      });
      var diameter = body.diameter * canvasDimensions[0] / world.dimensions[0];

      context.beginPath();
      context.arc(position[0], position[1], diameter, 0, 2 * Math.PI);
      context.stroke();
      context.fillText(bodyName, position[0], position[1] + diameter + 16);
    };

    var paint = function() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.font = "bold 16px Arial";
      context.textAlign = 'center';
      for (var body in world.bodies) {
        if (world.bodies.hasOwnProperty(body)) {
          drawBody(body);
        }
      }
    };

    return {
      paint: paint
    };
  };

  var paintOn = function(world, canvas) {
    var worldPainter = newWorldPainter(world, canvas);
    worldPainter.paint();
  };

  return {
    paintOn: paintOn
  };
};

var newGame = function(aCanvas, animationFrame) {
  var canvas = aCanvas;
  var world = {};
  var socket;
  var painter = newPainter();

  var updateWorld = function(newWorld) {
    world = newWorld;
  };

  var renderWorld = function() {
    if (canvas) {
      painter.paintOn(world, canvas);
      animationFrame(renderWorld);
    }
  };

  var listenTo = function(aSocket) {
    socket = aSocket;
    socket.onmessage = function(event) { updateWorld(JSON.parse(event.data)); };
  };

  animationFrame(renderWorld);

  var exit = function() {
    if(socket) {
      socket.close();
      socket = null;
    }
    if(canvas) {
      $(canvas).remove();
      canvas = null;
    }
  };

  return {
    listenTo: listenTo,
    exit: exit
  };
};

var createCanvasIn = function(parent) {
  var canvas = $('<canvas></canvas>');
  canvas.attr('width', '800px');
  canvas.attr('height', '600px');
  canvas.attr('id', 'canvas');
  parent.append(canvas);
  if(typeof G_vmlCanvasManager !== 'undefined') {
    return $(G_vmlCanvasManager.initElement(canvas[0]));
  } else {
    return canvas[0];
  }
};

$.espacoGuerra.joinGame = function(selector, uri) {
  var socket = new WebSocket($.espacoGuerra.util.forceProtocol('ws', uri));
  var canvas = createCanvasIn($(selector));
  var game = newGame(canvas, window.requestAnimationFrame);
  game.listenTo(socket);
  return game;
};
