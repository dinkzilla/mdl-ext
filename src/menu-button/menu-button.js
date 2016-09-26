/**
 * @license
 * Copyright 2016 Leif Olsen. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This code is built with Google Material Design Lite,
 * which is Licensed under the Apache License, Version 2.0
 */


/**
 * A menu button is a button that opens a menu. It is often styled as a
 * typical push button with a downward pointing arrow or triangle to hint
 * that activating the button will display a menu.
 */
import { randomString } from '../utils/string-utils';
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
  IS_UPGRADED,
} from '../utils/constants';

import { getScrollParents, tether } from '../utils/dom-utils';

const JS_MENU_BUTTON = 'mdlext-js-menu-button';
const MENU_BUTTON_MENU = 'mdlext-menu';
const MENU_BUTTON_MENU_ITEM = 'mdlext-menu__item';
const MENU_BUTTON_MENU_ITEM_SEPARATOR = 'mdlext-menu__item-separator';

/**
 * Creates the menu controlled by the menu button
 * @param element
 * @return {{element: Element, selected: Element, open: (function(*=)), downgrade: (function())}}
 */
const menuFactory = element => {

  const removeAllSelected = () => {
    [...element.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM}[aria-selected="true"]`)]
      .forEach(selectedItem => selectedItem.removeAttribute('aria-selected'));
  };

  const setSelected = (item, force=false) => {
    if(force || (item && !item.hasAttribute('aria-selected'))) {
      removeAllSelected();
      if(item) {
        item.setAttribute('aria-selected', 'true');
      }
    }
  };

  const getSelected = () => {
    return element.querySelector(`.${MENU_BUTTON_MENU_ITEM}[aria-selected="true"]`);
  };

  const isDisabled = item => item && item.hasAttribute('disabled');

  const isSeparator = item => item && item.classList.contains(MENU_BUTTON_MENU_ITEM_SEPARATOR);

  const focus = item => {
    if(item) {
      item = item.closest(`.${MENU_BUTTON_MENU_ITEM}`);
    }
    if(item) {
      item.focus();
    }
  };

  const nextItem = current => {
    let n = current.nextElementSibling;
    if(!n) {
      n = element.firstElementChild;
    }
    if(!isDisabled(n) && !isSeparator(n)) {
      focus(n);
    }
    else {
      let i = element.children.length;
      while(n && i-- > 0) {
        if(isDisabled(n) || isSeparator(n)) {
          n = n.nextElementSibling;
          if(!n) {
            n = element.firstElementChild;
          }
        }
        else {
          focus(n);
          break;
        }
      }
    }
  };

  const previousItem = current => {
    let p = current.previousElementSibling;
    if(!p) {
      p = element.lastElementChild;
    }
    if(!isDisabled(p) && !isSeparator(p)) {
      focus(p);
    }
    else {
      let i = element.children.length;
      while(p && i-- > 0) {
        if(isDisabled(p) || isSeparator(p)) {
          p = p.previousElementSibling;
          if(!p) {
            p = element.lastElementChild;
          }
        }
        else {
          focus(p);
          break;
        }
      }
    }
  };

  const firstItem = () => {
    const item = element.firstElementChild;
    if(isDisabled(item) || isSeparator(item) ) {
      nextItem(item);
    }
    else {
      focus(item);
    }
  };

  const lastItem = () => {
    const item = element.lastElementChild;
    if(isDisabled(item) || isSeparator(item)) {
      previousItem(item);
    }
    else {
      focus(item);
    }
  };

  const selectItem = item => {
    if(item && !isDisabled(item) && !isSeparator(item)) {
      setSelected(item);
      close(true, item);
    }
  };

  const keyDownHandler = event => {

    const item = event.target.closest(`.${MENU_BUTTON_MENU_ITEM}`);

    switch (event.keyCode) {
      case VK_ARROW_UP:
      case VK_ARROW_LEFT:
        if(item) {
          previousItem(item);
        }
        else {
          firstItem();
        }
        break;

      case VK_ARROW_DOWN:
      case VK_ARROW_RIGHT:
        if(item) {
          nextItem(item);
        }
        else {
          lastItem();
        }
        break;

      case VK_HOME:
        firstItem();
        break;

      case VK_END:
        lastItem();
        break;

      case VK_SPACE:
      case VK_ENTER:
        selectItem(item);
        break;

      case VK_ESC:
        close(true);
        break;

      case VK_TAB:
        // We do not have a "natural" tab order from menu, so the best we can do is to set focus back to the button
        close(true);
        break;

      default:
        return;
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const clickHandler = event => {
    if(event.target !== element) {
      const item = event.target.closest(`.${MENU_BUTTON_MENU_ITEM}`);
      selectItem(item);
    }
  };

  const blurHandler = event => {
    const r = event.relatedTarget;
    if(!element.contains(r)) {
      close(false, undefined, r);
    }
  };

  const open = (controlElement, position='first') => {

    //element.style.visibility = 'hidden';
    element.style['min-width'] = `${Math.max(124, controlElement.getBoundingClientRect().width)}px`;
    element.removeAttribute('hidden');
    tether(controlElement, element);
    //element.style.visibility = 'visible';

    let item;
    switch (position.toLowerCase()) {
      case 'first':
        firstItem();
        break;

      case 'last':
        lastItem();
        break;

      case 'selected':
        item = getSelected();
        if(item && !item.hasAttribute('disabled')) {
          focus(item);
        }
        else {
          firstItem();
        }
        break;
    }
  };

  const close = (forceFocus = false, item = null, relatedTarget = null) => {
    element.dispatchEvent(
      new CustomEvent('_closemenu', {
        bubbles: true,
        cancelable: true,
        detail: { forceFocus: forceFocus, item: item, relatedTarget: relatedTarget }
      })
    );
  };

  const addWaiAria = () => {
    if (!element.hasAttribute('id')) {
      // Generate a random id
      element.id = `menu-button-${randomString()}`;
    }
    element.setAttribute('tabindex', '-1');
    element.setAttribute('role', 'menu');
    element.setAttribute('hidden', '');

    [...element.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM}`)].forEach( menuitem => {
      menuitem.setAttribute('tabindex', '-1');
      menuitem.setAttribute('role', 'menuitem');
    });

    [...element.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM_SEPARATOR}`)].forEach( menuitem => {
      menuitem.setAttribute('role', 'separator');
    });
  };

  const removeListeners = () => {
    element.removeEventListener('keydown', keyDownHandler);
    element.removeEventListener('click', clickHandler);
    element.removeEventListener('blur', blurHandler);
  };

  const addListeners = () => {
    element.addEventListener('keydown', keyDownHandler);
    element.addEventListener('click', clickHandler);
    element.addEventListener('blur', blurHandler, true);
  };

  const init = () => {
    addWaiAria();
    removeListeners();
    addListeners();
    element.classList.add('is-upgraded');
  };

  const downgrade = () => {
    removeListeners();
    element.classList.remove('is-upgraded');
  };

  init();

  return {
    /**
     * Get the menu element
     * @returns {Element} the menu element
     */
    get element() {
      return element;
    },

    /**
     * Set selected menu item
     * @param item
     */
    set selected(item) {
      setSelected(item, true);
    },

    /**
     * Open menu
     * @param {Element} controlElement the element where the menu should be aligned to
     * @param {String} position menuElement item to receive focus after menu element is opened
     */
    open: (controlElement, position='first') => open(controlElement, position),

    /**
     * Downgrade menu
     */
    downgrade: () => downgrade(),
  };
};


/**
 * The menubutton component
 */

class MenuButton {

  constructor(element) {
    this.element = element;
    this.focusElement = undefined;
    this.scrollElements = [];
    this.menu = undefined;
    this.selectedItem = null;
    this.init();
  }

  keyDownHandler = event => {
    if(!this.isDisabled()) {
      switch (event.keyCode) {
        case VK_ARROW_UP:
          this.openMenu('last');
          break;

        case VK_ARROW_DOWN:
          this.openMenu();
          break;

        case VK_SPACE:
        case VK_ENTER:
          this.openMenu('selected');
          break;

        case VK_ESC:
          this.closeMenu();
          break;

        case VK_TAB:
          this.closeMenu();
          return;

        default:
          return;
      }
    }
    event.stopPropagation();
    event.preventDefault();
  };

  clickHandler = () => {
    if(!this.isDisabled()) {
      if(this.element.getAttribute('aria-expanded').toLowerCase() === 'true') {
        this.closeMenu(true);
      }
      else {
        this.openMenu('selected');
      }
    }
  };

  /**
   * Close menu if content is scrolled, window is resized or orientation change
   * @see https://javascriptweblog.wordpress.com/2015/11/02/of-classes-and-arrow-functions-a-cautionary-tale/
   */
  positionChangeHandler = () => {
    this.closeMenu( true );
  };

  closeMenuHandler = event => {

    if(event && event.detail) {
      if(event.detail.item) {
        this.selectedItem = event.detail.item;
        this.dispatchSelect();
      }
      const t = event.detail.relatedTarget;
      if(!t || (t && t.closest(`.${JS_MENU_BUTTON}`) !== this.element)) {
        this.closeMenu(event.detail.forceFocus);
      }
    }
  };

  dispatchSelect() {
    this.element.dispatchEvent(
      new CustomEvent('select', {
        bubbles: true,
        cancelable: true,
        detail: { source: this.selectedItem }
      })
    );
  }

  isDisabled() {
    return this.element.hasAttribute('disabled');
  }

  removeListeners() {
    this.element.removeEventListener('keydown', this.keyDownHandler);
    this.element.removeEventListener('click', this.clickHandler);
  }

  openMenu(position='first') {
    if(!this.isDisabled() && this.menu) {
      // Close the menu if button position change
      this.scrollElements = getScrollParents(this.element);
      this.scrollElements.forEach(el => el.addEventListener('scroll', this.positionChangeHandler));
      window.addEventListener('resize', this.positionChangeHandler);
      window.addEventListener('orientationchange', this.positionChangeHandler);
      this.menu.element.addEventListener('_closemenu', this.closeMenuHandler);

      this.menu.selected = this.selectedItem;
      this.menu.open(this.focusElement, position);
      this.element.setAttribute('aria-expanded', 'true');
    }
  }

  closeMenu(forceFocus = false) {
    if(this.menu) {
      this.scrollElements.forEach(el => el.removeEventListener('scroll', this.positionChangeHandler));
      window.removeEventListener('resize', this.positionChangeHandler);
      window.removeEventListener('orientationchange', this.positionChangeHandler);
      this.menu.element.removeEventListener('_closemenu', this.closeMenuHandler);

      if (forceFocus) {
        this.focus();
      }
      this.element.setAttribute('aria-expanded', 'false');
      this.menu.element.setAttribute('hidden', '');
    }
  }

  focus() {
    if(!this.isDisabled()) {
      this.focusElement.focus();
    }
  }

  init() {
    const addListeners = () => {
      this.element.addEventListener('keydown', this.keyDownHandler);
      this.element.addEventListener('click', this.clickHandler);
    };

    const addWaiAria = () => {
      this.element.setAttribute('role', 'button');
      this.element.setAttribute('aria-expanded', 'false');
      this.element.setAttribute('aria-haspopup', 'true');
    };

    const addFocusElement = () => {
      this.focusElement = this.element.querySelector('input[type="text"]');
      if(!this.focusElement) {
        this.focusElement = this.element;

        if(!(this.focusElement.tagName.toLowerCase() === 'button' || this.focusElement.tagName.toLowerCase() === 'input')) {
          if (!this.focusElement.hasAttribute('tabindex')) {
            this.focusElement.setAttribute('tabindex', '0');
          }
        }
      }
    };

    /*
    const moveMenuToBody = (element) => {
      // To position the menu on top of all other z-indexed elements the menu should be moved to document.body
      //       See: https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
      //const c = document.querySelector(`.${MDL_LAYOUT}`) || document.body;
      document.body.appendChild(element);
      return element;
    };
    */

    const findMenuElement = () => {
      let menuElement;
      const menuElementId = this.element.getAttribute('aria-controls');
      if(menuElementId !== null) {
        menuElement = document.querySelector(`#${menuElementId }`);
      }
      else {
        menuElement = this.element.parentNode.querySelector(`.${MENU_BUTTON_MENU}`);
      }
      return menuElement;
    };

    const addMenu = () => {
      const menuElement = findMenuElement();
      if(menuElement) {
        if(menuElement.componentInstance) {
          this.menu = menuElement.componentInstance;
        }
        else {
          this.menu = menuFactory(menuElement);
          menuElement.componentInstance = this.menu;
        }
        this.element.setAttribute('aria-controls', this.menu.element.id);
      }
    };

    addFocusElement();
    addWaiAria();
    addMenu();
    this.removeListeners();
    addListeners();
  }

  downgrade() {
    if(this.menu) {
      // Do not downgrade menu if there are other buttons sharing this menu
      const related = [...document.querySelectorAll(`.${JS_MENU_BUTTON}[aria-controls="${this.element.getAttribute('aria-controls')}"]`)];
      if(related.filter( c => c !== this.element && c.getAttribute('data-upgraded').indexOf('MaterialExtMenuButton') >= 0).length === 0) {
        this.menu.downgrade();
      }
    }
    this.removeListeners();
  }

}

(function() {
  'use strict';

  /**
   * https://github.com/google/material-design-lite/issues/4205
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  const MaterialExtMenuButton = function MaterialExtMenuButton(element) {
    this.element_ = element;
    this.menuButton_ = null;

    // Initialize instance.
    this.init();
  };
  window['MaterialExtMenuButton'] = MaterialExtMenuButton;


  // Public methods.

  /**
   * Get the menu element controlled by this button, null if no menu is controlled by this button
   * @public
   */
  MaterialExtMenuButton.prototype.getMenuElement = function() {
    return this.menuButton_.menu ? this.menuButton_.menu.element : null;
  };
  MaterialExtMenuButton.prototype['getMenuElement'] = MaterialExtMenuButton.prototype.getMenuElement;

  /**
   * Open menu
   * @public
   * @param {String} position one of "first", "last" or "selected"
   */
  MaterialExtMenuButton.prototype.openMenu = function(position) {
    this.menuButton_.openMenu(position);
  };
  MaterialExtMenuButton.prototype['openMenu'] = MaterialExtMenuButton.prototype.openMenu;

  /**
   * Close menu
   * @public
   */
  MaterialExtMenuButton.prototype.closeMenu = function() {
    this.menuButton_.closeMenu(true);
  };
  MaterialExtMenuButton.prototype['closeMenu'] = MaterialExtMenuButton.prototype.closeMenu;

  /**
   * Get selected menu item
   * @public
   * @returns {Element} The selected menu item or null if no item selected
   */
  MaterialExtMenuButton.prototype.getSelectedMenuItem = function() {
    return this.menuButton_.selectedItem;
  };
  MaterialExtMenuButton.prototype['getSelectedMenuItem'] = MaterialExtMenuButton.prototype.getSelectedMenuItem;


  /**
   * Set (default) selected menu item
   * @param {Element} item
   */
  MaterialExtMenuButton.prototype.setSelectedMenuItem = function(item) {
    this.menuButton_.selectedItem = item;
  };
  MaterialExtMenuButton.prototype['setSelectedMenuItem'] = MaterialExtMenuButton.prototype.setSelectedMenuItem;

  /**
   * Initialize component
   */
  MaterialExtMenuButton.prototype.init = function() {
    if (this.element_) {
      this.menuButton_ = new MenuButton(this.element_);
      this.element_.addEventListener('mdl-componentdowngraded', this.mdlDowngrade_.bind(this));
      this.element_.classList.add(IS_UPGRADED);
    }
  };

  /**
   * Downgrade component
   * E.g remove listeners and clean up resources
   */
  MaterialExtMenuButton.prototype.mdlDowngrade_ = function() {
    this.menuButton_.downgrade();
  };

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  /* eslint no-undef: 0 */
  componentHandler.register({
    constructor: MaterialExtMenuButton,
    classAsString: 'MaterialExtMenuButton',
    cssClass: JS_MENU_BUTTON,
    widget: true
  });
})();
