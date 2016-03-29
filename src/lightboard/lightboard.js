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
  const LIGHTBOARD = 'mdlext-lightboard';
  const SLIDE = 'mdlext-lightboard__slide';
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
   * Initialize lightboard slides
   *
   * @private
   */
  MaterialExtLightboard.prototype.initLightboard_ = function() {

    this.element_.setAttribute('role', 'grid');
    [...this.element_.querySelectorAll(`.${SLIDE}`)].forEach(
      slide => slide.setAttribute('role', 'cell')
    );

    if (this.element_.classList.contains(RIPPLE_EFFECT)) {
      this.element_.classList.add(RIPPLE_EFFECT_IGNORE_EVENTS);

      [...this.element_.querySelectorAll(`.${SLIDE}`)].forEach(
        slide => addRipple(slide)
      );
    }

    /**
     * Trigger when user cliks on a slide
     */
    this.element_.addEventListener('click', ( function(event) {
      event.preventDefault();
      event.stopPropagation();
      const slide = getSlide(event.target);

      if(event.target !== this) {
        focus(slide);

        // Remove 'aria-selected' attribute
        [...this.children]   // Should I use querySelectorAll ???
          .filter( panel => panel.hasAttribute('aria-selected'))
          .forEach( selected => selected.removeAttribute('aria-selected'));

        // Set 'aria-selected' on current slide
        slide.setAttribute('aria-selected', '');

        const evt = new CustomEvent('select', {
          bubbles: true,
          cancelable: true,
          detail: { source: slide }
        });
        this.dispatchEvent(evt);
      }
    }).bind(this.element_), true);

    /**
     * Trigger when user presses a keboard key
     */
    this.element_.addEventListener('keydown', ( function(event) {
      // Maybe this function should be throttled??
      if (event.keyCode === VK_TAB
        || event.keyCode === VK_ENTER || event.keyCode === VK_SPACE
        || event.keyCode === VK_END || event.keyCode === VK_HOME
        || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT
        || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {

        if(event.target !== this) {
          const panel = getSlide(event.target);
          const panels = this.children;
          let nextPanel = null;
          const n = this.childElementCount - 1;

          for (let i = 0; i <= n; i++) {
            if (event.keyCode === VK_HOME) {
              nextPanel = panels[0];
              break;
            }
            else if (event.keyCode === VK_END) {
              nextPanel = panels[n];
              break;
            }

            if (panels[i] === panel) {
              if (event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
                nextPanel =  i > 0 ? panels[i - 1] : panels[n];
              }
              else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
                nextPanel = i < n ? panels[i + 1] : panels[0];
              }
              else if (event.keyCode === VK_TAB) {
                if (event.shiftKey) {
                  if (i > 0) {
                    nextPanel = panels[i - 1];
                  }
                }
                else if (i < n) {
                  nextPanel = panels[i + 1];
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
                panel.dispatchEvent(evt);
              }
              break;
            }
          }
          if (nextPanel) {
            event.preventDefault();
            event.stopPropagation();
            focus(nextPanel);
          }
        }
      }
    }).bind(this.element_), true);

    this.element_.classList.add(IS_UPGRADED);
  };

  function getSlide(element) {
    if (!element  || element.classList.contains(LIGHTBOARD)) {
      return null;
    }
    return element.classList.contains(SLIDE) ? element : getSlide(element.parentNode);
  }

  function focus(slide) {
    if(slide) {
      const a = slide.querySelector(`a.${SLIDE_TABSTOP}`);
      if (a) {
        a.focus();
      }
    }
  }

  function addRipple(slide) {
    // Use anchor as ripple container
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

  /**
   * Initialize component
   */
  MaterialExtLightboard.prototype.init = function() {
    if (this.element_) {
      this.initLightboard_();
    }
  };

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
