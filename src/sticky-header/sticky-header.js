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
 * A sticky header makes site navigation easily accessible anywhere on the page and saves content space at the same.
 * The header should auto-hide, i.e. hiding the header automatically when a user starts scrolling down the page and
 * bringing the header back when a user might need it: they reach the bottom of the page or start scrolling up.
 */

(function() {
  'use strict';

  const IS_UPGRADED = 'is-upgraded';
  const CONTENT_CLASS  = 'mdl-layout__content';
  const IS_SCROLL_CLASS  = 'mdlext-is-scroll';
  //const STICKY_HEADER_CLASS  = 'mdlext-layout__sticky-header';


  /**
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  const MaterialExtStickyHeader = function MaterialExtStickyHeader(element) {
    // Stores the element.
    this.header_ = element;

    // Heder listens to scroll events from content
    this.content_ = null;
    this.lastScrollTop_ = 0;

    // false: allow rAF to be called, true: blocks rAF
    this.drawing_ = false;

    // Initialize instance.
    this.init();
  };

  window['MaterialExtStickyHeader'] = MaterialExtStickyHeader;


  /**
   * Update header width
   * @private
   */
  MaterialExtStickyHeader.prototype.recalcWidth_ = function() {
    this.header_.style.width = `${this.content_.clientWidth}px`;
  };

  /**
   * Adjust header width when window resizes or oreientation changes
   * @param event
   * @private
   */
  MaterialExtStickyHeader.prototype.resizeHandler_ = function( /* event */ ) {

    // See: https://developer.mozilla.org/ru/docs/Web/Events/resize
    if(!this.drawing_) {
      // Assumes MDL has polyfilled rAF
      window.requestAnimationFrame( () => {
        this.recalcWidth_();
        this.drawing_ = false;
      });
    }
    this.drawing_ = true;
  };


  /**
   * Update header position
   * @private
   */
  MaterialExtStickyHeader.prototype.reposition_ = function() {

    const currentContentScrollTop = this.content_.scrollTop;
    const scrollDiff = this.lastScrollTop_ - currentContentScrollTop;
    const headerTop = (parseInt( window.getComputedStyle( this.header_ ).getPropertyValue( 'top' ) ) || 0) + scrollDiff;

    if(currentContentScrollTop <= 0) {
      // Scrolled to the top. Header sticks to the top
      this.header_.style.top = '0';
      this.header_.classList.remove(IS_SCROLL_CLASS);
    }
    else if(scrollDiff > 0) {
      // Scrolled up. Header slides in
      this.header_.style.top = `${( headerTop > 0 ? 0 : headerTop )}px`;
      this.header_.classList.add(IS_SCROLL_CLASS);
    }
    else if(scrollDiff < 0) {
      // Scrolled down
      this.header_.classList.add(IS_SCROLL_CLASS);

      if (this.content_.scrollHeight - this.content_.scrollTop <= this.content_.offsetHeight) {
        // Bottom of content
        this.header_.style.top = '0';
      }
      else {
        const offsetHeight = this.header_.offsetHeight;
        this.header_.style.top = `${( Math.abs( headerTop ) > offsetHeight ? -offsetHeight : headerTop )}px`;
      }
    }

    this.lastScrollTop_ = currentContentScrollTop;
  };

  /**
   * Scroll header when content scrolls
   * @param event
   * @private
   */
  MaterialExtStickyHeader.prototype.scrollHandler_ = function( /* event */ ) {
    // See: https://developer.mozilla.org/ru/docs/Web/Events/resize
    if(!this.drawing_) {
      window.requestAnimationFrame( () => {
        this.reposition_();
        this.drawing_ = false;
      });
    }
    this.drawing_ = true;
  };

  /**
   * Init header position
   * @private
   */
  MaterialExtStickyHeader.prototype.updatePosition_ = function( /* event */ ) {
    this.recalcWidth_();
    this.reposition_();
  };

  /**
   * Initialize component
   */
  MaterialExtStickyHeader.prototype.init = function() {

    if (this.header_) {
      this.content_ = this.header_.parentNode.querySelector(`.${CONTENT_CLASS}`) || null;

      if(this.content_) {
        this.content_.style.paddingTop = `${this.header_.offsetHeight}px`;  // Make room for sticky header
        this.lastScrollTop_ = this.content_.scrollTop;

        this.content_.addEventListener('scroll', this.scrollHandler_.bind(this));
        window.addEventListener('resize', this.resizeHandler_.bind(this));
        window.addEventListener('orientationchange', this.resizeHandler_.bind(this));

        // Adjust header width if content changes (e.g. in a SPA)
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;


        // jsdom does not support MutationObserver - so this is not testable
        /* istanbul ignore next */
        new MutationObserver( ( /*mutations*/ ) => {

          if(!this.drawing_) {
            window.requestAnimationFrame( () => {
              this.updatePosition_();
              this.drawing_ = false;
            });
          }
          this.drawing_ = true;

        }).observe( this.content_, {
          attributes: false,
          childList: true,
          characterData: false
        });

        // Set initial position
        this.updatePosition_();

        // Set upgraded flag
        this.header_.classList.add(IS_UPGRADED);
      }
    }
  };

  /*
   * Downgrade component
   * E.g remove listeners and clean up resources
   * Note: There is a bug i material component container; downgrade is never called!
   * Disables method temporarly to keep code coverage at 100% for functions.
   *
   MaterialExtStickyHeader.prototype.mdlDowngrade_ = function() {
     'use strict';
   };
  */


  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  /* eslint no-undef: 0 */
  componentHandler.register({
    constructor: MaterialExtStickyHeader,
    classAsString: 'MaterialExtStickyHeader',
    cssClass: 'mdlext-js-sticky-header'
  });
})();
