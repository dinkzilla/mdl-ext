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
 * A lightboard is a translucent surface illuminated from behind, used for situations
 * where a shape laid upon the surface needs to be seen with high contrast. In the "old days" of photography
 * photograpers used a lightboard to get a quick view of their slides. The goal is to create a responsive lightbox
 * design, based on flex layout, similar to what is used in Adobe LightRoom to browse images.
 */

import '../utils/closest-polyfill';
import { createCustomEvent } from '../utils/custom-event';

(function() {
  'use strict';

  const VK_TAB = 9;
  const VK_ENTER = 13;
  const VK_SPACE = 32;
  const VK_END = 35;
  const VK_HOME = 36;
  const VK_ARROW_LEFT = 37;
  const VK_ARROW_UP = 38;
  const VK_ARROW_RIGHT = 39;
  const VK_ARROW_DOWN = 40;

  const IS_UPGRADED = 'is-upgraded';
  //const LIGHTBOARD = 'mdlext-lightboard';
  const LIGHTBOARD_ROLE = 'grid';
  const SLIDE = 'mdlext-lightboard__slide';
  const SLIDE_ROLE  = 'gridcell';
  const SLIDE_TABSTOP = 'mdlext-lightboard__slide__frame';
  const RIPPLE_COMPONENT = 'MaterialRipple';
  const RIPPLE = 'mdl-ripple';
  const RIPPLE_CONTAINER = 'mdlext-lightboard__slide__ripple-container';
  const RIPPLE_EFFECT = 'mdl-js-ripple-effect';
  const RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';

  /**
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  const MaterialExtLightboard = function MaterialExtLightboard(element) {
    // Stores the element.
    this.element_ = element;

    // Initialize instance.
    this.init();
  };
  window['MaterialExtLightboard'] = MaterialExtLightboard;

  /**
   * Initialize component
   */
  MaterialExtLightboard.prototype.init = function() {

    const getSlide = element => {
      return element.closest(`.${SLIDE}`);
    };

    const focus = slide => {
      if(slide) {
        const a = slide.querySelector(`a.${SLIDE_TABSTOP}`);
        if (a) {
          a.focus();
        }
      }
    };

    const emitSelectvent = slide => {
      this.element_.dispatchEvent(
        createCustomEvent('select', {
          bubbles: true,
          cancelable: true,
          detail: { source: slide }
        })
      );
    };

    const keydownHandler = event => {

      // Maybe this function should be throttled??
      if (event.keyCode === VK_TAB
        || event.keyCode === VK_ENTER || event.keyCode === VK_SPACE
        || event.keyCode === VK_END || event.keyCode === VK_HOME
        || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT
        || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {

        if(event.target !== this.element_) {

          const slide = getSlide(event.target);
          const slides = this.element_.children;
          let nextSlide = null;
          const n = this.element_.childElementCount - 1;

          for (let i = 0; i <= n; i++) {
            if (event.keyCode === VK_HOME) {
              nextSlide = slides[0];
              break;
            }
            else if (event.keyCode === VK_END) {
              nextSlide = slides[n];
              break;
            }

            if (slides[i] === slide) {
              if (event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
                nextSlide =  i > 0 ? slides[i - 1] : slides[n];
              }
              else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
                nextSlide = i < n ? slides[i + 1] : slides[0];
              }
              else if (event.keyCode === VK_TAB) {
                if (event.shiftKey) {
                  if (i > 0) {
                    nextSlide = slides[i - 1];
                  }
                }
                else if (i < n) {
                  nextSlide = slides[i + 1];
                }
              }
              else if (event.keyCode === VK_ENTER || event.keyCode === VK_SPACE) {
                event.preventDefault();
                event.stopPropagation();
                slide.setAttribute('aria-selected', '');
                emitSelectvent(slide);
              }
              break;
            }
          }
          if (nextSlide) {
            event.preventDefault();
            event.stopPropagation();
            focus(nextSlide);
          }
        }
      }
    };

    const clickHandler = event => {
      event.preventDefault();
      event.stopPropagation();

      if(event.target !== this.element_) {
        const slide = getSlide(event.target);
        focus(slide);

        // Remove 'aria-selected' attribute
        [...this.element_.children]   // Should I use querySelectorAll ???
          .filter( panel => panel.hasAttribute('aria-selected') )
          .forEach( selected => selected.removeAttribute('aria-selected') );

        // Set 'aria-selected' on current slide
        slide.setAttribute('aria-selected', 'true');
        emitSelectvent(slide);
      }
    };

    if (this.element_) {
      this.element_.setAttribute('role', LIGHTBOARD_ROLE);

      if (this.element_.classList.contains(RIPPLE_EFFECT)) {
        this.element_.classList.add(RIPPLE_EFFECT_IGNORE_EVENTS);
      }

      // Listen to keyboard events
      this.element_.removeEventListener('keydown', keydownHandler);
      this.element_.removeEventListener('click', clickHandler);

      this.element_.addEventListener('keydown', keydownHandler, true);
      this.element_.addEventListener('click', clickHandler, true);

      this.upgradeSlides();

      this.element_.classList.add(IS_UPGRADED);
    }
  };

  /**
   * Initialize lightboard slides
   *
   * @private
   */
  MaterialExtLightboard.prototype.upgradeSlides = function() {

    const addRipple = slide => {
      // Use anchor as ripple container
      if(!slide.querySelector(`.${RIPPLE_CONTAINER}`)) {
        const a = slide.querySelector(`a.${SLIDE_TABSTOP}`);
        if(a) {
          const rippleContainer = a;
          rippleContainer.classList.add(RIPPLE_CONTAINER);
          rippleContainer.classList.add(RIPPLE_EFFECT);
          const ripple = document.createElement('span');
          ripple.classList.add(RIPPLE);
          rippleContainer.appendChild(ripple);
          componentHandler.upgradeElement(rippleContainer, RIPPLE_COMPONENT);
        }
      }
    };

    const hasRippleEffect = this.element_.classList.contains(RIPPLE_EFFECT);

    [...this.element_.querySelectorAll(`.${SLIDE}`)].forEach( slide => {
      slide.setAttribute('role', SLIDE_ROLE);

      if(hasRippleEffect) {
        addRipple(slide);
      }
    });
  };

  MaterialExtLightboard.prototype['upgradeSlides'] = MaterialExtLightboard.prototype.upgradeSlides;


  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  /* eslint no-undef: 0 */
  /* jshint undef:false */
  componentHandler.register({
    constructor: MaterialExtLightboard,
    classAsString: 'MaterialExtLightboard',
    cssClass: 'mdlext-js-lightboard',
    widget: true
  });

})();
