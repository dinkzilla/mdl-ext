'use strict';

import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import {patchJsDom} from '../testutils/patch-jsdom';
import { removeChildElements } from '../../src/utils/dom-utils';
import {
  VK_TAB,
  VK_ENTER,
  VK_ESC,
  VK_SPACE,
  VK_END,
  VK_HOME,
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

const MENU_BUTTON = 'mdlext-js-menu-button';
const MENU_BUTTON_MENU = 'mdlext-menu';
const MENU_BUTTON_MENU_ITEM = 'mdlext-menu__item';
const MENU_BUTTON_MENU_ITEM_SEPARATOR = 'mdlext-menu__item-separator';

describe('MaterialExtMenuButton', () => {

  const menu_button_fixture = `
<div role="presentation">
  <button class="mdlext-js-menu-button">
    <span class="mdlext-menu-button__label">I'm the label!</span>
  </button>
  <ul class="mdlext-menu">
    <li class="mdlext-menu__item">Menu item #1</li>
    <li class="mdlext-menu__item">Menu item #2</li>
    <li class="mdlext-menu__item">Menu item #n</li>
  </ul>
</div>`;

  const menu_button_with_disabled_item_fixture = `
<div role="presentation">
  <button class="mdlext-js-menu-button">
    <span class="mdlext-menu-button__label">I'm the label!</span>
  </button>
  <ul class="mdlext-menu">
    <li class="mdlext-menu__item">Menu item #1</li>
    <li class="mdlext-menu__item">Menu item #2</li>
    <li class="mdlext-menu__item-separator"></li>
    <li class="mdlext-menu__item" disabled>Menu item #3</li>
    <li class="mdlext-menu__item">Menu item #n</li>
  </ul>
</div>`;

  const disabled_menu_button_fixture = `
<div role="presentation">
  <button class="mdlext-js-menu-button" disabled>
    <span class="mdlext-menu-button__label">I'm disabled!</span>
  </button>
  <ul class="mdlext-menu">
    <li class="mdlext-menu__item">Menu item #1</li>
  </ul>
</div>`;

  const menu_button_with_aria_fixture = `
<button class="mdlext-js-menu-button"
        role="button"
        aria-haspopup="true"
        aria-controls="menu-example-dropdown"
        aria-expanded="false"
        tabindex="0">
  <span class="mdlext-menu-button__label">I'm the label!</span>
</button>
<ul id="menu-example-dropdown"
    class="mdlext-menu"
    role="menu"
    hidden>
  <li class="mdlext-menu__item" role="menuitem">Menu item #1</li>
  <li class="mdlext-menu__item" role="menuitem">Menu item #2</li>
  <li class="mdlext-menu__item" role="menuitem">Menu item #n</li>
</ul>`;

  const menu_button_with_embedded_focusable_element = `
<div role="presentation">
  <div class="mdl-textfield mdl-js-textfield mdlext-js-menu-button">
    <input class="mdl-textfield__input" type="text" readonly>
    <label class="mdl-textfield__label">Text...</label>
  </div>
  <ul class="mdlext-menu">
    <li class="mdlext-menu__item" data-value="twitter">
      <span class="mdlext-menu__item__caption">Item #1</span>
    </li>
    <li class="mdlext-menu__item" data-value="github">
      <span class="mdlext-menu__item__caption">Item #2</span>
    </li>
    <li class="mdlext-menu__item" data-value="github">
      <span class="mdlext-menu__item__caption">Item #3</span>
    </li>
  </ul>
</div>`;

  const menu_button_without_focusable_element = `
<div role="presentation">
  <div class="mdl-textfield mdl-js-textfield mdlext-js-menu-button">
  </div>
  <ul class="mdlext-menu">
    <li class="mdlext-menu__item" data-value="twitter">
      <span class="mdlext-menu__item__caption">Item #1</span>
    </li>
    <li class="mdlext-menu__item" data-value="github">
      <span class="mdlext-menu__item__caption">Item #2</span>
    </li>
    <li class="mdlext-menu__item" data-value="github">
      <span class="mdlext-menu__item__caption">Item #3</span>
    </li>
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
  <div id="default-fixture">
    ${menu_button_fixture}
  </div>
  <div id="aria-fixture">
    ${menu_button_with_aria_fixture}
  </div>
  <div id="mount">
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
      const component = document.querySelector(`#default-fixture .${MENU_BUTTON}`);
      const methods = [
        'openMenu',
        'closeMenu',
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
        const component = container.querySelector(`.${MENU_BUTTON}`);

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
      const button = document.querySelector(`#default-fixture .${MENU_BUTTON}`);
      assert.isNotNull(button, 'Expected menu button not to be null');

      const menu = document.querySelector(`#default-fixture .${MENU_BUTTON_MENU}`);
      assert.isNotNull(menu, 'Expected menu button menu not to be null');

      assert.equal(button.getAttribute('role'), 'button', 'Expected menu button to have role="button"');
      assert.equal(button.getAttribute('aria-haspopup'), 'true', 'Expected menu button to have aria-haspoput="true"');
      assert.isTrue(button.hasAttribute('aria-controls'), 'Expected menu button to have attribute "aria-controls"');
      assert.equal(button.getAttribute('aria-controls'), menu.id, 'Menu button aria-controls has wrong value');

      assert.isTrue(button.hasAttribute('aria-expanded'), 'Expected menu button to have attribute "aria-expanded"');
      assert.equal(menu.getAttribute('role'), 'menu', 'Expected menu button menu to have role="menu"');

      [...menu.querySelectorAll('.mdlext-menu-button__menu__item')].forEach( menuitem => {
        assert.equal(menuitem.getAttribute('role'), 'menuitem', 'Expected menu button menu item to have role="menuitem"');
      });

      const menuItems = menu.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM}`);
      assert.isAtLeast(menuItems.length, 1, 'Expected menu button menu to have at leaset one menu item');
    });

    it('should have "tabindex=0" if the menu button does not have a focusable element', () => {
      const container = document.querySelector('#mount');
      try {
        container.insertAdjacentHTML('beforeend', menu_button_without_focusable_element);
        const button = container.querySelector(`.${MENU_BUTTON}`);
        componentHandler.upgradeElement(button, 'MaterialExtMenuButton');
        assert.isTrue(button.hasAttribute('tabindex'), 'Expected menu button button to not have attribute "tabindex"');
      }
      finally {
        removeChildElements(container);
      }
    });

    it('should not have a tabindex if the menu button is a focusable element, or if an embedded element is focusable', () => {
      let button = document.querySelector(`#default-fixture .${MENU_BUTTON}`);
      assert.isFalse(button.hasAttribute('tabindex'), 'Expected menu button button to not have attribute "tabindex"');

      const container = document.querySelector('#mount');
      try {
        container.insertAdjacentHTML('beforeend', menu_button_with_embedded_focusable_element);
        button = container.querySelector(`.${MENU_BUTTON}`);
        componentHandler.upgradeElement(button, 'MaterialExtMenuButton');
        assert.isFalse(button.hasAttribute('tabindex'), 'Expected menu button button to not have attribute "tabindex"');
      }
      finally {
        removeChildElements(container);
      }
    });

    it('should have a menu separator with role="separator"', () => {
      const container = document.querySelector('#mount');
      try {
        container.insertAdjacentHTML('beforeend', menu_button_with_disabled_item_fixture);
        const button = container.querySelector(`.${MENU_BUTTON}`);
        const menu = container.querySelector(`.${MENU_BUTTON_MENU}`);
        componentHandler.upgradeElement(button, 'MaterialExtMenuButton');

        const separatorItem = menu.querySelector(`.${MENU_BUTTON_MENU_ITEM_SEPARATOR}`);
        assert.isNotNull(separatorItem, `Expected menu item with class ${MENU_BUTTON_MENU_ITEM_SEPARATOR}`);
        assert.equal(separatorItem.getAttribute('role'), 'separator', 'Expected menu item to have role="separator"');
      }
      finally {
        removeChildElements(container);
      }
    });

  });

  describe('Button interactions', () => {
    let button;
    let menu;

    beforeEach( () => {
      button = document.querySelector(`#default-fixture .${MENU_BUTTON}`);
      menu = document.querySelector(`#default-fixture .${MENU_BUTTON_MENU}`);

      [...menu.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM}[aria-selected="true"]`)]
        .forEach(selectedItem => selectedItem.removeAttribute('aria-selected'));
    });

    it('opens the menu when button is clicked and move focus to the first menu item', () => {
      button.MaterialExtMenuButton.closeMenu();

      // Trigger click event to toggle menu
      dispatchMouseEvent(button, 'click');
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Mouse click: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Mouse click: Expected menu to not have hidden attribute');
      assert.equal(menu.firstElementChild, document.activeElement, 'Mouse click: Expected first menu item to have focus');
    });

    it('opens the menu when button is clicked and move focus to a previously selected menu item', () => {
      button.MaterialExtMenuButton.closeMenu();
      const selectedItem = menu.children[1];
      selectedItem.setAttribute('aria-selected', 'true');

      // Trigger click event to toggle menu
      dispatchMouseEvent(button, 'click');
      const n = button.MaterialExtMenuButton.selectedMenuItem();
      assert.equal(selectedItem, n, 'Mouse click: Expected second menu item to have focus');
    });

    it('opens the menu when Enter or Space key is pressed and move focus to the first menu item', () => {
      button.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_SPACE);
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Space key: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Space key: Expected menu to not have hidden attribute');
      assert.equal(menu.firstElementChild, document.activeElement, 'Space key: Expected first menu item to have focus');

      button.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_ENTER);
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Enter key: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Enter key: Expected menu to not have hidden attribute');
      assert.equal(menu.firstElementChild, document.activeElement, 'Enter key: Expected first menu item to have focus');
    });

    it('opens the menu when Enter or Space key is pressed and move focus to the previously selected menu item', () => {
      button.MaterialExtMenuButton.closeMenu();
      const selectedItem = menu.children[1];
      selectedItem.setAttribute('aria-selected', 'true');

      dispatchKeyDownEvent(button, VK_SPACE);
      assert.equal(selectedItem, button.MaterialExtMenuButton.selectedMenuItem(), 'Space key: Expected second menu item to have focus');

      button.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_ENTER);
      assert.equal(selectedItem, button.MaterialExtMenuButton.selectedMenuItem(), 'Enter key: Expected second menu item to have focus');
    });

    it('opens the menu and move focus to the last menu item when arrow up key is pressed', () => {
      button.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_ARROW_UP);
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Arrow up key: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Arrow up key: Expected menu to not have hidden attribute');
      assert.equal(menu.lastElementChild, document.activeElement, 'Arrow up key: Expected last menu item to have focus');
    });

    it('opens the menu and move focus to the first menu item when arrow down key is pressed', () => {
      button.MaterialExtMenuButton.closeMenu();
      dispatchKeyDownEvent(button, VK_ARROW_DOWN);
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Arrow down key: Expected button to have aria-expanded=true');
      assert.isFalse(menu.hasAttribute('hidden'), 'Arrow down key: Expected menu to not have hidden attribute');
      assert.equal(menu.firstElementChild, document.activeElement, 'Arrow down key: Expected first menu item to have focus');
    });

    it('closes the menu when tab key is pressed', () => {
      button.MaterialExtMenuButton.openMenu();
      dispatchKeyDownEvent(button, VK_TAB);
      assert.equal(button.getAttribute('aria-expanded'), 'false', 'Tab key: Expected button to have aria-expanded=false');
      assert.isTrue(menu.hasAttribute('hidden'), 'Tab key: Expected menu to have hidden attribute');
    });

    it('closes the menu when esc key is pressed', () => {
      button.MaterialExtMenuButton.openMenu('first');
      dispatchKeyDownEvent(button, VK_ESC);
      assert.equal(button.getAttribute('aria-expanded'), 'false', 'ESC key: Expected button to have aria-expanded=false');
      assert.isTrue(menu.hasAttribute('hidden'), 'ESC key: Expected menu to have hidden attribute');
    });

    it('does nothing when menu button is disabled', () => {
      const container = document.querySelector('#mount');
      try {
        container.insertAdjacentHTML('beforeend', disabled_menu_button_fixture);
        button = container.querySelector(`.${MENU_BUTTON}`);
        menu = container.querySelector(`.${MENU_BUTTON_MENU}`);
        componentHandler.upgradeElement(button, 'MaterialExtMenuButton');

        button.MaterialExtMenuButton.openMenu();
        assert.equal(menu.hasAttribute('hidden'), true, 'Expected disabled menu button not to open the menu');

        dispatchKeyDownEvent(button, VK_ARROW_DOWN);
        assert.equal(menu.hasAttribute('hidden'), true, 'Expected disabled menu button not to open the menu');

        dispatchKeyDownEvent(button, VK_ARROW_UP);
        assert.equal(menu.hasAttribute('hidden'), true, 'Expected disabled menu button not to open the menu');

        dispatchKeyDownEvent(button, VK_ENTER);
        assert.equal(menu.hasAttribute('hidden'), true, 'Expected disabled menu button not to open the menu');

        dispatchKeyDownEvent(button, VK_SPACE);
        assert.equal(menu.hasAttribute('hidden'), true, 'Expected disabled menu button not to open the menu');

        dispatchMouseEvent(button, 'click');
        assert.equal(menu.hasAttribute('hidden'), true, 'Expected disabled menu button not to open the menu');
      }
      finally {
        removeChildElements(container);
      }
    });

    it('closes the menu when content scroll', () => {
      button.MaterialExtMenuButton.openMenu('first');
      document.body.dispatchEvent(new Event('scroll'));
      assert.equal(button.getAttribute('aria-expanded'), 'false', 'ESC key: Expected button to have aria-expanded=false');
      assert.isTrue(menu.hasAttribute('hidden'), 'ESC key: Expected menu to have hidden attribute');
    });

  });


  describe('Menu interactions', () => {

    let button;
    let menu;

    beforeEach( () => {
      button = document.querySelector(`#default-fixture .${MENU_BUTTON}`);
      menu = document.querySelector(`#default-fixture .${MENU_BUTTON_MENU}`);

      [...menu.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM}[aria-selected="true"]`)]
        .forEach(selectedItem => selectedItem.removeAttribute('aria-selected'));
    });

    it('closes the menu when tab key is pressed', () => {
      button.MaterialExtMenuButton.openMenu();
      const item = menu.children[1];
      dispatchKeyDownEvent(item, VK_TAB);
      assert.isTrue(menu.hasAttribute('hidden'), 'Tab key: Expected menu to have hidden attribute');
    });

    it('closes the menu when ESC key is pressed and moves focus to button', () => {
      button.MaterialExtMenuButton.openMenu();
      const item = menu.children[0];
      dispatchKeyDownEvent(item, VK_ESC);
      assert.isTrue(menu.hasAttribute('hidden'), 'ESC key: Expected menu to have hidden attribute');
      assert.equal(button, document.activeElement, 'ESC: Expected button to have focus');
    });

    it('moves focus to previous menu item when Arrow up or Arrow left key is pressed', () => {
      button.MaterialExtMenuButton.openMenu();
      const selectedItem = menu.children[1];
      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_ARROW_UP);
      assert.equal(menu.children[0], document.activeElement, 'Arrow Up: Expected previous menu item have focus');

      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_ARROW_LEFT);
      assert.equal(menu.children[0], document.activeElement, 'Arrow Left: Expected previous menu item have focus');
    });

    it('moves focus to next menu item when Arrow down or Arrow right key is pressed', () => {
      button.MaterialExtMenuButton.openMenu();
      const selectedItem = menu.children[1];
      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_ARROW_DOWN);
      assert.equal(menu.children[2], document.activeElement, 'Arrow Down: Expected next menu item have focus');

      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_ARROW_RIGHT);
      assert.equal(menu.children[2], document.activeElement, 'Arrow Right: Expected next menu item have focus');
    });

    it('moves focus to first menu item when focus is on last menu item and Arrow down is pressed', () => {
      button.MaterialExtMenuButton.openMenu();
      const selectedItem = menu.children[menu.children.length-1];
      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_ARROW_DOWN);
      assert.equal(menu.firstElementChild, document.activeElement, 'Arrow Down: Expected first menu item have focus');
    });

    it('moves focus to first menu item when Home key is pressed', () => {
      button.MaterialExtMenuButton.openMenu();
      const selectedItem = menu.children[menu.children.length-1];
      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_HOME);
      assert.equal(menu.firstElementChild, document.activeElement, 'Home key: Expected first menu item have focus');
    });

    it('moves focus to last menu item when focus is on first menu item and Arrow up key is pressed', () => {
      button.MaterialExtMenuButton.openMenu();
      const selectedItem = menu.firstElementChild;
      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_ARROW_UP);
      assert.equal(menu.children[menu.children.length-1], document.activeElement, 'Arrow Up: Expected last menu item have focus');
    });

    it('moves focus to last menu item when End key is pressed', () => {
      button.MaterialExtMenuButton.openMenu();
      const selectedItem = menu.firstElementChild;
      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_END);
      assert.equal(menu.children[menu.children.length-1], document.activeElement, 'End key: Expected last menu item have focus');
    });

    it('trigges onclick when Enter or Space key is pressed, then closes the menu', () => {
      const spy = sinon.spy();
      menu.addEventListener('click', spy);

      button.MaterialExtMenuButton.openMenu();
      let selectedItem = menu.children[1];
      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_ENTER);
      assert.equal(menu.children[1].getAttribute('aria-selected'), 'true', 'Enter key: Expected menu item to have aria-selected="true"');
      assert.isTrue(menu.hasAttribute('hidden'), 'ESC key: Expected menu to have hidden attribute');
      assert.isTrue(spy.calledOnce, 'Expected click to fire after Enter key was pressed');

      button.MaterialExtMenuButton.openMenu();
      selectedItem = menu.children[0];
      selectedItem.focus();
      dispatchKeyDownEvent(selectedItem, VK_SPACE);
      assert.equal(menu.children[0].getAttribute('aria-selected'), 'true', 'Space key: Expected menu item to have aria-selected="true"');
      assert.isTrue(menu.hasAttribute('hidden'), 'ESC key: Expected menu to have hidden attribute');
      assert.isTrue(spy.calledTwice, 'Expected click to fire after space key was pressed');

      menu.removeEventListener('blur', spy);
    });

    it('trigges onclick when menu item is clicked, then closes the menu', () => {
      button.MaterialExtMenuButton.openMenu();
      const selectedItem = menu.children[1];
      selectedItem.focus();
      dispatchMouseEvent(selectedItem, 'click');
      assert.equal(menu.children[1].getAttribute('aria-selected'), 'true', 'Mouse cick: Expected menu item to have aria-selected="true"');
      assert.isTrue(menu.hasAttribute('hidden'), 'Mouse click: Expected menu to have hidden attribute');
    });

    it('closes the menu and sets aria-expanded="false" for button and hidden attribute for menu', () => {
      button.MaterialExtMenuButton.openMenu('first');
      const item = menu.children[1];
      item.focus();
      assert.equal(button.getAttribute('aria-expanded'), 'true', 'Beforer closing menu: Expected button to have aria-expanded=false');
      assert.isFalse(menu.hasAttribute('hidden'), 'Before closing menu: Expected menu to have hidden attribute');

      dispatchKeyDownEvent(item, VK_ESC);
      assert.equal(button.getAttribute('aria-expanded'), 'false', 'After closing menu: Expected button to have aria-expanded=false');
      assert.isTrue(menu.hasAttribute('hidden'), 'After closing menu: Expected menu to have hidden attribute');
    });


    it('listens to blur event', () => {
      button.MaterialExtMenuButton.openMenu();

      const spy = sinon.spy();
      menu.addEventListener('blur', spy);

      const selectedItem = menu.children[1];
      dispatchEventEvent(selectedItem, 'blur');

      menu.removeEventListener('blur', spy);
      assert.isTrue(spy.calledOnce, 'Expected blur to fire once');
    });

    it('emits a custom select event when a menu item is selected', () => {
      button.MaterialExtMenuButton.openMenu();
      const selectedItem = menu.children[1];
      selectedItem.focus();

      const spy = sinon.spy();
      button.addEventListener('select', spy);

      const selectListener = event => {
        assert.isDefined(event.detail, 'Expected detail to be defined in event');
        assert.isDefined(event.detail.source, 'Expected detail.source to be defined in event');
        assert.isTrue(event.detail.source.classList.contains('MENU_BUTTON_MENU_ITEM'), `Expected detail.source to have class "${MENU_BUTTON_MENU_ITEM}"`);
      };
      button.addEventListener('select', selectListener);

      try {
        // Trigger click
        dispatchMouseEvent(selectedItem, 'click');
      }
      finally {
        button.removeEventListener('select', spy);
        button.removeEventListener('select', selectListener);
      }

      assert.isTrue(spy.called, 'Expected "select" custom event to fire');
    });

    it('does not emit a custom select event when a disabled menu item is clicked', () => {
      const container = document.querySelector('#mount');
      try {
        container.insertAdjacentHTML('beforeend', menu_button_with_disabled_item_fixture);
        button = container.querySelector(`.${MENU_BUTTON}`);
        menu = container.querySelector(`.${MENU_BUTTON_MENU}`);
        componentHandler.upgradeElement(button, 'MaterialExtMenuButton');

        button.MaterialExtMenuButton.openMenu();
        const disabledItem = menu.children[3];
        disabledItem.focus();

        const spy = sinon.spy();
        button.addEventListener('select', spy);
        try {
          dispatchMouseEvent(disabledItem, 'click');
        }
        finally {
          button.removeEventListener('select', spy);
        }
        assert.isFalse(spy.called, 'Expected "select" custom event NOT to fire for a disabled menu item');
      }
      finally {
        removeChildElements(container);
      }
    });

    it('does not focus a disabled menu item', () => {
      const container = document.querySelector('#mount');
      try {
        container.insertAdjacentHTML('beforeend', menu_button_with_disabled_item_fixture);
        button = container.querySelector(`.${MENU_BUTTON}`);
        menu = container.querySelector(`.${MENU_BUTTON_MENU}`);
        componentHandler.upgradeElement(button, 'MaterialExtMenuButton');

        button.MaterialExtMenuButton.openMenu();
        const disabledItem = menu.children[3];

        let item = menu.children[1];
        item.focus();
        dispatchKeyDownEvent(item, VK_ARROW_DOWN);
        assert.notEqual(disabledItem, document.activeElement, 'Arrow down: Did not expect a disabled menu item have focus');

        item = menu.children[4];
        item.focus();
        dispatchKeyDownEvent(item, VK_ARROW_UP);
        assert.notEqual(disabledItem, document.activeElement, 'Arrow up: Did not expect a disabled menu item have focus');

        menu.children[0].setAttribute('disabled', '');
        dispatchKeyDownEvent(item, VK_HOME);
        assert.notEqual(menu.children[0], document.activeElement, 'Home key: Did not expect a disabled menu item have focus');

        menu.children[menu.children.length-1].setAttribute('disabled', '');
        dispatchKeyDownEvent(item, VK_END);
        assert.notEqual(menu.children[menu.children.length-1], document.activeElement, 'End key: Did not expect a disabled menu item have focus');

        // Only one menu item is enabled
        item = menu.children[1];
        item.focus();
        dispatchKeyDownEvent(item, VK_ARROW_DOWN);
        assert.equal(item, document.activeElement, 'Arrow down: Expected second menu item to have focus');

        // Only one menu item is enabled
        item.focus();
        dispatchKeyDownEvent(item, VK_ARROW_UP);
        assert.equal(item, document.activeElement, 'Arrow up: Expected second menu item to have focus');
      }
      finally {
        removeChildElements(container);
      }
    });

    it('should not focus a menu separator', () => {
      const container = document.querySelector('#mount');
      try {
        container.insertAdjacentHTML('beforeend', menu_button_with_disabled_item_fixture);
        button = container.querySelector(`.${MENU_BUTTON}`);
        menu = container.querySelector(`.${MENU_BUTTON_MENU}`);
        componentHandler.upgradeElement(button, 'MaterialExtMenuButton');

        button.MaterialExtMenuButton.openMenu();
        const separatorItem = menu.children[2];

        let item = menu.children[1];
        item.focus();
        dispatchKeyDownEvent(item, VK_ARROW_DOWN);
        assert.notEqual(separatorItem, document.activeElement, 'Arrow down: Did not expect a menu separator item have focus');

        item = menu.children[4];
        item.focus();
        dispatchKeyDownEvent(item, VK_ARROW_UP);
        assert.notEqual(separatorItem, document.activeElement, 'Arrow up: Did not expect a menu separator item have focus');
      }
      finally {
        removeChildElements(container);
      }
    });

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
