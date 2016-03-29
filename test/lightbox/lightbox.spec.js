'use strict';

import 'babel-polyfill';
import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { qs, qsa, removeChilds } from '../testutils/domHelpers';

describe('MaterialExtLightbox', () => {

  const VK_ESC = 27;
  const VK_END = 35;
  const VK_HOME = 36;
  const VK_ARROW_LEFT = 37;
  const VK_ARROW_UP = 38;
  const VK_ARROW_RIGHT = 39;
  const VK_ARROW_DOWN = 40;

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Accordion Fixture</title>
</head>
<body>
  <div id='mount'>
    <p>Some text filler</p>
  </div>

  <dialog class="mdlext-dialog">
    <div id="lightbox" class="mdlext-lightbox mdlext-js-lightbox mdl-card">

      <div class="mdl-card__menu">
        <button action="close" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">close</i>
        </button>
      </div>

      <figure class="mdl-card__title">
        <img src="" alt>
        <figcaption></figcaption>
      </figure>

      <footer class="mdl-card__actions mdl-card--border">
        <div class="mdl-card__supporting-text">
          <span>Image title</span>
        </div>
        <nav>
          <button action="first" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" title="First">
            <i class="material-icons">first_page</i>
          </button>
          <button action="prev" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" title="Previous">
            <i class="material-icons">chevron_left</i>
          </button>
          <button action="next" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" title="Next">
            <i class="material-icons">chevron_right</i>
          </button>
          <button action="last" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" title="Last">
            <i class="material-icons">last_page</i>
          </button>
          <button action="play" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" title="Play">
            <i class="material-icons">play_circle_outline</i>
          </button>
        </nav>
      </footer>
    </div>
  </dialog>

  <div id="mount-2">
  </div>
</body>
</html>`;

  const lightboxFragment = `
    <div id="lightbox-2" class="mdlext-lightbox mdlext-js-lightbox mdl-card">
    </div>`;


  before ( () => {
    jsdomify.create(fixture);

    // Must load MDL after jsdom, see: https://github.com/mochajs/mocha/issues/1722
    requireUncached( 'material-design-lite/material');
    global.componentHandler = window.componentHandler;
    assert.isObject(componentHandler, 'No global MDL component handler');

    requireUncached('../../src/lightbox/lightbox');
    assert.isNotNull(window.MaterialExtLightbox, 'Expected MaterialExtAccordion not to be null');
    global.MaterialExtLightbox = window.MaterialExtLightbox;

  });

  after ( () => {
    jsdomify.destroy()
  });

  it('is globally available', () => {
    assert.isFunction(window['MaterialExtLightbox'], 'Expected MaterialExtLightbox to be globally available');
  });

  it('upgrades successfully', () => {
    const element = qs('#lightbox');
    expect(element.getAttribute('data-upgraded')).to.include('MaterialExtLightbox');
  });

  it('upgrades successfully when a new component is appended to the DOM', () => {
    const container = qs('#mount-2');

    try {
      container.insertAdjacentHTML('beforeend', lightboxFragment);
      const element = qs('#lightbox-2');

      assert.isFalse(element.classList.contains('is-upgraded'), 'Did not expect "is-upgraded" to exist before upgrade');
      componentHandler.upgradeElement(element, 'MaterialExtLightbox');
      assert.isTrue(element.classList.contains('is-upgraded'), 'Expected lightbox to upgrade');

      const dataUpgraded = element.getAttribute('data-upgraded');
      assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
      assert.isAtLeast(dataUpgraded.indexOf('MaterialExtLightbox'), 0, 'Expected "data-upgraded" attribute to contain "MaterialExtLightbox');
    }
    finally {
      removeChilds(container);
    }
  });

  it('downgrades successfully', () => {
    const container = qs('#mount-2');

    try {
      container.insertAdjacentHTML('beforeend', lightboxFragment);
      const element = qs('#lightbox-2');

      componentHandler.upgradeElement(element, 'MaterialExtLightbox');
      assert.isTrue(element.classList.contains('is-upgraded'), 'Expected lightbox to upgrade before downgrade');
      expect(element.getAttribute('data-upgraded')).to.include('MaterialExtLightbox');

      componentHandler.downgradeElements(element);
      expect(element.getAttribute('data-upgraded')).to.not.include('MaterialExtLightbox');
    }
    finally {
      removeChilds(container);
    }
  });


  it('interacts with the keyboard', () => {
    const lightbox = qs('#lightbox');

    spyOnKeyboardEvent(lightbox, VK_ARROW_DOWN);
    spyOnKeyboardEvent(lightbox, VK_ARROW_UP);
    spyOnKeyboardEvent(lightbox, VK_ARROW_LEFT);
    spyOnKeyboardEvent(lightbox, VK_ARROW_RIGHT);
    spyOnKeyboardEvent(lightbox, VK_END);
    spyOnKeyboardEvent(lightbox, VK_HOME);
    spyOnKeyboardEvent(lightbox, VK_ESC);
  });


  it('emits an "action" custom event when a button is clicked', () => {
    const lightbox = qs('#lightbox');
    const button = qs('.mdl-button', lightbox);
    assert.isNotNull(button, 'Expected handle to button');

    let spy = sinon.spy();
    lightbox.addEventListener('action', spy);

    const actionListener = ( event ) => {
      assert.isDefined(event.detail, 'Expected detail to be defined in event');
      assert.isDefined(event.detail.source, 'Expected detail.source to be defined in event');
    };
    lightbox.addEventListener('action', actionListener);

    try {
      // Trigger click on a button
      const evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      button.dispatchEvent(evt);
    }
    finally {
      lightbox.removeEventListener('select', spy);
      lightbox.removeEventListener('select', actionListener);
    }

    assert.isTrue(spy.called, 'Expected "action" event to fire');
  });

  function spyOnKeyboardEvent(target, keyCode) {
    let spy = sinon.spy();
    target.addEventListener('keydown', spy, true);

    try {
      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        keyCode: keyCode,
        view: window
      });
      target.dispatchEvent(event);
    }
    finally {
      target.removeEventListener('keydown', spy);
    }

    assert.isTrue(spy.calledOnce, `Expected "keydown" event to fire once for key code ${keyCode}`);
  }

});
