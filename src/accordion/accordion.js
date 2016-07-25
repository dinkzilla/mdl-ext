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
 * A WAI-ARIA friendly accordion component.
 * An accordion is a collection of expandable panels associated with a common outer container. Panels consist
 * of a header and an associated content region or tabpanel. The primary use of an Accordion is to present multiple sections
 * of content on a single page without scrolling, where all of the sections are peers in the application or object hierarchy.
 * The general look is similar to a tree where each root tree node is an expandable accordion header. The user navigates
 * and makes the contents of each panel visible (or not) by interacting with the Accordion Header
 */

import { createCustomEvent } from '../utils/custom-event';


(function() {
  'use strict';

  const VK_ENTER             = 13;
  const VK_SPACE             = 32;
  const VK_END               = 35;
  const VK_HOME              = 36;
  const VK_ARROW_LEFT        = 37;
  const VK_ARROW_UP          = 38;
  const VK_ARROW_RIGHT       = 39;
  const VK_ARROW_DOWN        = 40;
  const ACCORDION            = 'mdlext-accordion';
  const ACCORDION_VERTICAL   = 'mdlext-accordion--vertical';
  const ACCORDION_HORIZONTAL = 'mdlext-accordion--horizontal';
  const PANEL                = 'mdlext-accordion__panel';
  const PANEL_ROLE           = 'presentation';
  const TAB                  = 'mdlext-accordion__tab';
  const TAB_ROLE             = 'tab';
  const TABPANEL             = 'mdlext-accordion__tabpanel';
  const TABPANEL_ROLE        = 'tabpanel';
  const ARIA_MULTISELECTABLE = 'aria-multiselectable';
  const ARIA_EXPANDED        = 'aria-expanded';
  const ARIA_HIDDEN          = 'aria-hidden';
  const ARIA_SELECTED        = 'aria-selected';
  const IS_EXPANDED          = 'is-expanded';
  const IS_UPGRADED          = 'is-upgraded';

  /**
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  const MaterialExtAccordion = function MaterialExtAccordion( element ) {

    // Stores the Accordion HTML element.
    this.element_ = element;

    // Initialize instance.
    this.init();
  };
  window['MaterialExtAccordion'] = MaterialExtAccordion;


  /**
   * Initialize component
   */
  MaterialExtAccordion.prototype.init = function() {
    if (this.element_) {
      // Do the init required for this component to work
      if( !(this.element_.classList.contains(ACCORDION_HORIZONTAL) || this.element_.classList.contains(ACCORDION_VERTICAL))) {
        throw new Error(`Accordion must have one of the classes "${ACCORDION_HORIZONTAL}" or "${ACCORDION_VERTICAL}"`);
      }

      this.element_.setAttribute('role', 'tablist');

      if(!this.element_.hasAttribute(ARIA_MULTISELECTABLE)) {
        this.element_.setAttribute(ARIA_MULTISELECTABLE, 'false');
      }
      this.element_.addEventListener('command', this.commandHandler_.bind(this), false);

      [...this.element_.querySelectorAll(`.${ACCORDION} > .${PANEL}`)].forEach( panel => this.upgradeTab(panel) );

      // Set upgraded flag
      this.element_.classList.add(IS_UPGRADED);
    }
  };


  // Helpers
  const accordionElements = ( element ) => {
    if (element.classList.contains(PANEL)) {
      return {
        panel: element,
        tab: element.querySelector(`.${TAB}`),
        tabpanel: element.querySelector(`.${TABPANEL}`)
      };
    }
    else {
      return {
        panel: element.parentNode,
        tab: element.parentNode.querySelector(`.${TAB}`),
        tabpanel: element.parentNode.querySelector(`.${TABPANEL}`)
      };
    }
  };


  // Private methods.

  /**
   * Handles custom command event, 'open', 'close', or 'toggle'
   * @param event. A custom event
   * @private
   */
  MaterialExtAccordion.prototype.commandHandler_ = function( event ) {
    event.preventDefault();
    event.stopPropagation();

    if(event.detail && event.detail.action) {
      const action = event.detail.action.toLowerCase();

      switch (action) {
        case 'open':
          this.openTab(event.detail.target);
          break;
        case 'close':
          this.closeTab(event.detail.target);
          break;
        case 'toggle':
          this.toggleTab(event.detail.target);
          break;
        case 'upgrade':
          this.upgradeTab(event.detail.target);
          break;
      }
    }
  };

  /**
   * Dispatch toggle event
   * @param {string} state
   * @param {Element} tab
   * @param {Element} tabpanel
   * @private
   */
  MaterialExtAccordion.prototype.dispatchToggleEvent_ = function ( state, tab, tabpanel ) {
    const ce = createCustomEvent('toggle', {
      bubbles: true,
      cancelable: true,
      detail: { state: state, tab: tab, tabpanel: tabpanel }
    });
    this.element_.dispatchEvent(ce);
  };

  /**
   * Open tab
   * @param {Element} panel
   * @param {Element} tab
   * @param {Element} tabpanel
   * @private
   */
  MaterialExtAccordion.prototype.openTab_ = function( panel, tab, tabpanel ) {
    panel.classList.add(IS_EXPANDED);
    tab.setAttribute(ARIA_EXPANDED, 'true');
    tabpanel.removeAttribute('hidden');
    tabpanel.setAttribute(ARIA_HIDDEN, 'false');
    this.dispatchToggleEvent_('open', tab, tabpanel);
  };

  /**
   * Close tab
   * @param {Element} panel
   * @param {Element} tab
   * @param {Element} tabpanel
   * @private
   */
  MaterialExtAccordion.prototype.closeTab_ = function( panel, tab, tabpanel ) {
    panel.classList.remove(IS_EXPANDED);
    tab.setAttribute(ARIA_EXPANDED, 'false');
    tabpanel.setAttribute('hidden', '');
    tabpanel.setAttribute(ARIA_HIDDEN, 'true');
    this.dispatchToggleEvent_('close', tab, tabpanel);
  };

  /**
   * Toggle tab
   * @param {Element} panel
   * @param {Element} tab
   * @param {Element} tabpanel
   * @private
   */
  MaterialExtAccordion.prototype.toggleTab_ = function( panel, tab, tabpanel ) {
    if( !(this.element_.hasAttribute('disabled') || tab.hasAttribute('disabled')) ) {
      if (tab.getAttribute(ARIA_EXPANDED).toLowerCase() === 'true') {
        this.closeTab_(panel, tab, tabpanel);
      }
      else {
        if (this.element_.getAttribute(ARIA_MULTISELECTABLE).toLowerCase() !== 'true') {
          this.closeTabs_();
        }
        this.openTab_(panel, tab, tabpanel);
      }
    }
  };

  /**
   * Open tabs
   * @private
   */
  MaterialExtAccordion.prototype.openTabs_ = function() {
    if (this.element_.getAttribute(ARIA_MULTISELECTABLE).toLowerCase() === 'true') {
      [...this.element_.querySelectorAll(`.${ACCORDION} > .${PANEL}`)]
        .filter(panel => !panel.classList.contains(IS_EXPANDED))
        .forEach(closedItem => {
          const tab = closedItem.querySelector(`.${TAB}`);
          if (!tab.hasAttribute('disabled')) {
            this.openTab_(closedItem, tab, closedItem.querySelector(`.${TABPANEL}`));
          }
        });
    }
  };

  /**
   * Close tabs
   * @private
   */
  MaterialExtAccordion.prototype.closeTabs_ = function() {
    [...this.element_.querySelectorAll(`.${ACCORDION} > .${PANEL}.${IS_EXPANDED}`)]
      .forEach( panel => {
        const tab = panel.querySelector(`.${TAB}`);
        if(!tab.hasAttribute('disabled')) {
          this.closeTab_(panel, tab, panel.querySelector(`.${TABPANEL}`));
        }
      });
  };


  // Public methods.

  /**
   * Upgrade an individual accordion tab
   * @public
   * @param {Element} tabElement The HTML element for the accordion panel.
   */
  MaterialExtAccordion.prototype.upgradeTab = function( tabElement ) {

    const {panel, tab, tabpanel} = accordionElements( tabElement );

    const disableTab = () => {
      panel.classList.remove(IS_EXPANDED);
      tab.setAttribute('tabindex', '-1');
      tab.setAttribute(ARIA_EXPANDED, 'false');
      tabpanel.setAttribute('hidden', '');
      tabpanel.setAttribute(ARIA_HIDDEN, 'true');
    };

    const enableTab = () => {
      if(!tab.hasAttribute(ARIA_EXPANDED)) {
        tab.setAttribute(ARIA_EXPANDED, 'false');
      }

      tab.setAttribute('tabindex', '0');

      if(tab.getAttribute(ARIA_EXPANDED).toLowerCase() === 'true') {
        panel.classList.add(IS_EXPANDED);
        tabpanel.removeAttribute('hidden');
        tabpanel.setAttribute(ARIA_HIDDEN, 'false');
      }
      else {
        panel.classList.remove(IS_EXPANDED);
        tabpanel.setAttribute('hidden', '');
        tabpanel.setAttribute(ARIA_HIDDEN, 'true');
      }
    };

    const clickHandler = e => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleTab_(panel, tab, tabpanel);
    };

    const focusHandler = e => {
      e.preventDefault();
      e.stopPropagation();

      [...this.element_.querySelectorAll(`.${TAB}[aria-selected="true"]`)].forEach(
        selectedTab => selectedTab.removeAttribute(ARIA_SELECTED)
      );
      tab.setAttribute(ARIA_SELECTED, 'true');
    };

    const keydownHandler = e => {

      if(this.element_.hasAttribute('disabled')) {
        return;
      }

      if ( e.keyCode === VK_END        || e.keyCode === VK_HOME
        || e.keyCode === VK_ARROW_UP   || e.keyCode === VK_ARROW_LEFT
        || e.keyCode === VK_ARROW_DOWN || e.keyCode === VK_ARROW_RIGHT ) {

        let nextTab = null;
        let keyCode = e.keyCode;

        if (keyCode === VK_HOME) {
          nextTab = this.element_.querySelector(`.${PANEL}:first-child > .${TAB}`);
          if(nextTab && nextTab.hasAttribute('disabled')) {
            nextTab = null;
            keyCode = VK_ARROW_DOWN;
          }
        }
        else if (keyCode === VK_END) {
          nextTab = this.element_.querySelector(`.${PANEL}:last-child > .${TAB}`);
          if(nextTab && nextTab.hasAttribute('disabled')) {
            nextTab = null;
            keyCode = VK_ARROW_UP;
          }
        }

        if(!nextTab) {
          let nextPanel = panel;

          do {
            if (keyCode === VK_ARROW_UP || keyCode === VK_ARROW_LEFT) {
              nextPanel = nextPanel.previousElementSibling;
              if(!nextPanel) {
                nextPanel = this.element_.querySelector(`.${PANEL}:last-child`);
              }
              if (nextPanel) {
                nextTab = nextPanel.querySelector(`.${PANEL} > .${TAB}`);
              }
            }
            else if (keyCode === VK_ARROW_DOWN || keyCode === VK_ARROW_RIGHT) {
              nextPanel = nextPanel.nextElementSibling;
              if(!nextPanel) {
                nextPanel = this.element_.querySelector(`.${PANEL}:first-child`);
              }
              if (nextPanel) {
                nextTab = nextPanel.querySelector(`.${PANEL} > .${TAB}`);
              }
            }

            if(nextTab && nextTab.hasAttribute('disabled')) {
              nextTab = null;
            }
            else {
              break;
            }
          }
          while(nextPanel !== panel);
        }

        if (nextTab) {
          e.preventDefault();
          e.stopPropagation();
          nextTab.focus();

          // Workaround for JSDom testing:
          // In JsDom 'element.focus()' does not trigger any focus event
          if(!nextTab.hasAttribute(ARIA_SELECTED)) {

            [...this.element_.querySelectorAll(`.${TAB}[aria-selected="true"]`)]
              .forEach( selectedTab => selectedTab.removeAttribute(ARIA_SELECTED) );

            nextTab.setAttribute(ARIA_SELECTED, 'true');
          }
        }
      }
      else if (e.keyCode === VK_ENTER || e.keyCode === VK_SPACE) {
        e.preventDefault();
        e.stopPropagation();
        this.toggleTab_(panel, tab, tabpanel);
      }
    };

    if(tab === null) {
      throw new Error('There must be a tab element for each accordion panel.');
    }

    if(tabpanel === null) {
      throw new Error('There must be a tabpanel element for each accordion panel.');
    }

    panel.setAttribute('role', PANEL_ROLE);
    tab.setAttribute('role', TAB_ROLE);
    tabpanel.setAttribute('role', TABPANEL_ROLE);

    if(tab.hasAttribute('disabled')) {
      disableTab();
    }
    else {
      enableTab();
    }

    tab.removeEventListener('click', clickHandler);
    tab.removeEventListener('focus', focusHandler);
    tab.removeEventListener('keydown', keydownHandler);

    tab.addEventListener('click', clickHandler);
    tab.addEventListener('focus', focusHandler);
    tab.addEventListener('keydown', keydownHandler);

  };
  MaterialExtAccordion.prototype['upgradeTab'] = MaterialExtAccordion.prototype.upgradeTab;


  /**
   * Open tab
   * @public
   * @param {Element} tabElement
   */
  MaterialExtAccordion.prototype.openTab = function( tabElement ) {

    if(tabElement === undefined) {
      this.openTabs_();
    }
    else if(tabElement !== null) {
      const { panel, tab, tabpanel } = accordionElements( tabElement );
      if(tab.getAttribute(ARIA_EXPANDED).toLowerCase() !== 'true') {
        this.toggleTab_(panel, tab, tabpanel);
      }
    }
  };
  MaterialExtAccordion.prototype['openTab'] = MaterialExtAccordion.prototype.openTab;

  /**
   * Close tab
   * @public
   * @param {Element} tabElement
   */
  MaterialExtAccordion.prototype.closeTab = function( tabElement ) {
    if(tabElement === undefined) {
      this.closeTabs_();
    }
    else if(tabElement !== null) {
      const { panel, tab, tabpanel } = accordionElements( tabElement );

      if(tab.getAttribute(ARIA_EXPANDED).toLowerCase() === 'true') {
        this.toggleTab_(panel, tab, tabpanel);
      }
    }
  };
  MaterialExtAccordion.prototype['closeTab'] = MaterialExtAccordion.prototype.closeTab;

  /**
   * Toggle tab
   * @public
   * @param {Element} tabElement
   */
  MaterialExtAccordion.prototype.toggleTab = function( tabElement ) {
    if(tabElement) {
      const { panel, tab, tabpanel } = accordionElements( tabElement );
      this.toggleTab_(panel, tab, tabpanel);
    }
  };
  MaterialExtAccordion.prototype['toggleTab'] = MaterialExtAccordion.prototype.toggleTab;


  /*
   * Downgrade component
   * E.g remove listeners and clean up resources
   *
   * Note: There is a bug i material component container; downgrade is never called!
   * Disables method temporarly to keep code coverage at 100% for functions.
   *
   MaterialExtAccordion.prototype.mdlDowngrade_ = function() {
     'use strict';
     console.log('***** MaterialExtAccordion.mdlDowngrade');
   };
   */


  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  /* eslint no-undef: 0 */
  componentHandler.register({
    constructor: MaterialExtAccordion,
    classAsString: 'MaterialExtAccordion',
    cssClass: 'mdlext-js-accordion',
    widget: true
  });
})();
