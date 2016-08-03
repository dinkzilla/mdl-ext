'use strict';

/*
 * Based on: https://gist.github.com/yannickcr/6129327b31b27b14efc5
 *         : https://github.com/tmpvar/jsdom/issues/135#issuecomment-68191941
 */

function applyJsdomWorkaround(window) {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetLeft: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
      }
    },
    offsetTop: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).marginTop) || 0;
      }
    },
    offsetHeight: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).height) || 0;
      }
    },
    offsetWidth: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).width) || 0;
      }
    }
  });
}

function patchJsdom() {
  applyJsdomWorkaround(window);
}
