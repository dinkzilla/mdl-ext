'use strict';

/**
 * Remove child element(s)
 * element.innerHTNL = '' has a performance penality!
 * @see http://jsperf.com/empty-an-element/16
 * @see http://jsperf.com/force-reflow
 * @param element
 * @param forceReflow
 * @returns {*}
 */
export function removeChilds(element, forceReflow = true) {

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
  return element;
}
