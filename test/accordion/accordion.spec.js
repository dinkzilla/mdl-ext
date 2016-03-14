'use strict';

import 'babel-polyfill';
import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { qs, qsa, removeChilds } from '../testutils/domHelpers';

describe('MaterialExtAccordion', () => {

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
  <div class="accordion-container">
    <ul id="accordion-1" class="mdlext-accordion mdlext-js-accordion" aria-multiselectable="false">
      <li class="mdlext-accordion__panel" open >
        <header class="mdlext-accordion__panel__header">
          <a href="#"></a>
          <div class="mdlext-accordion__panel__header__transform">
            <h5>First section</h5>
          </div>
        </header>
        <section class="mdlext-accordion__panel__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique eget augue eget gravida.</p>
          <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel.</p>
        </section>
      </li>
      <li class="mdlext-accordion__panel">
        <header class="mdlext-accordion__panel__header">
          <a href="#"></a>
          <div class="mdlext-accordion__panel__header__transform">
            <h5>Second</h5>
          </div>
        </header>
        <section class="mdlext-accordion__panel__content">
          <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel
            justo. Quisque at dui urna. Duis vel velit leo.</p>
        </section>
      </li>
      <li class="mdlext-accordion__panel">
        <header class="mdlext-accordion__panel__header">
          <a href="#"></a>
          <div class="mdlext-accordion__panel__header__transform">
            <h5>Section #3</h5>
          </div>
        </header>
        <section class="mdlext-accordion__panel__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section>
      </li>
      <li class="mdlext-accordion__panel">
        <header class="mdlext-accordion__panel__header">
          <a href="#"></a>
          <div class="mdlext-accordion__panel__header__transform">
            <h5>Fourth section</h5>
          </div>
        </header>
        <section class="mdlext-accordion__panel__content">
          <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel.</p>
        </section>
      </li>
      <li class="mdlext-accordion__panel">
        <header class="mdlext-accordion__panel__header">
          <a href="#"></a>
          <div class="mdlext-accordion__panel__header__transform">
            <h5>Fifth</h5>
          </div>
        </header>
        <section class="mdlext-accordion__panel__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique eget augue eget gravida.</p>
        </section>
      </li>
    </ul>
  </div>
  <div id="accordion-container-2">
  </div>
</div>
</body>
</html>`;

  const accordion_fragment = `
<ul id="accordion-2" class="mdlext-accordion mdlext-js-accordion">
  <li class="mdlext-accordion__panel" open >
    <header class="mdlext-accordion__panel__header">
      <a href="#"></a>
      <div class="mdlext-accordion__panel__header__transform">
        <h5>First section</h5>
      </div>
    </header>
    <section class="mdlext-accordion__panel__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique eget augue eget gravida.</p>
      <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel.</p>
    </section>
  </li>
  <li class="mdlext-accordion__panel">
    <header class="mdlext-accordion__panel__header">
      <a href="#"></a>
      <div class="mdlext-accordion__panel__header__transform">
        <h5>Second</h5>
      </div>
    </header>
    <section class="mdlext-accordion__panel__content">
      <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel
        justo. Quisque at dui urna. Duis vel velit leo.</p>
    </section>
  </li>
</ul>`;

  const accordion_wo_header_fragment = `
<ul id="accordion-3" class="mdlext-accordion mdlext-js-accordion">
  <li class="mdlext-accordion__panel" open >
    <section class="mdlext-accordion__panel__content">
      <p>Lorem ipsum dolor sit amet</p>
    </section>
  </li>
</ul>`;

  before ( () => {
    jsdomify.create(fixture);

    // Must load MDL after jsdom, see: https://github.com/mochajs/mocha/issues/1722
    requireUncached( 'material-design-lite/material');
    global.componentHandler = window.componentHandler;
    assert.isObject(componentHandler, 'No global MDL component handler');

    requireUncached('../../src/accordion/accordion');
    assert.isNotNull(window.MaterialExtAccordion, 'Expected MaterialExtAccordion not to be null');
    global.MaterialExtAccordion = window.MaterialExtAccordion;

    //global.componentHandler.upgradeAllRegistered();
    //global.componentHandler.upgradeDom();

  });

  after ( () => {
    jsdomify.destroy()
  });

  it('is globally available', () => {
    assert.isFunction(window['MaterialExtAccordion'], 'Expected MaterialExtAccordion to be globally available');
  });

  it('upgrades successfully', () => {
    const element = qs('#accordion-1');
    assert.isTrue(element.classList.contains('is-upgraded'), 'Expected accordion to upgrade');

    // TODO: Check data-upgraded as well
  });

  it('has role="tablist"', () => {
    [...qsa('.mdlext-accordion')].forEach( accordion => {
      assert.equal(accordion.getAttribute('role'), 'tablist');
    });
  });

  it('has panels with role="tabpanel"', () => {
    [...qsa('.mdlext-accordion__panel')].forEach( panel => {
      assert.equal(panel.getAttribute('role'), 'tabpanel');
    });
  });

  it('has headers with role="tab"', () => {
    [...qsa('.mdlext-accordion__panel__header')].forEach( header => {
      assert.equal(header.getAttribute('role'), 'tab');
    });
  });

  it('an open panel should have attribute "open" and a corresponding header with attribute "aria-expanded"', () => {
    const panel = qs('#accordion-1 .mdlext-accordion__panel[open]');
    assert.isNotNull(panel, 'Expected panel with attribute "open"');

    const title = [...panel.children].find( n => {
      n.classList.contains('mdlext-accordion__panel__header') && n.hasAttribute('aria-expanded');
    });
    assert.isNotNull(title, 'Expected header with attribute "aria-expanded"');
  });

  it('upgrades successfully when a new component is appended to the DOM', () => {
    const container = qs('#accordion-container-2');
    try {
      container.insertAdjacentHTML('beforeend', accordion_fragment);
      const element = qs('#accordion-2');

      assert.isFalse(element.classList.contains('is-upgraded'));
      componentHandler.upgradeElement(element, 'MaterialExtAccordion');
      assert.isTrue(element.classList.contains('is-upgraded'), 'Expected accordion to upgrade');

      // TODO: Check data-upgraded as well
    }
    finally {
      removeChilds(container);
    }

  });

  it('throws an error if header is missing', () => {
    const container = qs('#accordion-container-2');
    container.insertAdjacentHTML('beforeend', accordion_wo_header_fragment);
    const element = qs('#accordion-3');
    expect( () => {
      componentHandler.upgradeElement(element, 'MaterialExtAccordion');
    }).to.throw('There must be a header element for each accordion panel.');

    /*
     assert.throws( () => {
     qs('#accordion-container-2').insertAdjacentHTML('beforeend', accordion_without_header);
     const element = qs('#accordion-2');
     componentHandler.upgradeElement(element, 'MaterialExtAccordion');

     }, 'There must be a header element for each accordion panel.');
     */
    removeChilds(container);
  });

  it('interacts with the keyboard', () => {
    const header = qs('#accordion-1 .mdlext-accordion__panel:nth-child(3) .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to panel 3 of 5');

    spyOnKeyboardEvent(header, VK_ARROW_DOWN);
    spyOnKeyboardEvent(header, VK_ARROW_LEFT);
    spyOnKeyboardEvent(header, VK_ARROW_RIGHT);
    spyOnKeyboardEvent(header, VK_ARROW_UP);
    spyOnKeyboardEvent(header, VK_END);
    spyOnKeyboardEvent(header, VK_ENTER);
    spyOnKeyboardEvent(header, VK_HOME);
    spyOnKeyboardEvent(header, VK_SPACE);
    spyOnKeyboardEvent(header, VK_TAB);
  });

  it('emits a click event', () => {
    const header = qs('#accordion-1 .mdlext-accordion__panel .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to panel');

    let spy = sinon.spy();
    header.addEventListener('click', spy);

    // Trigger mouse click
    const evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    header.dispatchEvent(evt);

    assert.isTrue(spy.calledOnce, `Expected "click" to fire once`);
    header.removeEventListener('click', spy);
  });

  it('emits a click event when toggled via enter key', () => {
    const header = qs('#accordion-1 .mdlext-accordion__panel .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to panel');

    let spy = sinon.spy();
    header.addEventListener('click', spy);
    spyOnKeyboardEvent(header, VK_ENTER);
    assert.isTrue(spy.calledOnce, `Expected "click" to fire once`);
    header.removeEventListener('click', spy);
  });

  it('emits a click event when toggled via space key', () => {
    const header = qs('#accordion-1 .mdlext-accordion__panel .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to panel');

    let spy = sinon.spy();
    header.addEventListener('click', spy);
    spyOnKeyboardEvent(header, VK_SPACE);
    assert.isTrue(spy.calledOnce, `Expected "click" to fire once`);
    header.removeEventListener('click', spy);
  });

  it('closes other panels when a new panel opens', () => {
    const header = qs('#accordion-1 .mdlext-accordion__panel:nth-child(4) .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to panel 4 of 5');

    const panel = header.parentNode;
    if(panel.hasAttribute('open')) {
      panel.removeAttribute('open');
      header.removeAttribute('aria-expanded');
    }
    // Trigger click
    const evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    header.dispatchEvent(evt);

    assert.isTrue(panel.hasAttribute('open'));
    assert.isTrue(header.hasAttribute('aria-expanded'));

    const check = qsa('#accordion-1 .mdlext-accordion__panel[open]');
    assert.lengthOf(check, 1);
  });

  function spyOnKeyboardEvent(target, keyCode) {
    let spy = sinon.spy();
    target.addEventListener('keydown', spy);

    var event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode : keyCode
    });
    target.dispatchEvent(event);
    target.removeEventListener(name, spy);
    assert.isTrue(spy.calledOnce, `Expected "keydown" event to fire once for key ${keyCode}`);
  }

});
