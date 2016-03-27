'use strict';

import 'babel-polyfill';
import requireUncached from 'require-uncached';
import jsdomify from 'jsdomify';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { qs, qsa, removeChilds } from '../testutils/domHelpers';

describe('MaterialExtLightbox', () => {

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Accordion Fixture</title>
</head>
<body>
  <div id='mount'>
  </div>

  <dialog class="mdlext-lightbox mdlext-js-lightbox">
  </dialog>
</body>
</html>`;

  before ( () => {
    jsdomify.create(fixture);

    // Must load MDL after jsdom, see: https://github.com/mochajs/mocha/issues/1722
    requireUncached( 'material-design-lite/material');
    global.componentHandler = window.componentHandler;
    assert.isObject(componentHandler, 'No global MDL component handler');

    //requireUncached('../../src/lightboard/lightboard');
    //assert.isNotNull(window.MaterialExtLightboard, 'Expected MaterialExtAccordion not to be null');
    //global.MaterialExtLightboard = window.MaterialExtLightboard;
  });

  after ( () => {
    jsdomify.destroy()
  });

  it('has document', () => {
    const div = document.createElement('div');
    expect(div.nodeName).eql('DIV');
  });

  it('works', () => {
    const mount = document.querySelector('#mount');
    expect(mount).to.not.be.null;
  });

});
