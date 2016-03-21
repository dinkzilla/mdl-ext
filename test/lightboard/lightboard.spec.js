'use strict';

import 'babel-polyfill';
import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { qs, qsa, removeChilds } from '../testutils/domHelpers';

describe('MaterialExtLightboard', () => {

  const VK_TAB = 9;
  const VK_ENTER = 13;
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
<ul id="mdlext-lightboard-1" class="mdlext-lightboard mdlext-js-lightboard">
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D802141.jpg" title="Northern goshawk with prey"/>
        <figcaption>_D802141.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D802591.jpg" title="Whooper swans in flight"/>
        <figcaption>_D802591.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D804370-3.jpg" title="European green woodpecker"/>
        <figcaption>_D804370-3.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D808689.jpg" title="The bridge"/>
        <figcaption>_D808689.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D802181.jpg" title="Landscape in blue pastel"/>
        <figcaption>_D802181.jpg</figcaption>
      </figure>
    </a>
  </li>
 /ul>
</div>
<div id="mount-2">
</div>
</body>
</html>`;

  const lightboard_with_ripple = `
<ul id="lightboard_with_ripple" class="mdlext-lightboard mdlext-js-lightboard mdl-js-ripple-effect">
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D801274.jpg" />
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D801392.jpg" />
      </figure>
    </a>
  </li>
</ul>`;

  before ( () => {
    jsdomify.create(fixture);

    // Must load MDL after jsdom, see: https://github.com/mochajs/mocha/issues/1722
    requireUncached( 'material-design-lite/material');
    global.componentHandler = window.componentHandler;
    assert.isObject(componentHandler, 'No global MDL component handler');

    requireUncached('../../src/lightboard/lightboard');
    assert.isNotNull(window.MaterialExtLightboard, 'Expected MaterialExtAccordion not to be null');
    global.MaterialExtLightboard = window.MaterialExtLightboard;

    //global.componentHandler.upgradeAllRegistered();
    //global.componentHandler.upgradeDom();

  });

  after ( () => {
    jsdomify.destroy()
  });

  it('is globally available', () => {
    assert.isFunction(window['MaterialExtLightboard'], 'Expected MaterialExtLightboard to be globally available');
  });

  it('upgrades successfully', () => {
    const element = qs('#mdlext-lightboard-1');
    expect(element.getAttribute('data-upgraded')).to.include('MaterialExtLightboard');
  });

  it('emits a "select" custom event when a slide is clicked', () => {
    const lightboard = qs('#mdlext-lightboard-1');
    assert.isNotNull(lightboard, 'Expected handle to lightboard');

    const slide = qs('.mdlext-lightboard__slide:nth-child(2)', lightboard);
    assert.isNotNull(slide, 'Expected handle to slide');

    let spy = sinon.spy();
    lightboard.addEventListener('select', spy);

    lightboard.addEventListener('select', event => {
      assert.isDefined(event.detail, 'Expected detail to be defined in event');
      assert.isDefined(event.detail.source, 'Expected detail.source to be defined in event');
      assert.isTrue(event.detail.source.classList.contains('mdlext-lightboard__slide'), 'Expected accordion to have class "mdlext-lightboard__slide"');
    });

    try {
      // Trigger click on a slide
      const evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      slide.dispatchEvent(evt);
    }
    finally {
      lightboard.removeEventListener('toggle', spy);
    }

    assert.isTrue(spy.called, 'Expected "select" event to fire');
  });

  it('has role="tablist"', () => {
    [...qsa('.mdlext-lightboard')].forEach( lightboard => {
      assert.equal(lightboard.getAttribute('role'), 'tablist');
    });
  });

  it('has slides with anchor', () => {
    [...qsa('.mdlext-lightboard__slide')].forEach( slide => {
      assert.isNotNull(qs('a', slide), 'Expected slide to have an anchor element');
    });
  });

  it('has ripple effect', () => {
    const container = qs('#mount-2');
    try {
      container.insertAdjacentHTML('beforeend', lightboard_with_ripple);
      const element = qs('#lightboard_with_ripple');
      componentHandler.upgradeDom();

      const dataUpgraded = element.getAttribute('data-upgraded');
      assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
      assert.isAtLeast(dataUpgraded.indexOf('MaterialRipple'), 0, 'Expected "data-upgraded" attribute to contain "MaterialRipple');

      [...qsa('#mount-2 a.mdlext-lightboard__slide__frame')].forEach( a => {
        const dataUpgraded = a.getAttribute('data-upgraded');
        assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
        assert.isAtLeast(dataUpgraded.indexOf('MaterialRipple'), 0, 'Expected "data-upgraded" attribute to contain "MaterialRipple');
      });
    }
    finally {
      removeChilds(container);
    }
  });

  it('interacts with the keyboard', () => {
    const lightboard = qs('#mdlext-lightboard-1');
    assert.isNotNull(lightboard, 'Expected handle to lightboard');

    const slide = qs('.mdlext-lightboard__slide:nth-child(3)', lightboard);
    assert.isNotNull(slide, 'Expected handle to slide #3');

    spyOnKeyboardEvent(lightboard, slide, VK_ARROW_DOWN);
    spyOnKeyboardEvent(lightboard, slide, VK_ARROW_LEFT);
    spyOnKeyboardEvent(lightboard, slide, VK_ARROW_RIGHT);
    spyOnKeyboardEvent(lightboard, slide, VK_ARROW_UP);
    spyOnKeyboardEvent(lightboard, slide, VK_ENTER);
    spyOnKeyboardEvent(lightboard, slide, VK_SPACE);
    spyOnKeyboardEvent(lightboard, slide, VK_TAB);
    spyOnKeyboardEvent(lightboard, slide, VK_END);
    spyOnKeyboardEvent(lightboard, slide, VK_HOME);
  });

  function spyOnKeyboardEvent(target, source, keyCode) {
    let spy = sinon.spy();
    target.addEventListener('keydown', spy);

    try {
      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        keyCode: keyCode,
        view: window
      });
      source.dispatchEvent(event);
    }
    finally {
      target.removeEventListener('keydown', spy);
    }
    //assert.isTrue(spy.calledOnce, `Expected "keydown" event to fire once for key code ${keyCode}`);
  }

});
