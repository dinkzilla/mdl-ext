import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import createMockRaf from '../testutils/mock-raf';

import MdlExtAnimationLoop from '../../src/utils/animationloop';

describe('MdlExtAnimationLoop', () => {
  "use strict";

  let realRaf;
  let realCaf;
  let mockRaf;
  let rafStub;
  let clock;

  before ( () => {
    jsdomify.create('<!doctype html><html><body><div id="mount"></div></body></html>');
    realRaf = window.requestAnimationFrame;
    realCaf = window.cancelAnimationFrame;
    mockRaf = createMockRaf();
    window.requestAnimationFrame = mockRaf.raf;
    window.cancelAnimationFrame = mockRaf.raf.cancel;
    rafStub = sinon.stub(window, 'requestAnimationFrame', mockRaf.raf);
    clock = sinon.useFakeTimers(Date.now());
  });

  after ( () => {
    clock.restore();
    rafStub.restore();
    window.requestAnimationFrame = realRaf;
    window.cancelAnimationFrame = realCaf;
    jsdomify.destroy();
  });

  describe('#constructor()', () => {

    it('takes zero arguments', () => {
      expect(() => {
        new MdlExtAnimationLoop();
      }).to.not.throw(Error);
    });

    it('zero arguments defaults to ~60fps', () => {
      const animationLoop = new MdlExtAnimationLoop();
      expect(animationLoop.interval_).to.be.equal(1000/60);
    });

    it('takes one argument', () => {
      expect(() => {
        new MdlExtAnimationLoop(2000);
      }).to.not.throw(Error);
    });

    it('should not start when constructed', () => {
      const animationLoop = new MdlExtAnimationLoop();
      expect(animationLoop.running).to.be.false;
    });
  });

  describe('animation loop()', () => {

    it('runs animation loop callback', () => {
      let t = 0;
      let n = 0;
      let interval = 50;
      let duration = 100;

      const animationLoop = new MdlExtAnimationLoop(interval);
      animationLoop.start( timeElapsed => {
        t += timeElapsed;

        if(t <= duration) {
          ++n;
          return true;
        }
        else {
          return false;
        }
      });

      clock.tick(interval);
      mockRaf.step(1);

      clock.tick(interval);
      mockRaf.step(1);

      assert.isAtLeast(n, 2, 'Expected animation loop to be called multiple times');
      animationLoop.stop();
    });

    it('stops animation loop', () => {
      const animationLoop = new MdlExtAnimationLoop();
      animationLoop.start( () => {
        return true;
      });
      expect(animationLoop.running).to.be.true;
      clock.tick(1000/60);
      mockRaf.step(1);
      animationLoop.stop();
      expect(animationLoop.running).to.be.false;
    });

  });

});
