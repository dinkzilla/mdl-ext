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
 * Get the browser viewport dimensions
 * @see http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
 * @return {{windowWidth: number, windowHeight: number}}
 */
const getWindowViewport = () => {
  return {
    viewportWidth: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    viewportHeight: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  };
};


/**
 * Check whether an element is in the window viewport
 * @see http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/
 * @param top
 * @param left
 * @param bottom
 * @param right
 * @return {boolean} true if rectangle is inside window viewport, otherwise false
 */
const isRectInsideWindowViewport = ({ top, left, bottom, right }) => {
  const { viewportWidth, viewportHeight } = getWindowViewport();
  return top >= 0 &&
    left >= 0 &&
    bottom <= viewportHeight &&
    right <= viewportWidth;
};


/**
 * Get a list of parent elements that can possibly scroll
 * @param el the element to get parents for
 * @returns {Array}
 */
const getScrollParents = el => {
  const elements = [];
  for (el = el.parentNode; el; el = el.parentNode) {
    const cs = window.getComputedStyle(el);
    if(!(cs.overflowY === 'hidden' && cs.overflowX === 'hidden')) {
      elements.unshift(el);
    }
    if(el === document.body) {
      break;
    }
  }
  return elements;
};


/**
 * Position menu next to button
 *
 * Positioning strategy
 * 1. menu.height > viewport.height
 *    let menu.height = viewport.heigt
 *    let menu.overflow-y = auto
 * 2. menu.width > viewport.width
 *    let menu.width = viewport.width
 * 3. position menu below button, align left edge of menu with button left
 *      done if menu inside viewport
 * 4. position menu below button, align right edge of menu with button right
 *      done if menu inside viewport
 * 5. positions menu above button, aligns left edge of menu with button left
 *      done if menu inside viewport
 * 6. position menu at button right hand side, aligns menu top with button top
 *      done if menu inside viewport
 * 7. position menu at button left hand side, aligns menu top with button top
 *      done if menu inside viewport
 * 8. position menu inside viewport
 *    1. position menu at viewport bottom
 *    2. position menu at button right hand side
 *      done if menu inside viewport
 *    3. position menu at button left hand side
 *      done if menu inside viewport
 *    4. position menu at viewport right
 * 9. done
 *
 */
const tether = (controlledBy, element) => {
  const controlRect = controlledBy.getBoundingClientRect();

  // 1. will menu height fit inside window viewport?
  const { viewportWidth, viewportHeight } = getWindowViewport();

  //element.style.height = 'auto';
  element.style.overflowY = 'hidden';
  if(element.offsetHeight > viewportHeight) {
    element.style.height = `${viewportHeight-4}px`;
    element.style.overflowY = 'auto';
  }

  // 2. will menu width fit inside window viewport?
  //element.style.width = 'auto';
  if(element.offsetWidth > viewportWidth) {
    element.style.width = `${viewportWidth-4}px`;
  }

  const menuRect = element.getBoundingClientRect();

  // menu to control distance
  const dy = controlRect.top - menuRect.top;
  const dx = controlRect.left - menuRect.left;

  // Menu rect, window coordinates relative to top,left of control
  const top = menuRect.top + dy;
  const left = menuRect.left + dx;
  const bottom = top + menuRect.height;
  const right = left + menuRect.width;

  // Position relative to control
  let ddy = dy;
  let ddx = dx;

  if(isRectInsideWindowViewport({
    top: top + controlRect.height,
    left: left,
    bottom: bottom + controlRect.height,
    right: right
  })) {
    // 3 position menu below the control element, aligned to its left
    ddy = controlRect.height + dy;
    //console.log('***** 3');
  }
  else if(isRectInsideWindowViewport({
    top: top + controlRect.height,
    left: left + controlRect.width - menuRect.width,
    bottom: bottom + controlRect.height,
    right: left + controlRect.width
  })) {
    // 4 position menu below the control element, aligned to its right
    ddy = controlRect.height + dy;
    ddx = dx + controlRect.width - menuRect.width;
    //console.log('***** 4');
  }
  else if(isRectInsideWindowViewport({
    top: top - menuRect.height,
    left: left,
    bottom: bottom - menuRect.height,
    right: right
  })) {
    // 5. position menu above the control element, aligned to its left.
    ddy = dy - menuRect.height;
    //console.log('***** 5');
  }
  else if(isRectInsideWindowViewport({
    top: top,
    left: left + controlRect.width,
    bottom: bottom,
    right: right + controlRect.width
  })) {
    // 6. position menu at button right hand side
    ddx = controlRect.width + dx;
    //console.log('***** 6');
  }
  else if(isRectInsideWindowViewport({
    top: top,
    left: left - controlRect.width,
    bottom: bottom,
    right: right - controlRect.width
  })) {
    // 7. position menu at button left hand side
    ddx = dx - menuRect.width;
    //console.log('***** 7');
  }
  else {
    // 8. position menu inside viewport, near controlrect if possible
    //console.log('***** 8');

    // 8.1 position menu near controlrect bottom
    ddy =  dy - bottom + viewportHeight;
    if(top + controlRect.height >= 0 && bottom + controlRect.height <= viewportHeight) {
      ddy = controlRect.height + dy;
    }
    else if(top - menuRect.height >= 0 && bottom - menuRect.height <= viewportHeight) {
      ddy = dy - menuRect.height;
    }

    if(left + menuRect.width + controlRect.width <= viewportWidth) {
      // 8.2 Position menu at button right hand side
      ddx = controlRect.width + dx;
      //console.log('***** 8.2');
    }
    else if(left - menuRect.width >= 0) {
      // 8.3 Position menu at button left hand side
      ddx = dx - menuRect.width;
      //console.log('***** 8.3');
    }
    else {
      // 8.4 position menu at (near) viewport right
      let r = 0;
      if(left + menuRect.width > viewportWidth) {
        r = left + menuRect.width - viewportWidth - 4;
      }
      ddx = dx - r;
      //console.log('***** 8.4');
    }
  }

  // 9. done
  element.style.top = `${element.offsetTop + ddy}px`;
  element.style.left = `${element.offsetLeft + ddx}px`;

  //console.log('***** 9. done');
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

export {removeChildElements, moveElements, getWindowViewport, isRectInsideWindowViewport, getScrollParents, tether};

