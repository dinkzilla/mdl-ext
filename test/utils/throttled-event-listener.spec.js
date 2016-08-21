import jsdomify from 'jsdomify';
import sinon from 'sinon';
import createMockRaf from '../testutils/mock-raf';
import throttledEventListener from '../../src/utils/throttled-event-listener';

const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('throttledEventListener', () => {
  "use strict";

  let realRaf;
  let realCaf;
  let mockRaf;
  let stub;

  before ( () => {
    jsdomify.create('<!doctype html><html><body><div id="mount"></div></body></html>');
    realRaf = window.requestAnimationFrame;
    realCaf = window.cancelAnimationFrame;
    mockRaf = createMockRaf();
    window.requestAnimationFrame = mockRaf.raf;
    window.cancelAnimationFrame = mockRaf.raf.cancel;
    stub = sinon.stub(window, 'requestAnimationFrame', mockRaf.raf);

  });

  after ( () => {
    stub.restore();
    window.requestAnimationFrame = realRaf;
    window.cancelAnimationFrame = realCaf;
    jsdomify.destroy();
  });

  it('creates a throttled event with a reference to observed wrapper', () => {
    let remmoveListener;

    expect( () => {
      remmoveListener = throttledEventListener('resize', window, e => {} );
    }).to.not.throw(Error);

    expect(remmoveListener).to.be.a('function');
    remmoveListener();
  });

  it('trigger when ready', () => {
    const callback = sinon.spy();
    const removeListener = throttledEventListener('resize', window, callback);
    const event = new Event('resize');

    window.dispatchEvent(event);
    expect(callback.called).to.equal(false);

    mockRaf.step();
    expect(callback.called).to.equal(true);

    removeListener();
  });

});
