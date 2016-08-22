// See: https://developer.mozilla.org/en-US/docs/Web/Events/resize#Example
// See: https://gist.github.com/yoavniran/d1d33f278bb7744d55c3
// See: https://github.com/pelotoncycle/frame-throttle

/**
 * Since some events can fire at a high rate, the event handler should be limited to execute computationally
 * expensive operations, such as DOM modifications, inside a single rendered frame.
 * When listening to e.g. scroll and resize events, the browser tends to fire off more events per
 * second than are actually useful. For instance, if your event listener sets some element positions, then it
 * is possible for those positions to be updated multiple times in a single rendered frame. In this case, all of
 * the layout calculations triggered by setting the elements' positions will be wasted except for the one time that
 * it runs immediately prior to the browser rendering the updated layout to the screen.
 * To avoid wasting cycles, we can use requestAnimationFrame to only run the event listener once just before the page
 * is rendered to the screen.
 *
 * @param callback the function to throttle
 * @return {function(...[*]=)}
 */
const throttledFunction = (callback) => {

  let throttling = false;

  return (...args) => {
    if(!throttling) {
      throttling = true;
      window.requestAnimationFrame( () => {
        callback(...args);
        throttling = false;
      });
    }
  };
};

export default throttledFunction;

