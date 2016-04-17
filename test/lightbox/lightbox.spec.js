'use strict';

import 'babel-polyfill';
import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { qs, removeChilds } from '../testutils/domHelpers';

describe('MaterialExtLightbox', () => {

  const VK_ESC = 27;
  const VK_SPACE = 32;
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

    // Simulate open dialog
    const dialog = qs('dialog');
    dialog.setAttribute('open', '');
  });

  after ( () => {
    jsdomify.destroy();
  });

  it('is globally available', () => {
    assert.isFunction(window['MaterialExtLightbox'], 'Expected MaterialExtLightbox to be globally available');
  });

  it('upgrades successfully', () => {
    const element = qs('#lightbox');
    expect(element.getAttribute('data-upgraded')).to.include('MaterialExtLightbox');
  });

  it('has tabindex', () => {
    const element = qs('#lightbox');
    expect(element.getAttribute('tabindex')).not.to.be.NaN;
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

  it('can load image', () => {
    const lightbox = qs('#lightbox');
    const img = qs('img', lightbox);

    const spy = sinon.spy();
    img.addEventListener('load', spy);

    img.src = './smiley.jpg';
    assert.isTrue(spy.called, 'Expected "action" event to fire');
  });

  it('can not click image', () => {
    const lightbox = qs('#lightbox');
    const img = qs('img', lightbox);

    const spy = sinon.spy();
    img.addEventListener('click', spy);

    const event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });

    try {
      img.dispatchEvent(event);
    }
    finally {
      img.removeEventListener('click', spy);
    }
    assert.isTrue(spy.called, 'Expected "click" event to fire when image is clicked');
    assert.isTrue(event.defaultPrevented, 'Expected "event.preventDefault" to be called when image is clicked');
  });

  it('can drag image', () => {
    const lightbox = qs('#lightbox');
    const img = qs('img', lightbox);
    img.src = './smiley.jpg';

    const mouseDownSpy = sinon.spy();
    img.addEventListener('mousedown', mouseDownSpy, true);

    const mouseMoveSpy = sinon.spy();
    window.addEventListener('mousemove', mouseMoveSpy, true);

    const mouseUpSpy = sinon.spy();
    window.addEventListener('mouseup', mouseUpSpy, true);

    try {
      let event = new MouseEvent('mousedown', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': 10, // clientX/clientY is readonly...
        'clientY': 0   // ... not shure if I can test mouse movement
      });
      img.dispatchEvent(event);

      event = new MouseEvent('mousemove', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': 20,
        'clientY': 0
      });
      window.dispatchEvent(event);

      event = new MouseEvent('mouseup', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': 40,
        'clientY': 0
      });
      window.dispatchEvent(event);
    }
    finally {
      img.removeEventListener('mousedown', mouseDownSpy);
      window.removeEventListener('mousemove', mouseMoveSpy);
      window.removeEventListener('mouseup', mouseUpSpy);
    }
    assert.isTrue(mouseDownSpy.called, 'Expected "mousedown" event to fire');
    assert.isTrue(mouseMoveSpy.called, 'Expected "mousemove" event to fire');
    assert.isTrue(mouseUpSpy.called, 'Expected "mouseup" event to fire');
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
    spyOnKeyboardEvent(lightbox, VK_SPACE);
  });

  it('listens to resize', () => {
    const lightbox = qs('#lightbox');
    const spy = sinon.spy();
    window.addEventListener('resize', spy, true);

    try {
      const event = new Event('resize');
      window.dispatchEvent(event);
    }
    finally {
      window.removeEventListener('keydown', spy);
    }
    assert.isTrue(spy.called, 'Expected "resize" event to fire');
  });

  it('listens to orientationchange', () => {
    const lightbox = qs('#lightbox');
    const spy = sinon.spy();
    window.addEventListener('orientationchange', spy, true);

    try {
      const event = new Event('orientationchange');
      window.dispatchEvent(event);
    }
    finally {
      window.removeEventListener('keydown', spy);
    }
    assert.isTrue(spy.called, 'Expected "resize" event to fire');
  });

  it('emits an "action" custom event when a button is clicked', () => {
    const lightbox = qs('#lightbox');
    const button = qs('.mdl-button', lightbox);
    assert.isNotNull(button, 'Expected handle to button');

    const spy = sinon.spy();
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
    const spy = sinon.spy();
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
