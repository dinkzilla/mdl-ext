'use strict';

import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import {patchJsDom} from '../testutils/patch-jsdom';
import { removeChildElements } from '../testutils/dom-utils';

const describe = require('mocha').describe;
const before = require('mocha').before;
const after = require('mocha').after;
const it = require('mocha').it;
const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');

import { shouldBehaveLikeAMdlComponent } from '../testutils/shared-component-behaviours';


describe('MaterialExtMenuButton', () => {

  const menu_button_fixture = `
<div class="mdlext-menu-button mdlext-js-menu-button">
  <button class="mdlext-menu-button__button">
    <span class="mdlext-menu-button__label">I'm the label!</span>
  </button>
  <ul class="mdlext-menu-button__menu">
    <li class="mdlext-menu-button__menu__item">Menu item #1</li>
    <li class="mdlext-menu-button__menu__item">Menu item #2</li>
    <li class="mdlext-menu-button__menu__item">Menu item #n</li>
  </ul>
</div>`;

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>menu Button Fixture</title>
</head>
<body>
<main>
  <div>
    ${menu_button_fixture}
  </div>
  <div id='mount'>
  </div>
</main>
</body>
</html>`;

  before ( () => {
    patchJsDom(fixture);

    // Must load MDL after jsdom, see: https://github.com/mochajs/mocha/issues/1722
    requireUncached( 'material-design-lite/material');
    global.componentHandler = window.componentHandler;
    assert.isObject(componentHandler, 'Expected global MDL component handler');

    requireUncached('../../src/menu-button/menu-button');
    assert.isNotNull(window.MaterialExtMenuButton, 'Expected MaterialExtMenuButton not to be null');
    global.MaterialExtMenuButton = window.MaterialExtMenuButton;
  });

  after ( () => {
    jsdomify.destroy();
  });

  shouldBehaveLikeAMdlComponent({
    componentName: 'MaterialExtMenuButton',
    componentCssClass: 'mdlext-js-menu-button',
    newComponenrMountNodeSelector: '#mount',
    newComponentHtml: menu_button_fixture
  });

  it('should have public methods available via widget', () => {
    const component = document.querySelector('.mdlext-menu-button');
    const methods = [
      'upgrade'
    ];
    methods.forEach( fn => {
      expect(component.MaterialExtMenuButton[fn]).to.be.a('function');
    });
  });

  it('fires a "mdl-componentdowngraded" custom event', () => {
    const container = document.querySelector('#mount');
    try {
      container.insertAdjacentHTML('beforeend', menu_button_fixture);
      const component = container.querySelector('.mdlext-menu-button');

      componentHandler.upgradeElement(component, 'MaterialExtMenuButton');

      const spy = sinon.spy();
      component.addEventListener('mdl-componentdowngraded', spy);
      componentHandler.downgradeElements(component);
      assert.isTrue(spy.calledOnce, 'Expected "mdl-componentdowngraded" event to fire after call to "componentHandler.downgradeElements"');
    }
    finally {
      removeChildElements(container);
    }
  });


  it('has required WAI-ARIA attributes', () => {
    const component = document.querySelector('.mdlext-menu-button');
    assert.isNotNull(component, 'Expected menu button not to be null');

    const button = component.querySelector('.mdlext-menu-button__button');
    assert.isNotNull(button, 'Expected menu button button not to be null');

    const menu = component.querySelector('.mdlext-menu-button__menu');
    assert.isNotNull(menu, 'Expected menu button menu not to be null');

    assert.equal(component.getAttribute('role'), 'presentation', 'Expected menu button to have role="presentation"');

    assert.equal(button.getAttribute('role'), 'button', 'Expected menu button button to have role="button"');
    assert.equal(button.getAttribute('aria-haspopup'), 'true', 'Expected menu button button to have role="button"');
    assert.isTrue(button.hasAttribute('aria-controls'), 'Expected menu button button to have attribute "aria-controls"');
    assert.isTrue(button.hasAttribute('aria-expanded'), 'Expected menu button button to have attribute "aria-expanded"');
    assert.isTrue(button.hasAttribute('tabindex'), 'Expected menu button button to have attribute "tabindex"');

    assert.equal(menu.getAttribute('role'), 'menu', 'Expected menu button menu to have role="menu"');

    const menuItems = menu.querySelectorAll('.mdlext-menu-button__menu__item');
    assert.isAtLeast(menuItems.length, 1, 'Expected menu button menu to have at leaset one menu item');

    [...menu.querySelectorAll('.mdlext-menu-button__menu__item')].forEach( menuitem => {
      assert.equal(menuitem.getAttribute('role'), 'menuitem', 'Expected menu button menu item to have role="menuitem"');
    });

  });

});
