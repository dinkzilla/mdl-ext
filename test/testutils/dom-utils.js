/**
 * Remove child element(s)
 * element.innerHTNL = '' has a performance penality!
 * @see http://jsperf.com/empty-an-element/16
 * @see http://jsperf.com/force-reflow
 * @param element
 * @param forceReflow
 */
const removeChildElements = (element, forceReflow = true) => {

  // See: http://jsperf.com/empty-an-element/16
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
  if(forceReflow) {
    // See: http://jsperf.com/force-reflow
    const d = element.style.display;

    element.style.display = 'none';
    element.style.display = d;
  }
};

/**
 * Moves child elements from a DOM node to another dom node.
 * @param source {HTMLElement}
 * @param target {HTMLElement} If the target parameter is ommited, a document fragment is created
 * @return {HTMLElement} The target node
 *
 * @example
 * // Moves child elements from a DOM node to another dom node.
 * moveElements(source, destination);
 *
 * @example
 * // If the second parameter is ommited, a document fragment is created:
 * let fragment = moveElements(source);
 *
 * @See: https://github.com/webmodules/dom-move
 */
const moveElements = (source, target) => {
  if (!target) {
    target = source.ownerDocument.createDocumentFragment();
  }
  while (source.firstChild) {
    target.appendChild(source.firstChild);
  }
  return target;
};


/**
 * Get a list of offset parents for given element
 * @see https://www.benpickles.com/articles/51-finding-a-dom-nodes-common-ancestor-using-javascript
 * @param el the element
 * @return {Array} a list of offset parents
 */
/*
const offsetParents = (el) => {
  const elements = [];
  for (; el; el = el.offsetParent) {
    elements.unshift(el);
  }
  if(!elements.find(e => e === document.body)) {
    elements.unshift(document.body);
  }
  return elements;
};
*/

/**
 * Finds the common offset ancestor of two DOM nodes
 * @see https://www.benpickles.com/articles/51-finding-a-dom-nodes-common-ancestor-using-javascript
 * @see https://gist.github.com/benpickles/4059636
 * @param a
 * @param b
 * @return {Element} The common offset ancestor of a and b
 */
/*
const commonOffsetAncestor = (a, b) => {
  const parentsA = offsetParents(a);
  const parentsB = offsetParents(b);

  for (let i = 0; i < parentsA.length; i++) {
    if (parentsA[i] !== parentsB[i]) return parentsA[i-1];
  }
};
*/

/**
 * Calculate position relative to a target element
 * @see http://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
 * @param target
 * @param el
 * @return {{top: number, left: number}}
 */
/*
const positionRelativeToTarget = (target, el) => {
  let top = 0;
  let left = 0;

  while(el) {
    top += (el.offsetTop - el.scrollTop + el.clientTop) || 0;
    left += (el.offsetLeft - el.scrollLeft + el.clientLeft) || 0;
    el = el.offsetParent;

    if(el === target) {
      break;
    }
  }
  return { top: top, left: left };
};
*/

export {removeChildElements, moveElements};

