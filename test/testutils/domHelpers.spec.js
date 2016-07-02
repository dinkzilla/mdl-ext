'use strict';
import jsdomify from 'jsdomify';
import { expect } from 'chai';
import { removeChilds } from './domHelpers';

describe('domHelpers', () => {

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Fixture</title>
</head>
<body>
<main id='mount'>
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
</main>
</body>
</html>`;

  before ( () => {
    jsdomify.create(fixture);
  });

  after ( () => {
    jsdomify.destroy();
  });

  describe('#removeChilds', () => {

    after( () => {
      // Restore fixture in case this suite is not the last to execute
      jsdomify.clear();
    });

    it('should remove child elements', () => {
      const element = removeChilds(document.querySelector('#mount'));
      expect(element.childNodes).to.have.lengthOf(0);
    });

    it('should remove child elements with reflow = false', () => {
      const element = removeChilds(document.querySelector('#mount'), false);
      expect(element.childNodes).to.have.lengthOf(0);
    });

  });

});
