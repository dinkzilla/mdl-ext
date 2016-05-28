'use strict';
import 'babel-polyfill';
import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { removeChilds } from '../testutils/domHelpers';
import createMockRaf from '../testutils/mock-raf';

describe('MaterialExtCarousel', () => {

  const VK_TAB         = 9;
  const VK_ENTER       = 13;
  const VK_ESC         = 27;
  const VK_SPACE       = 32;
  const VK_PAGE_UP     = 33;
  const VK_PAGE_DOWN   = 34;
  const VK_END         = 35;
  const VK_HOME        = 36;
  const VK_ARROW_LEFT  = 37;
  const VK_ARROW_UP    = 38;
  const VK_ARROW_RIGHT = 39;
  const VK_ARROW_DOWN  = 40;

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Carousel Fixture</title>
</head>
<body>
<div id='mount'>
  <ul class="mdlext-carousel mdlext-js-carousel">
    <li class="mdlext-carousel__slide">
      <figure>
        <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
      </figure>
    </li>
  </ul>

  <ul id="carousel-1" class="mdlext-carousel mdlext-js-carousel">
    <li class="mdlext-carousel__slide">
      <figure>
        <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
      </figure>
    </li>
    <li class="mdlext-carousel__slide">
      <figure>
        <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
      </figure>
    </li>
    <li class="mdlext-carousel__slide">
      <figure>
        <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
      </figure>
    </li>
  </ul>
  
</div>
<div id='mount-2'>
</div>
</body>
</html>`;

  const fragment = `
<ul id="carousel-2" class="mdlext-carousel mdlext-js-carousel mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events">
  <li class="mdlext-carousel__slide">
    <figure>
      <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
    </figure>
  </li>
  <li class="mdlext-carousel__slide">
    <figure>
      <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
    </figure>
  </li>
</ul>`;

  const data_config_fragment_single_quotes = `
<ul id="carousel-3" class="mdlext-carousel mdlext-js-carousel mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events" 
  data-config="{ 'interactive': true, 'autostart': false, 'type': 'scroll', 'interval': 5000 }">
  <li class="mdlext-carousel__slide">
    <figure>
      <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
    </figure>
  </li>
  <li class="mdlext-carousel__slide">
    <figure>
      <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
    </figure>
  </li>
</ul>`;

  const data_config_fragment_double_quotes = `
<ul id="carousel-5" class="mdlext-carousel mdlext-js-carousel mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events" 
  data-config='{ "interactive": false, "autostart": false, "type": "slide", "interval": 2000 }'>
  <li class="mdlext-carousel__slide">
    <figure>
      <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
    </figure>
  </li>
  <li class="mdlext-carousel__slide">
    <figure>
      <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
    </figure>
  </li>
</ul>`;

  const data_config_with_malformed_format_fragment = `
<ul id="carousel-4" class="mdlext-carousel mdlext-js-carousel mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events" 
  data-config="{ 'interactive: false, 'autostart': true, 'type': 'scroll', 'interval': 5000 }">
  <li class="mdlext-carousel__slide">
    <figure>
      <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
    </figure>
  </li>
  <li class="mdlext-carousel__slide">
    <figure>
      <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
    </figure>
  </li>
</ul>`;

  const carousel_slide_fragment = `
<li class="mdlext-carousel__slide">
  <figure>
    <img src="./smiley.jpg" alt="smiley" title="Smile :-)"/>
  </figure>
</li>`;


  let realRaf;
  let realCaf;
  let mockRaf;
  let rAFStub;

  before ( () => {
    jsdomify.create(fixture);

    // Must load MDL after jsdom, see: https://github.com/mochajs/mocha/issues/1722
    requireUncached( 'material-design-lite/material');
    global.componentHandler = window.componentHandler;
    assert.isObject(componentHandler, 'Expected a global MDL component handler');

    requireUncached('../../src/carousel/carousel');
    assert.isNotNull(window.MaterialExtCarousel, 'Expected MaterialExtCarousel not to be null');
    global.MaterialExtCarousel = window.MaterialExtCarousel;

    realRaf = window.requestAnimationFrame;
    realCaf = window.cancelAnimationFrame;
    mockRaf = createMockRaf();
    window.requestAnimationFrame = mockRaf.raf;
    window.cancelAnimationFrame = mockRaf.raf.cancel;
    rAFStub = sinon.stub(window, 'requestAnimationFrame', mockRaf.raf);


    // Stub unsupported jsdom window.MutationObserver
    window.MutationObserver = window.MutationObserver ||  (function(undefined) {
        "use strict";

        function MutationObserver(listener) {
          this._watched = [];
          this._listener = listener;
        }

        MutationObserver.prototype = {

          observe: function($target, config) {
          },

          takeRecords: function() {
            var mutations = [];
            return mutations;
          },
          disconnect: function() {
            this._watched = [];
          }
        };

        return MutationObserver;
      })(void 0);

    // TODO: Use mutationobserver-polyfill.js
    //requireUncached('../testutils/mutationobserver-polyfill');
    global.MutationObserver = window.MutationObserver;

  });


  after ( () => {
    rAFStub.restore();
    window.requestAnimationFrame = realRaf;
    window.cancelAnimationFrame = realCaf;
    jsdomify.destroy();
  });

  it('is globally available', () => {
    assert.isFunction(window['MaterialExtCarousel'], 'Expected global MaterialExtCarousel');
  });

  it('should have css class "is-upgraded"', () => {
    const element = document.querySelector('#carousel-1');
    assert.isNotNull(element);
    assert.isTrue(element.classList.contains('is-upgraded'), 'Expected class "is-upgraded" to exist');
  });

  it('should have attribute "data-upgraded"', () => {
    const dataUpgraded = document.querySelector('#carousel-1').getAttribute('data-upgraded');
    assert.isNotNull(dataUpgraded, 'Expected MaterialExtCarousel to have "data-upgraded" attribute');
    assert.isAtLeast(dataUpgraded.indexOf('MaterialExtCarousel'), 0, 'Expected "data-upgraded" attribute to contain "MaterialExtCarousel"');
  });

  it('upgrades successfully when a new component is appended to the DOM', () => {
    const container = document.querySelector('#mount-2');
    container.insertAdjacentHTML('beforeend', fragment);

    try {
      const element = document.querySelector('#carousel-2');
      assert.isFalse(element.classList.contains('is-upgraded'), 'Expected class "is-upgraded" to not exist before upgrade');

      componentHandler.upgradeElement(element, 'MaterialExtCarousel');

      assert.isTrue(element.classList.contains('is-upgraded'), 'Expected carousel to upgrade');

      const dataUpgraded = element.getAttribute('data-upgraded');
      assert.isNotNull(dataUpgraded, 'Expected MaterialExtCarousel to have "data-upgraded" attribute');
      assert.isAtLeast(dataUpgraded.indexOf('MaterialExtCarousel'), 0, 'Expected "data-upgraded" attribute to contain "MaterialExtCarousel"');
    }
    finally {
      removeChilds(container);
    }
  });

  it('downgrades successfully when a component is removed from DOM', () => {
    const container = document.getElementById('mount-2');
    container.insertAdjacentHTML('beforeend', fragment);

    try {
      const element = document.querySelector('#carousel-2');
      componentHandler.upgradeElement(element, 'MaterialExtCarousel');
      expect(element.getAttribute('data-upgraded')).to.include('MaterialExtCarousel');

      componentHandler.downgradeElements(element);
      expect(element.getAttribute('data-upgraded')).to.not.include('MaterialExtCarousel');
    }
    finally {
      removeChilds(container);
    }
  });

  it('should be a widget', () => {
    const container = document.getElementById('mount-2');
    container.insertAdjacentHTML('beforeend', fragment);

    try {
      const element = document.querySelector('#carousel-2');
      componentHandler.upgradeElement(element, 'MaterialExtCarousel');
      expect(element.MaterialExtCarousel).to.be.a('object');
    }
    finally {
      removeChilds(container);
    }
  });

  // role=list, A section containing listitem elements.
  it('has role="list"', () => {
    [...document.querySelectorAll('.mdlext-carousel')].forEach( carousel => {
      assert.equal(carousel.getAttribute('role'), 'list', 'Expected carousel to have role="list"');
    });
  });

  // role=listitem, A single item in a list or directory.
  it('has slides with role="listitem"', () => {
    [...document.querySelectorAll('.mdlext-carousel__slide')].forEach( slide => {
      assert.equal(slide.getAttribute('role'), 'listitem', 'Expected slide to have role="listitem"');
    });
  });

  it('should have public methods available via widget', () => {
    const el = document.querySelector('.mdlext-carousel');
    const methods = [
      'stopAnimation',
      'upgradeSlides',
      'getConfig'
    ];
    methods.forEach((method) => {
      expect(el.MaterialExtCarousel[method]).to.be.a('function');
    });
  });

  it('can call public methodes', () => {
    const el = document.querySelector('.mdlext-carousel');
    el.MaterialExtCarousel.stopAnimation();
    el.MaterialExtCarousel.upgradeSlides();
    el.MaterialExtCarousel.getConfig();
  });

  it('has ripple effect', () => {
    const container = document.querySelector('#mount-2');
    try {
      container.insertAdjacentHTML('beforeend', fragment);
      const element = document.querySelector('#carousel-2');
      componentHandler.upgradeDom();

      const dataUpgraded = element.getAttribute('data-upgraded');
      assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
      assert.isAtLeast(dataUpgraded.indexOf('MaterialRipple'), 0, 'Expected "data-upgraded" attribute to contain "MaterialRipple');

      [...document.querySelectorAll('#mount-2 mdlext-carousel__slide')].forEach( slide => {

        const ripple = slide.querySelector('.mdlext-carousel__slide__ripple-container');
        assert.isNotNull(ripple, 'Expected ripple to exist');

        const dataUpgraded = ripple.getAttribute('data-upgraded');
        assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
        assert.isAtLeast(dataUpgraded.indexOf('MaterialRipple'), 0, 'Expected "data-upgraded" attribute to contain "MaterialRipple');
      });
    }
    finally {
      removeChilds(container);
    }
  });


  it('upgrades dynamically inserted slides', () => {
    const container = document.querySelector('#mount-2');
    try {
      container.insertAdjacentHTML('beforeend', fragment);
      const element = document.querySelector('#carousel-2');

      componentHandler.upgradeDom();

      // Insert a new slide after component has been upgraded
      element.insertAdjacentHTML('beforeend', carousel_slide_fragment);

      [...document.querySelectorAll('#mount-2 mdlext-carousel__slide')].forEach( slide => {

        const ripple = slide.querySelector('.mdlext-carousel__slide__ripple-container');
        assert.isNotNull(ripple, 'Expected ripple to exist');

        const dataUpgraded = ripple.getAttribute('data-upgraded');
        assert.isNotNull(dataUpgraded, 'Expected attribute "data-upgraded" to exist');
        assert.isAtLeast(dataUpgraded.indexOf('MaterialRipple'), 0, 'Expected "data-upgraded" attribute to contain "MaterialRipple');

        assert.equal(slide.getAttribute('role'), 'listitem', 'Expected slide to have role="listitem"');
        assert.equal(slide.getAttribute('tabindex'), '0', 'Expected slide to have tabindex="0"');
      });
    }
    finally {
      removeChilds(container);
    }
  });


  it('interacts with the keyboard', () => {
    const carousel = document.querySelector('#carousel-1');
    [...carousel.querySelectorAll('.mdlext-carousel__slide[aria-selected]')].forEach(
      slide => slide.removeAttribute('aria-selected')
    );
    const slide = carousel.querySelector('.mdlext-carousel__slide:nth-child(1)');
    slide.setAttribute('aria-selected', '');

    spyOnKeyboardEvent(slide, VK_ARROW_DOWN);
    spyOnKeyboardEvent(slide, VK_ARROW_UP);
    spyOnKeyboardEvent(slide, VK_ARROW_LEFT);
    spyOnKeyboardEvent(slide, VK_ARROW_RIGHT);
    spyOnKeyboardEvent(slide, VK_END);
    spyOnKeyboardEvent(slide, VK_HOME);
    spyOnKeyboardEvent(slide, VK_ESC);
    spyOnKeyboardEvent(slide, VK_SPACE);
    spyOnKeyboardEvent(slide, VK_TAB);
    spyOnKeyboardEvent(slide, VK_TAB, true);
    spyOnKeyboardEvent(slide, VK_ENTER);
    spyOnKeyboardEvent(slide, VK_PAGE_DOWN);
    spyOnKeyboardEvent(slide, VK_PAGE_UP);
  });

  it('listens to "command" custom events', () => {
    const carousel = document.querySelector('#carousel-1');
    [...carousel.querySelectorAll('.mdlext-carousel__slide[aria-selected]')].forEach(
      slide => slide.removeAttribute('aria-selected')
    );
    carousel.querySelector('.mdlext-carousel__slide:nth-child(1)').setAttribute('aria-selected', '');

    spyOnCommandEvent(carousel, 'first');
    spyOnCommandEvent(carousel, 'scroll-prev');
    spyOnCommandEvent(carousel, 'prev');
    spyOnCommandEvent(carousel, 'next');
    spyOnCommandEvent(carousel, 'scroll-next');
    spyOnCommandEvent(carousel, 'last');
    spyOnCommandEvent(carousel, 'pause');

    // Play has it's own test
    //ev = new CustomEvent('command', { detail: { action : 'play', interval: 1000 } });
    //carousel.dispatchEvent(ev);
  });

  it('listens to focus and blur events', () => {
    const carousel = document.querySelector('#carousel-1');
    const slide = carousel.querySelector('.mdlext-carousel__slide:nth-child(1)');
    spyOnEvent('focus', slide);
    spyOnEvent('blur', slide);
  });


  it('disables click on image', () => {
    const carousel = document.querySelector('.mdlext-carousel');
    const img = carousel.querySelector('img');

    const spy = sinon.spy();
    img.addEventListener('click', spy);

    const event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });

    try {
      img.dispatchEvent(event);
    }
    finally {
      img.removeEventListener('click', spy);
    }
    assert.isTrue(spy.called, 'Expected "click" event to fire when image is clicked');
    assert.isTrue(event.defaultPrevented, 'Expected "event.preventDefault" to be called when image is clicked');
  });

  it('can drag an image', () => {
    const carousel = document.querySelector('.mdlext-carousel');
    const img = carousel.querySelector('img');
    img.src = './smiley.jpg';

    const mouseDownSpy = sinon.spy();
    img.addEventListener('mousedown', mouseDownSpy, true);

    const mouseMoveSpy = sinon.spy();
    window.addEventListener('mousemove', mouseMoveSpy, true);

    const mouseUpSpy = sinon.spy();
    window.addEventListener('mouseup', mouseUpSpy, true);

    try {
      let event = new MouseEvent('mousedown', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': 10, // clientX/clientY is readonly...
        'clientY': 0   // ... not shure if I can test mouse movement
      });
      img.dispatchEvent(event);

      event = new MouseEvent('mousemove', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': 20,
        'clientY': 0
      });
      window.dispatchEvent(event);
      mockRaf.step(100);

      window.dispatchEvent(new MouseEvent('mousemove', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': 200,
        'clientY': 0
      }));
      mockRaf.step(100);

      window.dispatchEvent(new MouseEvent('mousemove', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': 400,
        'clientY': 0
      }));
      mockRaf.step(100);

      event = new MouseEvent('mouseup', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': 400,
        'clientY': 0
      });
      window.dispatchEvent(event);
    }
    finally {
      img.removeEventListener('mousedown', mouseDownSpy);
      window.removeEventListener('mousemove', mouseMoveSpy);
      window.removeEventListener('mouseup', mouseUpSpy);
    }
    assert.isTrue(mouseDownSpy.called, 'Expected "mousedown" event to fire');
    assert.isTrue(mouseMoveSpy.called, 'Expected "mousemove" event to fire');
    assert.isTrue(mouseUpSpy.called, 'Expected "mouseup" event to fire');
  });


  it('emits a "select" event if drag distance is less than 2px', () => {
    const carousel = document.querySelector('.mdlext-carousel');
    const img = carousel.querySelector('img');
    img.src = './smiley.jpg';

    const spy = sinon.spy();
    carousel.addEventListener('select', spy);

    try {
      let event = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 10, // clientX/clientY is readonly...
        clientY: 0  // ... not shure if I can test mouse movement
      });
      img.dispatchEvent(event);

      event = new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 11,
        clientY: 0
      });
      window.dispatchEvent(event);
    }
    finally {
      carousel.removeEventListener('select', spy);
    }
    assert.isTrue(spy.called, 'Expected "select" event to fire');
  });


  it('has attribute "aria-selected" when selected', () => {
    const carousel = document.querySelector('#carousel-1');
    assert.isNotNull(carousel, 'Expected handle to carousel');

    const slide = carousel.querySelector('.mdlext-carousel__slide:nth-child(2)');
    assert.isNotNull(slide, 'Expected handle to slide');
    slide.focus();

    const spy = sinon.spy();
    carousel.addEventListener('select', spy);

    const selectListener = ( event ) => {
      assert.isNotNull(event.detail.source.getAttribute('aria-selected'), 'Expected slide to have attribute "aria-selected"');

      const selectList = [...carousel.queryselectorAll('.mdlext-carousel__slide')].filter(
        slide => slide.hasAttribute('aria-selected')
      );
      assert.equal(selectList.length, 1, 'Expected only one slide to have attribute "aria-selected"');
    };
    carousel.addEventListener('select', selectListener);

    try {
      // Trigger enter key on a slide
      const evt = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        keyCode: VK_ENTER,
        shiftKey: false,
        view: window
      });

      slide.dispatchEvent(evt);
    }
    finally {
      carousel.removeEventListener('select', selectListener);
      carousel.removeEventListener('select', spy);
    }
    assert.isTrue(spy.called, 'Expected "select" event to fire');
  });


  it('listens to "command" custom event and answers with a "select" custom event', () => {
    const carousel = document.querySelector('#carousel-1');
    const slide = carousel.querySelector('.mdlext-carousel__slide:nth-child(1)');
    slide.setAttribute('aria-selected', '');

    const spy = sinon.spy();
    carousel.addEventListener('select', spy);

    const selectListener = ( event ) => {
    };
    carousel.addEventListener('select', selectListener);

    try {
      const ev = new CustomEvent('command', { detail: { action : 'next' } } );
      carousel.dispatchEvent(ev);
    }
    finally {
      carousel.removeEventListener('select', selectListener);
      carousel.removeEventListener('select', spy);
    }
    assert.isTrue(spy.called, 'Expected "select" event to fire');
  });


  it('reads "data-config" attribute and stores config data', () => {
    const container = document.querySelector('#mount-2');
    container.insertAdjacentHTML('beforeend', data_config_fragment_single_quotes);

    try {
      const element = document.querySelector('#carousel-3');
      expect(() => {
        componentHandler.upgradeElement(element, 'MaterialExtCarousel');
      }).to.not.throw(Error);

      const c = element.MaterialExtCarousel.getConfig();
      expect(c.interactive).to.be.true;
      expect(c.autostart).to.be.false;
      expect(c.type).to.equal('scroll');
      expect(c.interval).to.equal(5000);
      expect(c.animationLoop).to.not.be.null;
    }
    finally {
      removeChilds(container);
    }
  });

  it('accepts "data-config" attribute with double quotes', () => {
    const container = document.querySelector('#mount-2');
    container.insertAdjacentHTML('beforeend', data_config_fragment_double_quotes);

    try {
      const element = document.querySelector('#carousel-5');
      expect(() => {
        componentHandler.upgradeElement(element, 'MaterialExtCarousel');
      }).to.not.throw(Error);

      const c = element.MaterialExtCarousel.getConfig();
      expect(c.interactive).to.be.false;
      expect(c.autostart).to.be.false;
      expect(c.type).to.equal('slide');
      expect(c.interval).to.equal(2000);
      expect(c.animationLoop).to.not.be.null;
    }
    finally {
      removeChilds(container);
    }
  });

  it('throws an error if "data-config" attribute is malformed', () => {
    const container = document.querySelector('#mount-2');
    container.insertAdjacentHTML('beforeend', data_config_with_malformed_format_fragment);

    try {
      const element = document.querySelector('#carousel-4');
      expect(() => {
        componentHandler.upgradeElement(element, 'MaterialExtCarousel');
      }).to.throw(Error);
    }
    finally {
      removeChilds(container);
    }
  });

  it('can play slides', () => {
    const carousel = document.querySelector('#carousel-1');
    const spy = sinon.spy();
    carousel.addEventListener('select', spy);

    /*
    const selectListener = ( event ) => {
      console.log('*****', event);
    };
    carousel.addEventListener('select', selectListener);
    */

    let ev = new CustomEvent('command', { detail: { action : 'play', type: 'slide', interval: 100 } } );
    carousel.dispatchEvent(ev);
    mockRaf.step(200);

    assert.isAtLeast(spy.callCount, 2, 'Expected "select" event to fire more than once');
    const c = carousel.MaterialExtCarousel.getConfig();
    expect(c.interval).to.equal(100);

    ev = new CustomEvent('command', { detail: { action : 'play', type: 'scroll', interval: 100 } } );
    carousel.dispatchEvent(ev);
    mockRaf.step(100);
  });

  function spyOnEvent(name, target) {
    const spy = sinon.spy();
    target.addEventListener(name, spy);

    const evt = new Event(name, {
      bubbles: true,
      cancelable: true,
      view: window
    });
    target.dispatchEvent(evt);
    target.removeEventListener(name, spy);
    assert.isTrue(spy.calledOnce, `Expected event ${name} to fire once`);
  }

  function spyOnKeyboardEvent(target, keyCode, shiftKey=false) {
    const spy = sinon.spy();
    target.addEventListener('keydown', spy, true);

    try {
      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        keyCode: keyCode,
        shiftKey: shiftKey,
        view: window
      });
      target.dispatchEvent(event);
    }
    finally {
      target.removeEventListener('keydown', spy);
    }

    assert.isTrue(spy.calledOnce, `Expected "keydown" event to fire once for key code ${keyCode}`);
  }

  function spyOnCommandEvent(target, action) {
    const spy = sinon.spy();
    target.addEventListener('command', spy);
    try {
      const event = new CustomEvent('command', { detail: { action : action } });
      target.dispatchEvent(event);
    }
    finally {
      target.removeEventListener('select', spy);
    }
    assert.isTrue(spy.calledOnce, `Expected "command" event to fire once for action ${action}`);
  }

});
