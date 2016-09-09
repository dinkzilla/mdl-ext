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
  IS_FOCUSED,
  IS_UPGRADED,
  MDL_RIPPLE_EFFECT,
  MDL_RIPPLE_EFFECT_IGNORE_EVENTS
} from '../utils/constants';

(function() {
  'use strict';

  //const MENU_BUTTON = 'mdlext-menu-button';
  const MENU_BUTTON_BUTTON = 'mdlext-menu-button__button';
  const MENU_BUTTON_MENU = 'mdlext-menu-button__menu';
  const MENU_BUTTON_MENU_ITEM = 'mdlext-menu-button__menu__item';


  /**
   * https://github.com/google/material-design-lite/issues/4205
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  const MaterialExtMenuButton = function MaterialExtMenuButton(element) {
    this.element_ = element;
    this.button_ = null;
    this.menu_ = null;

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
    this.button_.setAttribute('aria-expanded', 'true');
    this.menu_.removeAttribute('hidden');

    let menuItem = null;
    switch (position.toLowerCase()) {
      case 'first':
        menuItem = this.menu_.firstElementChild;
        break;
      case 'last':
        menuItem = this.menu_.lastElementChild;
        break;
      case 'selected':
        menuItem = this.menu_.querySelector(`.${MENU_BUTTON_MENU_ITEM}[aria-selected="true"]`);
        if(!menuItem) {
          this.openMenu('first');
          return;
        }
        break;
    }

    if(menuItem) {
      menuItem.focus();
    }
  };
  MaterialExtMenuButton.prototype['openMenu'] = MaterialExtMenuButton.prototype.openMenu;

  /**
   * Close menu
   * @public
   */
  MaterialExtMenuButton.prototype.closeMenu = function() {
    this.button_.setAttribute('aria-expanded', 'false');
    this.menu_.setAttribute('hidden', '');
  };
  MaterialExtMenuButton.prototype['closeMenu'] = MaterialExtMenuButton.prototype.closeMenu;

  /**
   * Get selected menu item
   * @public
   * @returns {Element} The selected menu item or null if no item selected
   */
  MaterialExtMenuButton.prototype.selectedMenuItem = function() {
    return this.menu_.querySelector(`.${MENU_BUTTON_MENU_ITEM}[aria-selected="true"]`);
  };
  MaterialExtMenuButton.prototype['selectedMenuItem'] = MaterialExtMenuButton.prototype.selectedMenuItem;

  /**
   * Upgrades component
   * Call this method if you add/remove elements to the component during runtime
   * @public
   */
  MaterialExtMenuButton.prototype.upgrade = function() {

    const addWaiAria = () => {

      let buttonId;
      if (!this.button_.hasAttribute('id')) {
        buttonId = `menu-button-button-${randomString()}`;
        this.button_.id = buttonId;
      }
      else {
        buttonId = this.button_.id;
      }

      if(!this.button_.hasAttribute('tabindex')) {
        this.button_.setAttribute('tabindex', '0');
      }

      this.button_.setAttribute('role', 'button');

      if(!this.button_.hasAttribute('aria-expanded')) {
        this.button_.setAttribute('aria-expanded', 'false');
      }

      if(this.menu_) {
        this.button_.setAttribute('aria-haspopup', 'true');

        let menuId;
        if (!this.menu_.hasAttribute('id')) {
          menuId = `menu-button-menu-${randomString()}`;
          this.menu_.id = menuId;
        }
        else {
          menuId = this.menu_.id;
        }

        this.button_.setAttribute('aria-controls', menuId);
        this.menu_.setAttribute('aria-labelledby', buttonId);

        this.menu_.setAttribute('tabindex', '-1');
        this.menu_.setAttribute('role', 'menu');

        if (this.button_.getAttribute('aria-expanded').toLowerCase() === 'false') {
          this.menu_.setAttribute('hidden', '');
        }
        else {
          this.menu_.removeAttribute('hidden');
        }

        [...this.menu_.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM}`)].forEach( menuitem => {
          menuitem.setAttribute('tabindex', '-1');
          menuitem.setAttribute('role', 'menuitem');
        });
      }
      else {
        this.button_.setAttribute('aria-haspopup', 'false');
      }
    };

    const buttonKeyDownHandler = event => {

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

    const buttonFocusHandler = () => {
      this.element_.classList.add(IS_FOCUSED);
    };

    const buttonBlurHandler = () => {
      this.element_.classList.remove(IS_FOCUSED);
    };

    const buttonClickHandler = () => {
      this.openMenu('selected');
    };

    // ----------------------------------

    const removeSelected = () => {
      [...this.menu_.querySelectorAll(`.${MENU_BUTTON_MENU_ITEM}[aria-selected="true"]`)]
        .forEach(selectedItem => selectedItem.removeAttribute('aria-selected'));
    };

    const addSelected = item => {
      if( item && !item.hasAttribute('aria-selected') ) {
        removeSelected();
        item.setAttribute('aria-selected', 'true');
      }
    };

    const menuKeyDownHandler = event => {
      let n = document.activeElement;

      switch (event.keyCode) {
        case VK_ARROW_UP:
        case VK_ARROW_LEFT:
          n = n.previousElementSibling;
          if(!n) {
            n = this.menu_.lastElementChild;
          }
          n.focus();
          break;

        case VK_ARROW_DOWN:
        case VK_ARROW_RIGHT:
          n = n.nextElementSibling;
          if(!n) {
            n = this.menu_.firstElementChild;
          }
          n.focus();
          break;

        case VK_SPACE:
        case VK_ENTER:
          addSelected(n);
          this.closeMenu();
          this.button_.focus();
          // TODO: trigger onchange
          break;

        case VK_ESC:
          removeSelected();
          this.closeMenu();
          this.button_.focus();
          break;

        case VK_TAB:
          removeSelected();
          this.closeMenu();
          return;

        default:
          return;
      }
      event.stopPropagation();
      event.preventDefault();
    };

    const menuClickHandler = (event) => {
      if(event.target !== this.menu_) {
        addSelected(event.target);
        // TODO: trigger onchange
      }
      this.closeMenu();
      this.button_.focus();
    };

    const menuFocusHandler =() => {
      this.element_.classList.add(IS_FOCUSED);
    };

    const menuBlurHandler = event => {
      if(!(this.menu_.contains(event.relatedTarget) || this.button_.contains(event.relatedTarget))) {
        // Find a better solution
        this.element_.classList.remove(IS_FOCUSED);
        setTimeout(() => this.closeMenu(), 300);
      }
    };


    // Add WAI-ARIA
    addWaiAria();

    // Button

    // Remove listeners ...just in case
    this.button_.removeEventListener('keydown', buttonKeyDownHandler);
    this.button_.removeEventListener('click', buttonClickHandler);
    this.button_.removeEventListener('focus', buttonFocusHandler);
    this.button_.removeEventListener('blur', buttonBlurHandler);

    // Add listeners
    this.button_.addEventListener('keydown', buttonKeyDownHandler);
    this.button_.addEventListener('click', buttonClickHandler);
    this.button_.addEventListener('focus', buttonFocusHandler);
    this.button_.addEventListener('blur', buttonBlurHandler);

    // Menu
    this.menu_.removeEventListener('keydown', menuKeyDownHandler);
    this.menu_.removeEventListener('click', menuClickHandler);
    this.menu_.removeEventListener('focus', menuFocusHandler);
    this.menu_.removeEventListener('blur', menuBlurHandler);

    this.menu_.addEventListener('keydown', menuKeyDownHandler);
    this.menu_.addEventListener('click', menuClickHandler);
    this.menu_.addEventListener('focus', menuFocusHandler, true);
    this.menu_.addEventListener('blur', menuBlurHandler, true);
  };

  MaterialExtMenuButton.prototype['upgrade'] = MaterialExtMenuButton.prototype.upgrade;


  /**
   * Initialize component
   */
  MaterialExtMenuButton.prototype.init = function() {

    if (this.element_) {
      // Do the init required for this component to work

      if (this.element_.classList.contains(MDL_RIPPLE_EFFECT)) {
        this.element_.classList.add(MDL_RIPPLE_EFFECT_IGNORE_EVENTS);
      }

      this.button_ = this.element_.querySelector(`.${MENU_BUTTON_BUTTON}`);
      this.menu_ = this.element_.querySelector(`.${MENU_BUTTON_MENU}`);

      this.element_.setAttribute('role', 'presentation');

      this.upgrade();

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
    this.menu_ = null;
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
