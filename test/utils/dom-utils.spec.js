'use strict';
import jsdomify from 'jsdomify';
import sinon from 'sinon';
import {patchJsDom} from '../testutils/patch-jsdom';
import {
  removeChildElements,
  moveElements,
  getWindowViewport,
  isRectInsideWindowViewport,
  getScrollParents,
  tether
} from '../../src/utils/dom-utils';

const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;

describe('dom-utils', () => {

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Fixture</title>
  <style>
    #mount { position:relative; }
    #control-1, #control-1 > div { position:absolute; top:50px; left:50px; height:10px; width:20px; }
    #tether-1, #tether-1 > div { position:absolute; height:200px; width:150px; }
  </style>
</head>
<body>
<main id='mount'>
  <div id="control-1">
    <div></div>
  </div>

  <p>Paragraph #1</p>
  <p>Paragraph #2</p>
  <section>
    <p>Paragraph #3</p>
    <p class='foo'>Paragraph #4</p>
    <article>
      <p>Paragraph #5</p>
    </article>
  </section>
  <section>
    <p>Paragraph #6</p>
    <p class='foo'>Paragraph #7</p>
  </section>
  <section>
    <div id="tether-1">
      <div></div>
    </div>
  </section>
</main>
<div id="target">
</div>
</body>
</html>`;

  before ( () => {
    patchJsDom(fixture);
  });

  after ( () => {
    jsdomify.destroy();
  });

  describe('#removeChildElements', () => {

    afterEach( () => {
      // Restore fixture
      jsdomify.clear();
    });

    it('should remove child elements', () => {
      const element = document.querySelector('#mount');
      expect(element.children).to.not.have.lengthOf(0);
      removeChildElements(element);
      expect(element.children).to.have.lengthOf(0);
    });

    it('should remove child elements with reflow = false', () => {
      const element = document.querySelector('#mount');
      expect(element.children).to.not.have.lengthOf(0);
      removeChildElements(element, false);
      expect(element.children).to.have.lengthOf(0);
    });
  });

  describe('#moveElements', () => {

    afterEach( () => {
      jsdomify.clear();
    });

    it('should move elements into a fragment', () => {
      const src = document.querySelector('#mount');
      expect(src.children).to.not.have.lengthOf(0);

      const target = moveElements(src);
      expect(src.children).to.have.lengthOf(0);
      expect(target.children).to.not.have.lengthOf(0);
    });

    it('should move elements from source to target', () => {
      const src = document.querySelector('#mount');
      const target = document.querySelector('#target');

      expect(src.children).to.not.have.lengthOf(0);
      expect(target.children).to.have.lengthOf(0);

      moveElements(src, target);
      expect(src.children).to.have.lengthOf(0);
      expect(target.children).to.not.have.lengthOf(0);
    });
  });

  describe('#getWindowViewport', () => {
    it('should have a width and height', () => {
      const { viewportWidth, viewportHeight } = getWindowViewport();
      expect(viewportWidth).not.to.be.NaN
      expect(viewportHeight).not.to.be.NaN
      expect(viewportWidth).to.be.above(480);
      expect(viewportHeight).to.be.above(480);
    });
  });

  describe('#isRectInsideWindowViewport', () => {
    it('is inside viewport', () => {
      const { viewportWidth, viewportHeight } = getWindowViewport();
      expect(isRectInsideWindowViewport({top:0, left:0, bottom:viewportHeight, right:viewportWidth})).to.be.true;
    });
    it('is not inside viewport', () => {
      const { viewportWidth, viewportHeight } = getWindowViewport();
      expect(isRectInsideWindowViewport({top:-1, left:-1, bottom:viewportHeight-1, right:viewportWidth-1})).to.be.false;
      expect(isRectInsideWindowViewport({top:viewportHeight+10, left:0, bottom:viewportHeight+101, right:viewportWidth-10})).to.be.false;
    });
  });

  describe('#getScrollParents', () => {
    it('should have at least one parent', () => {
      expect(getScrollParents(document.querySelector('.foo'))).to.have.length.of.at.least(1);
    });
    it('should always have document.body as one of it\'s scroll parents', () => {
      expect(getScrollParents(document.querySelector('.foo')).filter( e => e === document.body)).to.have.length.of(1);
    });
  });

  describe('#tether', () => {

    let controlElement;
    let controlElementTop;
    let controlElementLeft;
    let controlElementWidth;
    let controlElementHeight;
    let gbcrStubControl;

    let tetherElement;
    let tetherElementTop;
    let tetherElementLeft;
    let tetherElementWidth;
    let tetherElementHeight;
    let gbcrStubTether;

    beforeEach(() => {
      controlElement = document.querySelector('#control-1');
      controlElement.style.width = '40px';
      controlElement.style.height = '20px';
      controlElementTop = 10;
      controlElementLeft = 10;
      controlElementWidth = 40;
      controlElementHeight = 20;
      gbcrStubControl = sinon.stub(controlElement, 'getBoundingClientRect', () => {
        return {
          top: controlElementTop,
          left: controlElementLeft,
          width: controlElementWidth,
          height: controlElementHeight
        };
      });

      tetherElement = document.querySelector('#tether-1');
      tetherElement.style.position = 'absolute';
      tetherElement.style.width = '200px';
      tetherElement.style.height = '100px';
      tetherElementTop = 300;
      tetherElementLeft = 100;
      tetherElementWidth = 200;
      tetherElementHeight = 100;
      gbcrStubTether = sinon.stub(tetherElement, 'getBoundingClientRect', () => {
        return {
          top: tetherElementTop,
          left: tetherElementLeft,
          width: tetherElementWidth,
          height: tetherElementHeight
        };
      });
    });

    afterEach(() => {
      gbcrStubControl.restore();
      gbcrStubTether.restore();
    });


    it('should position the tether element next to the control', () => {

      // Difficult to test in JsDom
      const tetherElement = document.querySelector('#tether-1');

      const top = window.getComputedStyle(tetherElement).top;
      const left = window.getComputedStyle(tetherElement).left;

      tether(controlElement, tetherElement);

      //console.log('*****', tetherElement.offsetHeight, tetherElement.offsetWidth, window.getComputedStyle(tetherElement).width, window.getComputedStyle(tetherElement).height);

      expect(window.getComputedStyle(tetherElement).top).to.not.equal(top);
      expect(window.getComputedStyle(tetherElement).left).to.not.equal(left);

      tetherElement.style.width = '2000px';
      tetherElement.style.height = '2000px';
      tetherElementTop = 300;
      tetherElementLeft = 100;
      tetherElementWidth = 2000;
      tetherElementHeight = 2000;

      tether(controlElement, tetherElement);

      tetherElement.style.width = '400px';
      tetherElement.style.height = '2px';
      tetherElementTop = 300;
      tetherElementLeft = 100;
      tetherElementWidth = 400;
      tetherElementHeight = 2;

      tether(controlElement, tetherElement);

    });
  });

});
