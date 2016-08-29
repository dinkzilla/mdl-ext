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
 * @param delay optional delay, default to 1000/60ms
 * @param context optional context of this, default to global window
 * @returns {Function} reference to immediate and cancel functions
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/resize#Example
 * @see https://gist.github.com/yoavniran/d1d33f278bb7744d55c3
 * @see https://github.com/pelotoncycle/frame-throttle
 * @see https://github.com/jeromedecoster/raf-funcs
 */
const MIN_DELAY = 1000/60;

const throttleFunction = (callback, delay=MIN_DELAY, context) => {

  if(delay < MIN_DELAY) {
    delay = MIN_DELAY;
  }

  let next = null;
  let start = 0;

  return (...args) => {

    const cancel = function() {
      if(next !== null) {
        window.cancelAnimationFrame(next);
        next = null;
      }
    };

    const execute = function() {
      cancel();
      return Reflect.apply(callback, context, args);
    };

    const later = function() {
      if (delay - (Date.now() - start) <= 0) {
        return execute();
      }
      next = window.requestAnimationFrame(later);
    };

    if (context === undefined || context === null) {
      context = this || window;
    }

    if(next === null) {
      start = Date.now();
      next = window.requestAnimationFrame(later);
    }

    return {
      cancel: () => cancel(),
      immediate: () => execute()
    }
  };
};

export default throttleFunction;

