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

	__webpack_require__(65);
	module.exports = __webpack_require__(30);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(24)('wks')
	  , uid        = __webpack_require__(28)
	  , Symbol     = __webpack_require__(2).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createCustomEvent = createCustomEvent;
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
	 * Due to a bug in mdl-1.1.3 it is not possible to use a globally polyfilled CustomEvent constructor
	 * Since I do not care too much about IE11, a brute force approach is sufficient.
	 *
	 * @param {string} typeArg Is a String representing the name of the event.
	 * @param {Object} customEventInit Is an EventInit dictionary, having the following fields:
	 *        "bubbles", optional and defaulting to false, of type Boolean, indicating if the event bubbles or not.
	 *        "cancelable", optional and defaulting to false, of type Boolean, indicating if the event can be canceled or not.
	 *        "detail", optional and defaulting to null, of type any, that is an event-dependent value associated with the event.
	 */
	
	function createCustomEvent(typeArg) {
	  'use strict';
	
	  var customEventInit = arguments.length <= 1 || arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: null } : arguments[1];
	  try {
	    // Modern browsers
	    return new window.CustomEvent(typeArg, customEventInit);
	  } catch (e) {
	    // Copied from https://github.com/webcomponents/webcomponentsjs/blob/v0.7.12/CustomElements.js#L950
	    // Copied from http://stackoverflow.com/questions/23349191/event-preventdefault-is-not-working-in-ie-11-for-custom-events
	    var ce = document.createEvent('CustomEvent');
	    ce.initCustomEvent(typeArg, customEventInit.bubbles, customEventInit.cancelable, customEventInit.detail);
	
	    ce.preventDefault = function () {
	      Object.defineProperty(this, 'defaultPrevented', {
	        get: function get() {
	          return true;
	        }
	      });
	    };
	    return ce;
	  }
	  // Let old browsers throw whatewer they want to throw
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.2.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(22)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(15);
	module.exports = __webpack_require__(6) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(4)
	  , IE8_DOM_DEFINE = __webpack_require__(43)
	  , toPrimitive    = __webpack_require__(60)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(34);
	
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
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(2)
	  , core      = __webpack_require__(5)
	  , ctx       = __webpack_require__(19)
	  , hide      = __webpack_require__(8)
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
/* 14 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(24)('keys')
	  , uid    = __webpack_require__(28);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(38);
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9)
	  , document = __webpack_require__(2).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(10).f
	  , has = __webpack_require__(7)
	  , TAG = __webpack_require__(1)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(44)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(17)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(11);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _customEvent = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  'use strict';
	
	  var RIPPLE_COMPONENT = 'MaterialRipple';
	  var VK_TAB = 9;
	  var VK_ENTER = 13;
	  var VK_SPACE = 32;
	  var VK_END = 35;
	  var VK_HOME = 36;
	  var VK_ARROW_LEFT = 37;
	  var VK_ARROW_UP = 38;
	  var VK_ARROW_RIGHT = 39;
	  var VK_ARROW_DOWN = 40;
	
	  var PANEL = 'mdlext-accordion__panel';
	  var HEADER = 'mdlext-accordion__panel__header';
	  var HEADER_TABSTOP = 'mdlext-accordion__panel__header__tabstop';
	  var IS_UPGRADED = 'is-upgraded';
	  var RIPPLE = 'mdl-ripple';
	  var RIPPLE_CONTAINER = 'mdlext-accordion__panel__header__ripple-container';
	  var RIPPLE_EFFECT = 'mdl-js-ripple-effect';
	  var RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';
	
	  /**
	   * Class constructor for Accordion MDLEXT component.
	   * Implements MDL component design pattern defined at:
	   * https://github.com/jasonmayes/mdl-component-design-pattern
	   *
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
	
	  /**
	   * Initialize accordion's panels
	   *
	   * @private
	   */
	  MaterialExtAccordion.prototype.initAccordion_ = function () {
	    var _this = this;
	
	    this.element_.setAttribute('role', 'tablist');
	
	    if (this.element_.classList.contains(RIPPLE_EFFECT)) {
	      this.element_.classList.add(RIPPLE_EFFECT_IGNORE_EVENTS);
	    }
	
	    [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + PANEL))).forEach(function (panel) {
	      new MaterialExtAccordionPanel(panel, _this);
	    });
	
	    this.element_.classList.add(IS_UPGRADED);
	  };
	
	  /**
	   * Initialize Accordion element.
	   */
	  MaterialExtAccordion.prototype.init = function () {
	    if (this.element_) {
	      //console.log('***** init', this.element_.classList, this.element_.getAttribute('data-upgraded'));
	      this.initAccordion_();
	    }
	  };
	
	  /**
	   * Constructor for an individual accordion panel.
	   *
	   * @constructor
	   * @param {Element} panel The HTML element for the tab.
	   * @param {MaterialExtAccordion} ctx The MaterialExtAccordion object that owns the panel.
	   */
	  function MaterialExtAccordionPanel(panel, ctx) {
	
	    var header = panel.querySelector('.' + HEADER);
	    if (header === null) {
	      throw new Error('There must be a header element for each accordion panel.');
	    }
	
	    header.setAttribute('role', 'tab');
	
	    var a = header.querySelector('a.' + HEADER_TABSTOP);
	    if (a === null) {
	      // An anchor is required for focus/tab stop
	      a = document.createElement('a');
	      a.href = '#';
	      a.classList.add(HEADER_TABSTOP);
	      header.appendChild(a);
	    }
	
	    panel.setAttribute('role', 'tabpanel');
	
	    if (!panel.hasAttribute('open')) {
	      panel.setAttribute('aria-expanded', '');
	    }
	
	    if (ctx.element_.classList.contains(RIPPLE_EFFECT)) {
	      var rippleContainer = a; //document.createElement('span'); // Use anchor as ripple container?
	      rippleContainer.classList.add(RIPPLE_CONTAINER);
	      rippleContainer.classList.add(RIPPLE_EFFECT);
	      var ripple = document.createElement('span');
	      ripple.classList.add(RIPPLE);
	      rippleContainer.appendChild(ripple);
	      componentHandler.upgradeElement(rippleContainer, RIPPLE_COMPONENT);
	    }
	
	    header.addEventListener('click', function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	
	      var panel = this.parentNode;
	      if (panel.hasAttribute('open')) {
	        panel.removeAttribute('open');
	        this.removeAttribute('aria-expanded');
	
	        // Dispatch toggle event to accordion element
	        dispatchToggleEvent('close', panel, ctx.element_);
	      } else {
	        var openPanel = ctx.element_.querySelector('.' + PANEL + '[open]');
	        if (openPanel) {
	          openPanel.removeAttribute('open');
	          var h = openPanel.querySelector('.' + HEADER);
	          if (h) {
	            h.removeAttribute('aria-expanded');
	          }
	
	          // Dispatch toggle event to accordion element
	          dispatchToggleEvent('close', openPanel, ctx.element_);
	        }
	        panel.setAttribute('open', '');
	        this.setAttribute('aria-expanded', '');
	
	        // Dispatch toggle event to accordion element
	        dispatchToggleEvent('open', panel, ctx.element_);
	      }
	      focus(panel);
	    }.bind(header), true);
	
	    header.addEventListener('keydown', function (event) {
	      if (event.keyCode === VK_TAB || event.keyCode === VK_ENTER || event.keyCode === VK_SPACE || event.keyCode === VK_END || event.keyCode === VK_HOME || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	
	        var _panel = this.parentNode;
	        var panels = _panel.parentNode.children;
	        var nextPanel = null;
	        var n = _panel.parentNode.childElementCount - 1;
	
	        for (var i = 0; i <= n; i++) {
	
	          if (event.keyCode === VK_HOME) {
	            nextPanel = panels[0];
	            break;
	          } else if (event.keyCode === VK_END) {
	            nextPanel = panels[n];
	            break;
	          }
	
	          if (panels[i] == _panel) {
	            if (event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
	              nextPanel = i > 0 ? panels[i - 1] : panels[n];
	            } else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	              nextPanel = i < n ? panels[i + 1] : panels[0];
	            } else if (event.keyCode === VK_TAB) {
	              if (event.shiftKey) {
	                if (i > 0 && !panels[i - 1].hasAttribute('open')) {
	                  nextPanel = panels[i - 1];
	                }
	              } else if (i < n) {
	                if (!_panel.hasAttribute('open')) {
	                  nextPanel = panels[i + 1];
	                }
	              }
	            } else if (event.keyCode === VK_ENTER || event.keyCode === VK_SPACE) {
	              event.preventDefault();
	              event.stopPropagation();
	
	              // Trigger mouse click event for any attached listeners.
	              var evt = new MouseEvent('click', {
	                bubbles: true,
	                cancelable: true,
	                view: window
	              });
	              this.dispatchEvent(evt);
	            }
	            break;
	          }
	        }
	        if (nextPanel) {
	          event.preventDefault();
	          event.stopPropagation();
	          focus(nextPanel);
	        }
	      }
	    }.bind(header), true);
	
	    function focus(panel) {
	      var a = panel.querySelector('.' + HEADER + ' a');
	      if (a) {
	        a.focus();
	      }
	    }
	
	    function dispatchToggleEvent(state, source, target) {
	      var evt = (0, _customEvent.createCustomEvent)('toggle', {
	        bubbles: true,
	        cancelable: true,
	        detail: { state: state, source: source }
	      });
	      target.dispatchEvent(evt);
	    }
	  }
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  /* jshint undef:false */
	  componentHandler.register({
	    constructor: MaterialExtAccordion,
	    classAsString: 'MaterialExtAccordion',
	    cssClass: 'mdlext-js-accordion',
	    widget: true
	  });
	})();
	
	/*
	 // eslint-disable-line no-unused-vars
	 */
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
	 * A WAI-ARIA friendly accordion component.
	 * An accordion is a collection of expandable panels associated with a common outer container. Panels consist
	 * of a header and an associated content region or panel. The primary use of an Accordion is to present multiple sections
	 * of content on a single page without scrolling, where all of the sections are peers in the application or object hierarchy.
	 * The general look is similar to a tree where each root tree node is an expandable accordion header. The user navigates
	 * and makes the contents of each panel visible (or not) by interacting with the Accordion Header
	 */

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(33);
	
	__webpack_require__(29);
	
	__webpack_require__(31);
	
	__webpack_require__(32);
	
	__webpack_require__(3);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(11);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _customEvent = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  'use strict';
	
	  var VK_TAB = 9;
	  var VK_ENTER = 13;
	  var VK_SPACE = 32;
	  var VK_END = 35;
	  var VK_HOME = 36;
	  var VK_ARROW_LEFT = 37;
	  var VK_ARROW_UP = 38;
	  var VK_ARROW_RIGHT = 39;
	  var VK_ARROW_DOWN = 40;
	
	  var IS_UPGRADED = 'is-upgraded';
	  var LIGHTBOARD = 'mdlext-lightboard';
	  var SLIDE = 'mdlext-lightboard__slide';
	  var SLIDE_TABSTOP = 'mdlext-lightboard__slide__frame';
	  var RIPPLE_COMPONENT = 'MaterialRipple';
	  var RIPPLE = 'mdl-ripple';
	  var RIPPLE_CONTAINER = 'mdlext-lightboard__slide__ripple-container';
	  var RIPPLE_EFFECT = 'mdl-js-ripple-effect';
	  var RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';
	
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
	
	  /**
	   * Initialize lightboard slides
	   *
	   * @private
	   */
	  MaterialExtLightboard.prototype.initLightboard_ = function () {
	
	    this.element_.setAttribute('role', 'grid');
	    [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE))).forEach(function (slide) {
	      return slide.setAttribute('role', 'cell');
	    });
	
	    if (this.element_.classList.contains(RIPPLE_EFFECT)) {
	      this.element_.classList.add(RIPPLE_EFFECT_IGNORE_EVENTS);
	
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE))).forEach(function (slide) {
	        return addRipple(slide);
	      });
	    }
	
	    /**
	     * Trigger when user cliks on a slide
	     */
	    this.element_.addEventListener('click', function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	      var slide = getSlide(event.target);
	
	      if (event.target !== this) {
	        focus(slide);
	
	        // Remove 'aria-selected' attribute
	        [].concat((0, _toConsumableArray3.default)(this.children)) // Should I use querySelectorAll ???
	        .filter(function (panel) {
	          return panel.hasAttribute('aria-selected');
	        }).forEach(function (selected) {
	          return selected.removeAttribute('aria-selected');
	        });
	
	        // Set 'aria-selected' on current slide
	        slide.setAttribute('aria-selected', '');
	
	        var evt = (0, _customEvent.createCustomEvent)('select', {
	          bubbles: true,
	          cancelable: true,
	          detail: { source: slide }
	        });
	        this.dispatchEvent(evt);
	      }
	    }.bind(this.element_), true);
	
	    /**
	     * Trigger when user presses a keboard key
	     */
	    this.element_.addEventListener('keydown', function (event) {
	      // Maybe this function should be throttled??
	      if (event.keyCode === VK_TAB || event.keyCode === VK_ENTER || event.keyCode === VK_SPACE || event.keyCode === VK_END || event.keyCode === VK_HOME || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	
	        if (event.target !== this) {
	          var panel = getSlide(event.target);
	          var panels = this.children;
	          var nextPanel = null;
	          var n = this.childElementCount - 1;
	
	          for (var i = 0; i <= n; i++) {
	            if (event.keyCode === VK_HOME) {
	              nextPanel = panels[0];
	              break;
	            } else if (event.keyCode === VK_END) {
	              nextPanel = panels[n];
	              break;
	            }
	
	            if (panels[i] === panel) {
	              if (event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
	                nextPanel = i > 0 ? panels[i - 1] : panels[n];
	              } else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	                nextPanel = i < n ? panels[i + 1] : panels[0];
	              } else if (event.keyCode === VK_TAB) {
	                if (event.shiftKey) {
	                  if (i > 0) {
	                    nextPanel = panels[i - 1];
	                  }
	                } else if (i < n) {
	                  nextPanel = panels[i + 1];
	                }
	              } else if (event.keyCode === VK_ENTER || event.keyCode === VK_SPACE) {
	                event.preventDefault();
	                event.stopPropagation();
	
	                // Trigger mouse click event for any attached listeners.
	                var evt = new MouseEvent('click', {
	                  bubbles: true,
	                  cancelable: true,
	                  view: window
	                });
	                panel.dispatchEvent(evt);
	              }
	              break;
	            }
	          }
	          if (nextPanel) {
	            event.preventDefault();
	            event.stopPropagation();
	            focus(nextPanel);
	          }
	        }
	      }
	    }.bind(this.element_), true);
	
	    this.element_.classList.add(IS_UPGRADED);
	  };
	
	  function getSlide(element) {
	    if (!element || element.classList.contains(LIGHTBOARD)) {
	      return null;
	    }
	    return element.classList.contains(SLIDE) ? element : getSlide(element.parentNode);
	  }
	
	  function focus(slide) {
	    if (slide) {
	      var a = slide.querySelector('a.' + SLIDE_TABSTOP);
	      if (a) {
	        a.focus();
	      }
	    }
	  }
	
	  function addRipple(slide) {
	    // Use anchor as ripple container
	    var a = slide.querySelector('a.' + SLIDE_TABSTOP);
	    if (a) {
	      var rippleContainer = a;
	      rippleContainer.classList.add(RIPPLE_CONTAINER);
	      rippleContainer.classList.add(RIPPLE_EFFECT);
	      var ripple = document.createElement('span');
	      ripple.classList.add(RIPPLE);
	      rippleContainer.appendChild(ripple);
	      componentHandler.upgradeElement(rippleContainer, RIPPLE_COMPONENT);
	    }
	  }
	
	  /**
	   * Initialize component
	   */
	  MaterialExtLightboard.prototype.init = function () {
	    if (this.element_) {
	      this.initLightboard_();
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(11);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _isInteger = __webpack_require__(35);
	
	var _isInteger2 = _interopRequireDefault(_isInteger);
	
	var _customEvent = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  'use strict';
	
	  var VK_ESC = 27;
	  var VK_SPACE = 32;
	  var VK_END = 35;
	  var VK_HOME = 36;
	  var VK_ARROW_LEFT = 37;
	  var VK_ARROW_UP = 38;
	  var VK_ARROW_RIGHT = 39;
	  var VK_ARROW_DOWN = 40;
	
	  var IS_UPGRADED = 'is-upgraded';
	  var LIGHTBOX_CLASS = 'mdlext-lightbox';
	  var STICKY_FOOTER_CLASS = 'mdlext-lightbox--sticky-footer';
	  var BUTTON_CLASS = 'mdl-button';
	
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
	      if (event.keyCode === VK_ESC || event.keyCode === VK_SPACE || event.keyCode === VK_END || event.keyCode === VK_HOME || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	
	        if (event.keyCode !== VK_ESC) {
	          event.preventDefault();
	          event.stopPropagation();
	        }
	
	        var action = 'first';
	        if (event.keyCode === VK_END) {
	          action = 'last';
	        } else if (event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
	          action = 'prev';
	        } else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	          action = 'next';
	        } else if (event.keyCode === VK_SPACE) {
	          action = 'select';
	        } else if (event.keyCode === VK_ESC) {
	          action = 'cancel';
	        }
	
	        var evt = (0, _customEvent.createCustomEvent)('action', {
	          bubbles: true,
	          cancelable: true,
	          detail: {
	            action: action,
	            source: this
	          }
	        });
	        this.dispatchEvent(evt);
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
	
	      var evt = (0, _customEvent.createCustomEvent)('action', {
	        bubbles: true,
	        cancelable: true,
	        detail: {
	          action: this.getAttribute('action') || '',
	          source: this
	        }
	      });
	      this.dispatchEvent(evt);
	
	      var n = this;
	      while ((n = n.parentNode) != null) {
	        if (n.classList.contains(LIGHTBOX_CLASS)) {
	          n.focus();
	          break;
	        }
	      }
	    }
	  };
	
	  /**
	   * Reposition dialog if component parent element is "DIALOG"
	   * @private
	   */
	  function repositionDialog_(lightboxElement) {
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
	
	      var fh = footerHeight(lightboxElement.querySelector('footer'), lightboxElement.classList.contains(STICKY_FOOTER_CLASS));
	      var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - fh;
	      if (dialog.offsetHeight > vh) {
	        var n = 0;
	        while (dialog.offsetHeight > vh && ++n < 4) {
	          lightboxElement.style.width = lightboxElement.offsetWidth * vh / lightboxElement.offsetHeight + 'px';
	        }
	      }
	      reposition(dialog, fh);
	    }
	  }
	
	  /**
	   * Handle image load
	   * @param event
	   * @private
	   */
	
	  MaterialExtLightbox.prototype.imgLoadHandler_ = function () /*event*/{
	    repositionDialog_(this);
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
	
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + BUTTON_CLASS))).forEach(function (button) {
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
	      }
	
	      // Assumes MDL has polyfilled RAF
	      window.addEventListener('resize', function () {
	        window.requestAnimationFrame(function () {
	          repositionDialog_(_this.element_);
	        });
	      });
	
	      window.addEventListener('orientationchange', function () {
	        return repositionDialog_(_this.element_);
	      });
	
	      // Set upgraded flag
	      this.element_.classList.add(IS_UPGRADED);
	    }
	  };
	
	  /*
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   * Note: There is a bug i material component container; downgrade is never called!
	   * Disables method temporarly to keep code coverage at 100% for functions.
	   *
	   MaterialExtLightbox.prototype.mdlDowngrade_ = function() {
	     if (this.element_) {
	      [...this.element_.querySelectorAll(`.${BUTTON_CLASS}`)].forEach(
	        button => button.removeEventListener('click', this.buttonClickHandler_)
	      );
	       this.element_.removeEventListener('keydown', this.keyDownHandler_);
	    }
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
	})(); /**
	       * Responsive Lightbox
	       */

/***/ },
/* 33 */
/***/ function(module, exports) {

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
	
	/*
	 * Copied/Modified from https://github.com/google/material-design-lite/tree/master/src/textfield
	 */
	
	(function () {
	  'use strict';
	
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
	   * Store constants in one place so they can be updated easily.
	   *
	   * @enum {string | number}
	   * @private
	   */
	  MaterialExtSelectfield.prototype.Constant_ = {};
	
	  /**
	   * Store strings for class names defined by this component that are used in
	   * JavaScript. This allows us to simply change it in one place should we
	   * decide to modify at a later date.
	   *
	   * @enum {string}
	   * @private
	   */
	  MaterialExtSelectfield.prototype.CssClasses_ = {
	    LABEL: 'mdlext-selectfield__label',
	    INPUT: 'mdlext-selectfield__select',
	    IS_DIRTY: 'is-dirty',
	    IS_FOCUSED: 'is-focused',
	    IS_DISABLED: 'is-disabled',
	    IS_INVALID: 'is-invalid',
	    IS_UPGRADED: 'is-upgraded'
	  };
	
	  /**
	   * Handle focus.
	   *
	   * @param {Event} event The event that fired.
	   * @private
	   */
	  /*eslint no-unused-vars: 0*/
	  MaterialExtSelectfield.prototype.onFocus_ = function (event) {
	    this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
	  };
	
	  /**
	   * Handle lost focus.
	   *
	   * @param {Event} event The event that fired.
	   * @private
	   */
	  /*eslint no-unused-vars: 0*/
	  MaterialExtSelectfield.prototype.onBlur_ = function (event) {
	    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
	  };
	
	  /**
	   * Handle reset event from out side.
	   *
	   * @param {Event} event The event that fired.
	   * @private
	   */
	  MaterialExtSelectfield.prototype.onReset_ = function (event) {
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
	      this.element_.classList.add(this.CssClasses_.IS_DISABLED);
	    } else {
	      this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
	    }
	  };
	  MaterialExtSelectfield.prototype['checkDisabled'] = MaterialExtSelectfield.prototype.checkDisabled;
	
	  /**
	   * Check the focus state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkFocus = function () {
	    /*eslint no-extra-boolean-cast: 0*/
	    if (Boolean(this.element_.querySelector(':focus'))) {
	      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
	    } else {
	      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
	    }
	  };
	
	  MaterialExtSelectfield.prototype['checkFocus'] = MaterialExtSelectfield.prototype.checkFocus;
	
	  /**
	   * Check the validity state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkValidity = function () {
	    if (this.select_.validity) {
	      if (this.select_.validity.valid) {
	        this.element_.classList.remove(this.CssClasses_.IS_INVALID);
	      } else {
	        this.element_.classList.add(this.CssClasses_.IS_INVALID);
	      }
	    }
	  };
	
	  MaterialExtSelectfield.prototype['checkValidity'] = MaterialExtSelectfield.prototype.checkValidity;
	
	  /**
	   * Check the dirty state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkDirty = function () {
	    if (this.select_.value && this.select_.value.length > 0) {
	      this.element_.classList.add(this.CssClasses_.IS_DIRTY);
	    } else {
	      this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
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
	      this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
	      this.select_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
	
	      if (this.select_) {
	        this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
	        this.boundFocusHandler = this.onFocus_.bind(this);
	        this.boundBlurHandler = this.onBlur_.bind(this);
	        this.boundResetHandler = this.onReset_.bind(this);
	        this.select_.addEventListener('change', this.boundUpdateClassesHandler);
	        this.select_.addEventListener('focus', this.boundFocusHandler);
	        this.select_.addEventListener('blur', this.boundBlurHandler);
	        this.select_.addEventListener('reset', this.boundResetHandler);
	
	        var invalid = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
	        this.updateClasses_();
	        this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
	
	        if (invalid) {
	          this.element_.classList.add(this.CssClasses_.IS_INVALID);
	        }
	        if (this.select_.hasAttribute('autofocus')) {
	          this.element_.focus();
	          this.checkFocus();
	        }
	      }
	    }
	  };
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /*eslint no-undef: 0*/
	  /*jshint undef:false */
	  componentHandler.register({
	    constructor: MaterialExtSelectfield,
	    classAsString: 'MaterialExtSelectfield',
	    cssClass: 'mdlext-js-selectfield',
	    widget: true
	  });
	})();

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	__webpack_require__(62);
	module.exports = __webpack_require__(5).Array.from;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	module.exports = __webpack_require__(5).Number.isInteger;

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(25)
	  , toLength  = __webpack_require__(26)
	  , toIndex   = __webpack_require__(59);
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(18)
	  , TAG = __webpack_require__(1)('toStringTag')
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(10)
	  , createDesc      = __webpack_require__(15);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2).document && document.documentElement;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(6) && !__webpack_require__(22)(function(){
	  return Object.defineProperty(__webpack_require__(20)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(18);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(14)
	  , ITERATOR   = __webpack_require__(1)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(9)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(4);
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(52)
	  , descriptor     = __webpack_require__(15)
	  , setToStringTag = __webpack_require__(23)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(8)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(51)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(57)
	  , hide           = __webpack_require__(8)
	  , has            = __webpack_require__(7)
	  , Iterators      = __webpack_require__(14)
	  , $iterCreate    = __webpack_require__(48)
	  , setToStringTag = __webpack_require__(23)
	  , getPrototypeOf = __webpack_require__(54)
	  , ITERATOR       = __webpack_require__(1)('iterator')
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(1)('iterator')
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
/* 51 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(4)
	  , dPs         = __webpack_require__(53)
	  , enumBugKeys = __webpack_require__(21)
	  , IE_PROTO    = __webpack_require__(16)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(20)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(42).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(10)
	  , anObject = __webpack_require__(4)
	  , getKeys  = __webpack_require__(56);
	
	module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(7)
	  , toObject    = __webpack_require__(27)
	  , IE_PROTO    = __webpack_require__(16)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(7)
	  , toIObject    = __webpack_require__(25)
	  , arrayIndexOf = __webpack_require__(39)(false)
	  , IE_PROTO     = __webpack_require__(16)('IE_PROTO');
	
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(55)
	  , enumBugKeys = __webpack_require__(21);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(17)
	  , defined   = __webpack_require__(12);
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(17)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(9);
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(40)
	  , ITERATOR  = __webpack_require__(1)('iterator')
	  , Iterators = __webpack_require__(14);
	module.exports = __webpack_require__(5).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(19)
	  , $export        = __webpack_require__(13)
	  , toObject       = __webpack_require__(27)
	  , call           = __webpack_require__(47)
	  , isArrayIter    = __webpack_require__(45)
	  , toLength       = __webpack_require__(26)
	  , createProperty = __webpack_require__(41)
	  , getIterFn      = __webpack_require__(61);
	
	$export($export.S + $export.F * !__webpack_require__(50)(function(iter){ Array.from(iter); }), 'Array', {
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(13);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(46)});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(58)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(49)(String, 'String', function(iterated){
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
/* 65 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mdl-ext.js.map