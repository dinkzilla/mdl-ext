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
}

export {removeChildElements, moveElements};

