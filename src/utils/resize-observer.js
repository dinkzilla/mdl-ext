
/**
 * An API for observing changes to Element’s size.
 *
 * @See https://wicg.github.io/ResizeObserver/
 * @ee https://github.com/pelotoncycle/resize-observer
 *
 */

import intervalFunction from './interval-function';

((window, document) => {
  'use strict';

  if (typeof window.ResizeObserver !== 'undefined') {
    return;
  }

  document.resizeObservers = [];

  const MAX_DEPTH = 65535; // Infinity, kind of :)

  const isOrphan = target => !target || !target.parentNode;

  /**
   * The content rect is defined in section 3.2.1. content rect of the spec
   *
   * DOM content rect is a rect whose:
   *  - width is content width
   *  - height is content height
   *  - top is padding top
   *  - left is padding left
   *
   * @param target the element to calculate the content rect for
   * @return {{top: (Number|number), left: (Number|number), width: number, height: number}}
   *
   * Note:
   * Avoid using margins on the observed element. The calculation can return incorrect values when margins are involved.
   *
   * The following CSS will report incorrect width (Chrome OSX):
   *
   * <div id="outer" style="width: 300px; height:300px; background-color: green;overflow:auto;">
   *   <div id="observed" style="width: 400px; height:400px; background-color: yellow; margin:30px; border: 20px solid red; padding:10px;">
   *   </div>
   * </div>
   *
   * The calculated width is 280. The actual (correct) width is 340 since Chrome clips the margin.
   *
   * Use an outer container if you really need a "margin":
   *
   * <div id="outer" style="width: 300px; height:300px; background-color: green;overflow:auto; padding:30px;">
   *   <div id="observed" style="width: 400px; height:400px; background-color: yellow; margin: 0; border: 20px solid red; padding:10px;">
   *   </div>
   * </div>
   *
   * A more detailed explanation can be fund here:
   * http://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
   */
  const getContentRect = target => {

    const result = {top: 0, left: 0, width: 0, height: 0};
    if(!isOrphan(target)) {
      const cs = window.getComputedStyle(target);
      const r = target.getBoundingClientRect();
      result.top = parseFloat(cs.paddingTop) || 0;
      result.left = parseFloat(cs.paddingLeft) || 0;
      result.width = r.width - (
          result.left +
          (parseFloat(cs.paddingRight) || 0) +
          (parseFloat(cs.marginLeft) || 0) +
          (parseFloat(cs.marginRight) || 0) +
          (parseFloat(cs.borderLeftWidth) || 0) +
          (parseFloat(cs.borderRightWidth) || 0)
        );
      result.height = r.height - (
          result.top +
          (parseFloat(cs.paddingBottom) || 0) +
          (parseFloat(cs.marginTop) || 0) +
          (parseFloat(cs.marginBottom) || 0) +
          (parseFloat(cs.borderTopWidth) || 0) +
          (parseFloat(cs.borderBottomWidth) || 0)
        );
    }
    return result;
  };

  const dimensionHasChanged = (target, lastWidth, lastHeight) => {
    const {width, height} = getContentRect(target);
    return width !== lastWidth || height !== lastHeight;
  };


  /**
   * Calculate depth for node
   *
   * To calculate depth for node node run these steps:
   *
   * 1. Let p be the parent-traversal path from node to enclosing Document.
   * 2. Return length of p.
   */
  const depthOfNode = target => {
    let p = target.parentNode;
    let n = 0;
    while (p) {
      ++n;
      if(p === document.body) {
        break;
      }
      p = p.parentNode;
    }
    return n;
  };



  /**
   * ResizeObservation holds observation information for a single Element.
   * @param target
   * @return {{target: *, broadcastWidth, broadcastHeight, isOrphan: (function()), isActive: (function())}}
   * @constructor
   */
  const ResizeObservation = target => {
    const {width, height} = getContentRect(target);

    return {
      target: target,
      broadcastWidth: width,
      broadcastHeight: height,
      depth: MAX_DEPTH,

      get isOrphan() {
        return !this.target || !this.target.parentNode;
      },
      get isActive() {
        return dimensionHasChanged(this.target, this.broadcastWidth, this.broadcastHeight);
      }
    };
  };

  /**
   * A snapshot of the observed element
   * @param target
   * @param rect
   * @return {{target: *, contentRect: *}}
   * @constructor
   */
  const ResizeObserverEntry = (target, rect) => {
    return {
      target: target,
      contentRect: rect
    };
  };


  /**
   * The ResizeObserver is used to observe changes to Element's content rect.
   * Watching content rect means that:
   * <ul>
   *   <li>observation will fire when content width or height of watched Element changes</li>
   *   <li>observation will fire when watched Element is inserted/removed from DOM</li>
   *     <ul>
   *         <li>
   *             Note: The demo (https://github.com/WICG/ResizeObserver/blob/master/demo.html)  logs an error
   *             if observation is triggered for an removed element. This makes the program logic less
   *             complicated - so for now I will not trigger an observation on a removed element
   *         </li>
   *     </ul>
   *   <li>observation will fire when watched Element display gets set to hidden - Not implemented/tested</li>
   *   <li>observations do not fire for non-replaced inline Elements - Not implemented/tested</li>
   *   <li>observations will not be triggered by CSS transforms - Not implemented/tested</li>
   * <ul>
   */
  class ResizeObserver {

    /**
     * Constructor for instantiating new Resize observers.
     * @param callback void (sequence<ResizeObserverEntry> entries). The function which will be called on each resize.
     * @throws {TypeError}
     */
    constructor( callback ) {

      if(typeof callback !== 'function') {
        throw new TypeError('callback parameter must be a function');
      }

      this.callback_ = callback;
      this.observationTargets_ = [];
      this.activeTargets_ = [];
      this.skippedTargets_ = [];
      this.shallowestDepth = 0;

      document.resizeObservers.push(this);
    }

    /**
     * A list of ResizeObservations. It represents all Elements being observed.
     *
     * @return {Array}
     */
    get observationTargets() {
      return this.observationTargets_;
    }

    /**
     *  A list of ResizeObservations. It represents all Elements whose size has
     *  changed since last observation broadcast that are eligible for broadcast.
     *
     * @return {Array}
     */
    get activeTargets() {
      return this.activeTargets_;
    }

    /**
     * A list of ResizeObservations. It represents all Elements whose size has
     * changed since last observation broadcast that are **not** eligible for broadcast
     *
     * @return {Array}
     */
    get skippedTargets() {
      return this.skippedTargets_;
    }

    /**
     * Adds target to the list of observed elements.
     * @param {HTMLElement} target The target to observe
     */
    observe(target) {
      if(target) {
        if (!(target instanceof HTMLElement)) {
          throw new TypeError('target parameter must be an HTMLElement');
        }
        if (!this.observationTargets_.find(t => t.target === target)) {
          this.observationTargets_.push(ResizeObservation(target));
          resizeController.start();
        }
      }
    }

    /**
     * Removes target from the list of observed elements.
     * @param target The target to remove
     */
    unobserve(target) {
      const i = this.observationTargets_.findIndex(t => t.target === target);
      if(i > -1) {
        this.observationTargets_.splice(i, 1);
      }
    }

    /**
     * Stops the ResizeObserver instance from receiving notifications of resize changes.
     * Until the observe() method is used again, observer's callback will not be invoked.
     */
    disconnect() {
      this.observationTargets_ = [];
      this.activeTargets_ = [];
    }

    /**
     * Removes the ResizeObserver from the list of observers
     */
    destroy() {
      this.disconnect();
      const i = document.resizeObservers.findIndex(o => o === this);
      if(i > -1) {
        document.resizeObservers.splice(i, 1);
      }
    }

    /**
     * Gather active observations at depth
     *
     * It computes all active observations for a document. To gather active observations at depth, run these steps:
     *
     * 1. Let depth be the depth passed in.
     * 2. For each observer in resizeObservers run these steps:
     *   1. Clear observer’s activeTargets, and skippedTargets
     *   2. For each observation in observer.observationTargets run this step:
     *     1. If observation.isActive() is true
     *       1. Let targetDepth be result of calculate depth for node for observation.target.
     *       2. If targetDepth is greater than depth then add observation to activeTargets.
     *       3. Else add observation to skippedTargets.
     */
    gatherActiveObservationsAtDepth_(depth=0) {

      /*
      this.skippedTargets_ = [];
      this.activeTargets_ = this.observationTargets_.reduceRight( (prev, resizeObservation, index, arr) => {
        if(resizeObservation.isOrphan) {
          arr.splice(index, 1);
        }
        else if(resizeObservation.isActive) {

          if(depthOfNode(resizeObservation.target) > depth) {
            prev.push(resizeObservation);
          }
          else {
            this.skippedTargets_.push(resizeObservation);
          }
        }
        return prev;
      }, []);
      */

      // Same result as above.
      this.activeTargets_ = [];
      this.skippedTargets_ = [];
      let index = this.observationTargets_.length-1;
      while(index > -1) {
        const resizeObservation = this.observationTargets_[index];

        if(resizeObservation.isOrphan) {
          this.observationTargets_.splice(index, 1);
        }
        else if(resizeObservation.isActive) {
          const targetDepth = depthOfNode(resizeObservation.target);
          resizeObservation.depth = targetDepth;

          if(targetDepth >= depth) {
            this.activeTargets_.push(resizeObservation);
          }
          else {
            this.skippedTargets_.push(resizeObservation);
          }
        }
        index -= 1;
      }
    }

    /**
     * Broadcast active observations
     *
     * To broadcast active observations for a document, run these steps:
     *
     * 1. Let shallowestTargetDepth be ∞
     * 2. For each observer in document.resizeObservers run these steps:
     *   1. If observer.activeTargets slot is empty, continue.
     *   2. Let entries be an empty list of ResizeObserverEntryies.
     *   3. For each observation in activeTargets perform these steps:
     *     1. Let entry be new ResizeObserverEntry(observation.target)
     *     2. Add entry to entries
     *     3. Set observation.broadcastWidth to entry.contentRect.width.
     *     4. Set observation.broadcastHeight to entry.contentRect.height.
     *     5. Set targetDepth to the result of calculate depth for node for observation.target.
     *     6. Set shallowestTargetDepth to targetDepth if targetDepth < shallowestTargetDepth
     *   4. Invoke observer.callback with entries.
     *   5. Clear observer.activeTargets.
     * 3. Return shallowestTargetDepth.
     *
     * @return {number} the shallowest target depth, 0 if observer has no active targets
     * @private
     */

    broadcastActiveObservations_() {
      if (this.activeTargets_.length > 0) {
        let shallowestTargetDepth = MAX_DEPTH;
        const entries = [];

        for (const resizeObservation of this.activeTargets_) {
          const rect = getContentRect(resizeObservation.target);
          resizeObservation.broadcastWidth = rect.width;
          resizeObservation.broadcastHeight = rect.height;
          if(resizeObservation.depth < shallowestTargetDepth) {
            shallowestTargetDepth = resizeObservation.depth;
          }
          entries.push(ResizeObserverEntry(resizeObservation.target, rect));
        }
        this.callback_(entries);

        return shallowestTargetDepth;
      }
      return 0;
    }
  }


  /**
   * Broadcasts Element.resize events
   *
   * For each fully active Document in docs, run the following steps for that Document and its browsing contentx:
   * 1. recalc styles
   * 2. update layout
   * 3. set depth to 0
   * 4. gather active observations at depth depth for Document
   * 5. repeat while (document has active observations)
   *   1. set depth to broadcast active observations
   *   2. recalc styles
   *   3. update layout
   *   4. gather active observations at depth depth for Document
   * 6. if Document has skipped observations then deliver resize loop error notification
   *
   * @return {{start: (function()), stop: (function())}}
   * @constructor
   */
  const ResizeController = () => {

    const interval = intervalFunction(200);

    const shouldStop = () => {
      return document.resizeObservers.findIndex( resizeObserver => resizeObserver.observationTargets.length > 0 ) > -1;
    };

    const execute = () => {
      for(const resizeObserver of document.resizeObservers) {
        resizeObserver.gatherActiveObservationsAtDepth_(resizeObserver.shallowestDepth);
        resizeObserver.shallowestDepth = resizeObserver.broadcastActiveObservations_();

        if(resizeObserver.skippedTargets.length > 0) {
          interval.stop();
          throw new ErrorEvent('Skipped targets detected', {
            error : new Error('Resize loop error'),
            message : 'Observer has skipped observations',
          });
        }
      }
      return shouldStop();
    };

    return {
      start() {
        if(!interval.started) {
          //console.log('***** Start poll');
          interval.start(execute);
        }
      }

    };
  };

  window.ResizeObserver = ResizeObserver;

  const resizeController = ResizeController();
  //console.log('***** ResizeObserver ready');

})(window, document);
