'use strict';
import 'babel-polyfill';
import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { qs } from '../testutils/domHelpers';


describe('MaterialExtStickyHeader', () => {

  // TODO: Need more (sanity) tests

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header class="mdl-layout__header mdl-layout__header--waterfall mdlext-layout__sticky-header mdlext-js-sticky-header">
      <div class="mdl-layout__header-row">
        <span id="header-title" class="mdl-layout-title">Title goes here</span>
      </div>
    </header>
  
    <aside class="mdl-layout__drawer">
      <span class="mdl-layout-title">MDL Extensions</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="sticky-header.html">Sticky Header</a>
      </nav>
    </aside>
  
    <main id="mount" class="mdl-layout__content">
      <h1>Sticky Header Example</h1>
      <p>A sticky header makes site navigation easily accessible anywhere on the page and saves content space at the same.</p>
      <p>The header should auto-hide, i.e. hiding the header automatically when a user starts scrolling down the page
        and bringing the header back when a user might need it: they reach the bottom of the page or start scrolling up.</p>
    </main>
  </div>
</body>
</html>`;

  const fragment = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor lorem eu faucibus aliquet. 
  In vehicula risus turpis, ut dictum ante tristique et. Aenean ultricies sed urna ac condimentum. 
  Vivamus nisl tortor, ultricies at aliquam nec, semper at purus. Duis purus tortor, laoreet eget ante a, 
  rhoncus vulputate lorem. Pellentesque id enim ut massa posuere vestibulum sit amet eget elit. Nulla quis 
  euismod massa, id varius dui. Ut congue urna non ipsum placerat rhoncus. Curabitur a sollicitudin diam. 
  Donec id lectus eleifend, blandit magna a, mattis turpis. Fusce non tellus pulvinar, finibus dui ac, 
  porttitor ante. Vestibulum et commodo purus, et tincidunt nulla. Suspendisse blandit sodales est, nec 
  luctus sem sollicitudin in. Etiam libero tellus, porttitor sit amet velit a, commodo sodales neque.
</p>`;

  before ( () => {
    jsdomify.create(fixture);

    // Must load MDL after jsdom, see: https://github.com/mochajs/mocha/issues/1722
    requireUncached( 'material-design-lite/material');
    global.componentHandler = window.componentHandler;
    assert.isObject(componentHandler, 'No global MDL component handler');

    requireUncached( '../../src/sticky-header/sticky-header' );
    assert.isNotNull(window.MaterialExtStickyHeader, 'Expected MaterialExtStickyHeader not to be null');
    global.MaterialExtStickyHeader = window.MaterialExtStickyHeader;


    // Stub unsupported jsdom 'window.matchMedia'. Used in mdl/src/layout/layout.js
    window.matchMedia = window.matchMedia || function() {
        return {
          matches : false,
          addListener : function() {},
          removeListener: function() {}
        };
      };

    // Stub unsupported jsdom window.MutationObserver
    window.MutationObserver = window.MutationObserver || (function(undefined) {
        "use strict";

        function MutationObserver(listener) {
          this._watched = [];
          this._listener = listener;
        }

        MutationObserver.prototype = {

          observe: function($target, config) {
          },

          takeRecords: function() {
            var mutations = [];
            return mutations;
          },
          disconnect: function() {
            this._watched = [];
          }
        };

        return MutationObserver;
      })(void 0);


    //componentHandler.upgradeAllRegistered();
    //componentHandler.upgradeDom();
  });

  after ( () => {
    jsdomify.destroy();
  });

  it('is globally available', () => {
    assert.isFunction(window['MaterialExtStickyHeader'], 'No global MaterialExtStickyHeader');
  });

  it('upgrades successfully', () => {
    const element = qs('header');
    assert.isTrue(element.classList.contains('is-upgraded'), 'Expected sticky header class list to contain "is-upgraded"');

    const dataUpgraded = element.getAttribute('data-upgraded');
    assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
    assert.isAtLeast(dataUpgraded.indexOf('MaterialExtStickyHeader'), 0, 'Expected "data-upgraded" attribute to contain "MaterialExtStickyHeader');
  });

  it('listens to window resize', () => {
    //const header = qs('header');
    const spy = sinon.spy();
    window.addEventListener('resize', spy, true);

    try {
      const event = new Event('resize');
      window.dispatchEvent(event);
      window.dispatchEvent(event);
      window.dispatchEvent(event);
      window.dispatchEvent(event);
    }
    finally {
      window.removeEventListener('resize', spy);
    }
    assert.isTrue(spy.called, 'Expected "resize" event to fire');
  });

  it('listens to orientationchange', () => {
    //const header = qs('header');
    const spy = sinon.spy();
    window.addEventListener('orientationchange', spy, true);

    try {
      const event = new Event('orientationchange');
      window.dispatchEvent(event);
    }
    finally {
      window.removeEventListener('orientationchange', spy);
    }
    assert.isTrue(spy.called, 'Expected "orientationchange" event to fire');
  });

  it('repositions when content scroll', () => {
    const header = qs('header');
    const content = qs('.mdl-layout__content');
    const spy = sinon.spy();
    content.addEventListener('scroll', spy, true);

    content.scrollTop = 0;
    content.style.height = '200px';
    const startY = header.style.top;

    content.insertAdjacentHTML('beforeend', fragment);
    content.insertAdjacentHTML('beforeend', fragment);
    content.style.height = '1000px';

    header.MaterialExtStickyHeader.updatePosition_();

    try {
      const event = new Event('scroll');
      content.dispatchEvent(event);

      // Fake scroll
      content.scrollTop = 100;
      content.dispatchEvent(event);
      header.MaterialExtStickyHeader.updatePosition_();

      content.scrollTop = 1000;
      content.dispatchEvent(event);
      header.MaterialExtStickyHeader.updatePosition_();

      content.scrollTop = 400;
      content.dispatchEvent(event);
      header.MaterialExtStickyHeader.updatePosition_();

      content.scrollTop = 100;
      content.dispatchEvent(event);
      header.MaterialExtStickyHeader.updatePosition_();

      content.scrollTop = 0;
      content.dispatchEvent(event);
      header.MaterialExtStickyHeader.updatePosition_();

      content.scrollTop = 1000;
      content.dispatchEvent(event);
      header.MaterialExtStickyHeader.updatePosition_();
    }
    finally {
      content.removeEventListener('scroll', spy);
    }
    assert.isTrue(spy.called, 'Expected "resize" event to fire');
    assert.notStrictEqual(header.style.top, startY, 'Expected header position to change')
  });
});
