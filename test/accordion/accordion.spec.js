'use strict';

import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { removeChilds } from '../testutils/domHelpers';

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
          <div class="mdlext-accordion__header__transform">
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
          <div class="mdlext-accordion__header__transform">
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
          <div class="mdlext-accordion__header__transform">
            <h5>Section #3</h5>
          </div>
        </header>
        <section class="mdlext-accordion__panel__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section>
      </li>
      <li class="mdlext-accordion__panel">
        <header class="mdlext-accordion__panel__header">
          <div class="mdlext-accordion__header__transform">
            <h5>Fourth section</h5>
          </div>
        </header>
        <section class="mdlext-accordion__panel__content">
          <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel.</p>
        </section>
      </li>
      <li class="mdlext-accordion__panel">
        <header class="mdlext-accordion__panel__header">
          <div class="mdlext-accordion__header__transform">
            <h5>Fifth</h5>
          </div>
        </header>
        <section class="mdlext-accordion__panel__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique eget augue eget gravida.</p>
        </section>
      </li>
    </ul>
  </div>

  <ul id="multi-accordion" class="mdlext-accordion mdlext-js-accordion" aria-multiselectable="true">
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__header__transform">
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
        <div class="mdlext-accordion__header__transform">
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
        <div class="mdlext-accordion__header__transform">
          <h5>Section #3</h5>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>
    </li>
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__header__transform">
          <h5>Fourth section</h5>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel.</p>
      </section>
    </li>
    <li id="disabled-panel" class="mdlext-accordion__panel" disabled>
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__header__transform">
          <h5>Fifth</h5>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique eget augue eget gravida.</p>
      </section>
    </li>
  </ul>  
  
  <div id="accordion-container-2">
  </div>
</div>
</body>
</html>`;

  const accordion_fragment = `
<ul id="accordion-2" class="mdlext-accordion mdlext-js-accordion">
  <li class="mdlext-accordion__panel" open >
    <header class="mdlext-accordion__panel__header">
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

  const accordion_with_ripple_fragment = `
<ul id="accordion-4" class="mdlext-accordion mdlext-js-accordion mdl-js-ripple-effect">
  <li class="mdlext-accordion__panel" open >
    <header class="mdlext-accordion__panel__header">
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
    jsdomify.destroy();
  });

  it('is globally available', () => {
    assert.isFunction(window['MaterialExtAccordion'], 'Expected MaterialExtAccordion to be globally available');
  });

  it('upgrades successfully', () => {
    const element = document.querySelector('#accordion-1');
    assert.isTrue(element.classList.contains('is-upgraded'), 'Expected accordion to upgrade');

    const dataUpgraded = element.getAttribute('data-upgraded');
    assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
    assert.isAtLeast(dataUpgraded.indexOf('MaterialExtAccordion'), 0, 'Expected "data-upgraded" attribute to contain "MaterialExtAccordion');
  });

  it('has role="tablist"', () => {
    [...document.querySelectorAll('.mdlext-accordion')].forEach( accordion => {
      assert.equal(accordion.getAttribute('role'), 'tablist');
    });
  });

  it('has panels with role="tabpanel"', () => {
    [...document.querySelectorAll('.mdlext-accordion__panel')].forEach( panel => {
      assert.equal(panel.getAttribute('role'), 'tabpanel');
    });
  });

  it('has headers with role="tab"', () => {
    [...document.querySelectorAll('.mdlext-accordion__panel__header')].forEach( header => {
      assert.equal(header.getAttribute('role'), 'tab');
    });
  });

  it('has headers with anchor', () => {
    [...document.querySelectorAll('.mdlext-accordion__panel__header')].forEach( header => {
      assert.isNotNull(header.querySelector('a'), 'Expected header to have an anchor element');
    });
  });

  it('should have attribute "open" and a corresponding header with attribute "aria-expanded"', () => {
    const panel = document.querySelector('#accordion-1 .mdlext-accordion__panel[open]');
    assert.isNotNull(panel, 'Expected panel with attribute "open"');

    const title = [...panel.children].find( n => {
      n.classList.contains('mdlext-accordion__panel__header') && n.hasAttribute('aria-expanded');
    });
    assert.isNotNull(title, 'Expected header with attribute "aria-expanded"');
  });

  it('upgrades successfully when a new component is appended to the DOM', () => {
    const container = document.querySelector('#accordion-container-2');
    try {
      container.insertAdjacentHTML('beforeend', accordion_fragment);
      const element = document.querySelector('#accordion-2');

      assert.isFalse(element.classList.contains('is-upgraded'), 'Expected class "is-upgraded" to exist after upgrade');
      componentHandler.upgradeElement(element, 'MaterialExtAccordion');
      assert.isTrue(element.classList.contains('is-upgraded'), 'Expected accordion to upgrade');

      const dataUpgraded = element.getAttribute('data-upgraded');
      assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
      assert.isAtLeast(dataUpgraded.indexOf('MaterialExtAccordion'), 0, 'Expected "data-upgraded" attribute to contain "MaterialExtAccordion');
    }
    finally {
      removeChilds(container);
    }
  });

  it('downgrades successfully', () => {
    const container = document.querySelector('#accordion-container-2');

    try {
      container.insertAdjacentHTML('beforeend', accordion_fragment);
      const element = document.querySelector('#accordion-2');

      componentHandler.upgradeElement(element, 'MaterialExtAccordion');
      assert.isTrue(element.classList.contains('is-upgraded'), 'Expected accordion to upgrade before downgrade');
      expect(element.getAttribute('data-upgraded')).to.include('MaterialExtAccordion');

      componentHandler.downgradeElements(element);
      expect(element.getAttribute('data-upgraded')).to.not.include('MaterialExtAccordion');
    }
    finally {
      removeChilds(container);
    }
  });

  it('should be a widget', () => {
    const container = document.querySelector('#accordion-container-2');
    try {
      container.insertAdjacentHTML('beforeend', accordion_fragment);
      const element = document.querySelector('#accordion-2');
      componentHandler.upgradeElement(element, 'MaterialExtAccordion');
      expect(element.MaterialExtAccordion).to.be.a('object');
    }
    finally {
      removeChilds(container);
    }
  });

  it('has ripple effect', () => {
    const container = document.querySelector('#accordion-container-2');
    try {
      container.insertAdjacentHTML('beforeend', accordion_with_ripple_fragment);
      const element = document.querySelector('#accordion-4');
      componentHandler.upgradeDom();

      const dataUpgraded = element.getAttribute('data-upgraded');
      assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
      assert.isAtLeast(dataUpgraded.indexOf('MaterialRipple'), 0, 'Expected "data-upgraded" attribute to contain "MaterialRipple');

      [...document.querySelectorAll('#accordion-4 .mdlext-accordion__panel__header a')].forEach( a => {
        const dataUpgraded = a.getAttribute('data-upgraded');
        assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
        assert.isAtLeast(dataUpgraded.indexOf('MaterialRipple'), 0, 'Expected "data-upgraded" attribute to contain "MaterialRipple');
      });
    }
    finally {
      removeChilds(container);
    }
  });

  it('throws an error if header is missing', () => {
    const container = document.querySelector('#accordion-container-2');
    container.insertAdjacentHTML('beforeend', accordion_wo_header_fragment);
    const element = document.querySelector('#accordion-3');
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

  it('header interacts with the keyboard', () => {
    const header = document.querySelector('#accordion-1 .mdlext-accordion__panel:nth-child(3) .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to panel 3 of 5');

    spyOnKeyboardEvent(header, VK_ARROW_DOWN);
    spyOnKeyboardEvent(header, VK_ARROW_UP);
    spyOnKeyboardEvent(header, VK_ARROW_LEFT);
    spyOnKeyboardEvent(header, VK_ARROW_RIGHT);
    spyOnKeyboardEvent(header, VK_ENTER);
    spyOnKeyboardEvent(header, VK_SPACE);
    spyOnKeyboardEvent(header, VK_TAB);
    spyOnKeyboardEvent(header, VK_TAB, true);
    spyOnKeyboardEvent(header, VK_END);
    spyOnKeyboardEvent(header, VK_HOME);
  });

  it('should emit a click event from header', () => {
    const header = document.querySelector('#accordion-1 .mdlext-accordion__panel .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to header');

    const spy = sinon.spy();
    header.addEventListener('click', spy);

    // Trigger mouse click
    const evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    header.dispatchEvent(evt);

    assert.isTrue(spy.calledOnce, 'Expected "click" to fire once');
    header.removeEventListener('click', spy);
  });

  it('should emit a click event from header when toggled via enter key', () => {
    const header = document.querySelector('#accordion-1 .mdlext-accordion__panel .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to header');

    const spy = sinon.spy();
    header.addEventListener('click', spy);
    spyOnKeyboardEvent(header, VK_ENTER);
    assert.isTrue(spy.calledOnce, 'Expected "click" to fire once');
    header.removeEventListener('click', spy);
  });

  it('should emit a click event from header when toggled via space key', () => {
    const header = document.querySelector('#accordion-1 .mdlext-accordion__panel .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to header');

    const spy = sinon.spy();
    header.addEventListener('click', spy);
    spyOnKeyboardEvent(header, VK_SPACE);
    assert.isTrue(spy.calledOnce, 'Expected "click" to fire once');
    header.removeEventListener('click', spy);
  });

  it('closes other panels when a new panel opens', () => {
    const header = document.querySelector('#accordion-1 .mdlext-accordion__panel:nth-child(4) .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to header in panel 4 of 5');

    const panel = header.parentNode;
    if(panel.hasAttribute('open')) {
      panel.removeAttribute('open');
      header.removeAttribute('aria-expanded');
      header.removeAttribute('aria-selected');

      // Let another header have 'aria-selected' attribute
      const header2 = document.querySelector('#accordion-1 .mdlext-accordion__panel:nth-child(1) .mdlext-accordion__panel__header');
      header.setAttribute('aria-selected');

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
    assert.isTrue(header.hasAttribute('aria-selected'));

    let check = document.querySelectorAll('#accordion-1 .mdlext-accordion__panel[open]');
    assert.lengthOf(check, 1, 'Expected only one panel with state "open"');

    check = document.querySelectorAll('#accordion-1 .mdlext-accordion__panel__header[aria-selected]');
    assert.lengthOf(check, 1, 'Expected only one header with state "aria-selected"');

    const n = document.querySelectorAll('#accordion-1 .mdlext-accordion__panel__header');
    check = document.querySelectorAll('#accordion-1 .mdlext-accordion__panel__header[aria-hidden]');
    assert.equal(n.length-check.length, 1, `Expected ${check.length} of ${n.length} headers  to have attribute "aria-hidden"`);
  });

  it('emits a custom "toggle" event with "detail.state" and "detail.source" defined when a panel opens or closes', () => {
    const accordion = document.querySelector('#accordion-1');
    assert.isNotNull(accordion, 'Expected handle to accordion');

    const header = document.querySelector('#accordion-1 .mdlext-accordion__panel:nth-child(3) .mdlext-accordion__panel__header');
    assert.isNotNull(header, 'Expected handle to header in panel 3 of 5');

    const spy = sinon.spy();
    accordion.addEventListener('toggle', spy);

    accordion.addEventListener('toggle', event => {
      assert.isDefined(event.detail, 'Expected detail to be defined in event');
      assert.isDefined(event.detail.state, 'Expected detail.state to be defined in event');
      assert.isDefined(event.detail.source, 'Expected detail.source to be defined in event');
    });

    try {
      // Trigger click on a header
      const evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      header.dispatchEvent(evt);
    }
    finally {
      accordion.removeEventListener('toggle', spy);
    }
    assert.isTrue(spy.called, 'Expected "toggle" event to fire at least once');
  });


  it('can have multiple panels open simultaneously when aria-multiselectable="true"', () => {
    const accordion = document.querySelector('#multi-accordion');
    assert.isNotNull(accordion, 'Expected handle to accordion');

    const header1 = document.querySelector('#multi-accordion .mdlext-accordion__panel:nth-child(1) .mdlext-accordion__panel__header');
    assert.isNotNull(header1, 'Expected handle to header in panel 1');

    // Trigger click
    header1.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    const header2 = document.querySelector('#multi-accordion .mdlext-accordion__panel:nth-child(2) .mdlext-accordion__panel__header');
    assert.isNotNull(header2, 'Expected handle to header in panel 3');

    header2.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    const header3 = document.querySelector('#multi-accordion .mdlext-accordion__panel:nth-child(3) .mdlext-accordion__panel__header');
    assert.isNotNull(header3, 'Expected handle to header in panel 3');

    header3.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    const check = document.querySelectorAll('#multi-accordion .mdlext-accordion__panel[open]');
    expect(check).to.have.length.of.at.least(2);
  });

  it('should toggle using command custom event', () => {
    const accordion = document.querySelector('#multi-accordion');
    assert.isNotNull(accordion, 'Expected handle to accordion');

    const panel = document.querySelector('#multi-accordion .mdlext-accordion__panel:nth-child(2)');
    assert.isNotNull(panel, 'Expected handle to accordion panel');

    const isOpen = panel.hasAttribute('open');
    let ev = new CustomEvent('command', { detail: { action : 'toggle', target: panel } } );
    accordion.dispatchEvent(ev);

    assert.notEqual(panel.hasAttribute('open'), isOpen, 'Expected panel to toggle');

    ev = new CustomEvent('command', { detail: { action : 'toggle', target: panel } } );
    accordion.dispatchEvent(ev);
    assert.equal(panel.hasAttribute('open'), isOpen, 'Expected panel to toggle');
  });

  it('should not open a panel having attribute "disabled"', () => {
    const accordion = document.querySelector('#multi-accordion');
    assert.isNotNull(accordion, 'Expected handle to accordion');

    const panel = document.querySelector('#disabled-panel');
    assert.isNotNull(panel, 'Expected handle to accordion panel');
    panel.setAttribute('disabled', '');

    const ev = new CustomEvent('command', { detail: { action : 'open', target: panel } } );
    accordion.dispatchEvent(ev);

    assert.isFalse(panel.hasAttribute('open'), 'Did not expect disabled panel to open');
  });

  it('should expand all panels not having attribute "disabled"', () => {
    const accordion = document.querySelector('#multi-accordion');
    assert.isNotNull(accordion, 'Expected handle to accordion');

    // First close all panels
    let ev = new CustomEvent('command', { detail: { action : 'close' } } );
    accordion.dispatchEvent(ev);

    let openPanels = document.querySelectorAll('#multi-accordion .mdlext-accordion__panel[open]');
    assert.equal(openPanels.length, 0, 'Expected all panels to be closed');

    // Open all panels not having attribute "disabled"
    ev = new CustomEvent('command', { detail: { action : 'open' } } );
    accordion.dispatchEvent(ev);

    const allPanels = document.querySelectorAll('#multi-accordion .mdlext-accordion__panel');
    openPanels = document.querySelectorAll('#multi-accordion .mdlext-accordion__panel[open]');
    assert.equal(allPanels.length - openPanels.length, 1, `Expected ${openPanels.length} to have attribute "open"`);
  });


  function spyOnKeyboardEvent(target, keyCode, shiftKey=false) {
    const spy = sinon.spy();
    target.addEventListener('keydown', spy);

    try {
      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        keyCode: keyCode,
        shiftKey: shiftKey
      });
      target.dispatchEvent(event);
    }
    finally {
      target.removeEventListener('keydown', spy);
    }
    assert.isTrue(spy.calledOnce, `Expected "keydown" event to fire once for key ${keyCode}`);
  }

});
