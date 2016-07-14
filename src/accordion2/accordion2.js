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
 * of a header and an associated content region or panel. The primary use of an Accordion is to present multiple sections
 * of content on a single page without scrolling, where all of the sections are peers in the application or object hierarchy.
 * The general look is similar to a tree where each root tree node is an expandable accordion header. The user navigates
 * and makes the contents of each panel visible (or not) by interacting with the Accordion Header
 */

(function() {
  'use strict';

  const ACCORDION         = 'mdlext-accordion2';
  const ACCORDION_ROLE    = 'tablist';
  const PRESENTATION      = 'mdlext-accordion2__presentation';
  const PRESENTATION_ROLE = 'presentation';
  const TAB               = 'mdlext-accordion2__tab';
  const TAB_ROLE          = 'tab';
  const TABPANEL          = 'mdlext-accordion2__tabpanel';
  const TABPANEL_ROLE     = 'tabpanel';

  const ARIA_MULTISELECTABLE = 'aria-multiselectable';
  const ARIA_EXPANDED        = 'aria-expanded';
  const ARIA_HIDDEN          = 'aria-hidden';
  const ARIA_SELECTED        = 'aria-selected';

  const IS_EXPANDED = 'is-expanded';
  const IS_UPGRADED = 'is-upgraded';


  // Helpers
  const selectTab_ = tab => {
    const accordion = tab.closest(`.${ACCORDION}`);

    [...accordion.querySelectorAll(`.${TAB}[aria-selected="true"]`)].forEach( selectedTab => {
      selectedTab.removeAttribute(ARIA_SELECTED);
    });

    tab.setAttribute(ARIA_SELECTED, 'true');
  };

  const toggleTab_ = tab => {
    const expanded = tab.getAttribute(ARIA_EXPANDED).toLowerCase() === 'true';
    const tabpanel = tab.nextElementSibling;
    const presentation = tab.closest(`.${PRESENTATION}`);

    if(expanded) {
      tab.setAttribute(ARIA_EXPANDED, 'false');
      tabpanel.setAttribute('hidden', '');
      tabpanel.setAttribute(ARIA_HIDDEN, 'true');
      presentation.classList.remove(IS_EXPANDED);
    }
    else {
      const accordion = tab.closest(`.${ACCORDION}`);
      const multiSelectable = accordion.getAttribute(ARIA_MULTISELECTABLE).toLowerCase() === 'true';

      if(!multiSelectable) {
        [...accordion.querySelectorAll(`.${TAB}[aria-expanded="true"]`)].forEach( expandedTab => {
          expandedTab.setAttribute(ARIA_EXPANDED, 'false');
          const panel = expandedTab.nextElementSibling;
          panel.setAttribute('hidden', '');
          panel.setAttribute(ARIA_HIDDEN, 'true');
          panel.closest(`.${PRESENTATION}`).classList.remove(IS_EXPANDED);
        });
      }

      tab.setAttribute(ARIA_EXPANDED, 'true');
      tabpanel.removeAttribute('hidden');
      tabpanel.setAttribute(ARIA_HIDDEN, 'false');
      presentation.classList.add(IS_EXPANDED);
    }
  };

  // End helpers

  /**
   * https://github.com/google/material-design-lite/issues/4205
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  const MaterialExtAccordion2 = function MaterialExtAccordion2( element ) {

    // Stores the Accordion HTML element.
    this.element_ = element;

    // Initialize instance.
    this.init();
  };
  window['MaterialExtAccordion2'] = MaterialExtAccordion2;


  /**
   * Upgrade accordion tabs
   *
   * @public
   */
  MaterialExtAccordion2.prototype.upgradeTabs = function() {

    [...this.element_.querySelectorAll(`.${PRESENTATION}`)].forEach( p => {

      p.setAttribute('role', PRESENTATION_ROLE);

      const tab = p.querySelector(`.${TAB}`);

      if(tab.hasAttribute('disabled')) {
        tab.setAttribute('tabindex', '-1');
        tab.setAttribute(ARIA_EXPANDED, 'false');
      }

      if(!Number.isInteger(tab.getAttribute('tabindex'))) {
        tab.setAttribute('tabindex', 0);
      }

      if(!tab.hasAttribute(ARIA_EXPANDED)) {
        tab.setAttribute(ARIA_EXPANDED, 'false');
      }

      tab.setAttribute('role', TAB_ROLE);


      const tabpanel = p.querySelector(`.${TABPANEL}`);
      const expanded = tab.getAttribute(ARIA_EXPANDED).toLowerCase() === 'true';

      if(expanded) {
        tabpanel.removeAttribute('hidden');
        tabpanel.setAttribute(ARIA_HIDDEN, 'false');
        p.classList.add(IS_EXPANDED);
      }
      else {
        tabpanel.setAttribute('hidden', '');
        tabpanel.setAttribute(ARIA_HIDDEN, 'true');
        p.classList.remove(IS_EXPANDED);
      }

      tabpanel.setAttribute('role', TABPANEL_ROLE);


      tab.addEventListener('click', () => {
        setTimeout(function() {
          toggleTab_(this);
        }.bind(tab), 0);
      });

      tab.addEventListener('focus', () => {
        setTimeout(function() {
          selectTab_(this);
        }.bind(tab), 0);
      });

    });
  };
  MaterialExtAccordion2.prototype['upgradeTabs'] = MaterialExtAccordion2.prototype.upgradeTabs;

  /**
   * Initialize component
   */
  MaterialExtAccordion2.prototype.init = function() {

    if (this.element_) {

      // Do the init required for this component to work
      this.element_.setAttribute('role', ACCORDION_ROLE);

      if(!this.element_.hasAttribute(ARIA_MULTISELECTABLE)) {
        this.element_.setAttribute(ARIA_MULTISELECTABLE, 'false');
      }

      this.upgradeTabs();

      // Set upgraded flag
      this.element_.classList.add(IS_UPGRADED);
    }
  };

  /**
   * Downgrade component
   * E.g remove listeners and clean up resources
   */
  MaterialExtAccordion2.prototype.mdlDowngrade_ = function() {
    'use strict';
  };

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  /* eslint no-undef: 0 */
  /* jshint undef:false */
  componentHandler.register({
    constructor: MaterialExtAccordion2,
    classAsString: 'MaterialExtAccordion2',
    cssClass: 'mdlext-js-accordion2',
    widget: true
  });
})();
