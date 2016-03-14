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
    ACCORDION_CLASS: 'mdlext-accordion',
    PANEL_CLASS: 'mdlext-accordion__panel',
    HEADER_CLASS: 'mdlext-accordion__panel__header',

    ACTIVE_CLASS: 'is-active',
    UPGRADED_CLASS: 'is-upgraded',

    MDL_JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
    MDL_RIPPLE_CONTAINER: 'mdl-accordion__ripple-container',
    MDL_RIPPLE: 'mdl-ripple',
    MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events'
  };

  /**
   * Initialize accordion's panels
   *
   * @private
   */
  MaterialExtAccordion.prototype.initPanels_ = function() {

    if(!this.element_.hasAttribute('role')) {
      this.element_.setAttribute('role', 'tablist');
    }

    [...this.element_.querySelectorAll(`.${this.CssClasses_.PANEL_CLASS}`)].forEach( panel => {
      new MaterialExtAccordionPanel(panel, this);
    });

    this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
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
