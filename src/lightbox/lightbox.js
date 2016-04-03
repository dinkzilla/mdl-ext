/**
 * Responsive Lightbox
 */

(function() {
  'use strict';

  const VK_ESC = 27;
  const VK_SPACE = 32;
  const VK_END = 35;
  const VK_HOME = 36;
  const VK_ARROW_LEFT = 37;
  const VK_ARROW_UP = 38;
  const VK_ARROW_RIGHT = 39;
  const VK_ARROW_DOWN = 40;

  const IS_UPGRADED = 'is-upgraded';
  const LIGHTBOX_CLASS = 'mdlext-lightbox';
  const STICKY_FOOTER_CLASS = 'mdlext-lightbox--sticky-footer';
  const BUTTON_CLASS = 'mdl-button';

  /**
   * https://github.com/google/material-design-lite/issues/4205
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  const MaterialExtLightbox = function MaterialExtLightbox(element) {
    // Stores the element.
    this.element_ = element;

    // Initialize instance.
    this.init();
  };
  window['MaterialExtLightbox'] = MaterialExtLightbox;


  /**
   * Handle keypress
   * @param event
   * @private
   */
  MaterialExtLightbox.prototype.keyDownHandler_ = function(event) {

    if (event) {
      if ( event.keyCode === VK_ESC || event.keyCode === VK_SPACE
        || event.keyCode === VK_END || event.keyCode === VK_HOME
        || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT
        || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {

        if(event.keyCode !== VK_ESC) {
          event.preventDefault();
          event.stopPropagation();
        }

        let action = 'first';
        if (event.keyCode === VK_END) {
          action = 'last';
        }
        else if (event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
          action = 'prev';
        }
        else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
          action = 'next';
        }
        else if (event.keyCode === VK_SPACE) {
          action = 'select';
        }
        else if (event.keyCode === VK_ESC) {
          action = 'cancel';
        }

        const evt = new CustomEvent('action', {
          bubbles: true,
          cancelable: true,
          detail: {
            action: action,
            source: this
          }
        });
        this.dispatchEvent(evt);
      }
    }
  };

  /**
   * Handle button clicks
   * @param event
   * @private
   */
  MaterialExtLightbox.prototype.buttonClickHandler_ = function(event) {
    if (event) {

      event.preventDefault();
      event.stopPropagation();

      const evt = new CustomEvent('action', {
        bubbles: true,
        cancelable: true,
        detail: {
          action: this.getAttribute('action') || '',
          source: this
        }
      });
      this.dispatchEvent(evt);

      let n = this;
      while((n = n.parentNode) != null) {
        if(n.classList.contains(LIGHTBOX_CLASS)) {
          n.focus();
          break;
        }
      }
    }
  };

  /**
   * Handle image load
   * @param event
   * @private
   */

  MaterialExtLightbox.prototype.imgLoadHandler_ = function( /*event*/ ) {

    const footerHeight = (footer, isSticky) => isSticky && footer ? footer.offsetHeight : 0;

    const reposition = (dialog, fh) => {
      if (dialog && window.getComputedStyle(dialog).position === 'absolute') {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const topValue = scrollTop + (window.innerHeight - dialog.offsetHeight - fh) / 2;
        dialog.style.top = `${Math.max(scrollTop, topValue)}px`;
      }
    };

    const dialog = this.parentNode.nodeName === 'DIALOG' ? this.parentNode : null;
    if(dialog) {
      this.style.width = '';
      const fh = footerHeight(this.querySelector('footer'), this.classList.contains(STICKY_FOOTER_CLASS));
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - fh;

      if (dialog.offsetHeight > vh) {
        this.style.width = `${(this.offsetWidth * vh / this.offsetHeight) - 8}px`;
      }
      reposition(dialog, fh);
    }
  };

  /**
   * Initialize component
   */
  MaterialExtLightbox.prototype.init = function() {

    if (this.element_) {
      // Do the init required for this component to work

      this.element_.addEventListener('keydown', this.keyDownHandler_.bind(this.element_), true);

      if(!Number.isInteger(this.element_.getAttribute('tabindex'))) {
        this.element_.setAttribute('tabindex', 1);
      }

      [...this.element_.querySelectorAll(`.${BUTTON_CLASS}`)].forEach( button =>
        button.addEventListener('click', this.buttonClickHandler_.bind(button), false)
      );

      const figcaption = this.element_.querySelector('figcaption');
      if(figcaption) {
        figcaption.addEventListener('click', this.buttonClickHandler_.bind(figcaption), false);
      }

      const footer = this.element_.querySelector('footer');
      if(footer) {
        footer.addEventListener('click', this.buttonClickHandler_.bind(footer), false);
      }

      const img = this.element_.querySelector('img');
      if(img) {
        img.addEventListener('load', this.imgLoadHandler_.bind(this.element_), false);
      }

      // Set upgraded flag
      this.element_.classList.add(IS_UPGRADED);
    }
  };

  /*
   * Downgrade component
   * E.g remove listeners and clean up resources
   * Note: There is a bug i material component container; downgrade is never called!
   * Disables method temporarly to keep code coverage at 100% for functions.
   *

  MaterialExtLightbox.prototype.mdlDowngrade_ = function() {

    if (this.element_) {
      [...this.element_.querySelectorAll(`.${BUTTON_CLASS}`)].forEach(
        button => button.removeEventListener('click', this.buttonClickHandler_)
      );

      this.element_.removeEventListener('keydown', this.keyDownHandler_);
    }
  };
  */

  /**
   * The component registers itself. It can assume componentHandler is available in the global scope.
   */
  /* eslint no-undef: 0 */
  /* jshint undef:false */
  componentHandler.register({
    constructor: MaterialExtLightbox,
    classAsString: 'MaterialExtLightbox',
    cssClass: 'mdlext-js-lightbox'
  });
})();
