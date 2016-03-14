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
 */


(function() {
  'use strict';

  const PANEL_CLASS = 'mdlext-accordion__panel';
  const HEADER_CLASS = 'mdlext-accordion__panel__header';
  const UPGRADED_CLASS = 'is-upgraded';
  //const ACCORDION_CLASS = 'mdlext-accordion';
  //const ACTIVE_CLASS = 'is-active';
  //const MDL_JS_RIPPLE_EFFECT = 'mdl-js-ripple-effect';
  //const MDL_RIPPLE_CONTAINER = 'mdl-accordion__ripple-container';
  //const MDL_RIPPLE = 'mdl-ripple';
  //const MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';

  const VK_TAB = 9;
  const VK_ENTER = 13;
  const VK_SPACE = 32;
  const VK_END = 35;
  const VK_HOME = 36;
  const VK_ARROW_LEFT = 37;
  const VK_ARROW_UP = 38;
  const VK_ARROW_RIGHT = 39;
  const VK_ARROW_DOWN = 40;


  /**
   * Class constructor for Accordion MDLEXT component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * An accordion component is a collection of expandable panels associated with a common outer container. Panels consist
   * of a header and an associated content region or panel. The primary use of an Accordion is to present multiple sections
   * of content on a single page without scrolling, where all of the sections are peers in the application or object hierarchy.
   * The general look is similar to a tree where each root tree node is an expandable accordion header. The user navigates
   * and makes the contents of each panel visible (or not) by interacting with the Accordion Header
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
   * Store constants in one place so they can be updated easily.
   *
   * @enum {string}
   * @private
   */
  MaterialExtAccordion.prototype.Constant_ = {
    // None at the moment.
  };

  /**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
  MaterialExtAccordion.prototype.CssClasses_ = {
  };

  /**
   * Initialize accordion's panels
   *
   * @private
   */
  MaterialExtAccordion.prototype.initPanels_ = function() {

    this.element_.setAttribute('role', 'tablist');

    [...this.element_.querySelectorAll(`.${PANEL_CLASS}`)].forEach( panel => {
      new MaterialExtAccordionPanel(panel, this);
    });

    this.element_.classList.add(UPGRADED_CLASS);
  };

  /**
   * Initialize Accordion element.
   */
  MaterialExtAccordion.prototype.init = function() {
    if (this.element_) {
      this.initPanels_();
    }
  };


  /**
   * Constructor for an individual accordion panel.
   *
   * @constructor
   * @param {Element} panel The HTML element for the tab.
   * @param {MaterialExtAccordion} ctx The MaterialExtAccordion object that owns the panel.
   */
  function MaterialExtAccordionPanel(panel, ctx) {   // eslint-disable-line no-unused-vars

    const header = panel.querySelector(`.${HEADER_CLASS}`);

    if(header === null) {
      throw new Error('There must be a header element for each accordion panel.');
    }

    header.setAttribute('role', 'tab');
    panel.setAttribute('role', 'tabpanel');

    if(!panel.hasAttribute('open')) {
      panel.setAttribute('aria-expanded', '');
    }

    header.addEventListener('click', ( function(event) {
      event.preventDefault();
      event.stopPropagation();

      const panel = this.parentNode;
      if(panel.hasAttribute('open')) {
        panel.removeAttribute('open');
        this.removeAttribute('aria-expanded');
      }
      else {
        const openPanel = ctx.element_.querySelector(`.${PANEL_CLASS}[open]`);
        if(openPanel) {
          openPanel.removeAttribute('open');
          const h = openPanel.querySelector(`.${HEADER_CLASS}`);
          if(h) {
            h.removeAttribute('aria-expanded');
          }
        }
        panel.setAttribute('open', '');
        this.setAttribute('aria-expanded', '');
      }
      focus(panel);

    }).bind(header), true);


    header.addEventListener('keydown', ( function(event) {
      if (event.keyCode === VK_TAB
        || event.keyCode === VK_ENTER || event.keyCode === VK_SPACE
        || event.keyCode === VK_END || event.keyCode === VK_HOME
        || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT
        || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {

        const panel = this.parentNode;
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

          /*jshint eqeqeq:false */
          if(panels[i] == panel) {
            if(event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
              if(i > 0) {
                nextPanel = panels[i-1];
              }
            }
            else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
              if(i < n) {
                nextPanel = panels[i+1];
              }
            }
            else if (event.keyCode === VK_TAB) {
              if(event.shiftKey && i > 0) {
                if(!panels[i-1].hasAttribute('open')) {
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
              this.dispatchEvent(evt);
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
    }).bind(header), true);

    function focus(panel) {
      const a = panel.querySelector(`.${HEADER_CLASS} a`);
      if(a) {
        a.focus();
      }
    }

  }

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  /* eslint no-undef: 0 */
  /* jshint undef:false */
  componentHandler.register({
    constructor: MaterialExtAccordion,
    classAsString: 'MaterialExtAccordion',
    cssClass: 'mdlext-js-accordion'
  });
})();
