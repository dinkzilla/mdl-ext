/**
 * Due to a bug in mdl-1.1.3 it is not possible to use a globally polyfilled CustomEvent constructor
 *
 * @param typeArg Is a String representing the name of the event.
 * @param customEventInit Is an EventInit dictionary, having the following fields:
 *        "bubbles", optional and defaulting to false, of type Boolean, indicating if the event bubbles or not.
 *        "cancelable", optional and defaulting to false, of type Boolean, indicating if the event can be canceled or not.
 *        "detail", optional and defaulting to null, of type any, that is an event-dependent value associated with the event.
 */

export function createCustomEvent( typeArg, customEventInit = { bubbles: false, cancelable: false, detail: null } ) {
  'use strict';

  try {
    // Modern browsers
    return new window.CustomEvent(typeArg, customEventInit);
  }
  catch(e) {
    // Copied from https://github.com/webcomponents/webcomponentsjs/blob/v0.7.12/CustomElements.js#L950
    // Copied from http://stackoverflow.com/questions/23349191/event-preventdefault-is-not-working-in-ie-11-for-custom-events
    const ce = document.createEvent('CustomEvent');
    ce.initCustomEvent(typeArg, customEventInit.bubbles, customEventInit.cancelable, customEventInit.detail);

    ce.preventDefault = function() {
      Object.defineProperty(this, 'defaultPrevented', {
        get: function() {
          return true;
        }
      });
    };
    return ce;
  }

  // Don't care about older browsers
}
