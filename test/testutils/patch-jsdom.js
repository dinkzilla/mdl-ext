'use strict';

const jsdom = require("jsdom");
import jsdomify from 'jsdomify';

/**
 * Patch JsDom
 * @param fixture
 */
export function patchJsDom(fixture) {

  // https://github.com/tmpvar/jsdom#capturing-console-output
  jsdom.jsdom(undefined, {
    virtualConsole: jsdom.createVirtualConsole().sendTo(console)
  });

  jsdomify.create(fixture);

  // https://github.com/tmpvar/jsdom/issues/1555
  require('./closest-polyfill');

  // https://github.com/tmpvar/jsdom/issues/135
  const el = document.querySelector('body');
  if(typeof el.offsetLeft === 'undefined') {
    applyJsdomWorkaround(window);
  }
}

/**
 * Based on: https://gist.github.com/yannickcr/6129327b31b27b14efc5
 *         : https://github.com/tmpvar/jsdom/issues/135#issuecomment-68191941
 *
 * @param window
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
