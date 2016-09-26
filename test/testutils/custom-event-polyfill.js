// Polyfill for creating CustomEvents on IE11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
// https://github.com/webcomponents/webcomponentsjs/blob/v0.7.12/CustomElements.js#L950

try {
  if (!new window.CustomEvent('test')) {
    throw new Error('No customevents, uess polyfill');
  }
}
catch (e) {
  window.CustomEvent = (inType, params = { bubbles: false, cancelable: false, detail: null }) => {
    const ce = document.createEvent('CustomEvent');
    ce.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
    ce.preventDefault = () => {
      Object.defineProperty(this, 'defaultPrevented', {
        get: () => {
          return true;
        }
      });
    };
    return ce;
  };
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window

}
