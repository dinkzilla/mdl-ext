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
  VK_ARROW_LEFT,
  VK_ARROW_UP,
  VK_ARROW_RIGHT,
  VK_ARROW_DOWN,
  IS_UPGRADED,
  MDL_RIPPLE_EFFECT,
  MDL_RIPPLE_EFFECT_IGNORE_EVENTS
} from '../utils/constants';


//const MENU_BUTTON = 'mdlext-menu-button';
const MENU_BUTTON_BUTTON = 'mdlext-menu-button__button';
const MENU_BUTTON_MENU = 'mdlext-menu-button__menu';
const MENU_BUTTON_MENU_ITEM = 'mdlext-menu-button__menu__item';

const menuFactory = (element, controlledBy) => {

  const addWaiAria = () => {

    if (!element.hasAttribute('id')) {
      element.id = `button-menu-${randomString()}`;
    }
    element.setAttribute('tabindex', '-1');
    element.setAttribute('role', 'menu');
    element.setAttribute('hidden', '');

    [...element.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM}`)].forEach( menuitem => {
      menuitem.setAttribute('tabindex', '-1');
      menuitem.setAttribute('role', 'menuitem');
    });

  };

  const removeAllAriaSelected = () => {
    [...element.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM}[aria-selected="true"]`)]
      .forEach(selectedItem => selectedItem.removeAttribute('aria-selected'));
  };

  const addAriaSelected = item => {
    if( item && !item.hasAttribute('aria-selected') ) {
      removeAllAriaSelected();
      item.setAttribute('aria-selected', 'true');
    }
  };

  const getSelected = () => {
    return element.querySelector(`.${MENU_BUTTON_MENU_ITEM}[aria-selected="true"]`);
  };

  const open = (position='first') => {
    element.removeAttribute('hidden');
    let item = null;
    switch (position.toLowerCase()) {
      case 'first':
        item = element.firstElementChild;
        break;
      case 'last':
        item = element.lastElementChild;
        break;
      case 'selected':
        item = getSelected();
        if(!item) {
          open('first');
          return;
        }
        break;
    }
    if(item) {
      item.focus();
    }
  };

  const close = () => {
    element.setAttribute('hidden', '');
  };

  const keyDownHandler = event => {
    let item = document.activeElement;

    switch (event.keyCode) {
      case VK_ARROW_UP:
      case VK_ARROW_LEFT:
        item = item.previousElementSibling;
        if(!item) {
          item = element.lastElementChild;
        }
        item.focus();
        break;

      case VK_ARROW_DOWN:
      case VK_ARROW_RIGHT:
        item = item.nextElementSibling;
        if(!item) {
          item = element.firstElementChild;
        }
        item.focus();
        break;

      case VK_SPACE:
      case VK_ENTER:
        addAriaSelected(item);
        close();
        controlledBy.focus();
        // TODO: trigger onchange
        break;

      case VK_ESC:
        removeAllAriaSelected();
        close();
        controlledBy.focus();
        break;

      case VK_TAB:
        removeAllAriaSelected();
        close();
        return;

      default:
        return;
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const clickHandler = event => {
    if(event.target !== element) {
      addAriaSelected(event.target);
      // TODO: trigger onchange
    }
    close();
    controlledBy.focus();
  };

  const blurHandler = event => {
    if(!(element.contains(event.relatedTarget) || controlledBy.element.contains(event.relatedTarget))) {
      // Find a better solution?
      setTimeout(() => close(), 200);
    }
  };

  const addListeners = () => {
    element.removeEventListener('keydown', keyDownHandler);
    element.removeEventListener('click', clickHandler);
    element.removeEventListener('blur', blurHandler);

    element.addEventListener('keydown', keyDownHandler);
    element.addEventListener('click', clickHandler);
    element.addEventListener('blur', blurHandler, true);
  };

  addWaiAria();
  addListeners();

  return {
    element: element,
    controlledBy: controlledBy,

    /**
     * Get the selected menu item
     * @returns {Element} the menu item having attribute aria-selected="true", or null ...
     */
    get selected() {
      return getSelected();
    },

    /**
     * Open menu
     * @param position menuElement item to receive focus after element is opened
     */
    open: (position='first') => open(position),

    /**
     * Closes the menu
     */
    close: () => close(),
  };
};


/**
 *
 */

class MenuButton {

  constructor(element) {
    this.element = element;
    this.menu = undefined;

    this.init();
  }

  init() {
    const keyDownHandler = event => {

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

      event.stopPropagation();
      event.preventDefault();
    };

    const clickHandler = () => {
      this.openMenu('selected');
    };

    const addListeners = () => {
      this.element.removeEventListener('keydown', keyDownHandler);
      this.element.removeEventListener('click', clickHandler);

      this.element.addEventListener('keydown', keyDownHandler);
      this.element.addEventListener('click', clickHandler);
    };

    const addWaiAria = () => {
      if(!this.element.hasAttribute('tabindex')) {
        this.element.setAttribute('tabindex', '0');
      }
      this.element.setAttribute('role', 'button');
      this.element.setAttribute('aria-expanded', 'false');
      this.element.setAttribute('aria-haspopup', 'true');
    };

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
      this.menu = menuFactory(menuElement, this);
      this.element.setAttribute('aria-controls', this.menu.element.id);
    };

    addWaiAria();
    addMenu();
    addListeners();
  }

  openMenu(position='first') {
    this.element.setAttribute('aria-expanded', 'true');
    this.menu.open(position);
  }

  closeMenu() {
    this.element.setAttribute('aria-expanded', 'false');
    this.menu.close();
  }

  focus() {
    this.element.focus();
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
    this.button_ = null;
    this.menuButton_ = null;

    // Initialize instance.
    this.init();
  };
  window['MaterialExtMenuButton'] = MaterialExtMenuButton;


  // Public methods.

  /**
   * Open menu
   * @public
   */
  MaterialExtMenuButton.prototype.openMenu = function(position='first') {
    this.menuButton_.openMenu(position);
  };
  MaterialExtMenuButton.prototype['openMenu'] = MaterialExtMenuButton.prototype.openMenu;

  /**
   * Close menu
   * @public
   */
  MaterialExtMenuButton.prototype.closeMenu = function() {
    this.menuButton_.closeMenu();
  };
  MaterialExtMenuButton.prototype['closeMenu'] = MaterialExtMenuButton.prototype.closeMenu;

  /**
   * Get selected menu item
   * @public
   * @returns {Element} The selected menu item or null if no item selected
   */
  MaterialExtMenuButton.prototype.selectedMenuItem = function() {
    return this.menuButton_.menu.selected;
  };
  MaterialExtMenuButton.prototype['selectedMenuItem'] = MaterialExtMenuButton.prototype.selectedMenuItem;

  /**
   * Initialize component
   */
  MaterialExtMenuButton.prototype.init = function() {

    if (this.element_) {
      // Do the init required for this component to work

      if (this.element_.classList.contains(MDL_RIPPLE_EFFECT)) {
        this.element_.classList.add(MDL_RIPPLE_EFFECT_IGNORE_EVENTS);
      }

      this.element_.setAttribute('role', 'presentation');
      this.button_ = this.element_.querySelector(`.${MENU_BUTTON_BUTTON}`);
      this.menuButton_ = new MenuButton(this.button_);

      // Listen to 'mdl-componentdowngraded' event
      this.element_.addEventListener('mdl-componentdowngraded', this.mdlDowngrade_.bind(this));

      // Set upgraded flag
      this.element_.classList.add(IS_UPGRADED);
    }
  };

  /**
   * Downgrade component
   * E.g remove listeners and clean up resources
   */
  MaterialExtMenuButton.prototype.mdlDowngrade_ = function() {
    'use strict';
    this.button_ = null;
    this.menuButton_ = null;
    this.element_ = null;
  };

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  /* eslint no-undef: 0 */
  componentHandler.register({
    constructor: MaterialExtMenuButton,
    classAsString: 'MaterialExtMenuButton',
    cssClass: 'mdlext-js-menu-button'
  });
})();
