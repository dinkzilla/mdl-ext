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
  //MDL_RIPPLE_EFFECT,
  //MDL_RIPPLE_EFFECT_IGNORE_EVENTS
} from '../utils/constants';


//const MENU_BUTTON = 'mdlext-menu-button';
const MENU_BUTTON_MENU = 'mdlext-menu';
const MENU_BUTTON_MENU_ITEM = 'mdlext-menu__item';

const menuFactory = (element, controlledBy) => {

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

  const next = current => {
    // TODO: Check for disabled items
    let n = current.nextElementSibling;
    if(!n) {
      n = current.parentNode.firstElementChild;
    }
    n.focus();
  };

  const prev = current => {
    // TODO: Check for disabled items
    let p = current.previousElementSibling;
    if(!p) {
      p = current.parentNode.lastElementChild;
    }
    p.focus();
  };

  const keyDownHandler = event => {

    const item = event.target.closest(`.${MENU_BUTTON_MENU_ITEM}`);

    switch (event.keyCode) {
      case VK_ARROW_UP:
      case VK_ARROW_LEFT:
        prev(item);
        break;

      case VK_ARROW_DOWN:
      case VK_ARROW_RIGHT:
        next(item);
        break;

      case VK_SPACE:
      case VK_ENTER:
        // Trigger click
        item.dispatchEvent(
          new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          })
        );
        break;

      case VK_ESC:
        close();
        controlledBy.focus();
        break;

      case VK_TAB:
        close();
        return;

      default:
        return;
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const clickHandler = event => {
    close();
    controlledBy.focus();

    if(event.target !== element) {
      const item = event.target.closest(`.${MENU_BUTTON_MENU_ITEM}`);
      addAriaSelected(item);
      controlledBy.dispatchSelect(item);
    }
  };

  const blurHandler = event => {
    if(!(element.contains(event.relatedTarget) || controlledBy.element.contains(event.relatedTarget))) {
      // Find a better solution?
      setTimeout(() => close(), 200);
    }
  };

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
  };

  init();

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
 * The menubutton component
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

    const removeListeners = () => {
      this.element.removeEventListener('keydown', keyDownHandler);
      this.element.removeEventListener('click', clickHandler);
    };

    const addListeners = () => {
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
    removeListeners();
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

  dispatchSelect(item) {
    this.element.dispatchEvent(
      new CustomEvent('select', {
        bubbles: true,
        cancelable: true,
        detail: { source: item }
      })
    );

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
    'use strict';

    // TODO: call this.menuButton_.downgrade();
    this.menuButton_ = null;
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
