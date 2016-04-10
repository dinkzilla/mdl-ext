// Code pulled from:
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
// https://github.com/d4tocchini/customevent-polyfill
(function () {
  try {
    new window.CustomEvent('test');
  } catch(e) {
    var CustomEvent = function(event, params) {
      var evt;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }
})();

/*
describe('custom-event-polyfill', function () {
  it('should be defined', function() {
    expect(CustomEvent).toBeDefined();
  });

  it('should be defined as a function', function() {
    expect(function() { new CustomEvent('test'); }).not.toThrow();
  });

  it('should work as expected', function() {
    var ev = new CustomEvent('test', { detail: 'blammy' });
    expect(ev.detail).toEqual('blammy');
  });
});
*/
