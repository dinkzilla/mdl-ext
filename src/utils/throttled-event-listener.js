// See: https://developer.mozilla.org/en-US/docs/Web/Events/resize#Example
// See: https://gist.github.com/yoavniran/d1d33f278bb7744d55c3

/**
 * Since some events can fire at a high rate, the event handler shouldn't execute computationally
 * expensive operations such as DOM modifications. Instead, it is recommended to throttle the event
 * using requestAnimationFrame, setTimeout or customEvent:
 *
 * @param {string} eventType
 * @param {HTMLElement} element
 * @param {function} handler
 * @return {function()}
 */
const throttledEventListener = (eventType, element, handler) => {
  let isDrawing = false;

  const wrappedListener = e => {
    if (!isDrawing){
      isDrawing = true;
      window.requestAnimationFrame( () => {
        isDrawing = false;
        handler(e);
      })
    }
  };

  element.addEventListener(eventType, wrappedListener);

  //return a cleanup fn
  return () => element.removeEventListener(eventType, wrappedListener);
};

export default throttledEventListener;
