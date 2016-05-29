/**
 * @license
 * Copyright 2016 Leif Olsen. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This code is built with Google Material Design Lite,
 * which is Licensed under the Apache License, Version 2.0
 */

/**
 * rAF based animation loop
 */

class MdlExtAnimationLoop {

  /**
   * @constructor
   *
   * @param interval
   */
  constructor(interval = 17) {
    this.interval     = interval;
    this.running_     = false;
    this.rAFId_       = 0;
    this.timeElapsed_ = 0;
  }

  /**
   * Set interval between each rAF tick
   * @param interval
   */
  set interval(interval) {
    this.interval_ = interval < 17 ? 17 : interval;  // 17 ~ 60fps
  }

  /**
   * @returns {boolean|*} true if animation is running
   */
  get running() {
    return this.running_;
  }

  /**
   * Cancels animation loop
   */
  cancelRAF() {
    if(this.rAFId_ !== 0) {
      window.cancelAnimationFrame(this.rAFId_);
      this.rAFId_ = 0;
    }
    this.running_     = false;
    this.timeElapsed_ = 0;
  }

  /**
   * Start rAF animation loop
   * @param tick callback function
   */
  start( tick ) {
    this.running_ = true;
    let timeStart = Date.now();

    const loop = now => {
      if (this.running_) {
        this.rAFId_ = window.requestAnimationFrame( () => loop( Date.now() ));
        this.timeElapsed_ += now - timeStart;

        if(this.timeElapsed_ >= this.interval_) {
          this.running_ = tick( this.timeElapsed_ );
          if( (this.timeElapsed_ -= this.interval_) > this.interval_) {
            // time elapsed - interval > interval , indicates inactivity
            // Could be due to browser minimized, tab changed, screen saver started, computer sleep, and so on
            this.timeElapsed_ = 0;
          }
        }
        timeStart = now;
      }
    };
    loop(timeStart);
    return this;
  }

  /**
   * Stops animation
   */
  stop() {
    this.cancelRAF();
    return this;
  }
}

export default MdlExtAnimationLoop;
