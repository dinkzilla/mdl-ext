'use strict';
// Polyfill for creating CustomEvents on IE11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
// https://github.com/webcomponents/webcomponentsjs/blob/v0.7.12/CustomElements.js#L950

try {
  new window.CustomEvent("test");
}
catch(e) {
  window.CustomEvent = function(inType, params) {
    params = params || {
        bubbles: false,
        cancelable: false,
        detail: null
      };

    var e = document.createEvent("CustomEvent");
    e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
    e.preventDefault = function() {
      Object.defineProperty(this, "defaultPrevented", {
        get: function() {
          return true;
        }
      });
    };
    return e;
  };
  window.CustomEvent.prototype = window.Event.prototype;
}
