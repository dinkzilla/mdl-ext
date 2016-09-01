import jsdomify from 'jsdomify';
import sinon from 'sinon';
import createMockRaf from '../testutils/mock-raf';
import intervalFunction from '../../src/utils/interval-function';

const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('intervalFunction', () => {
  "use strict";

  let realRaf;
  let realCaf;
  let mockRaf;
  let rafStub;
  let clock;
  let interval = 1000/60;

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

  it('creates an interval function', () => {
    const callback = () => {};
    const interval = intervalFunction(callback);
    expect(interval).to.be.a('function');
  });

  it('returns refernce to "start", "stop", "immediate" and "started"', () => {
    const callback = () => {};
    const interval = intervalFunction(callback)();
    const {start, stop, immediate, started} = interval;
    expect(start).to.be.a('function');
    expect(stop).to.be.a('function');
    expect(immediate).to.be.a('function');
    expect(started).to.be.a('boolean');
  });

  it('should not start when constructed', () => {
    const callback = () => {};
    const interval = intervalFunction(callback)();
    expect(interval.started).to.be.false;
  });


  it('trigger the callback once per interval', () => {
    let n = 0;
    let interval = 40;

    const loop = intervalFunction( () => {
      ++n;
      return true;
    }, interval)();


    loop.start();

    clock.tick(interval);
    mockRaf.step();

    clock.tick(interval/2);
    mockRaf.step();

    clock.tick(interval/2);
    mockRaf.step();

    assert.equal(n, 2, 'Expected animation loop to be called twice');

    assert.isTrue(loop.started, 'Expected loop to run');

    loop.stop();

    assert.isFalse(loop.started, 'Expected loop to stop');
  });


  it('cancels the loop if callback return false', () => {
    let t = 0;
    let n = 0;
    let interval = 50;
    let duration = 100;

    const loop = intervalFunction(timeElapsed => {
      t += timeElapsed;
      ++n;

      if(t < duration) {
        return true;
      }
      else {
        return false;
      }
    }, interval)();


    loop.start();

    clock.tick(interval);
    mockRaf.step();

    assert.isTrue(loop.started, 'Expected loop to be started');

    clock.tick(interval);
    mockRaf.step();

    assert.isFalse(loop.started, 'Expected loop to be stopped');

    clock.tick(interval);
    mockRaf.step();

    clock.tick(interval);
    mockRaf.step();

    assert.equal(n, 2, 'Expected animation loop to be called twice');
    loop.stop();
  });

  it('trigger the callback twice when immediate is called', () => {
    let n = 0;

    const loop = intervalFunction( () => {
      ++n;
      return true;
    }, 10)();

    loop.immediate();
    loop.start();

    clock.tick(1000);
    mockRaf.step();

    assert.equal(n, 2, 'Expected animation loop to be called twice');
    loop.stop();
  });


});
