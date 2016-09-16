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
  //MDL_RIPPLE_EFFECT,
  //MDL_RIPPLE_EFFECT_IGNORE_EVENTS
} from '../utils/constants';


//const MENU_BUTTON = 'mdlext-menu-button';
//const MENU_BUTTON_LABEL = 'mdlext-menu-button__label';
const MENU_BUTTON_MENU = 'mdlext-menu';
const MENU_BUTTON_MENU_ITEM = 'mdlext-menu__item';
const MENU_BUTTON_MENU_ITEM_DIVIDER = 'mdlext-menu__item-divider';

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

  const isDisabled = item => item && item.hasAttribute('disabled');

  const isDivider = item => item && item.classList.contains(MENU_BUTTON_MENU_ITEM_DIVIDER);

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
    if(!isDisabled(n) && !isDivider(n)) {
      focus(n);
    }
    else {
      let i = element.children.length;
      while(n && i-- > 0) {
        if(isDisabled(n) || isDivider(n)) {
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
    if(!isDisabled(p) && !isDivider(p)) {
      focus(p);
    }
    else {
      let i = element.children.length;
      while(p && i-- > 0) {
        if(isDisabled(p) || isDivider(p)) {
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
    if(isDisabled(item) || isDivider(item) ) {
      nextItem(item);
    }
    else {
      focus(item);
    }
  };

  const lastItem = () => {
    const item = element.lastElementChild;
    if(isDisabled(item) || isDivider(item)) {
      previousItem(item);
    }
    else {
      focus(item);
    }
  };


  /**
   * Get a list of offset parents for given element
   * @see https://www.benpickles.com/articles/51-finding-a-dom-nodes-common-ancestor-using-javascript
   * @param el the element
   * @return {Array} a list of offset parents
   */
  const offsetParents = el => {
    const elements = [];
    for (; el; el = el.offsetParent) {
      elements.unshift(el);
    }
    if(!elements.find(e => e === document.body)) {
      elements.unshift(document.body);
    }
    return elements;
  };

  /**
   * Finds the common offset ancestor of two DOM nodes
   * @see https://www.benpickles.com/articles/51-finding-a-dom-nodes-common-ancestor-using-javascript
   * @see https://gist.github.com/benpickles/4059636
   * @param a
   * @param b
   * @return {Element} The common offset ancestor of a and b
   */
  const commonOffsetAncestor = (a, b) => {
    const parentsA = offsetParents(a);
    const parentsB = offsetParents(b);

    for (let i = 0; i < parentsA.length; i++) {
      if (parentsA[i] !== parentsB[i]) return parentsA[i-1];
    }
  };


  /**
   * Calculate position relative to a target element
   * @see http://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
   * @param target
   * @param el
   * @return {{x: number, y: number}}
   */
  const positionRelativeToTarget = (target, el) => {
    let x = 0;
    let y = 0;

    while(el) {
      x += (el.offsetLeft - el.scrollLeft + el.clientLeft) || 0;
      y += (el.offsetTop - el.scrollTop + el.clientTop) || 0;
      el = el.offsetParent;

      if(el === target) {
        break;
      }
    }
    return { x: x, y: y };
  };

  /**
   * Check whether an element is in the window viewport
   * @see http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/
   * @param rect
   * @return {boolean}
   */
  const rectInsideWindowViewport = rect => {
    const { top, right, bottom, left } = rect;
    return top >= 0 &&
      left >= 0 &&
      bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      right <= (window.innerWidth || document.documentElement.clientWidth);
  };

  /**
   * Position menu next to button
   */
  const tether = () => {
    // @TODO Positioning strategy needs improvement
    // 1. menu.width > viewport.width or menu.height > viewport.height
    //    1.1 menu.height > viewport.height
    //        1.1.1 let menu.height = viewport.heigt
    //        1.1.2 let menu.overflow-y = auto
    // 2. position menu below button
    //    2.1 done if menu inside viewport
    // 3. position menu above button
    //    3.1 done if menu inside viewport
    // 4. position menu on button right hand side
    //    4.1 done if menu inside viewport
    // 5. position menu on button left hand side
    //    5.1 done if menu inside viewport
    // 6. position menu inside viewport
    // 7. done

    const ancestor = commonOffsetAncestor(controlledBy.element, element);
    const { x, y } = positionRelativeToTarget(ancestor, controlledBy.element);

    element.style.left = `${x}px`;
    element.style.top  = `${y + (controlledBy.element.offsetHeight || 0) + 2}px`;

    if(!rectInsideWindowViewport(element.getBoundingClientRect())) {
      element.style.top  = `${y - (element.offsetHeight || 0) - 4}px`;
    }
  };


  const open = (position='first') => {
    controlledBy.element.setAttribute('aria-expanded', 'true');
    element.removeAttribute('hidden');
    tether();

    let item = null;

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

  const close = () => {
    element.setAttribute('hidden', '');
    controlledBy.element.setAttribute('aria-expanded', 'false');
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
    if(event.target !== element) {
      const item = event.target.closest(`.${MENU_BUTTON_MENU_ITEM}`);

      if(item && !isDisabled(item) && !isDivider(item)) {
        addAriaSelected(item);
        controlledBy.dispatchSelect(item);
        close();
        controlledBy.focus();
      }
      else {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  const blurHandler = event => {
    if(!(element.contains(event.relatedTarget) || controlledBy.element.contains(event.relatedTarget))) {
      setTimeout(() => close(), 200);  // Find a better solution?
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
    element.style['min-width'] = `${Math.max(100, controlledBy.element.getBoundingClientRect().width)}px`;
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

  isDisabled() {
    return this.element.hasAttribute('disabled');
  }

  init() {
    const keyDownHandler = event => {

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

    const clickHandler = () => {
      if(!this.isDisabled()) {
        this.openMenu('selected');
      }
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


    // Caption must have a max-width defined to prevent pushing elements to the right of the caption out of view.
    // In JsDom, offsetWidth and offsetHeight properties does not work properly, so this function is not testable.
    /* istanbul ignore next */
    /*
    const calcMaxTabCaptionWidth = () => {

      const label = this.element.querySelector(`.${MENU_BUTTON_LABEL}`);
      if(label !== null) {
        const w = [...this.element.children]
          .filter( el => el.classList && !el.classList.contains(MENU_BUTTON_LABEL) )
          .reduce( (v, el) => v + el.offsetWidth, 0 );

        const csp = window.getComputedStyle(this.element.parentNode);
        const cse = window.getComputedStyle(this.element);

        const maxWidth = this.element.parentNode.clientWidth -
          (parseFloat(csp.paddingLeft) || 0) -
          (parseFloat(csp.paddingRight) || 0) -
          (parseFloat(cse.paddingLeft) || 0) -
          (parseFloat(cse.paddingRight) || 0) - w;

        if(maxWidth > 0 && maxWidth < this.element.clientWidth) {
          label.style['max-width'] = `${maxWidth}px`;
        }
      }
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
      this.menu = menuFactory(menuElement, this);
      this.element.setAttribute('aria-controls', this.menu.element.id);
    };

    addWaiAria();
    addMenu();
    removeListeners();
    addListeners();
  }

  openMenu(position='first') {
    if(!this.isDisabled()) {
      this.menu.open(position);
    }
  }

  closeMenu() {
    this.menu.close();
  }

  focus() {
    if(!this.isDisabled()) {
      this.element.focus();
    }
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
