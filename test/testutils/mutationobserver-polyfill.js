/**
 * A small polyfill to handle mutation observer subtree modifications events
 * JsDom does not support MutationObserver - so a simple polyfill is needed for tests
 * Code copied from: https://coderwall.com/p/oo7i_g/mutationobserver-polyfill
 * See also: https://github.com/megawac/MutationObserver.js
 */


(function() {
  var MutationObserver;

  if (window.MutationObserver != null) {
    return;
  }

  MutationObserver = (function() {
    function MutationObserver(callBack) {
      this.callBack = callBack;
    }

    MutationObserver.prototype.observe = function(element, options) {
      this.element = element;
      return this.interval = setInterval((function(_this) {
        return function() {
          var html;
          html = _this.element.innerHTML;
          if (html !== _this.oldHtml) {
            _this.oldHtml = html;
            return _this.callBack.apply(null);
          }
        };
      })(this), 200);
    };

    MutationObserver.prototype.disconnect = function() {
      return window.clearInterval(this.interval);
    };

    return MutationObserver;

  })();

  window.MutationObserver = MutationObserver;

}).call(this);

