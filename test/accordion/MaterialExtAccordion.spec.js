'use strict';
import 'babel-polyfill';
import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { qs, qsa } from '../testutils/domHelpers';

describe('MaterialExtAccordion', () => {

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Accordion Fixture</title>
</head>
<body>
<div id='mount'>

<div class="a-user-defined-accordion-container">

  <ul id="accordion-1" class="mdlext-accordion mdlext-js-accordion" aria-multiselectable="false">
    <li class="mdlext-accordion__panel" open >
      <header class="mdlext-accordion__panel__header">
        <a href="#"></a>
        <div class="mdlext-accordion__panel__header__transform">
          <h5>First section</h5>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique eget augue eget gravida.</p>
        <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel.</p>
      </section>
    </li>
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <a href="#"></a>
        <div class="mdlext-accordion__panel__header__transform">
          <h5>Second</h5>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel
          justo. Quisque at dui urna. Duis vel velit leo.</p>
      </section>
    </li>
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <a href="#"></a>
        <div class="mdlext-accordion__panel__header__transform">
          <h5>Section #3</h5>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>
    </li>
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <a href="#"></a>
        <div class="mdlext-accordion__panel__header__transform">
          <h5>Fourth section</h5>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Maecenas eu vestibulum orci. Ut eget nisi a est sagittis euismod a vel.</p>
      </section>
    </li>
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <a href="#"></a>
        <div class="mdlext-accordion__panel__header__transform">
          <h5>Fifth</h5>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique eget augue eget gravida.</p>
      </section>
    </li>
  </ul>
</div>
</div>
</body>
</html>`;


  before ( () => {
    jsdomify.create(fixture);

    // Must load MDL after jsdom, see: https://github.com/mochajs/mocha/issues/1722
    requireUncached( 'material-design-lite/material');
    global.componentHandler = window.componentHandler;
    assert.isObject(componentHandler, 'No global MDL component handler');

    requireUncached('../../src/accordion/MaterialExtAccordion');
    assert.isNotNull(window.MaterialExtAccordion, 'Expected MaterialExtAccordion not to be null');
    global.MaterialExtAccordion = window.MaterialExtAccordion;

    //global.componentHandler.upgradeAllRegistered();
    //global.componentHandler.upgradeDom();

  });

  after ( () => {
    jsdomify.destroy()
  });

  it('is globally available', () => {
    assert.isFunction(window['MaterialExtAccordion'], 'No global MaterialExtAccordion');
  });

  it('upgrades successfully', () => {
    const element = qs('#accordion-1');
    assert.isTrue(element.classList.contains('is-upgraded'));
  });

  it('has role="tablist"', () => {
    [...qsa('.mdlext-accordion')].forEach( accordion => {
      assert.equal(accordion.getAttribute('role'), 'tablist');
    });
  });

});
