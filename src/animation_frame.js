/*global window:false*/
(function(browser) {
  var lastTime = 0;
  var vendors = ['webkit', 'moz', 'o', 'ms'];
  for(var x = 0; x < vendors.length && !browser.requestAnimationFrame; ++x) {
    browser.requestAnimationFrame = browser[vendors[x]+'RequestAnimationFrame'];
    browser.cancelAnimationFrame =
      browser[vendors[x]+'CancelAnimationFrame'] || browser[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!browser.requestAnimationFrame) {
    browser.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = browser.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!browser.cancelAnimationFrame) {
    browser.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})(window);