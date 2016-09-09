'use strict';

import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import {patchJsDom} from '../testutils/patch-jsdom';
import { removeChildElements } from '../testutils/dom-utils';
import {
  VK_TAB,
  VK_ENTER,
  VK_ESC,
  VK_SPACE,
  VK_ARROW_LEFT,
  VK_ARROW_UP,
  VK_ARROW_RIGHT,
  VK_ARROW_DOWN,
  IS_FOCUSED,
} from '../../src/utils/constants';

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


  const menu_button_with_aria_fixture = `
<div class="mdlext-menu-button mdlext-js-menu-button" role="presentation">
  <button id="menu-example-button" class="mdlext-menu-button__button"
    role="button"
    aria-haspopup="true"
    aria-controls="menu-example-dropdown"
    aria-expanded="true"
    tabindex="0">
    <span class="mdlext-menu-button__label">I'm the label!</span>
  </button>
  <ul id="menu-example-dropdown" class="mdlext-menu-button__menu"
      role="menu"
      aria-labelledby="menu-example-button">
    <li class="mdlext-menu-button__menu__item" role="menuitem">Menu item #1</li>
    <li class="mdlext-menu-button__menu__item" role="menuitem">Menu item #2</li>
    <li class="mdlext-menu-button__menu__item" role="menuitem">Menu item #n</li>
  </ul>
</div> `;

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>menu Button Fixture</title>
</head>
<body>
<main>
  <div id="default-fixture">
    ${menu_button_fixture}
  </div>
  <div id="mount">
  </div>
  <div id="aria-fixture">
    ${menu_button_with_aria_fixture}
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

  describe('General behaviour', () => {

    shouldBehaveLikeAMdlComponent({
      componentName: 'MaterialExtMenuButton',
      componentCssClass: 'mdlext-js-menu-button',
      newComponenrMountNodeSelector: '#mount',
      newComponentHtml: menu_button_fixture
    });

    it('should have public methods available via widget', () => {
      const component = document.querySelector('#default-fixture .mdlext-menu-button');
      const methods = [
        'openMenu',
        'closeMenu',
        'upgrade',
        'selectedMenuItem'
      ];
      methods.forEach( fn => {
        expect(component.MaterialExtMenuButton[fn]).to.be.a('function');
      });
    });

    it('receives a "mdl-componentdowngraded" custom event', () => {
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

  });


  describe('WAI-ARIA', () => {

    it('has appended all the required WAI-ARIA attributes', () => {
      const component = document.querySelector('#default-fixture .mdlext-menu-button');
      assert.isNotNull(component, 'Expected menu button not to be null');

      const button = component.querySelector('.mdlext-menu-button__button');
      assert.isNotNull(button, 'Expected menu button button not to be null');

      const menu = component.querySelector('.mdlext-menu-button__menu');
      assert.isNotNull(menu, 'Expected menu button menu not to be null');

      assert.isTrue(button.hasAttribute('id'), 'Expected menu button button to have an id attribute');
      assert.isTrue(menu.hasAttribute('id'), 'Expected menu button menu to have an id attribute');

      assert.equal(component.getAttribute('role'), 'presentation', 'Expected menu button to have role="presentation"');
      assert.equal(button.getAttribute('role'), 'button', 'Expected menu button button to have role="button"');
      assert.equal(button.getAttribute('aria-haspopup'), 'true', 'Expected menu button button to have role="button"');
      assert.isTrue(button.hasAttribute('aria-controls'), 'Expected menu button button to have attribute "aria-controls"');
      assert.equal(button.getAttribute('aria-controls'), menu.id, 'Menu button button aria-controls has wrong value');

      assert.isTrue(button.hasAttribute('aria-expanded'), 'Expected menu button button to have attribute "aria-expanded"');
      assert.isTrue(button.hasAttribute('tabindex'), 'Expected menu button button to have attribute "tabindex"');

      assert.equal(menu.getAttribute('role'), 'menu', 'Expected menu button menu to have role="menu"');
      assert.isTrue(menu.hasAttribute('aria-labelledby'), 'Expected menu button menu to have an aria-labelledby attribute');
      assert.equal(menu.getAttribute('aria-labelledby'), button.id, 'Menu button menu aria-labelledby has wrong value');

      const menuItems = menu.querySelectorAll('.mdlext-menu-button__menu__item');
      assert.isAtLeast(menuItems.length, 1, 'Expected menu button menu to have at leaset one menu item');

      [...menu.querySelectorAll('.mdlext-menu-button__menu__item')].forEach( menuitem => {
        assert.equal(menuitem.getAttribute('role'), 'menuitem', 'Expected menu button menu item to have role="menuitem"');
      });

    });
  });

  describe('Button interactions', () => {
    let component;
    let button;
    let menu;

    beforeEach( () => {
      component = document.querySelector('#default-fixture .mdlext-menu-button');
      button = component.querySelector('.mdlext-menu-button__button');
      menu = component.querySelector('.mdlext-menu-button__menu');

      [...menu.querySelectorAll('.mdlext-menu-button__menu[aria-selected="true"]')]
        .forEach(selectedItem => selectedItem.removeAttribute('aria-selected'));
    });


    it('sets focus class on component when button is focused', () => {
      dispatchEventEvent(button, 'focus');
      assert.isTrue(component.classList.contains(IS_FOCUSED), `Expected menu button component to have class "${IS_FOCUSED}"`);
    });

    it('removes focus class from component when button is blured', () => {
      dispatchEventEvent(button, 'focus');
      assert.isTrue(component.classList.contains(IS_FOCUSED), `Expected menu button component to have class "${IS_FOCUSED}"`);

      dispatchEventEvent(button, 'blur');
      assert.isFalse(component.classList.contains(IS_FOCUSED), `Expected menu button component to not have class "${IS_FOCUSED}"`);
    });

    it('opens the menu when button is clicked and move focus to the first menu item', () => {
      component.MaterialExtMenuButton.closeMenu();

      // Trigger click event to toggle menu
      dispatchMouseEvent(button, 'click');
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Mouse click: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Mouse click: Expected menu to not have hidden attribute');
      assert.equal(menu.firstElementChild, document.activeElement, 'Mouse click: Expected first menu item to have focus');
    });

    it('opens the menu when button is clicked and move focus to a previously selected menu item', () => {
      component.MaterialExtMenuButton.closeMenu();
      const selectedItem = menu.childNodes[1];
      selectedItem.setAttribute('aria-selected', 'true');

      // Trigger click event to toggle menu
      dispatchMouseEvent(button, 'click');
      const n = component.MaterialExtMenuButton.selectedMenuItem();
      assert.equal(selectedItem, n, 'Mouse click: Expected second menu item to have focus');
    });

    it('opens the menu when Enter or Space key is pressed and move focus to the first menu item', () => {
      component.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_SPACE);
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Space key: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Space key: Expected menu to not have hidden attribute');
      assert.equal(menu.firstElementChild, document.activeElement, 'Space key: Expected first menu item to have focus');

      component.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_ENTER);
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Enter key: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Enter key: Expected menu to not have hidden attribute');
      assert.equal(menu.firstElementChild, document.activeElement, 'Enter key: Expected first menu item to have focus');
    });

    it('opens the menu when Enter or Space key is pressed and move focus to the previously selected menu item', () => {
      component.MaterialExtMenuButton.closeMenu();
      const selectedItem = menu.childNodes[1];
      selectedItem.setAttribute('aria-selected', 'true');

      dispatchKeyDownEvent(button, VK_SPACE);
      assert.equal(selectedItem, component.MaterialExtMenuButton.selectedMenuItem(), 'Space key: Expected second menu item to have focus');

      component.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_ENTER);
      assert.equal(selectedItem, component.MaterialExtMenuButton.selectedMenuItem(), 'Enter key: Expected second menu item to have focus');
    });

    it('opens the menu and move focus to the last menu item when arrow up key is pressed', () => {
      component.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_ARROW_UP);
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Arrow up key: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Arrow up key: Expected menu to not have hidden attribute');
      assert.equal(menu.lastElementChild, document.activeElement, 'Arrow up key: Expected last menu item to have focus');
    });

    it('opens the menu and move focus to the first menu item when arrow down key is pressed', () => {
      component.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_ARROW_DOWN);
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Arrow down key: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Arrow down key: Expected menu to not have hidden attribute');
      assert.equal(menu.firstElementChild, document.activeElement, 'Arrow down key: Expected first menu item to have focus');
    });

    it('closes the menu when tab key is pressed', () => {
      component.MaterialExtMenuButton.openMenu();
      dispatchKeyDownEvent(button, VK_TAB);
      assert.equal(button.getAttribute('aria-expanded'), 'false', 'Tab key: Expected button to have aria-expanded=false');
      assert.isTrue(menu.hasAttribute('hidden'), 'Tab key: Expected menu to have hidden attribute');
    });

    it('closes the menu when esc key is pressed', () => {
      component.MaterialExtMenuButton.openMenu();
      dispatchKeyDownEvent(button, VK_ESC);
      assert.equal(button.getAttribute('aria-expanded'), 'false', 'Tab key: Expected button to have aria-expanded=false');
      assert.isTrue(menu.hasAttribute('hidden'), 'Tab key: Expected menu to have hidden attribute');
    });

  });


  describe('Menu interactions', () => {

  });


  function dispatchKeyDownEvent(target, keyCode, shiftKey=false) {
    target.dispatchEvent(
      new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        keyCode: keyCode,
        shiftKey: shiftKey
      })
    );
  }

  function dispatchEventEvent(target, name) {
    target.dispatchEvent(
      new Event(name, {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  }

  function dispatchMouseEvent(target, name) {
    target.dispatchEvent(
      new MouseEvent(name, {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  }
});
