(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mdl-ext", [], factory);
	else if(typeof exports === 'object')
		exports["mdl-ext"] = factory();
	else
		root["mdl-ext"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(107);
	module.exports = __webpack_require__(50);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(43)('wks')
	  , uid        = __webpack_require__(45)
	  , Symbol     = __webpack_require__(4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(1)
	  , ctx       = __webpack_require__(36)
	  , hide      = __webpack_require__(10)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var VK_TAB = 9;
	var VK_ENTER = 13;
	var VK_ESC = 27;
	var VK_SPACE = 32;
	var VK_PAGE_UP = 33;
	var VK_PAGE_DOWN = 34;
	var VK_END = 35;
	var VK_HOME = 36;
	var VK_ARROW_LEFT = 37;
	var VK_ARROW_UP = 38;
	var VK_ARROW_RIGHT = 39;
	var VK_ARROW_DOWN = 40;
	
	var ARIA_EXPANDED = 'aria-expanded';
	var ARIA_HIDDEN = 'aria-hidden';
	var ARIA_MULTISELECTABLE = 'aria-multiselectable';
	var ARIA_SELECTED = 'aria-selected';
	
	var IS_DIRTY = 'is-dirty';
	var IS_DISABLED = 'is-disabled';
	var IS_EXPANDED = 'is-expanded';
	var IS_FOCUSED = 'is-focused';
	var IS_INVALID = 'is-invalid';
	var IS_UPGRADED = 'is-upgraded';
	var DATA_UPGRADED = 'data-upgraded';
	
	var MDL_RIPPLE = 'mdl-ripple';
	var MDL_RIPPLE_COMPONENT = 'MaterialRipple';
	var MDL_RIPPLE_CONTAINER = 'mdlext-carousel__slide__ripple-container';
	var MDL_RIPPLE_EFFECT = 'mdl-js-ripple-effect';
	var MDL_RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';
	
	exports.VK_TAB = VK_TAB;
	exports.VK_ENTER = VK_ENTER;
	exports.VK_ESC = VK_ESC;
	exports.VK_SPACE = VK_SPACE;
	exports.VK_PAGE_UP = VK_PAGE_UP;
	exports.VK_PAGE_DOWN = VK_PAGE_DOWN;
	exports.VK_END = VK_END;
	exports.VK_HOME = VK_HOME;
	exports.VK_ARROW_LEFT = VK_ARROW_LEFT;
	exports.VK_ARROW_UP = VK_ARROW_UP;
	exports.VK_ARROW_RIGHT = VK_ARROW_RIGHT;
	exports.VK_ARROW_DOWN = VK_ARROW_DOWN;
	exports.ARIA_EXPANDED = ARIA_EXPANDED;
	exports.ARIA_HIDDEN = ARIA_HIDDEN;
	exports.ARIA_MULTISELECTABLE = ARIA_MULTISELECTABLE;
	exports.ARIA_SELECTED = ARIA_SELECTED;
	exports.IS_DIRTY = IS_DIRTY;
	exports.IS_DISABLED = IS_DISABLED;
	exports.IS_EXPANDED = IS_EXPANDED;
	exports.IS_FOCUSED = IS_FOCUSED;
	exports.IS_INVALID = IS_INVALID;
	exports.IS_UPGRADED = IS_UPGRADED;
	exports.DATA_UPGRADED = DATA_UPGRADED;
	exports.MDL_RIPPLE = MDL_RIPPLE;
	exports.MDL_RIPPLE_COMPONENT = MDL_RIPPLE_COMPONENT;
	exports.MDL_RIPPLE_CONTAINER = MDL_RIPPLE_CONTAINER;
	exports.MDL_RIPPLE_EFFECT = MDL_RIPPLE_EFFECT;
	exports.MDL_RIPPLE_EFFECT_IGNORE_EVENTS = MDL_RIPPLE_EFFECT_IGNORE_EVENTS;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(9)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(23);
	module.exports = __webpack_require__(8) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(6)
	  , IE8_DOM_DEFINE = __webpack_require__(77)
	  , toPrimitive    = __webpack_require__(96)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(57);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(90)
	  , enumBugKeys = __webpack_require__(38);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(39)
	  , defined = __webpack_require__(22);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(22);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(31);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(32);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DEFAULT_INTERVAL = 1000 / 60;
	
	var MdlExtAnimationLoop = function () {
	
	  /**
	   * @constructor
	   *
	   * @param interval
	   */
	  function MdlExtAnimationLoop() {
	    var interval = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_INTERVAL : arguments[0];
	    (0, _classCallCheck3.default)(this, MdlExtAnimationLoop);
	
	    this.interval = interval;
	    this.running_ = false;
	    this.rAFId_ = 0;
	    this.timeElapsed_ = 0;
	  }
	
	  /**
	   * Set interval between each rAF tick
	   * @param interval
	   */
	
	
	  (0, _createClass3.default)(MdlExtAnimationLoop, [{
	    key: 'cancelRAF',
	
	
	    /**
	     * Cancels animation loop
	     */
	    value: function cancelRAF() {
	      if (this.rAFId_ !== 0) {
	        window.cancelAnimationFrame(this.rAFId_);
	        this.rAFId_ = 0;
	      }
	      this.running_ = false;
	      this.timeElapsed_ = 0;
	    }
	
	    /**
	     * Start rAF animation loop
	     * @param tick callback function
	     */
	
	  }, {
	    key: 'start',
	    value: function start(tick) {
	      var _this = this;
	
	      this.running_ = true;
	      var timeStart = Date.now();
	
	      var loop = function loop(now) {
	        if (_this.running_) {
	          _this.rAFId_ = window.requestAnimationFrame(function () {
	            return loop(Date.now());
	          });
	          _this.timeElapsed_ += now - timeStart;
	          if (_this.timeElapsed_ >= _this.interval_) {
	
	            _this.running_ = tick(_this.timeElapsed_);
	            if ((_this.timeElapsed_ -= _this.interval_) > _this.interval_) {
	              // time elapsed - interval > interval , indicates inactivity
	              // Could be due to browser minimized, tab changed, screen saver started, computer sleep, and so on
	              _this.timeElapsed_ = 0;
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
	
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.cancelRAF();
	      return this;
	    }
	  }, {
	    key: 'interval',
	    set: function set(interval) {
	      this.interval_ = interval < DEFAULT_INTERVAL ? DEFAULT_INTERVAL : interval;
	    }
	
	    /**
	     * @returns {boolean|*} true if animation is running
	     */
	
	  }, {
	    key: 'running',
	    get: function get() {
	      return this.running_;
	    }
	  }]);
	  return MdlExtAnimationLoop;
	}();
	
	exports.default = MdlExtAnimationLoop;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Converts a JSON string to object
	 * @param jsonString
	 * @param source
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.jsonStringToObject = undefined;
	
	var _assign = __webpack_require__(30);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var jsonStringToObject = function jsonStringToObject(jsonString) {
	  var source = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  var s = jsonString.replace(/'/g, '"');
	  try {
	    return (0, _assign2.default)(source, JSON.parse(s));
	  } catch (e) {
	    throw new Error('Failed to parse json string: ' + s + '. Error: ' + e.message);
	  }
	};
	
	exports.jsonStringToObject = jsonStringToObject;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	 * @see https://developer.mozilla.org/en-US/docs/Web/Events/resize#Example
	 * @see https://gist.github.com/yoavniran/d1d33f278bb7744d55c3
	 * @see https://github.com/pelotoncycle/frame-throttle
	 */
	var throttleFunction = function throttleFunction(callback) {
	
	  var throttling = false;
	
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (!throttling) {
	      throttling = true;
	      window.requestAnimationFrame(function () {
	        callback.apply(undefined, args);
	        throttling = false;
	      });
	    }
	  };
	};
	
	exports.default = throttleFunction;
	module.exports = exports["default"];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(43)('keys')
	  , uid    = __webpack_require__(45);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(94)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(40)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	// See: http://robertpenner.com/easing/
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
	  t /= d / 2;
	  if (t < 1) return c / 2 * t * t + b;
	  t--;
	  return -c / 2 * (t * (t - 2) - 1) + b;
	};
	
	var inOutQuintic = function inOutQuintic(t, b, c, d) {
	  var ts = (t /= d) * t;
	  var tc = ts * t;
	  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
	};
	
	exports.easeInOutQuad = easeInOutQuad;
	exports.inOutQuintic = inOutQuintic;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	 */
	
	/**
	 * A javascript utility for conditionally creating a list of strings.
	 * The function takes any number of arguments which can be a string or object.
	 * Inspired by (but not copied from) JedWatson/classnames, https://github.com/JedWatson/classnames
	 *
	 * @param  {*} args the strings and/or objects to
	 * @return {Array} a list of strings
	 * @example
	 * // Returns ['foo', 'bar', 'baz', 'quux']
	 * stringList(', ', 'foo', { bar: true, duck: false }, 'baz', { quux: true });
	 * @example see the tests for more examples
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.stringList = exports.randomString = exports.joinStrings = undefined;
	
	var _keys = __webpack_require__(61);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var stringList = function stringList() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var isString = function isString(str) {
	    return str != null && typeof str === 'string';
	  };
	
	  var flatten = function flatten(list) {
	    return list.reduce(function (a, b) {
	      return a.concat(Array.isArray(b) ? flatten(b) : b);
	    }, []);
	  };
	
	  var objectToStrings = function objectToStrings(arg) {
	    return (0, _keys2.default)(arg).filter(function (key) {
	      return arg[key];
	    }).map(function (key) {
	      return key;
	    });
	  };
	
	  return args.filter(function (arg) {
	    return !!arg;
	  }).map(function (arg) {
	    return isString(arg) ? arg : objectToStrings(arg);
	  }).reduce(function (result, arg) {
	    return result.concat(Array.isArray(arg) ? flatten(arg) : arg);
	  }, []);
	};
	
	/**
	 * A simple javascript utility for conditionally joining strings together.
	 * The function takes a delimiter string and any number of arguments which can be a string or object.
	 *
	 * @param delimiter delimiter to separate joined strings
	 * @param  {*} args the strings and/or objects to join
	 * @return {String} the joined strings
	 * @example
	 * // Returns 'foo, bar, baz, quux'
	 * joinStrings(', ', 'foo', { bar: true, duck: false }, 'baz', { quux: true });
	 * @example see the tests for more examples
	 */
	var joinStrings = function joinStrings() {
	  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    args[_key2 - 1] = arguments[_key2];
	  }
	
	  var delimiter = arguments.length <= 0 || arguments[0] === undefined ? ' ' : arguments[0];
	  return stringList.apply(undefined, args).join(delimiter);
	};
	
	/**
	 * Generates a random string with a given length
	 * @param n {Integer} length of generated string
	 * @see http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
	 * @return {String} the random string
	 * @example
	 * // Returns e.g. 'pd781w0y'
	 * randomString(8);
	 * @example see the tests for more examples
	 */
	var randomString = function randomString() {
	  var n = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];
	  return Array(n + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, n);
	};
	
	exports.joinStrings = joinStrings;
	exports.randomString = randomString;
	exports.stringList = stringList;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(59);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(35)
	  , TAG = __webpack_require__(2)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(33);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(35);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(84)
	  , $export        = __webpack_require__(3)
	  , redefine       = __webpack_require__(93)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(13)
	  , Iterators      = __webpack_require__(7)
	  , $iterCreate    = __webpack_require__(81)
	  , setToStringTag = __webpack_require__(42)
	  , getPrototypeOf = __webpack_require__(89)
	  , ITERATOR       = __webpack_require__(2)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(13)
	  , TAG = __webpack_require__(2)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(25)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(34)
	  , ITERATOR  = __webpack_require__(2)('iterator')
	  , Iterators = __webpack_require__(7);
	module.exports = __webpack_require__(1).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(100);
	var global        = __webpack_require__(4)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(7)
	  , TO_STRING_TAG = __webpack_require__(2)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(12);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  'use strict';
	
	  var ACCORDION = 'mdlext-accordion';
	  var ACCORDION_VERTICAL = 'mdlext-accordion--vertical';
	  var ACCORDION_HORIZONTAL = 'mdlext-accordion--horizontal';
	  var PANEL = 'mdlext-accordion__panel';
	  var PANEL_ROLE = 'presentation';
	  var TAB = 'mdlext-accordion__tab';
	  var TAB_CAPTION = 'mdlext-accordion__tab__caption';
	  var TAB_ROLE = 'tab';
	  var TABPANEL = 'mdlext-accordion__tabpanel';
	  var TABPANEL_ROLE = 'tabpanel';
	  var RIPPLE_EFFECT = 'mdlext-js-ripple-effect';
	  var RIPPLE = 'mdlext-accordion__tab--ripple';
	  var ANIMATION_EFFECT = 'mdlext-js-animation-effect';
	  var ANIMATION = 'mdlext-accordion__tabpanel--animation';
	
	  /**
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtAccordion = function MaterialExtAccordion(element) {
	
	    // Stores the Accordion HTML element.
	    this.element_ = element;
	
	    // Initialize instance.
	    this.init();
	  };
	  window['MaterialExtAccordion'] = MaterialExtAccordion;
	
	  // Helpers
	  var accordionPanelElements = function accordionPanelElements(element) {
	    if (!element) {
	      return {
	        panel: null,
	        tab: null,
	        tabpanel: null
	      };
	    } else if (element.classList.contains(PANEL)) {
	      return {
	        panel: element,
	        tab: element.querySelector('.' + TAB),
	        tabpanel: element.querySelector('.' + TABPANEL)
	      };
	    } else {
	      return {
	        panel: element.parentNode,
	        tab: element.parentNode.querySelector('.' + TAB),
	        tabpanel: element.parentNode.querySelector('.' + TABPANEL)
	      };
	    }
	  };
	
	  // Private methods.
	
	  /**
	   * Handles custom command event, 'open', 'close', 'toggle' or upgrade
	   * @param event. A custom event
	   * @private
	   */
	  MaterialExtAccordion.prototype.commandHandler_ = function (event) {
	    event.preventDefault();
	    event.stopPropagation();
	
	    if (event && event.detail) {
	      this.command(event.detail);
	    }
	  };
	
	  /**
	   * Dispatch toggle event
	   * @param {string} state
	   * @param {Element} tab
	   * @param {Element} tabpanel
	   * @private
	   */
	  MaterialExtAccordion.prototype.dispatchToggleEvent_ = function (state, tab, tabpanel) {
	    var ce = new CustomEvent('toggle', {
	      bubbles: true,
	      cancelable: true,
	      detail: { state: state, tab: tab, tabpanel: tabpanel }
	    });
	    this.element_.dispatchEvent(ce);
	  };
	
	  /**
	   * Open tab
	   * @param {Element} panel
	   * @param {Element} tab
	   * @param {Element} tabpanel
	   * @private
	   */
	  MaterialExtAccordion.prototype.openTab_ = function (panel, tab, tabpanel) {
	    panel.classList.add(_constants.IS_EXPANDED);
	    tab.setAttribute(_constants.ARIA_EXPANDED, 'true');
	    tabpanel.removeAttribute('hidden');
	    tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'false');
	    this.dispatchToggleEvent_('open', tab, tabpanel);
	  };
	
	  /**
	   * Close tab
	   * @param {Element} panel
	   * @param {Element} tab
	   * @param {Element} tabpanel
	   * @private
	   */
	  MaterialExtAccordion.prototype.closeTab_ = function (panel, tab, tabpanel) {
	    panel.classList.remove(_constants.IS_EXPANDED);
	    tab.setAttribute(_constants.ARIA_EXPANDED, 'false');
	    tabpanel.setAttribute('hidden', '');
	    tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'true');
	    this.dispatchToggleEvent_('close', tab, tabpanel);
	  };
	
	  /**
	   * Toggle tab
	   * @param {Element} panel
	   * @param {Element} tab
	   * @param {Element} tabpanel
	   * @private
	   */
	  MaterialExtAccordion.prototype.toggleTab_ = function (panel, tab, tabpanel) {
	    if (!(this.element_.hasAttribute('disabled') || tab.hasAttribute('disabled'))) {
	      if (tab.getAttribute(_constants.ARIA_EXPANDED).toLowerCase() === 'true') {
	        this.closeTab_(panel, tab, tabpanel);
	      } else {
	        if (this.element_.getAttribute(_constants.ARIA_MULTISELECTABLE).toLowerCase() !== 'true') {
	          this.closeTabs_();
	        }
	        this.openTab_(panel, tab, tabpanel);
	      }
	    }
	  };
	
	  /**
	   * Open tabs
	   * @private
	   */
	  MaterialExtAccordion.prototype.openTabs_ = function () {
	    var _this = this;
	
	    if (this.element_.getAttribute(_constants.ARIA_MULTISELECTABLE).toLowerCase() === 'true') {
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + ACCORDION + ' > .' + PANEL))).filter(function (panel) {
	        return !panel.classList.contains(_constants.IS_EXPANDED);
	      }).forEach(function (closedItem) {
	        var tab = closedItem.querySelector('.' + TAB);
	        if (!tab.hasAttribute('disabled')) {
	          _this.openTab_(closedItem, tab, closedItem.querySelector('.' + TABPANEL));
	        }
	      });
	    }
	  };
	
	  /**
	   * Close tabs
	   * @private
	   */
	  MaterialExtAccordion.prototype.closeTabs_ = function () {
	    var _this2 = this;
	
	    [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + ACCORDION + ' > .' + PANEL + '.' + _constants.IS_EXPANDED))).forEach(function (panel) {
	      var tab = panel.querySelector('.' + TAB);
	      if (!tab.hasAttribute('disabled')) {
	        _this2.closeTab_(panel, tab, panel.querySelector('.' + TABPANEL));
	      }
	    });
	  };
	
	  // Public methods.
	
	  /**
	   * Upgrade an individual accordion tab
	   * @public
	   * @param {Element} tabElement The HTML element for the accordion panel.
	   */
	  MaterialExtAccordion.prototype.upgradeTab = function (tabElement) {
	    var _this3 = this;
	
	    var _accordionPanelElemen = accordionPanelElements(tabElement);
	
	    var panel = _accordionPanelElemen.panel;
	    var tab = _accordionPanelElemen.tab;
	    var tabpanel = _accordionPanelElemen.tabpanel;
	
	
	    var disableTab = function disableTab() {
	      panel.classList.remove(_constants.IS_EXPANDED);
	      tab.setAttribute('tabindex', '-1');
	      tab.setAttribute(_constants.ARIA_EXPANDED, 'false');
	      tabpanel.setAttribute('hidden', '');
	      tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'true');
	    };
	
	    var enableTab = function enableTab() {
	      if (!tab.hasAttribute(_constants.ARIA_EXPANDED)) {
	        tab.setAttribute(_constants.ARIA_EXPANDED, 'false');
	      }
	
	      tab.setAttribute('tabindex', '0');
	
	      if (tab.getAttribute(_constants.ARIA_EXPANDED).toLowerCase() === 'true') {
	        panel.classList.add(_constants.IS_EXPANDED);
	        tabpanel.removeAttribute('hidden');
	        tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'false');
	      } else {
	        panel.classList.remove(_constants.IS_EXPANDED);
	        tabpanel.setAttribute('hidden', '');
	        tabpanel.setAttribute(_constants.ARIA_HIDDEN, 'true');
	      }
	    };
	
	    // In horizontal layout, caption must have a max-width defined to prevent pushing elements to the right of the caption out of view.
	    // In JsDom, offsetWidth and offsetHeight properties do not work, so this function is not testable.
	    /* istanbul ignore next */
	    var calcMaxTabCaptionWidth = function calcMaxTabCaptionWidth() {
	
	      var tabCaption = tab.querySelector('.' + TAB_CAPTION);
	      if (tabCaption !== null) {
	        var w = [].concat((0, _toConsumableArray3.default)(tab.children)).filter(function (el) {
	          return el.classList && !el.classList.contains(TAB_CAPTION);
	        }).reduce(function (v, el) {
	          return v + el.offsetWidth;
	        }, 0);
	
	        var maxWidth = tab.clientHeight - w;
	        if (maxWidth > 0) {
	          tabCaption.style['max-width'] = maxWidth + 'px';
	        }
	      }
	    };
	
	    var selectTab = function selectTab() {
	      if (!tab.hasAttribute(_constants.ARIA_SELECTED)) {
	        [].concat((0, _toConsumableArray3.default)(_this3.element_.querySelectorAll('.' + TAB + '[aria-selected="true"]'))).forEach(function (selectedTab) {
	          return selectedTab.removeAttribute(_constants.ARIA_SELECTED);
	        });
	        tab.setAttribute(_constants.ARIA_SELECTED, 'true');
	      }
	    };
	
	    var tabClickHandler = function tabClickHandler(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      _this3.toggleTab_(panel, tab, tabpanel);
	      selectTab();
	    };
	
	    var tabFocusHandler = function tabFocusHandler(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      selectTab();
	    };
	
	    var tabpanelClickHandler = function tabpanelClickHandler() {
	      selectTab();
	    };
	
	    var tabpanelFocusHandler = function tabpanelFocusHandler() {
	      selectTab();
	    };
	
	    var tabKeydownHandler = function tabKeydownHandler(e) {
	
	      if (_this3.element_.hasAttribute('disabled')) {
	        return;
	      }
	
	      if (e.keyCode === _constants.VK_END || e.keyCode === _constants.VK_HOME || e.keyCode === _constants.VK_ARROW_UP || e.keyCode === _constants.VK_ARROW_LEFT || e.keyCode === _constants.VK_ARROW_DOWN || e.keyCode === _constants.VK_ARROW_RIGHT) {
	
	        var nextTab = null;
	        var keyCode = e.keyCode;
	
	        if (keyCode === _constants.VK_HOME) {
	          nextTab = _this3.element_.querySelector('.' + PANEL + ':first-child > .' + TAB);
	          if (nextTab && nextTab.hasAttribute('disabled')) {
	            nextTab = null;
	            keyCode = _constants.VK_ARROW_DOWN;
	          }
	        } else if (keyCode === _constants.VK_END) {
	          nextTab = _this3.element_.querySelector('.' + PANEL + ':last-child > .' + TAB);
	          if (nextTab && nextTab.hasAttribute('disabled')) {
	            nextTab = null;
	            keyCode = _constants.VK_ARROW_UP;
	          }
	        }
	
	        if (!nextTab) {
	          var nextPanel = panel;
	
	          do {
	            if (keyCode === _constants.VK_ARROW_UP || keyCode === _constants.VK_ARROW_LEFT) {
	              nextPanel = nextPanel.previousElementSibling;
	              if (!nextPanel) {
	                nextPanel = _this3.element_.querySelector('.' + PANEL + ':last-child');
	              }
	              if (nextPanel) {
	                nextTab = nextPanel.querySelector('.' + PANEL + ' > .' + TAB);
	              }
	            } else if (keyCode === _constants.VK_ARROW_DOWN || keyCode === _constants.VK_ARROW_RIGHT) {
	              nextPanel = nextPanel.nextElementSibling;
	              if (!nextPanel) {
	                nextPanel = _this3.element_.querySelector('.' + PANEL + ':first-child');
	              }
	              if (nextPanel) {
	                nextTab = nextPanel.querySelector('.' + PANEL + ' > .' + TAB);
	              }
	            }
	
	            if (nextTab && nextTab.hasAttribute('disabled')) {
	              nextTab = null;
	            } else {
	              break;
	            }
	          } while (nextPanel !== panel);
	        }
	
	        if (nextTab) {
	          e.preventDefault();
	          e.stopPropagation();
	          nextTab.focus();
	
	          // Workaround for JSDom testing:
	          // In JsDom 'element.focus()' does not trigger any focus event
	          if (!nextTab.hasAttribute(_constants.ARIA_SELECTED)) {
	
	            [].concat((0, _toConsumableArray3.default)(_this3.element_.querySelectorAll('.' + TAB + '[aria-selected="true"]'))).forEach(function (selectedTab) {
	              return selectedTab.removeAttribute(_constants.ARIA_SELECTED);
	            });
	
	            nextTab.setAttribute(_constants.ARIA_SELECTED, 'true');
	          }
	        }
	      } else if (e.keyCode === _constants.VK_ENTER || e.keyCode === _constants.VK_SPACE) {
	        e.preventDefault();
	        e.stopPropagation();
	        _this3.toggleTab_(panel, tab, tabpanel);
	      }
	    };
	
	    if (tab === null) {
	      throw new Error('There must be a tab element for each accordion panel.');
	    }
	
	    if (tabpanel === null) {
	      throw new Error('There must be a tabpanel element for each accordion panel.');
	    }
	
	    panel.setAttribute('role', PANEL_ROLE);
	    tab.setAttribute('role', TAB_ROLE);
	    tabpanel.setAttribute('role', TABPANEL_ROLE);
	
	    if (tab.hasAttribute('disabled')) {
	      disableTab();
	    } else {
	      enableTab();
	    }
	
	    if (this.element_.classList.contains(ACCORDION_HORIZONTAL)) {
	      calcMaxTabCaptionWidth();
	    }
	
	    if (this.element_.classList.contains(RIPPLE_EFFECT)) {
	      tab.classList.add(RIPPLE);
	    }
	
	    if (this.element_.classList.contains(ANIMATION_EFFECT)) {
	      tabpanel.classList.add(ANIMATION);
	    }
	
	    // Remove listeners, just in case ...
	    tab.removeEventListener('click', tabClickHandler);
	    tab.removeEventListener('focus', tabFocusHandler);
	    tab.removeEventListener('keydown', tabKeydownHandler);
	    tabpanel.removeEventListener('click', tabpanelClickHandler);
	    tabpanel.removeEventListener('focus', tabpanelFocusHandler);
	
	    tab.addEventListener('click', tabClickHandler);
	    tab.addEventListener('focus', tabFocusHandler);
	    tab.addEventListener('keydown', tabKeydownHandler);
	    tabpanel.addEventListener('click', tabpanelClickHandler, true);
	    tabpanel.addEventListener('focus', tabpanelFocusHandler, true);
	  };
	  MaterialExtAccordion.prototype['upgradeTab'] = MaterialExtAccordion.prototype.upgradeTab;
	
	  /**
	   * Execute command
	   * @param detail
	   */
	  MaterialExtAccordion.prototype.command = function (detail) {
	    var _this4 = this;
	
	    var openTab = function openTab(tabElement) {
	
	      if (tabElement === undefined) {
	        _this4.openTabs_();
	      } else if (tabElement !== null) {
	        var _accordionPanelElemen2 = accordionPanelElements(tabElement);
	
	        var panel = _accordionPanelElemen2.panel;
	        var tab = _accordionPanelElemen2.tab;
	        var tabpanel = _accordionPanelElemen2.tabpanel;
	
	        if (tab.getAttribute(_constants.ARIA_EXPANDED).toLowerCase() !== 'true') {
	          _this4.toggleTab_(panel, tab, tabpanel);
	        }
	      }
	    };
	
	    var closeTab = function closeTab(tabElement) {
	      if (tabElement === undefined) {
	        _this4.closeTabs_();
	      } else if (tabElement !== null) {
	        var _accordionPanelElemen3 = accordionPanelElements(tabElement);
	
	        var panel = _accordionPanelElemen3.panel;
	        var tab = _accordionPanelElemen3.tab;
	        var tabpanel = _accordionPanelElemen3.tabpanel;
	
	
	        if (tab.getAttribute(_constants.ARIA_EXPANDED).toLowerCase() === 'true') {
	          _this4.toggleTab_(panel, tab, tabpanel);
	        }
	      }
	    };
	
	    var toggleTab = function toggleTab(tabElement) {
	      if (tabElement) {
	        var _accordionPanelElemen4 = accordionPanelElements(tabElement);
	
	        var panel = _accordionPanelElemen4.panel;
	        var tab = _accordionPanelElemen4.tab;
	        var tabpanel = _accordionPanelElemen4.tabpanel;
	
	        _this4.toggleTab_(panel, tab, tabpanel);
	      }
	    };
	
	    if (detail && detail.action) {
	      var action = detail.action;
	      var target = detail.target;
	
	
	      switch (action.toLowerCase()) {
	        case 'open':
	          openTab(target);
	          break;
	        case 'close':
	          closeTab(target);
	          break;
	        case 'toggle':
	          toggleTab(target);
	          break;
	        case 'upgrade':
	          if (target) {
	            this.upgradeTab(target);
	          }
	          break;
	        default:
	          throw new Error('Unknown action "' + action + '". Action must be one of "open", "close", "toggle" or "upgrade"');
	      }
	    }
	  };
	  MaterialExtAccordion.prototype['command'] = MaterialExtAccordion.prototype.command;
	
	  /**
	   * Initialize component
	   */
	  MaterialExtAccordion.prototype.init = function () {
	    var _this5 = this;
	
	    if (this.element_) {
	      // Do the init required for this component to work
	      if (!(this.element_.classList.contains(ACCORDION_HORIZONTAL) || this.element_.classList.contains(ACCORDION_VERTICAL))) {
	        throw new Error('Accordion must have one of the classes "' + ACCORDION_HORIZONTAL + '" or "' + ACCORDION_VERTICAL + '"');
	      }
	
	      this.element_.setAttribute('role', 'tablist');
	
	      if (!this.element_.hasAttribute(_constants.ARIA_MULTISELECTABLE)) {
	        this.element_.setAttribute(_constants.ARIA_MULTISELECTABLE, 'false');
	      }
	
	      this.element_.removeEventListener('command', this.commandHandler_);
	      this.element_.addEventListener('command', this.commandHandler_.bind(this), false);
	
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + ACCORDION + ' > .' + PANEL))).forEach(function (panel) {
	        return _this5.upgradeTab(panel);
	      });
	
	      // Set upgraded flag
	      this.element_.classList.add(_constants.IS_UPGRADED);
	    }
	  };
	
	  /*
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   *
	   * Nothing to downgrade
	   *
	   MaterialExtAccordion.prototype.mdlDowngrade_ = function() {
	     'use strict';
	     console.log('***** MaterialExtAccordion.mdlDowngrade');
	   };
	   */
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  componentHandler.register({
	    constructor: MaterialExtAccordion,
	    classAsString: 'MaterialExtAccordion',
	    cssClass: 'mdlext-js-accordion',
	    widget: true
	  });
	})(); /**
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
	 * A WAI-ARIA friendly accordion component.
	 * An accordion is a collection of expandable panels associated with a common outer container. Panels consist
	 * of a header and an associated content region or tabpanel. The primary use of an Accordion is to present multiple sections
	 * of content on a single page without scrolling, where all of the sections are peers in the application or object hierarchy.
	 * The general look is similar to a tree where each root tree node is an expandable accordion header. The user navigates
	 * and makes the contents of each panel visible (or not) by interacting with the Accordion Header
	 */

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _isInteger = __webpack_require__(29);
	
	var _isInteger2 = _interopRequireDefault(_isInteger);
	
	var _toConsumableArray2 = __webpack_require__(12);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _assign = __webpack_require__(30);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _animationloop = __webpack_require__(18);
	
	var _animationloop2 = _interopRequireDefault(_animationloop);
	
	var _easing = __webpack_require__(27);
	
	var _jsonUtils = __webpack_require__(19);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	 * Image carousel
	 */
	
	(function () {
	  'use strict';
	
	  //const CAROUSEL = 'mdlext-carousel';
	
	  var SLIDE = 'mdlext-carousel__slide';
	  var ROLE = 'list';
	  var SLIDE_ROLE = 'listitem';
	
	  /**
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtCarousel = function MaterialExtCarousel(element) {
	    // Stores the element.
	    this.element_ = element;
	
	    // Default config
	    this.config_ = {
	      interactive: true,
	      autostart: false,
	      type: 'slide',
	      interval: 1000,
	      animationLoop: new _animationloop2.default(1000)
	    };
	
	    this.scrollAnimation_ = new _animationloop2.default(33);
	
	    // Initialize instance.
	    this.init();
	  };
	
	  window['MaterialExtCarousel'] = MaterialExtCarousel;
	
	  /**
	   * Start slideshow animation
	   * @private
	   */
	  MaterialExtCarousel.prototype.startSlideShow_ = function () {
	    var _this = this;
	
	    var nextSlide = function nextSlide() {
	      var slide = _this.element_.querySelector('.' + SLIDE + '[aria-selected]');
	      if (slide) {
	        slide.removeAttribute('aria-selected');
	        slide = slide.nextElementSibling;
	      }
	      if (!slide) {
	        slide = _this.element_.querySelector('.' + SLIDE + ':first-child');
	        _this.animateScroll_(0);
	      }
	      if (slide) {
	        _this.moveSlideIntoViewport_(slide);
	        slide.setAttribute('aria-selected', '');
	        _this.emitSelectEvent_('next', null, slide);
	        return true;
	      }
	      return false;
	    };
	
	    var nextScroll = function nextScroll(direction) {
	      var nextDirection = direction;
	
	      if ('next' === direction && _this.element_.scrollLeft === _this.element_.scrollWidth - _this.element_.clientWidth) {
	        nextDirection = 'prev';
	      } else if (_this.element_.scrollLeft === 0) {
	        nextDirection = 'next';
	      }
	      var x = 'next' === nextDirection ? Math.min(_this.element_.scrollLeft + _this.element_.clientWidth, _this.element_.scrollWidth - _this.element_.clientWidth) : Math.max(_this.element_.scrollLeft - _this.element_.clientWidth, 0);
	
	      _this.animateScroll_(x, 1000);
	      return nextDirection;
	    };
	
	    if (!this.config_.animationLoop.running) {
	      (function () {
	        _this.config_.animationLoop.interval = _this.config_.interval;
	        var direction = 'next';
	
	        if ('scroll' === _this.config_.type) {
	          _this.config_.animationLoop.start(function () {
	            direction = nextScroll(direction);
	            return true; // It runs until cancelSlideShow_ is triggered
	          });
	        } else {
	          nextSlide();
	          _this.config_.animationLoop.start(function () {
	            return nextSlide(); // It runs until cancelSlideShow_ is triggered
	          });
	        }
	      })();
	    }
	
	    // TODO: Pause animation when carousel is not in browser viewport or user changes tab
	  };
	
	  /**
	   * Cancel slideshow if running. Emmits a 'pause' event
	   * @private
	   */
	  MaterialExtCarousel.prototype.cancelSlideShow_ = function () {
	    if (this.config_.animationLoop.running) {
	      this.config_.animationLoop.stop();
	      this.emitSelectEvent_('pause', _constants.VK_ESC, this.element_.querySelector('.' + SLIDE + '[aria-selected]'));
	    }
	  };
	
	  /**
	   * Animate scroll
	   * @param newPosition
	   * @param newDuration
	   * @param completedCallback
	   * @private
	   */
	  MaterialExtCarousel.prototype.animateScroll_ = function (newPosition, newDuration, completedCallback) {
	    var _this2 = this;
	
	    var start = this.element_.scrollLeft;
	    var distance = newPosition - start;
	
	    if (distance !== 0) {
	      (function () {
	        var duration = Math.max(Math.min(Math.abs(distance), newDuration || 400), 100); // duration is between 100 and newDuration||400ms||distance
	        var t = 0;
	        _this2.scrollAnimation_.stop().start(function (timeElapsed) {
	          t += timeElapsed;
	          if (t < duration) {
	            _this2.element_.scrollLeft = (0, _easing.inOutQuintic)(t, start, distance, duration);
	            return true;
	          } else {
	            _this2.element_.scrollLeft = newPosition;
	            if (completedCallback) {
	              completedCallback();
	            }
	            return false;
	          }
	        });
	      })();
	    } else {
	      if (completedCallback) {
	        completedCallback();
	      }
	    }
	  };
	
	  /**
	   * Execute commend
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.command_ = function (event) {
	    var _this3 = this;
	
	    var x = 0;
	    var slide = null;
	    var a = event.detail.action.toLowerCase();
	
	    // Cancel slideshow if running
	    this.cancelSlideShow_();
	
	    switch (a) {
	      case 'first':
	        slide = this.element_.querySelector('.' + SLIDE + ':first-child');
	        break;
	
	      case 'last':
	        x = this.element_.scrollWidth - this.element_.clientWidth;
	        slide = this.element_.querySelector('.' + SLIDE + ':last-child');
	        break;
	
	      case 'scroll-prev':
	        x = Math.max(this.element_.scrollLeft - this.element_.clientWidth, 0);
	        break;
	
	      case 'scroll-next':
	        x = Math.min(this.element_.scrollLeft + this.element_.clientWidth, this.element_.scrollWidth - this.element_.clientWidth);
	        break;
	
	      case 'next':
	      case 'prev':
	        slide = this.element_.querySelector('.' + SLIDE + '[aria-selected]');
	        if (slide) {
	          slide = a === 'next' ? slide.nextElementSibling : slide.previousElementSibling;
	          this.setAriaSelected_(slide);
	          this.emitSelectEvent_(a, null, slide);
	        }
	        return;
	
	      case 'play':
	        (0, _assign2.default)(this.config_, event.detail);
	        this.startSlideShow_();
	        return;
	
	      case 'pause':
	        return;
	
	      default:
	        return;
	    }
	
	    this.animateScroll_(x, undefined, function () {
	      if ('scroll-next' === a || 'scroll-prev' === a) {
	        var slides = _this3.getSlidesInViewport_();
	        if (slides.length > 0) {
	          slide = 'scroll-next' === a ? slides[0] : slides[slides.length - 1];
	        }
	      }
	      _this3.setAriaSelected_(slide);
	      _this3.emitSelectEvent_(a, null, slide);
	    });
	  };
	
	  /**
	   * Handles custom command event, 'scroll-prev', 'scroll-next', 'first', 'last', next, prev, play, pause
	   * @param event. A custom event
	   * @private
	   */
	  MaterialExtCarousel.prototype.commandHandler_ = function (event) {
	    event.preventDefault();
	    event.stopPropagation();
	    if (event.detail && event.detail.action) {
	      this.command_(event);
	    }
	  };
	
	  /**
	   * Handle keypress
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.keyDownHandler_ = function (event) {
	
	    if (event && event.target && event.target !== this.element_) {
	
	      var action = 'first';
	
	      if (event.keyCode === _constants.VK_HOME || event.keyCode === _constants.VK_END || event.keyCode === _constants.VK_PAGE_UP || event.keyCode === _constants.VK_PAGE_DOWN) {
	
	        event.preventDefault();
	        if (event.keyCode === _constants.VK_END) {
	          action = 'last';
	        } else if (event.keyCode === _constants.VK_PAGE_UP) {
	          action = 'scroll-prev';
	        } else if (event.keyCode === _constants.VK_PAGE_DOWN) {
	          action = 'scroll-next';
	        }
	        this.command_(action);
	      } else if (event.keyCode === _constants.VK_TAB || event.keyCode === _constants.VK_ENTER || event.keyCode === _constants.VK_SPACE || event.keyCode === _constants.VK_ARROW_UP || event.keyCode === _constants.VK_ARROW_LEFT || event.keyCode === _constants.VK_ARROW_DOWN || event.keyCode === _constants.VK_ARROW_RIGHT) {
	
	        var slide = getSlide_(event.target);
	
	        if (!slide) {
	          return;
	        }
	
	        // Cancel slideshow if running
	        this.cancelSlideShow_();
	
	        switch (event.keyCode) {
	          case _constants.VK_ARROW_UP:
	          case _constants.VK_ARROW_LEFT:
	            action = 'prev';
	            slide = slide.previousElementSibling;
	            break;
	
	          case _constants.VK_ARROW_DOWN:
	          case _constants.VK_ARROW_RIGHT:
	            action = 'next';
	            slide = slide.nextElementSibling;
	            break;
	
	          case _constants.VK_TAB:
	            if (event.shiftKey) {
	              action = 'prev';
	              slide = slide.previousElementSibling;
	            } else {
	              action = 'next';
	              slide = slide.nextElementSibling;
	            }
	            break;
	
	          case _constants.VK_SPACE:
	          case _constants.VK_ENTER:
	            action = 'select';
	            break;
	        }
	
	        if (slide) {
	          event.preventDefault();
	          setFocus_(slide);
	          this.emitSelectEvent_(action, event.keyCode, slide);
	        }
	      }
	    }
	  };
	
	  /**
	   * Handle dragging
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.dragHandler_ = function (event) {
	    var _this4 = this;
	
	    event.preventDefault();
	
	    // Cancel slideshow if running
	    this.cancelSlideShow_();
	
	    var updating = false;
	    var rAFDragId = 0;
	
	    var startX = event.clientX || (event.touches !== undefined ? event.touches[0].clientX : 0);
	    var prevX = startX;
	    var targetElement = event.target;
	
	    var update = function update(e) {
	      var currentX = e.clientX || (e.touches !== undefined ? e.touches[0].clientX : 0);
	      var dx = prevX - currentX;
	
	      if (dx < 0) {
	        _this4.element_.scrollLeft = Math.max(_this4.element_.scrollLeft + dx, 0);
	      } else if (dx > 0) {
	        _this4.element_.scrollLeft = Math.min(_this4.element_.scrollLeft + dx, _this4.element_.scrollWidth - _this4.element_.clientWidth);
	      }
	
	      prevX = currentX;
	      updating = false;
	    };
	
	    // drag handler
	    var drag = function drag(e) {
	      e.preventDefault();
	
	      if (!updating) {
	        rAFDragId = window.requestAnimationFrame(function () {
	          return update(e);
	        });
	        updating = true;
	      }
	    };
	
	    // end drag handler
	    var endDrag = function endDrag(e) {
	      e.preventDefault();
	
	      _this4.element_.removeEventListener('mousemove', drag);
	      _this4.element_.removeEventListener('touchmove', drag);
	      window.removeEventListener('mouseup', endDrag);
	      window.removeEventListener('touchend', endDrag);
	
	      // cancel any existing drag rAF, see: http://www.html5rocks.com/en/tutorials/speed/animations/
	      window.cancelAnimationFrame(rAFDragId);
	
	      var slide = getSlide_(targetElement);
	      setFocus_(slide);
	      _this4.emitSelectEvent_('click', null, slide);
	    };
	
	    this.element_.addEventListener('mousemove', drag);
	    this.element_.addEventListener('touchmove', drag);
	    window.addEventListener('mouseup', endDrag);
	    window.addEventListener('touchend', endDrag);
	  };
	
	  /**
	   * Handle click
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.clickHandler_ = function (event) {
	    // Click is handled by drag
	    event.preventDefault();
	  };
	
	  /**
	   * Handle focus
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.focusHandler_ = function (event) {
	    var slide = getSlide_(event.target);
	    if (slide) {
	      // The last focused/selected slide has 'aria-selected', even if focus is lost
	      this.setAriaSelected_(slide);
	      slide.classList.add(_constants.IS_FOCUSED);
	    }
	  };
	
	  /**
	   * Handle blur
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.blurHandler_ = function (event) {
	    var slide = getSlide_(event.target);
	    if (slide) {
	      slide.classList.remove(_constants.IS_FOCUSED);
	    }
	  };
	
	  /**
	   * Emits a custeom 'select' event
	   * @param command
	   * @param keyCode
	   * @param slide
	   * @private
	   */
	  MaterialExtCarousel.prototype.emitSelectEvent_ = function (command, keyCode, slide) {
	
	    if (slide) {
	      this.moveSlideIntoViewport_(slide);
	
	      var evt = new CustomEvent('select', {
	        bubbles: true,
	        cancelable: true,
	        detail: {
	          command: command,
	          keyCode: keyCode,
	          source: slide
	        }
	      });
	      this.element_.dispatchEvent(evt);
	    }
	  };
	
	  /**
	   * Get the first visible slide in component viewport
	   * @private
	   */
	  MaterialExtCarousel.prototype.getSlidesInViewport_ = function () {
	    var carouselRect = this.element_.getBoundingClientRect();
	
	    var slidesInViewport = [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE))).filter(function (slide) {
	      var slideRect = slide.getBoundingClientRect();
	      return slideRect.left >= carouselRect.left && slideRect.right <= carouselRect.right;
	    });
	    return slidesInViewport;
	  };
	
	  /**
	   * Move slide into component viewport - if needed
	   * @param slide
	   * @private
	   */
	  MaterialExtCarousel.prototype.moveSlideIntoViewport_ = function (slide) {
	    var carouselRect = this.element_.getBoundingClientRect();
	    var slideRect = slide.getBoundingClientRect();
	
	    if (slideRect.left < carouselRect.left) {
	      var x = this.element_.scrollLeft - (carouselRect.left - slideRect.left);
	      this.animateScroll_(x);
	    } else if (slideRect.right > carouselRect.right) {
	      var _x = this.element_.scrollLeft - (carouselRect.right - slideRect.right);
	      this.animateScroll_(_x);
	    }
	  };
	
	  /**
	   * Removes 'aria-selected' from all slides in carousel
	   * @private
	   */
	  MaterialExtCarousel.prototype.setAriaSelected_ = function (slide) {
	    if (slide) {
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE + '[aria-selected]'))).forEach(function (slide) {
	        return slide.removeAttribute('aria-selected');
	      });
	      slide.setAttribute('aria-selected', '');
	    }
	  };
	
	  /**
	   * Removes event listeners
	   * @private
	   */
	  MaterialExtCarousel.prototype.removeListeners_ = function () {
	    this.element_.removeEventListener('focus', this.focusHandler_);
	    this.element_.removeEventListener('blur', this.blurHandler_);
	    this.element_.removeEventListener('keydown', this.keyDownHandler_);
	    this.element_.removeEventListener('mousedown', this.dragHandler_);
	    this.element_.removeEventListener('touchstart', this.dragHandler_);
	    this.element_.removeEventListener('click', this.clickHandler_, false);
	    this.element_.removeEventListener('command', this.commandHandler_);
	    this.element_.removeEventListener('mdl-componentdowngraded', this.mdlDowngrade_);
	  };
	
	  // Helpers
	  var getSlide_ = function getSlide_(element) {
	    return element.closest('.' + SLIDE);
	  };
	
	  var setFocus_ = function setFocus_(slide) {
	    if (slide) {
	      slide.focus();
	    }
	  };
	
	  var addRipple_ = function addRipple_(slide) {
	    if (!slide.querySelector('.' + _constants.MDL_RIPPLE_CONTAINER)) {
	      var rippleContainer = document.createElement('span');
	      rippleContainer.classList.add(_constants.MDL_RIPPLE_CONTAINER);
	      rippleContainer.classList.add(_constants.MDL_RIPPLE_EFFECT);
	      var ripple = document.createElement('span');
	      ripple.classList.add(_constants.MDL_RIPPLE);
	      rippleContainer.appendChild(ripple);
	
	      var img = slide.querySelector('img');
	      if (img) {
	        // rippleContainer blocks image title
	        rippleContainer.title = img.title;
	      }
	      slide.appendChild(rippleContainer);
	      componentHandler.upgradeElement(rippleContainer, _constants.MDL_RIPPLE_COMPONENT);
	    }
	  };
	  // End helpers
	
	
	  // Public methods.
	
	  /**
	   * Cancel animation - if running.
	   *
	   * @public
	   */
	  MaterialExtCarousel.prototype.stopAnimation = function () {
	    this.config_.animationLoop.stop();
	  };
	  MaterialExtCarousel.prototype['stopAnimation'] = MaterialExtCarousel.prototype.stopAnimation;
	
	  /**
	   * Upgrade slides
	   * Use if more list elements are added later (dynamically)
	   *
	   * @public
	   */
	  MaterialExtCarousel.prototype.upgradeSlides = function () {
	    var _this5 = this;
	
	    var hasRippleEffect = this.element_.classList.contains(_constants.MDL_RIPPLE_EFFECT);
	
	    [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE))).forEach(function (slide) {
	
	      slide.setAttribute('role', SLIDE_ROLE);
	
	      if (_this5.config_.interactive) {
	        if (!slide.getAttribute('tabindex')) {
	          slide.setAttribute('tabindex', '0');
	        }
	        if (hasRippleEffect) {
	          addRipple_(slide);
	        }
	      } else {
	        slide.setAttribute('tabindex', '-1');
	      }
	    });
	  };
	  MaterialExtCarousel.prototype['upgradeSlides'] = MaterialExtCarousel.prototype.upgradeSlides;
	
	  /**
	   * Get config object
	   *
	   * @public
	   */
	  MaterialExtCarousel.prototype.getConfig = function () {
	    return this.config_;
	  };
	  MaterialExtCarousel.prototype['getConfig'] = MaterialExtCarousel.prototype.getConfig;
	
	  /**
	   * Initialize component
	   */
	  MaterialExtCarousel.prototype.init = function () {
	
	    if (this.element_) {
	      // Config
	      if (this.element_.hasAttribute('data-config')) {
	        this.config_ = (0, _jsonUtils.jsonStringToObject)(this.element_.getAttribute('data-config'), this.config_);
	      }
	
	      // Wai-Aria
	      this.element_.setAttribute('role', ROLE);
	
	      // Prefer tabindex -1
	      if (!(0, _isInteger2.default)(this.element_.getAttribute('tabindex'))) {
	        this.element_.setAttribute('tabindex', -1);
	      }
	
	      // Remove listeners, just in case ...
	      this.removeListeners_();
	
	      if (this.config_.interactive) {
	
	        // Ripple
	        var hasRippleEffect = this.element_.classList.contains(_constants.MDL_RIPPLE_EFFECT);
	        if (hasRippleEffect) {
	          this.element_.classList.add(_constants.MDL_RIPPLE_EFFECT_IGNORE_EVENTS);
	        }
	
	        // Listen to focus/blur events
	        this.element_.addEventListener('focus', this.focusHandler_.bind(this), true);
	        this.element_.addEventListener('blur', this.blurHandler_.bind(this), true);
	
	        // Listen to keyboard events
	        this.element_.addEventListener('keydown', this.keyDownHandler_.bind(this), false);
	
	        // Listen to drag events
	        this.element_.addEventListener('mousedown', this.dragHandler_.bind(this), false);
	        this.element_.addEventListener('touchstart', this.dragHandler_.bind(this), false);
	
	        // Listen to click events
	        this.element_.addEventListener('click', this.clickHandler_.bind(this), false);
	      }
	
	      // Listen to custom 'command' event
	      this.element_.addEventListener('command', this.commandHandler_.bind(this), false);
	
	      // Listen to 'mdl-componentdowngraded' event
	      this.element_.addEventListener('mdl-componentdowngraded', this.mdlDowngrade_.bind(this));
	
	      // Slides collection
	      this.upgradeSlides();
	
	      // Set upgraded flag
	      this.element_.classList.add(_constants.IS_UPGRADED);
	
	      if (this.config_.autostart) {
	        // Start slideshow
	        this.startSlideShow_();
	      }
	    }
	  };
	
	  /*
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   */
	  MaterialExtCarousel.prototype.mdlDowngrade_ = function () {
	    'use strict';
	    //console.log('***** MaterialExtCarousel.mdlDowngrade_');
	
	    // Stop animation - if any
	
	    this.stopAnimation();
	
	    // Remove listeners
	    this.removeListeners_();
	  };
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  componentHandler.register({
	    constructor: MaterialExtCarousel,
	    classAsString: 'MaterialExtCarousel',
	    cssClass: 'mdlext-js-carousel',
	    widget: true
	  });
	})();

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(56);
	
	__webpack_require__(55);
	
	__webpack_require__(20);
	
	__webpack_require__(18);
	
	__webpack_require__(27);
	
	__webpack_require__(19);
	
	__webpack_require__(28);
	
	__webpack_require__(54);
	
	__webpack_require__(53);
	
	__webpack_require__(48);
	
	__webpack_require__(51);
	
	__webpack_require__(52);
	
	__webpack_require__(49);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(12);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  'use strict';
	
	  //const LIGHTBOARD = 'mdlext-lightboard';
	
	  var LIGHTBOARD_ROLE = 'grid';
	  var SLIDE = 'mdlext-lightboard__slide';
	  var SLIDE_ROLE = 'gridcell';
	  var SLIDE_TABSTOP = 'mdlext-lightboard__slide__frame';
	  /**
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtLightboard = function MaterialExtLightboard(element) {
	    // Stores the element.
	    this.element_ = element;
	
	    // Initialize instance.
	    this.init();
	  };
	  window['MaterialExtLightboard'] = MaterialExtLightboard;
	
	  // Helpers
	  var getSlide = function getSlide(element) {
	    return element ? element.closest('.' + SLIDE) : null;
	  };
	
	  // Private methods.
	
	  /**
	   * Select a slide, i.e. set aria-selected="true"
	   * @param element
	   * @private
	   */
	  MaterialExtLightboard.prototype.selectSlide_ = function (element) {
	    var slide = getSlide(element);
	    if (slide && !slide.hasAttribute('aria-selected')) {
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE + '[aria-selected="true"]'))).forEach(function (selectedSlide) {
	        return selectedSlide.removeAttribute('aria-selected');
	      });
	
	      slide.setAttribute('aria-selected', 'true');
	    }
	  };
	
	  /**
	   * Dispatch select event
	   * @param {Element} slide The slide that caused the event
	   * @private
	   */
	  MaterialExtLightboard.prototype.dispatchSelectEvent_ = function (slide) {
	    this.element_.dispatchEvent(new CustomEvent('select', {
	      bubbles: true,
	      cancelable: true,
	      detail: { source: slide }
	    }));
	  };
	
	  /**
	   * Handles custom command event, 'first', 'next', 'prev', 'last', 'select' or upgrade
	   * @param event. A custom event
	   * @private
	   */
	  MaterialExtLightboard.prototype.commandHandler_ = function (event) {
	    event.preventDefault();
	    event.stopPropagation();
	
	    if (event && event.detail) {
	      this.command(event.detail);
	    }
	  };
	
	  // Public methods
	
	  /**
	   * Initialize lightboard slides
	   * @public
	   */
	  MaterialExtLightboard.prototype.upgradeSlides = function () {
	
	    var addRipple = function addRipple(slide) {
	      // Use slide frame as ripple container
	      if (!slide.querySelector('.' + _constants.MDL_RIPPLE_CONTAINER)) {
	        var a = slide.querySelector('.' + SLIDE_TABSTOP);
	        if (a) {
	          var rippleContainer = a;
	          rippleContainer.classList.add(_constants.MDL_RIPPLE_CONTAINER);
	          rippleContainer.classList.add(_constants.MDL_RIPPLE_EFFECT);
	          var ripple = document.createElement('span');
	          ripple.classList.add(_constants.MDL_RIPPLE);
	          rippleContainer.appendChild(ripple);
	          componentHandler.upgradeElement(rippleContainer, _constants.MDL_RIPPLE_COMPONENT);
	        }
	      }
	    };
	
	    var hasRippleEffect = this.element_.classList.contains(_constants.MDL_RIPPLE_EFFECT);
	
	    [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE))).forEach(function (slide) {
	
	      slide.setAttribute('role', SLIDE_ROLE);
	
	      if (!slide.querySelector('a')) {
	        slide.setAttribute('tabindex', '0');
	      }
	      if (hasRippleEffect) {
	        addRipple(slide);
	      }
	    });
	  };
	  MaterialExtLightboard.prototype['upgradeSlides'] = MaterialExtLightboard.prototype.upgradeSlides;
	
	  /**
	   * Execute command
	   * @param detail
	   * @public
	   */
	  MaterialExtLightboard.prototype.command = function (detail) {
	    var _this = this;
	
	    var firstSlide = function firstSlide() {
	      return _this.element_.querySelector('.' + SLIDE + ':first-child');
	    };
	
	    var lastSlide = function lastSlide() {
	      return _this.element_.querySelector('.' + SLIDE + ':last-child');
	    };
	
	    var nextSlide = function nextSlide() {
	      var slide = _this.element_.querySelector('.' + SLIDE + '[aria-selected="true"]').nextElementSibling;
	      return slide ? slide : firstSlide();
	    };
	
	    var prevSlide = function prevSlide() {
	      var slide = _this.element_.querySelector('.' + SLIDE + '[aria-selected="true"]').previousElementSibling;
	      return slide ? slide : lastSlide();
	    };
	
	    if (detail && detail.action) {
	      var action = detail.action;
	      var target = detail.target;
	
	
	      var slide = void 0;
	      switch (action.toLowerCase()) {
	        case 'select':
	          slide = getSlide(target);
	          this.dispatchSelectEvent_(slide);
	          break;
	        case 'first':
	          slide = firstSlide();
	          break;
	        case 'next':
	          slide = nextSlide();
	          break;
	        case 'prev':
	          slide = prevSlide();
	          break;
	        case 'last':
	          slide = lastSlide();
	          break;
	        case 'upgrade':
	          this.upgradeSlides();
	          break;
	        default:
	          throw new Error('Unknown action "' + action + '". Action must be one of "first", "next", "prev", "last", "select" or "upgrade"');
	      }
	
	      if (slide) {
	        var a = slide.querySelector('a');
	        if (a) {
	          a.focus();
	        } else {
	          slide.focus();
	        }
	
	        // Workaround for JSDom testing:
	        // In JsDom 'element.focus()' does not trigger any focus event
	        if (!slide.hasAttribute('aria-selected')) {
	          this.selectSlide_(slide);
	        }
	      }
	    }
	  };
	  MaterialExtLightboard.prototype['command'] = MaterialExtLightboard.prototype.command;
	
	  /**
	   * Initialize component
	   */
	  MaterialExtLightboard.prototype.init = function () {
	    var _this2 = this;
	
	    var keydownHandler = function keydownHandler(event) {
	
	      if (event.target !== _this2.element_) {
	        var action = void 0;
	        var target = void 0;
	        switch (event.keyCode) {
	          case _constants.VK_HOME:
	            action = 'first';
	            break;
	          case _constants.VK_END:
	            action = 'last';
	            break;
	          case _constants.VK_ARROW_UP:
	          case _constants.VK_ARROW_LEFT:
	            action = 'prev';
	            break;
	          case _constants.VK_ARROW_DOWN:
	          case _constants.VK_ARROW_RIGHT:
	            action = 'next';
	            break;
	          case _constants.VK_ENTER:
	          case _constants.VK_SPACE:
	            action = 'select';
	            target = event.target;
	            break;
	        }
	        if (action) {
	          event.preventDefault();
	          event.stopPropagation();
	          _this2.command({ action: action, target: target });
	        }
	      }
	    };
	
	    var clickHandler = function clickHandler(event) {
	      event.preventDefault();
	      event.stopPropagation();
	
	      if (event.target !== _this2.element_) {
	        _this2.command({ action: 'select', target: event.target });
	      }
	    };
	
	    var focusHandler = function focusHandler(event) {
	      event.preventDefault();
	      event.stopPropagation();
	
	      if (event.target !== _this2.element_) {
	        _this2.selectSlide_(event.target);
	      }
	    };
	
	    if (this.element_) {
	      this.element_.setAttribute('role', LIGHTBOARD_ROLE);
	
	      if (this.element_.classList.contains(_constants.MDL_RIPPLE_EFFECT)) {
	        this.element_.classList.add(_constants.MDL_RIPPLE_EFFECT_IGNORE_EVENTS);
	      }
	
	      // Remove listeners, just in case ...
	      this.element_.removeEventListener('command', this.commandHandler_);
	      this.element_.removeEventListener('keydown', keydownHandler);
	      this.element_.removeEventListener('click', clickHandler);
	      this.element_.removeEventListener('focus', focusHandler);
	
	      this.element_.addEventListener('command', this.commandHandler_.bind(this), false);
	      this.element_.addEventListener('keydown', keydownHandler, true);
	      this.element_.addEventListener('click', clickHandler, true);
	      this.element_.addEventListener('focus', focusHandler, true);
	
	      this.upgradeSlides();
	
	      this.element_.classList.add(_constants.IS_UPGRADED);
	    }
	  };
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  /* jshint undef:false */
	  componentHandler.register({
	    constructor: MaterialExtLightboard,
	    classAsString: 'MaterialExtLightboard',
	    cssClass: 'mdlext-js-lightboard',
	    widget: true
	  });
	})(); /**
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
	 * A lightboard is a translucent surface illuminated from behind, used for situations
	 * where a shape laid upon the surface needs to be seen with high contrast. In the "old days" of photography
	 * photograpers used a lightboard to get a quick view of their slides. The goal is to create a responsive lightbox
	 * design, based on flex layout, similar to what is used in Adobe LightRoom to browse images.
	 */

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(12);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _isInteger = __webpack_require__(29);
	
	var _isInteger2 = _interopRequireDefault(_isInteger);
	
	var _slicedToArray2 = __webpack_require__(63);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _entries = __webpack_require__(60);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _getIterator2 = __webpack_require__(21);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _throttleFunction = __webpack_require__(20);
	
	var _throttleFunction2 = _interopRequireDefault(_throttleFunction);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	 * Responsive Lightbox
	 */
	
	(function () {
	  'use strict';
	
	  var LIGHTBOX = 'mdlext-lightbox';
	  var LIGHTBOX_SLIDER = 'mdlext-lightbox__slider';
	  var LIGHTBOX_SLIDER_SLIDE = 'mdlext-lightbox__slider__slide';
	  var STICKY_FOOTER = 'mdlext-lightbox--sticky-footer';
	  var BUTTON = 'mdl-button';
	
	  /**
	   * https://github.com/google/material-design-lite/issues/4205
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtLightbox = function MaterialExtLightbox(element) {
	    // Stores the element.
	    this.element_ = element;
	
	    // Initialize instance.
	    this.init();
	  };
	  window['MaterialExtLightbox'] = MaterialExtLightbox;
	
	  /**
	   * Handle keypress
	   * @param event
	   * @private
	   */
	  MaterialExtLightbox.prototype.keyDownHandler_ = function (event) {
	
	    if (event) {
	      if (event.keyCode === _constants.VK_ESC || event.keyCode === _constants.VK_SPACE || event.keyCode === _constants.VK_END || event.keyCode === _constants.VK_HOME || event.keyCode === _constants.VK_ARROW_UP || event.keyCode === _constants.VK_ARROW_LEFT || event.keyCode === _constants.VK_ARROW_DOWN || event.keyCode === _constants.VK_ARROW_RIGHT) {
	
	        if (event.keyCode !== _constants.VK_ESC) {
	          event.preventDefault();
	          event.stopPropagation();
	        }
	
	        var action = 'first';
	        if (event.keyCode === _constants.VK_END) {
	          action = 'last';
	        } else if (event.keyCode === _constants.VK_ARROW_UP || event.keyCode === _constants.VK_ARROW_LEFT) {
	          action = 'prev';
	        } else if (event.keyCode === _constants.VK_ARROW_DOWN || event.keyCode === _constants.VK_ARROW_RIGHT) {
	          action = 'next';
	        } else if (event.keyCode === _constants.VK_SPACE) {
	          action = 'select';
	        } else if (event.keyCode === _constants.VK_ESC) {
	          action = 'cancel';
	        }
	
	        dispatchAction_(action, this);
	      }
	    }
	  };
	
	  /**
	   * Handle button clicks
	   * @param event
	   * @private
	   */
	  MaterialExtLightbox.prototype.buttonClickHandler_ = function (event) {
	
	    if (event) {
	      event.preventDefault();
	      event.stopPropagation();
	
	      dispatchAction_(this.getAttribute('data-action') || '', this);
	
	      var n = this.closest('.' + LIGHTBOX);
	      if (n) {
	        n.focus();
	      }
	    }
	  };
	
	  /**
	   * Dispatches an action custom event
	   * @param action
	   * @param source
	   * @param target
	   * @private
	   */
	  var dispatchAction_ = function dispatchAction_(action, source) {
	    var target = arguments.length <= 2 || arguments[2] === undefined ? source : arguments[2];
	
	
	    target.dispatchEvent(new CustomEvent('action', {
	      bubbles: true,
	      cancelable: true,
	      detail: {
	        action: action || '',
	        source: source
	      }
	    }));
	  };
	
	  /**
	   * Reposition dialog if component parent element is "DIALOG"
	   * @param lightboxElement
	   * @private
	   */
	  var repositionDialog_ = function repositionDialog_(lightboxElement) {
	    var footerHeight = function footerHeight(footer, isSticky) {
	      return isSticky && footer ? footer.offsetHeight : 0;
	    };
	
	    var reposition = function reposition(dialog, fh) {
	      if (window.getComputedStyle(dialog).position === 'absolute') {
	        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	        var topValue = scrollTop + (window.innerHeight - dialog.offsetHeight - fh) / 2;
	        dialog.style.top = Math.max(scrollTop, topValue) + 'px';
	      }
	    };
	
	    var dialog = lightboxElement.parentNode.nodeName === 'DIALOG' ? lightboxElement.parentNode : null;
	    if (dialog && dialog.hasAttribute('open')) {
	      lightboxElement.style.width = 'auto';
	      lightboxElement.style.maxWidth = '100%';
	      var img = lightboxElement.querySelector('img');
	      if (img) {
	        lightboxElement.style.maxWidth = img.naturalWidth !== 'undefined' ? img.naturalWidth + 'px' : img.width + 'px' || '100%';
	      }
	
	      var fh = footerHeight(lightboxElement.querySelector('footer'), lightboxElement.classList.contains(STICKY_FOOTER));
	      var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - fh;
	      if (dialog.offsetHeight > vh) {
	        var n = 0;
	        while (dialog.offsetHeight > vh && ++n < 4) {
	          lightboxElement.style.width = lightboxElement.offsetWidth * vh / lightboxElement.offsetHeight + 'px';
	        }
	      }
	      reposition(dialog, fh);
	    }
	  };
	
	  /**
	   * Handle image load
	   * @param event
	   * @private
	   */
	
	  MaterialExtLightbox.prototype.imgLoadHandler_ = function () /*event*/{
	    repositionDialog_(this);
	  };
	
	  /**
	   * Handle image drag
	   * @param event
	   * @private
	     */
	  MaterialExtLightbox.prototype.imgDragHandler_ = function (event) {
	
	    var setStyles = function setStyles(element, properties) {
	      //noinspection JSAnnotator
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(properties)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = (0, _slicedToArray3.default)(_step.value, 2);
	
	          var key = _step$value[0];
	          var value = _step$value[1];
	
	          element.style[key] = value;
	        }
	        // ... or:
	        //for (const key in properties) {
	        //  element.style[key] = properties[key];
	        //}
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    };
	
	    event.preventDefault();
	    //event.stopPropagation();
	
	    var x = event.clientX || (event.touches !== undefined ? event.touches[0].clientX : 0);
	
	    var img = this;
	    img.style.opacity = '0.2';
	
	    var slider = document.createElement('div');
	    slider.classList.add(LIGHTBOX_SLIDER);
	    setStyles(slider, { 'width': img.offsetWidth + 'px', 'height': img.offsetHeight + 'px' });
	
	    var slide = document.createElement('div');
	    slide.classList.add(LIGHTBOX_SLIDER_SLIDE);
	    slide.textContent = '>';
	    setStyles(slide, {
	      'width': img.offsetWidth + 'px',
	      'height': img.offsetHeight + 'px',
	      'line-height': img.offsetHeight + 'px',
	      'font-size': img.offsetHeight / 4 + 'px',
	      'text-align': 'right',
	      'background-image': 'url("' + (img.getAttribute('data-img-url-prev') || '') + '")'
	    });
	    slider.appendChild(slide);
	
	    slide = document.createElement('div');
	    slide.classList.add(LIGHTBOX_SLIDER_SLIDE);
	    setStyles(slide, {
	      'width': img.offsetWidth + 'px',
	      'height': img.offsetHeight + 'px',
	      'background-image': 'url("' + img.src + '")'
	    });
	    slider.appendChild(slide);
	
	    slide = document.createElement('div');
	    slide.classList.add(LIGHTBOX_SLIDER_SLIDE);
	    slide.textContent = '<';
	    setStyles(slide, {
	      'width': img.offsetWidth + 'px',
	      'height': img.offsetHeight + 'px',
	      'line-height': img.offsetHeight + 'px',
	      'font-size': img.offsetHeight / 4 + 'px',
	      'text-align': 'left',
	      'background-image': 'url("' + (img.getAttribute('data-img-url-next') || '') + '")'
	    });
	    slider.appendChild(slide);
	
	    img.parentNode.appendChild(slider);
	
	    // drag handler
	    var drag = function drag(e) {
	      e.preventDefault();
	      var dx = (e.clientX || (e.touches !== undefined ? e.touches[0].clientX : 0)) - x; // TODO: maybe rewrite to improve performance
	
	      if (slider.offsetWidth - Math.abs(dx) > 19) {
	        slider.style.left = dx + 'px';
	      }
	    };
	
	    // end drag handler
	    var endDrag = function endDrag(e) {
	      e.preventDefault();
	      //e.stopPropagation();
	
	      window.removeEventListener('mousemove', drag);
	      window.removeEventListener('touchmove', drag);
	      window.removeEventListener('mouseup', endDrag);
	      window.removeEventListener('touchend', endDrag);
	
	      var dx = slider.offsetLeft;
	      img.parentNode.removeChild(slider);
	      img.style.opacity = '1.0';
	
	      if (Math.abs(dx) > 19) {
	        dispatchAction_(dx > 0 ? 'prev' : 'next', img);
	      }
	    };
	
	    window.addEventListener('mousemove', drag);
	    window.addEventListener('touchmove', drag);
	    window.addEventListener('mouseup', endDrag);
	    window.addEventListener('touchend', endDrag);
	  };
	
	  /**
	   * Initialize component
	   */
	  MaterialExtLightbox.prototype.init = function () {
	    var _this = this;
	
	    if (this.element_) {
	      // Do the init required for this component to work
	      this.element_.addEventListener('keydown', this.keyDownHandler_.bind(this.element_), true);
	
	      if (!(0, _isInteger2.default)(this.element_.getAttribute('tabindex'))) {
	        this.element_.setAttribute('tabindex', 1);
	      }
	
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + BUTTON))).forEach(function (button) {
	        return button.addEventListener('click', _this.buttonClickHandler_.bind(button), false);
	      });
	
	      var figcaption = this.element_.querySelector('figcaption');
	      if (figcaption) {
	        figcaption.addEventListener('click', this.buttonClickHandler_.bind(figcaption), false);
	      }
	
	      var footer = this.element_.querySelector('footer');
	      if (footer) {
	        footer.addEventListener('click', this.buttonClickHandler_.bind(footer), false);
	      }
	
	      var img = this.element_.querySelector('img');
	      if (img) {
	        img.addEventListener('load', this.imgLoadHandler_.bind(this.element_), false);
	        img.addEventListener('click', function (e) {
	          return e.preventDefault();
	        }, true);
	        img.addEventListener('mousedown', this.imgDragHandler_.bind(img), true);
	        img.addEventListener('touchstart', this.imgDragHandler_.bind(img), true);
	      }
	      window.addEventListener('resize', (0, _throttleFunction2.default)(function () {
	        return repositionDialog_(_this.element_);
	      }));
	      window.addEventListener('orientationchange', function () {
	        return repositionDialog_(_this.element_);
	      });
	
	      // Set upgraded flag
	      this.element_.classList.add(_constants.IS_UPGRADED);
	    }
	  };
	
	  /*
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   *
	   * Nothing to downgrade
	   *
	  MaterialExtLightbox.prototype.mdlDowngrade_ = function() {
	  };
	  */
	
	  /**
	   * The component registers itself. It can assume componentHandler is available in the global scope.
	   */
	  /* jshint undef:false */
	  componentHandler.register({
	    constructor: MaterialExtLightbox,
	    classAsString: 'MaterialExtLightbox',
	    cssClass: 'mdlext-js-lightbox'
	  });
	})();

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _stringUtils = __webpack_require__(28);
	
	var _constants = __webpack_require__(5);
	
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
	
	/*
	 * Copied/Modified from https://github.com/google/material-design-lite/tree/master/src/textfield
	 */
	
	(function () {
	  'use strict';
	
	  var LABEL = 'mdlext-selectfield__label';
	  var INPUT = 'mdlext-selectfield__select';
	
	  /**
	   * Class constructor for Selectfield MDLEXT component.
	   * Implements MDL component design pattern defined at:
	   * https://github.com/jasonmayes/mdl-component-design-pattern
	   *
	   * @constructor
	   * @param {HTMLElement} element The element that will be upgraded.
	   */
	  var MaterialExtSelectfield = function MaterialExtSelectfield(element) {
	    this.element_ = element;
	    this.init(); // Initialize instance.
	  };
	
	  window['MaterialExtSelectfield'] = MaterialExtSelectfield;
	
	  /**
	   * Handle focus.
	   *
	   * @param {Event} event The event that fired.
	   * @private
	   */
	  /*eslint no-unused-vars: 0*/
	  MaterialExtSelectfield.prototype.onFocus_ = function () /*event*/{
	    this.element_.classList.add(_constants.IS_FOCUSED);
	  };
	
	  /**
	   * Handle lost focus.
	   *
	   * @param {Event} event The event that fired.
	   * @private
	   */
	  /*eslint no-unused-vars: 0*/
	  MaterialExtSelectfield.prototype.onBlur_ = function () /*event*/{
	    this.element_.classList.remove(_constants.IS_FOCUSED);
	  };
	
	  /**
	   * Handle reset event from out side.
	   *
	   * @param {Event} event The event that fired.
	   * @private
	   */
	  MaterialExtSelectfield.prototype.onReset_ = function () /*event*/{
	    this.updateClasses_();
	  };
	
	  /**
	   * Handle class updates.
	   *
	   * @private
	   */
	  MaterialExtSelectfield.prototype.updateClasses_ = function () {
	    this.checkDisabled();
	    this.checkValidity();
	    this.checkDirty();
	    this.checkFocus();
	  };
	
	  // Public methods.
	
	  /**
	   * Check the disabled state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkDisabled = function () {
	    if (this.select_.disabled) {
	      this.element_.classList.add(_constants.IS_DISABLED);
	    } else {
	      this.element_.classList.remove(_constants.IS_DISABLED);
	    }
	  };
	  MaterialExtSelectfield.prototype['checkDisabled'] = MaterialExtSelectfield.prototype.checkDisabled;
	
	  /**
	   * Check the focus state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkFocus = function () {
	    // Note: element.querySelector(':focus') always return null in JsDom, even if select element has focus
	    /*eslint no-extra-boolean-cast: 0*/
	    if (Boolean(this.element_.querySelector(':focus'))) {
	      this.element_.classList.add(_constants.IS_FOCUSED);
	    } else {
	      this.element_.classList.remove(_constants.IS_FOCUSED);
	    }
	  };
	
	  MaterialExtSelectfield.prototype['checkFocus'] = MaterialExtSelectfield.prototype.checkFocus;
	
	  /**
	   * Check the validity state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkValidity = function () {
	
	    /* Don't think it makes any sense to check validity.
	       Tests I've done, so far, indicates that setting an illegal value via JS returns selectedIndex=0
	     if (this.select_.validity) {
	      if (this.select_.validity.valid) {
	        this.element_.classList.remove(this.CssClasses_.IS_INVALID);
	      } else {
	        this.element_.classList.add(this.CssClasses_.IS_INVALID);
	      }
	    }
	    */
	  };
	
	  MaterialExtSelectfield.prototype['checkValidity'] = MaterialExtSelectfield.prototype.checkValidity;
	
	  /**
	   * Check the dirty state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkDirty = function () {
	    if (this.select_.value && this.select_.value.length > 0) {
	      this.element_.classList.add(_constants.IS_DIRTY);
	    } else {
	      this.element_.classList.remove(_constants.IS_DIRTY);
	    }
	  };
	
	  MaterialExtSelectfield.prototype['checkDirty'] = MaterialExtSelectfield.prototype.checkDirty;
	
	  /**
	   * Disable select field.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.disable = function () {
	    this.select_.disabled = true;
	    this.updateClasses_();
	  };
	
	  MaterialExtSelectfield.prototype['disable'] = MaterialExtSelectfield.prototype.disable;
	
	  /**
	   * Enable select field.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.enable = function () {
	    this.select_.disabled = false;
	    this.updateClasses_();
	  };
	
	  MaterialExtSelectfield.prototype['enable'] = MaterialExtSelectfield.prototype.enable;
	
	  /**
	   * Update select field value.
	   *
	   * @param {string} value The value to which to set the control (optional).
	   * @public
	   */
	  MaterialExtSelectfield.prototype.change = function (value) {
	    this.select_.value = value || '';
	    this.updateClasses_();
	  };
	  MaterialExtSelectfield.prototype['change'] = MaterialExtSelectfield.prototype.change;
	
	  /**
	   * Initialize element.
	   */
	  MaterialExtSelectfield.prototype.init = function () {
	    if (this.element_) {
	      this.label_ = this.element_.querySelector('.' + LABEL);
	      this.select_ = this.element_.querySelector('.' + INPUT);
	
	      if (this.select_) {
	        // Remove listeners, just in case ...
	        this.select_.removeEventListener('change', this.updateClasses_);
	        this.select_.removeEventListener('focus', this.onFocus_);
	        this.select_.removeEventListener('blur', this.onBlur_);
	        this.select_.removeEventListener('reset', this.onReset_);
	
	        this.select_.addEventListener('change', this.updateClasses_.bind(this));
	        this.select_.addEventListener('focus', this.onFocus_.bind(this));
	        this.select_.addEventListener('blur', this.onBlur_.bind(this));
	        this.select_.addEventListener('reset', this.onReset_.bind(this));
	
	        if (this.label_) {
	          var id = void 0;
	          if (!this.select_.hasAttribute('id')) {
	            id = 'select-' + (0, _stringUtils.randomString)();
	            this.select_.id = id;
	          } else {
	            id = this.select_.id;
	          }
	
	          if (!this.label_.hasAttribute('for')) {
	            this.label_.setAttribute('for', id);
	          }
	        }
	
	        var invalid = this.element_.classList.contains(_constants.IS_INVALID);
	        this.updateClasses_();
	        this.element_.classList.add(_constants.IS_UPGRADED);
	
	        if (invalid) {
	          this.element_.classList.add(_constants.IS_INVALID);
	        }
	        if (this.select_.hasAttribute('autofocus')) {
	          this.element_.focus();
	          this.checkFocus();
	        }
	      }
	    }
	  };
	
	  /**
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   *
	   * Nothing to downgrade
	   *
	  MaterialExtSelectfield.prototype.mdlDowngrade_ = function() {
	    'use strict';
	    console.log('***** MaterialExtSelectfield.mdlDowngrade ');
	  };
	  */
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /*eslint no-undef: 0*/
	  componentHandler.register({
	    constructor: MaterialExtSelectfield,
	    classAsString: 'MaterialExtSelectfield',
	    cssClass: 'mdlext-js-selectfield',
	    widget: true
	  });
	})();

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _throttleFunction = __webpack_require__(20);
	
	var _throttleFunction2 = _interopRequireDefault(_throttleFunction);
	
	var _jsonUtils = __webpack_require__(19);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  'use strict';
	
	  var MDL_LAYOUT_CONTENT = 'mdl-layout__content';
	  var IS_SCROLL_CLASS = 'mdlext-is-scroll';
	
	  /**
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtStickyHeader = function MaterialExtStickyHeader(element) {
	    // Stores the element.
	    this.header_ = element;
	
	    // Heder listens to scroll events from content
	    this.content_ = null;
	    this.lastScrollTop_ = 0;
	
	    // Default config
	    this.config_ = {
	      visibleAtScrollEnd: false
	    };
	
	    this.mutationObserver_ = null;
	
	    this.drawing_ = false;
	
	    // Initialize instance.
	    this.init();
	  };
	
	  window['MaterialExtStickyHeader'] = MaterialExtStickyHeader;
	
	  /**
	   * Update header width
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.recalcWidth_ = function () {
	    this.header_.style.width = this.content_.clientWidth + 'px';
	  };
	
	  var throttleResize = (0, _throttleFunction2.default)(function (self) {
	    return self.recalcWidth_();
	  });
	
	  /**
	   * Adjust header width when window resizes or oreientation changes
	   * @param event
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.resizeHandler_ = function () /* event */{
	    throttleResize(this);
	  };
	
	  /**
	   * Update header position
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.reposition_ = function () {
	
	    var currentContentScrollTop = this.content_.scrollTop;
	    var scrollDiff = this.lastScrollTop_ - currentContentScrollTop;
	
	    if (currentContentScrollTop <= 0) {
	      // Scrolled to the top. Header sticks to the top
	      this.header_.style.top = '0';
	      this.header_.classList.remove(IS_SCROLL_CLASS);
	    } else if (scrollDiff > 0) {
	
	      if (scrollDiff >= this.header_.offsetHeight) {
	
	        // Scrolled up. Header slides in
	        var headerTop = parseInt(window.getComputedStyle(this.header_).getPropertyValue('top')) || 0;
	        if (headerTop != 0) {
	          this.header_.style.top = '0';
	          this.header_.classList.add(IS_SCROLL_CLASS);
	        }
	        this.lastScrollTop_ = currentContentScrollTop;
	      }
	      return;
	    } else if (scrollDiff < 0) {
	      // Scrolled down
	      this.header_.classList.add(IS_SCROLL_CLASS);
	      var _headerTop = parseInt(window.getComputedStyle(this.header_).getPropertyValue('top')) || 0;
	
	      if (this.content_.scrollHeight - this.content_.scrollTop <= this.content_.offsetHeight) {
	        // Bottom of content
	        if (_headerTop != 0) {
	          this.header_.style.top = this.config_.visibleAtScrollEnd ? '0' : '-' + this.header_.offsetHeight + 'px';
	        }
	      } else {
	        _headerTop += scrollDiff;
	        var offsetHeight = this.header_.offsetHeight;
	        this.header_.style.top = (Math.abs(_headerTop) > offsetHeight ? -offsetHeight : _headerTop) + 'px';
	      }
	    }
	
	    this.lastScrollTop_ = currentContentScrollTop;
	  };
	
	  var throttleScroll = (0, _throttleFunction2.default)(function (self) {
	    return self.reposition_();
	  });
	
	  /**
	   * Scroll header when content scrolls
	   * @param event
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.scrollHandler_ = function () /* event */{
	    throttleScroll(this);
	  };
	
	  /**
	   * Init header position
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.updatePosition_ = function () /* event */{
	    this.recalcWidth_();
	    this.reposition_();
	  };
	
	  /**
	   * Add mutation observer
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.addMutationObserver_ = function () {
	    var _this = this;
	
	    // jsdom does not support MutationObserver - so this is not testable
	    /* istanbul ignore next */
	    this.mutationObserver_ = new MutationObserver(function () /*mutations*/{
	      // Adjust header width if content changes (e.g. in a SPA)
	      _this.updatePosition_();
	    });
	
	    this.mutationObserver_.observe(this.content_, {
	      attributes: false,
	      childList: true,
	      characterData: false,
	      subtree: true
	    });
	  };
	
	  /**
	  * Removes event listeners
	  * @private
	  */
	  MaterialExtStickyHeader.prototype.removeListeners_ = function () {
	
	    window.removeEventListener('resize', this.resizeHandler_);
	    window.removeEventListener('orientationchange', this.resizeHandler_);
	
	    if (this.content_) {
	      this.content_.removeEventListener('scroll', this.scrollHandler_);
	    }
	
	    if (this.mutationObserver_) {
	      this.mutationObserver_.disconnect();
	      this.mutationObserver_ = null;
	    }
	  };
	
	  /**
	   * Initialize component
	   */
	  MaterialExtStickyHeader.prototype.init = function () {
	
	    if (this.header_) {
	
	      this.removeListeners_();
	
	      if (this.header_.hasAttribute('data-config')) {
	        this.config_ = (0, _jsonUtils.jsonStringToObject)(this.header_.getAttribute('data-config'));
	      }
	
	      this.content_ = this.header_.parentNode.querySelector('.' + MDL_LAYOUT_CONTENT) || null;
	
	      if (this.content_) {
	        this.content_.style.paddingTop = this.header_.offsetHeight + 'px'; // Make room for sticky header
	        this.lastScrollTop_ = this.content_.scrollTop;
	
	        this.content_.addEventListener('scroll', this.scrollHandler_.bind(this));
	        window.addEventListener('resize', this.resizeHandler_.bind(this));
	        window.addEventListener('orientationchange', this.resizeHandler_.bind(this));
	
	        this.addMutationObserver_();
	        this.updatePosition_();
	
	        // Set upgraded flag
	        this.header_.classList.add(_constants.IS_UPGRADED);
	      }
	    }
	  };
	
	  /*
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   *
	   * Nothing to clean
	   *
	   MaterialExtStickyHeader.prototype.mdlDowngrade_ = function() {
	     'use strict';
	     console.log('***** MaterialExtStickyHeader.prototype.mdlDowngrade_');
	   };
	   */
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  componentHandler.register({
	    constructor: MaterialExtStickyHeader,
	    classAsString: 'MaterialExtStickyHeader',
	    cssClass: 'mdlext-js-sticky-header'
	  });
	})(); /**
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
	 * A sticky header makes site navigation easily accessible anywhere on the page and saves content space at the same.
	 * The header should auto-hide, i.e. hiding the header automatically when a user starts scrolling down the page and
	 * bringing the header back when a user might need it: they reach the bottom of the page or start scrolling up.
	 */

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _apply = __webpack_require__(62);
	
	var _apply2 = _interopRequireDefault(_apply);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Debouncing enforces that a function not be called again until a certain
	 * amount of time has passed without it being called.
	 *
	 * @see https://css-tricks.com/the-difference-between-throttling-and-debouncing/
	 * @see https://github.com/webmodules/raf-debounce
	 * @see https://github.com/moszeed/es6-promise-debounce
	 * @see https://gist.github.com/philbirnie/893950093611d5c1dff4246a572cfbeb/
	 * @see https://github.com/SliceMeNice-ES6/event-utils/blob/master/debounce.js
	 * @see https://github.com/jeromedecoster/raf-funcs
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @see http://davidwalsh.name/javascript-debounce-function
	 *
	 * @param callback the callback
	 * @param threshold optional delay, default to 250 ms, min to 1000/60ms ms
	 * @param context  optional context of this, default to global
	 * @return {Function} reference to immediate and cancel
	 */
	var MIN_THRESHOLD = 1000 / 60;
	
	var debounceFunction = function debounceFunction(callback) {
	  var threshold = arguments.length <= 1 || arguments[1] === undefined ? 250 : arguments[1];
	  var context = arguments[2];
	
	
	  if (threshold < MIN_THRESHOLD) {
	    threshold = MIN_THRESHOLD;
	  }
	
	  var next = null;
	  var start = 0;
	
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var _cancel = function _cancel() {
	      if (next) {
	        window.cancelAnimationFrame(next);
	        next = null;
	      }
	    };
	
	    var execute = function execute() {
	      _cancel();
	      return (0, _apply2.default)(callback, context, args);
	    };
	
	    var later = function later() {
	      if (threshold - (Date.now() - start) <= 0) {
	        return execute();
	      }
	      next = window.requestAnimationFrame(later);
	    };
	
	    if (context === undefined || context === null) {
	      context = this;
	    }
	
	    _cancel();
	    start = Date.now();
	    next = window.requestAnimationFrame(later);
	
	    return {
	      cancel: function cancel() {
	        return _cancel();
	      },
	      immediate: function immediate() {
	        return execute();
	      }
	    };
	  };
	};
	
	exports.default = debounceFunction;
	module.exports = exports["default"];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getIterator2 = __webpack_require__(21);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _classCallCheck2 = __webpack_require__(31);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(32);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _animationloop = __webpack_require__(18);
	
	var _animationloop2 = _interopRequireDefault(_animationloop);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function (window, document) {
	  'use strict';
	
	  if (typeof window.ResizeObserver !== 'undefined') {
	    return;
	  }
	
	  document.resizeObservers = [];
	
	  var clientDimension = function clientDimension(target) {
	    return target.getBoundingClientRect();
	  };
	
	  var dimensionHasChanged = function dimensionHasChanged(target, lastWidth, lastHeight) {
	    var _clientDimension = clientDimension(target);
	
	    var width = _clientDimension.width;
	    var height = _clientDimension.height;
	
	    return width !== lastWidth || height !== lastHeight;
	  };
	
	  /**
	   * ResizeObservation holds observation information for a single Element.
	   * @param target
	   * @return {{target: *, broadcastWidth, broadcastHeight, isOrphan: (function()), isActive: (function())}}
	   * @constructor
	   */
	  var ResizeObservation = function ResizeObservation(target) {
	    var _clientDimension2 = clientDimension(target);
	
	    var width = _clientDimension2.width;
	    var height = _clientDimension2.height;
	
	
	    return {
	      target: target,
	      broadcastWidth: width,
	      broadcastHeight: height,
	
	      isOrphan: function isOrphan() {
	        return !this.target || !this.target.parentNode;
	      },
	      isActive: function isActive() {
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
	  var ResizeObserverEntry = function ResizeObserverEntry(target, rect) {
	    return {
	      target: target,
	      contentRect: rect
	    };
	  };
	
	  /**
	   * The ResizeObserver is used to observe changes to Element's content rect.
	   */
	
	  var ResizeObserver = function () {
	
	    /**
	     * Constructor for instantiating new Resize observers.
	     * @param callback void (sequence<ResizeObserverEntry> entries). The function which will be called on each resize.
	     * @throws {TypeError}
	     */
	    function ResizeObserver(callback) {
	      (0, _classCallCheck3.default)(this, ResizeObserver);
	
	
	      if (typeof callback !== 'function') {
	        throw new TypeError('callback parameter must be a function');
	      }
	
	      this.callback_ = callback;
	      this.observationTargets_ = [];
	      this.activeTargets_ = [];
	
	      document.resizeObservers.push(this);
	    }
	
	    /**
	     * A list of ResizeObservations. It represents all Elements being observed.
	     *
	     * @return {Array}
	     */
	
	
	    (0, _createClass3.default)(ResizeObserver, [{
	      key: 'observe',
	
	
	      /**
	       * Adds target to the list of observed elements.
	       * @param {HTMLElement} target The target to observe
	       */
	      value: function observe(target) {
	        if (target) {
	          if (!(target instanceof HTMLElement)) {
	            throw new TypeError('target parameter must be an HTMLElement');
	          }
	          if (!this.observationTargets_.find(function (t) {
	            return t.target === target;
	          })) {
	            this.observationTargets_.push(ResizeObservation(target));
	            resizeController.start();
	          }
	        }
	      }
	
	      /**
	       * Removes target from the list of observed elements.
	       * @param target The target to remove
	       */
	
	    }, {
	      key: 'unobserve',
	      value: function unobserve(target) {
	        var i = this.observationTargets_.findIndex(function (t) {
	          return t.target === target;
	        });
	        if (i > -1) {
	          this.observationTargets_.splice(i, 1);
	          resizeController.stop();
	        }
	      }
	
	      /**
	       * Stops the ResizeObserver instance from receiving notifications of resize changes.
	       * Until the observe() method is used again, observer's callback will not be invoked.
	       */
	
	    }, {
	      key: 'disconnect',
	      value: function disconnect() {
	        this.observationTargets_ = [];
	        this.activeTargets_ = [];
	      }
	
	      /**
	       * Removes the ResizeObserver from the list of observers
	       */
	
	    }, {
	      key: 'destroy',
	      value: function destroy() {
	        var _this = this;
	
	        this.disconnect();
	        var i = document.resizeObservers.findIndex(function (o) {
	          return o === _this;
	        });
	        if (i > -1) {
	          document.resizeObservers.splice(i, 1);
	          resizeController.stop();
	        }
	      }
	    }, {
	      key: 'deleteOrphansAndPopulateActiveTargets_',
	      value: function deleteOrphansAndPopulateActiveTargets_() {
	
	        // Works
	        //this.observationTargets_ = this.observationTargets_.filter( resizeObervation => !resizeObervation.isOrphan());
	        //this.activeTargets_ = this.observationTargets_.filter( resizeObervation => resizeObervation.isActive());
	
	        // Same result as above
	        /*
	        this.activeTargets_ = [];
	        let n = this.observationTargets_.length-1;
	        while(n >= 0) {
	          if(this.observationTargets_[n].isOrphan()) {
	            this.observationTargets_.splice(n, 1);
	          }
	          else if(this.observationTargets_[n].isActive()) {
	            this.activeTargets_.push(this.observationTargets_[n]);
	          }
	          n -= 1;
	        }
	        */
	
	        // Same result as above
	        this.activeTargets_ = this.observationTargets_.reduceRight(function (prev, resizeObservation, index, arr) {
	          if (resizeObservation.isOrphan()) {
	            arr.splice(index, 1);
	          } else if (resizeObservation.isActive()) {
	            prev.push(resizeObservation);
	          }
	          return prev;
	        }, []);
	      }
	    }, {
	      key: 'broadcast_',
	      value: function broadcast_() {
	        this.deleteOrphansAndPopulateActiveTargets_();
	        if (this.activeTargets_.length > 0) {
	          var entries = [];
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;
	
	          try {
	            for (var _iterator = (0, _getIterator3.default)(this.activeTargets_), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var resizeObservation = _step.value;
	
	              var rect = clientDimension(resizeObservation.target);
	              resizeObservation.broadcastWidth = rect.width;
	              resizeObservation.broadcastHeight = rect.height;
	              entries.push(ResizeObserverEntry(resizeObservation.target, rect));
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }
	
	          this.callback_(entries);
	          this.activeTargets_ = [];
	        }
	      }
	    }, {
	      key: 'observationTargets',
	      get: function get() {
	        return this.observationTargets_;
	      }
	
	      /**
	       *  A list of ResizeObservations. It represents all Elements whose size has
	       *  changed since last observation broadcast that are eligible for broadcast.
	       *
	       * @return {Array}
	       */
	
	    }, {
	      key: 'activeTargets',
	      get: function get() {
	        return this.activeTargets_;
	      }
	    }]);
	    return ResizeObserver;
	  }();
	
	  //let MdlExtAnimationLoop = require('./animationloop');
	
	  /**
	   * Broadcasts Element.resize events
	   * @return {{start: (function()), stop: (function())}}
	   * @constructor
	   */
	
	
	  var ResizeController = function ResizeController() {
	
	    var rafLoop = new _animationloop2.default(200);
	
	    var execute = function execute() {
	      //console.log('***** Execute');
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(document.resizeObservers), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var resizeObserver = _step2.value;
	
	          resizeObserver.broadcast_();
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	
	      return document.resizeObservers.length > 0;
	    };
	
	    var shouldStop = function shouldStop() {
	      return document.resizeObservers.findIndex(function (resizeObserver) {
	        return resizeObserver.observationTargets.length > 0;
	      }) > -1;
	    };
	
	    return {
	      start: function start() {
	        if (!rafLoop.running) {
	          //console.log('***** Start poll');
	          rafLoop.start(function () {
	            return execute();
	          });
	        }
	      },
	      stop: function stop() {
	        if (shouldStop()) {
	          //console.log('***** Stop poll');
	          rafLoop.stop();
	        }
	      }
	    };
	  };
	
	  window.ResizeObserver = ResizeObserver;
	
	  var resizeController = ResizeController();
	  //console.log('***** ResizeObserver ready');
	})(window, document);
	/**
	 * An API for observing changes to Element’s size.
	 *
	 * @See https://wicg.github.io/ResizeObserver/
	 * @ee https://github.com/pelotoncycle/resize-observer
	 *
	 */

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(58);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(21);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(26);
	__webpack_require__(99);
	module.exports = __webpack_require__(1).Array.from;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(47);
	__webpack_require__(26);
	module.exports = __webpack_require__(97);

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(47);
	__webpack_require__(26);
	module.exports = __webpack_require__(98);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(101);
	module.exports = __webpack_require__(1).Number.isInteger;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(102);
	module.exports = __webpack_require__(1).Object.assign;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(103);
	var $Object = __webpack_require__(1).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(106);
	module.exports = __webpack_require__(1).Object.entries;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(104);
	module.exports = __webpack_require__(1).Object.keys;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(105);
	module.exports = __webpack_require__(1).Reflect.apply;

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(16)
	  , toLength  = __webpack_require__(44)
	  , toIndex   = __webpack_require__(95);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(11)
	  , createDesc      = __webpack_require__(23);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(8) && !__webpack_require__(9)(function(){
	  return Object.defineProperty(__webpack_require__(37)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(7)
	  , ITERATOR   = __webpack_require__(2)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(14)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(6);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(86)
	  , descriptor     = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(42)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(2)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(2)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(15)
	  , gOPS     = __webpack_require__(88)
	  , pIE      = __webpack_require__(41)
	  , toObject = __webpack_require__(17)
	  , IObject  = __webpack_require__(39)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(9)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(6)
	  , dPs         = __webpack_require__(87)
	  , enumBugKeys = __webpack_require__(38)
	  , IE_PROTO    = __webpack_require__(24)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(37)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(76).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(6)
	  , getKeys  = __webpack_require__(15);
	
	module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 88 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(13)
	  , toObject    = __webpack_require__(17)
	  , IE_PROTO    = __webpack_require__(24)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(13)
	  , toIObject    = __webpack_require__(16)
	  , arrayIndexOf = __webpack_require__(74)(false)
	  , IE_PROTO     = __webpack_require__(24)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(3)
	  , core    = __webpack_require__(1)
	  , fails   = __webpack_require__(9);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(15)
	  , toIObject = __webpack_require__(16)
	  , isEnum    = __webpack_require__(41).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(25)
	  , defined   = __webpack_require__(22);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(25)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(6)
	  , get      = __webpack_require__(46);
	module.exports = __webpack_require__(1).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(34)
	  , ITERATOR  = __webpack_require__(2)('iterator')
	  , Iterators = __webpack_require__(7);
	module.exports = __webpack_require__(1).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(36)
	  , $export        = __webpack_require__(3)
	  , toObject       = __webpack_require__(17)
	  , call           = __webpack_require__(80)
	  , isArrayIter    = __webpack_require__(78)
	  , toLength       = __webpack_require__(44)
	  , createProperty = __webpack_require__(75)
	  , getIterFn      = __webpack_require__(46);
	
	$export($export.S + $export.F * !__webpack_require__(82)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(73)
	  , step             = __webpack_require__(83)
	  , Iterators        = __webpack_require__(7)
	  , toIObject        = __webpack_require__(16);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(40)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(3);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(79)});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(3);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(85)});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(3);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(8), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(17)
	  , $keys    = __webpack_require__(15);
	
	__webpack_require__(91)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export   = __webpack_require__(3)
	  , aFunction = __webpack_require__(33)
	  , anObject  = __webpack_require__(6)
	  , rApply    = (__webpack_require__(4).Reflect || {}).apply
	  , fApply    = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(9)(function(){
	  rApply(function(){});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    var T = aFunction(target)
	      , L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(3)
	  , $entries = __webpack_require__(92)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 107 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mdl-ext.js.map