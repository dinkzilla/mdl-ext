const MIN_INTERVAL = 1000/60;

/**
 * Trigger a callback at a given interval
 * @param callback the callback function
 * @param interval defaults to 1000/60 ms
 * @return {function()} reference to start, stop, immediate and started
 */

const intervalFunction = ( callback, interval = MIN_INTERVAL ) => {

  if(interval < MIN_INTERVAL) {
    interval = MIN_INTERVAL;
  }

  let next = null;
  let timeElapsed = 0;

  return () => {

    const cancel = () => {
      if(next) {
        window.cancelAnimationFrame(next);
      }
      next = null;
      timeElapsed = 0;
    };

    const execute = () => {
      const f = callback(timeElapsed);
      if (!f) {
        cancel();
      }
    };

    const start = () => {
      let timeStart = Date.now();

      const loop = now => {
        if (next) {
          next = window.requestAnimationFrame( () => loop( Date.now() ));

          timeElapsed += now - timeStart;

          if(timeElapsed >= interval) {
            execute();
            if( (timeElapsed -= interval) > interval) {
              // time elapsed - interval > interval , indicates inactivity
              // Could be due to browser minimized, tab changed, screen saver started, computer sleep, and so on
              timeElapsed = 0;
            }
          }
          timeStart = now;
        }
      };

      next = 1;  // a truthy value for first loop
      loop( timeStart );
    };

    return {
      get started() {
        return next != null;
      },
      start: () => start(),
      stop: () => cancel(),
      immediate: () => execute(),
    };
  };
};

export default intervalFunction;
