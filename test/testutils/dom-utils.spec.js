'use strict';
import jsdomify from 'jsdomify';
import { expect } from 'chai';
import { removeChildElements, moveElements } from './dom-utils';

describe('dom-utils', () => {

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
<div id="target">
</div>
</body>
</html>`;

  before ( () => {
    jsdomify.create(fixture);
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

});
