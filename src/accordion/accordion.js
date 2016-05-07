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

import { createCustomEvent } from '../utils/custom-event';

(function() {
  'use strict';


  const RIPPLE_COMPONENT = 'MaterialRipple';
  const VK_TAB = 9;
  const VK_ENTER = 13;
  const VK_SPACE = 32;
  const VK_END = 35;
  const VK_HOME = 36;
  const VK_ARROW_LEFT = 37;
  const VK_ARROW_UP = 38;
  const VK_ARROW_RIGHT = 39;
  const VK_ARROW_DOWN = 40;

  const PANEL = 'mdlext-accordion__panel';
  const HEADER = 'mdlext-accordion__panel__header';
  const HEADER_TABSTOP = 'mdlext-accordion__panel__header__tabstop';
  const IS_UPGRADED = 'is-upgraded';
  const RIPPLE = 'mdl-ripple';
  const RIPPLE_CONTAINER = 'mdlext-accordion__panel__header__ripple-container';
  const RIPPLE_EFFECT = 'mdl-js-ripple-effect';
  const RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';


  /**
   * Class constructor for Accordion MDLEXT component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  const MaterialExtAccordion = function MaterialExtAccordion(element) {
    // Stores the Accordion HTML element.
    this.element_ = element;

    // Initialize instance.
    this.init();
  };
  window['MaterialExtAccordion'] = MaterialExtAccordion;

  /**
   * Initialize accordion's panels
   *
   * @private
   */
  MaterialExtAccordion.prototype.initAccordion_ = function() {

    this.element_.setAttribute('role', 'tablist');

    if (this.element_.classList.contains(RIPPLE_EFFECT)) {
      this.element_.classList.add(RIPPLE_EFFECT_IGNORE_EVENTS);
    }

    [...this.element_.querySelectorAll(`.${PANEL}`)].forEach( panel => {
      new MaterialExtAccordionPanel(panel, this);
    });

    this.element_.classList.add(IS_UPGRADED);
  };

  /**
   * Initialize Accordion element.
   */
  MaterialExtAccordion.prototype.init = function() {
    if (this.element_) {
      //console.log('***** init', this.element_.classList, this.element_.getAttribute('data-upgraded'));
      this.initAccordion_();
    }
  };


  /**
   * Constructor for an individual accordion panel.
   *
   * @constructor
   * @param {Element} panel The HTML element for the tab.
   * @param {MaterialExtAccordion} ctx The MaterialExtAccordion object that owns the panel.
   */
  function MaterialExtAccordionPanel(panel, ctx) {

    const header = panel.querySelector(`.${HEADER}`);
    if(header === null) {
      throw new Error('There must be a header element for each accordion panel.');
    }

    header.setAttribute('role', 'tab');

    let a = header.querySelector(`a.${HEADER_TABSTOP}`);
    if(a === null) {
      // An anchor is required for focus/tab stop
      a = document.createElement('a');
      a.href = '#';
      a.classList.add(HEADER_TABSTOP);
      header.appendChild(a);
    }

    panel.setAttribute('role', 'tabpanel');

    if(panel.hasAttribute('open')) {
      header.setAttribute('aria-expanded', '');
    }
    else {
      header.setAttribute('aria-hidden', '');
    }

    if (ctx.element_.classList.contains(RIPPLE_EFFECT)) {
      const rippleContainer = a;
      rippleContainer.classList.add(RIPPLE_CONTAINER);
      rippleContainer.classList.add(RIPPLE_EFFECT);
      const ripple = document.createElement('span');
      ripple.classList.add(RIPPLE);
      rippleContainer.appendChild(ripple);
      componentHandler.upgradeElement(rippleContainer, RIPPLE_COMPONENT);
    }

    header.addEventListener('click', ( event => {
      event.preventDefault();
      event.stopPropagation();

      if(!panel.hasAttribute('disabled')) {
        if(panel.hasAttribute('open')) {
          panel.removeAttribute('open');
          header.removeAttribute('aria-expanded');
          header.setAttribute('aria-hidden', '');

          // Dispatch toggle event to accordion element
          dispatchToggleEvent('close', panel, ctx.element_);
        }
        else {
          if(ctx.element_.hasAttribute('aria-multiselectable') &&
            'false' === ctx.element_.getAttribute('aria-multiselectable').toLowerCase()) {

            const openPanel = ctx.element_.querySelector(`.${PANEL}[open]`);
            if (openPanel) {
              openPanel.removeAttribute('open');
              const h = openPanel.querySelector(`.${HEADER}`);
              h.removeAttribute('aria-expanded');
              h.setAttribute('aria-hidden', '');

              // Dispatch toggle event to accordion element
              dispatchToggleEvent('close', openPanel, ctx.element_);
            }
            removeAriaSelectedAttribute();
          }

          panel.setAttribute('open', '');
          header.setAttribute('aria-expanded', '');
          header.setAttribute('aria-selected', '');
          header.removeAttribute('aria-hidden', '');

          // Dispatch toggle event to accordion element
          dispatchToggleEvent('open', panel, ctx.element_);
        }
        focus(panel);
      }
    }), true);


    header.addEventListener('keydown', ( event => {
      if (event.keyCode === VK_TAB
        || event.keyCode === VK_ENTER || event.keyCode === VK_SPACE
        || event.keyCode === VK_END || event.keyCode === VK_HOME
        || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT
        || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {

        const panels = panel.parentNode.children;
        let nextPanel = null;
        const n = panel.parentNode.childElementCount - 1;

        for (let i = 0; i <= n; i++) {

          if (event.keyCode === VK_HOME) {
            nextPanel = panels[0];
            break;
          }
          else if (event.keyCode === VK_END) {
            nextPanel = panels[n];
            break;
          }

          if(panels[i] == panel) {
            if(event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
              nextPanel = i > 0 ? panels[i-1] :  panels[n];
            }
            else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
              nextPanel = i < n ? panels[i+1] : panels[0];
            }
            else if (event.keyCode === VK_TAB) {
              if(event.shiftKey) {
                if(i > 0 && !panels[i-1].hasAttribute('open')) {
                  nextPanel = panels[i-1];
                }
              }
              else if (i < n) {
                if(!panel.hasAttribute('open')) {
                  nextPanel = panels[i+1];
                }
              }
            }
            else if (event.keyCode === VK_ENTER || event.keyCode === VK_SPACE) {
              event.preventDefault();
              event.stopPropagation();

              // Trigger mouse click event for any attached listeners.
              const evt = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              header.dispatchEvent(evt);
            }
            break;
          }
        }
        if(nextPanel) {
          event.preventDefault();
          event.stopPropagation();
          focus(nextPanel);
        }
      }
    }), true);

    function removeAriaSelectedAttribute() {
      const selectedHeader = ctx.element_.querySelector(`.${HEADER}[aria-selected]`);
      if(selectedHeader) {
        selectedHeader.removeAttribute('aria-selected');
      }
    }

    function focus(nextPanel) {
      const a = nextPanel.querySelector(`.${HEADER} a`);
      if(a) {
        removeAriaSelectedAttribute();
        a.focus();
        nextPanel.querySelector(`.${HEADER}`).setAttribute('aria-selected', '');
      }
    }

    function dispatchToggleEvent(state, source, target) {
      const evt = createCustomEvent('toggle', {
        bubbles: true,
        cancelable: true,
        detail: { state: state, source: source }
      });
      target.dispatchEvent(evt);
    }
  }

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
