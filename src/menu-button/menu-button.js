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
  VK_ENTER,
  VK_SPACE,
  VK_ARROW_UP,
  VK_ARROW_DOWN,
  VK_TAB,
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
    //console.log('***** MaterialExtMenuButton constructor');

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
  MaterialExtMenuButton.prototype.openMenu = function() {
    this.button_.setAttribute('aria-expanded', 'true');
    this.menu_.removeAttribute('hidden');
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
   * Toggle menu
   * @public

  MaterialExtMenuButton.prototype.toggleMenu = function() {
    if (this.button_.getAttribute('aria-expanded').toLowerCase() === 'false') {
      this.openMenu();
    }
    else {
      this.closeMenu();
    }
  };
  MaterialExtMenuButton.prototype['toggleMenu'] = MaterialExtMenuButton.prototype.toggleMenu;
  */



  /**
   * Upgrades component
   * Call this method if you add/remove elements to the component during runtime
   */
  MaterialExtMenuButton.prototype.upgrade = function() {

    const addWaiAria = () => {

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
        if (!this.button_.hasAttribute('id')) {
          menuId = `menu-button-menu-${randomString()}`;
          this.menu_.id = menuId;
        }
        else {
          menuId = this.menu_.id;
        }

        this.button_.setAttribute('aria-controls', menuId);

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

    const buttonKeyUpHandler = event => {

      switch (event.keyCode) {
        case VK_ARROW_UP:
          this.openMenu();
          break;

        case VK_ARROW_DOWN:
          this.openMenu();
          break;

        case VK_SPACE:
        case VK_ENTER:
          this.openMenu();
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

    const buttonClickHandler = () => {
      this.openMenu();
    };


    // Add WAI-ARIA
    addWaiAria();

    // Button

    // Remove listeners ...just in case
    this.button_.removeEventListener('keyup', buttonKeyUpHandler);
    this.button_.removeEventListener('click', buttonClickHandler);

    // Add listeners
    this.button_.addEventListener('keyup', buttonKeyUpHandler);
    this.button_.addEventListener('click', buttonClickHandler);

    // Menu

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

      //console.log('***** MaterialExtMenuButton upgraded');
    }
  };

  /**
   * Downgrade component
   * E.g remove listeners and clean up resources
   */
  MaterialExtMenuButton.prototype.mdlDowngrade_ = function() {
    'use strict';
    //console.log('***** MaterialExtMenuButton downgraded');
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
