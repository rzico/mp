// { "framework": "Vue" }
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(267)
	)
	__vue_styles__.push(__webpack_require__(268)
	)

	/* script */
	__vue_exports__ = __webpack_require__(269)

	/* template */
	var __vue_template__ = __webpack_require__(270)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/leistercheung/Documents/mopian/mp/src/view/member/editor/editor.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-669b9edc"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__
	module.exports.el = 'true'
	new Vue(module.exports)


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(48);
	__webpack_require__(52);
	__webpack_require__(69);
	__webpack_require__(70);
	module.exports = __webpack_require__(12).Promise;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(5)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(8)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6);
	var defined = __webpack_require__(7);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(9);
	var $export = __webpack_require__(10);
	var redefine = __webpack_require__(25);
	var hide = __webpack_require__(15);
	var has = __webpack_require__(26);
	var Iterators = __webpack_require__(27);
	var $iterCreate = __webpack_require__(28);
	var setToStringTag = __webpack_require__(44);
	var getPrototypeOf = __webpack_require__(46);
	var ITERATOR = __webpack_require__(45)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11);
	var core = __webpack_require__(12);
	var ctx = __webpack_require__(13);
	var hide = __webpack_require__(15);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
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
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
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


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(14);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(16);
	var createDesc = __webpack_require__(24);
	module.exports = __webpack_require__(20) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(17);
	var IE8_DOM_DEFINE = __webpack_require__(19);
	var toPrimitive = __webpack_require__(23);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(20) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(20) && !__webpack_require__(21)(function () {
	  return Object.defineProperty(__webpack_require__(22)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(21)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	var document = __webpack_require__(11).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(18);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(29);
	var descriptor = __webpack_require__(24);
	var setToStringTag = __webpack_require__(44);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(15)(IteratorPrototype, __webpack_require__(45)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(17);
	var dPs = __webpack_require__(30);
	var enumBugKeys = __webpack_require__(42);
	var IE_PROTO = __webpack_require__(39)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(22)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(43).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(16);
	var anObject = __webpack_require__(17);
	var getKeys = __webpack_require__(31);

	module.exports = __webpack_require__(20) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(32);
	var enumBugKeys = __webpack_require__(42);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(26);
	var toIObject = __webpack_require__(33);
	var arrayIndexOf = __webpack_require__(36)(false);
	var IE_PROTO = __webpack_require__(39)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(34);
	var defined = __webpack_require__(7);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(35);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(33);
	var toLength = __webpack_require__(37);
	var toAbsoluteIndex = __webpack_require__(38);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(6);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(40)('keys');
	var uid = __webpack_require__(41);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(11).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(16).f;
	var has = __webpack_require__(26);
	var TAG = __webpack_require__(45)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(40)('wks');
	var uid = __webpack_require__(41);
	var Symbol = __webpack_require__(11).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(26);
	var toObject = __webpack_require__(47);
	var IE_PROTO = __webpack_require__(39)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	var global = __webpack_require__(11);
	var hide = __webpack_require__(15);
	var Iterators = __webpack_require__(27);
	var TO_STRING_TAG = __webpack_require__(45)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(50);
	var step = __webpack_require__(51);
	var Iterators = __webpack_require__(27);
	var toIObject = __webpack_require__(33);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(8)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 50 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(9);
	var global = __webpack_require__(11);
	var ctx = __webpack_require__(13);
	var classof = __webpack_require__(53);
	var $export = __webpack_require__(10);
	var isObject = __webpack_require__(18);
	var aFunction = __webpack_require__(14);
	var anInstance = __webpack_require__(54);
	var forOf = __webpack_require__(55);
	var speciesConstructor = __webpack_require__(59);
	var task = __webpack_require__(60).set;
	var microtask = __webpack_require__(62)();
	var newPromiseCapabilityModule = __webpack_require__(63);
	var perform = __webpack_require__(64);
	var promiseResolve = __webpack_require__(65);
	var PROMISE = 'Promise';
	var TypeError = global.TypeError;
	var process = global.process;
	var $Promise = global[PROMISE];
	var isNode = classof(process) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[__webpack_require__(45)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  if (promise._h == 1) return false;
	  var chain = promise._a || promise._c;
	  var i = 0;
	  var reaction;
	  while (chain.length > i) {
	    reaction = chain[i++];
	    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	  } return true;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(66)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(44)($Promise, PROMISE);
	__webpack_require__(67)(PROMISE);
	Wrapper = __webpack_require__(12)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(68)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(35);
	var TAG = __webpack_require__(45)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(13);
	var call = __webpack_require__(56);
	var isArrayIter = __webpack_require__(57);
	var anObject = __webpack_require__(17);
	var toLength = __webpack_require__(37);
	var getIterFn = __webpack_require__(58);
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(17);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(27);
	var ITERATOR = __webpack_require__(45)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(53);
	var ITERATOR = __webpack_require__(45)('iterator');
	var Iterators = __webpack_require__(27);
	module.exports = __webpack_require__(12).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(17);
	var aFunction = __webpack_require__(14);
	var SPECIES = __webpack_require__(45)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(13);
	var invoke = __webpack_require__(61);
	var html = __webpack_require__(43);
	var cel = __webpack_require__(22);
	var global = __webpack_require__(11);
	var process = global.process;
	var setTask = global.setImmediate;
	var clearTask = global.clearImmediate;
	var MessageChannel = global.MessageChannel;
	var Dispatch = global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(35)(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function (id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11);
	var macrotask = __webpack_require__(60).set;
	var Observer = global.MutationObserver || global.WebKitMutationObserver;
	var process = global.process;
	var Promise = global.Promise;
	var isNode = __webpack_require__(35)(process) == 'process';

	module.exports = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if (Observer) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    var promise = Promise.resolve();
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction = __webpack_require__(14);

	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	module.exports.f = function (C) {
	  return new PromiseCapability(C);
	};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(17);
	var isObject = __webpack_require__(18);
	var newPromiseCapability = __webpack_require__(63);

	module.exports = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(15);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global = __webpack_require__(11);
	var core = __webpack_require__(12);
	var dP = __webpack_require__(16);
	var DESCRIPTORS = __webpack_require__(20);
	var SPECIES = __webpack_require__(45)('species');

	module.exports = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(45)('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-promise-finally
	'use strict';
	var $export = __webpack_require__(10);
	var core = __webpack_require__(12);
	var global = __webpack_require__(11);
	var speciesConstructor = __webpack_require__(59);
	var promiseResolve = __webpack_require__(65);

	$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core.Promise || global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-promise-try
	var $export = __webpack_require__(10);
	var newPromiseCapability = __webpack_require__(63);
	var perform = __webpack_require__(64);

	$export($export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });


/***/ }),
/* 71 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by zwwill on 2017/8/27.
	 */
	var resLocateURL = 'file://';
	var resRemoteURL = 'http://cdn.rzico.com/weex/';
	var websiteURL = 'http://dev.rzico.com';
	var event = weex.requireModule('event');
	var _debug = true; //删掉该属性时请查找该页所有debug变量并删除变量
	var utilsFunc = {
	    initIconFont: function initIconFont() {
	        var domModule = weex.requireModule('dom');
	        domModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url('" + resLocateURL + "resources/fonts/iconfont.ttf')"
	        });
	    },

	    //获取本地资源
	    locate: function locate(url) {
	        var newUrl = resLocateURL + url;
	        return newUrl;
	    },

	    //获取远程资源
	    remote: function remote(url) {
	        var newUrl = resRemoteURL + url;
	        return newUrl;
	    },

	    //获取网站资源
	    website: function website(url) {
	        var newUrl = websiteURL + url;
	        return newUrl;
	    },

	    //获取URL参数
	    getUrlParameter: function getUrlParameter(name, dataUrl) {
	        var url = void 0;
	        if (dataUrl == null || dataUrl == undefined || dataUrl == '') {
	            url = weex.config.bundleUrl;
	        } else {
	            url = dataUrl;
	        }
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	        var r = url.slice(url.indexOf('?') + 1).match(reg);
	        if (r != null) {
	            try {
	                return decodeURIComponent(r[2]);
	            } catch (_e) {
	                return null;
	            }
	        }
	        return null;
	    },
	    message: function message(_type, _content, _data) {
	        return {
	            type: _type,
	            content: _content,
	            data: _data
	        };
	    },

	    //判空
	    isNull: function isNull(value) {
	        if (value == null || value == undefined || value == '' || value == 'undefined') {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    //获取缩略图
	    thumbnail: function thumbnail(url, w, h) {
	        //获取屏幕宽度计算得出比例
	        var proportion = weex.config.env.deviceWidth / 750;
	        //                获取缩略图的宽高
	        w = parseInt(w * proportion);
	        h = parseInt(h * proportion);
	        if (url.substring(0, 11) == "http://cdnx") {
	            return url + "?x-oss-process=image/resize,w_" + w + ",h_" + h + "";
	        } else if (url.substring(0, 10) == "http://cdn") {
	            return url + "@" + w + "w_" + h + "h_1e_1c_100Q";
	        } else {
	            return url;
	        }
	    },

	    //获取全屏的高度尺寸,可传入父组件的导航栏高度进行适配
	    fullScreen: function fullScreen(topHeight) {
	        //减1是为了能触发loading，不能够高度刚刚好
	        topHeight = topHeight == '' ? 0 : topHeight - 1;
	        return 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - topHeight;
	    },

	    //模糊图片，r , s  为 1-50，超大超模糊
	    blur: function blur(url, r, s) {
	        if (url.substring(0, 10) == "http://cdn") {
	            return url + "@" + r + "-" + s + "bl";
	        } else {
	            return url;
	        }
	    },

	    //获取文章URL地址
	    articleUrl: function articleUrl(template, id) {
	        template = template == '' ? 't1001' : template;
	        return websiteURL + "/" + template + "?id=" + id;
	    },
	    debug: function debug(msg) {
	        if (_debug) {
	            event.toast(msg);
	        }
	    },
	    isRoles: function isRoles(roles, all) {
	        for (var i = 0; i < roles.length; i++) {
	            var role = roles.substring(i, i + 1);
	            if (all.indexOf(role) >= 0) {
	                return true;
	            }
	        }
	        return false;
	    },

	    //  获取字符串的字符总长度
	    getLength: function getLength(e) {
	        var name = e;
	        var len = 0;
	        for (var i = 0; i < name.length; i++) {
	            var a = name.charAt(i);
	            if (a.match(/[^\x00-\xff]/ig) != null) {
	                len += 2;
	            } else {
	                len += 1;
	            }
	        }
	        return len;
	    },

	    //    将过长的字符串换成 XXX...XXX格式
	    changeStr: function changeStr(e) {
	        return e.substr(0, 4) + '...' + e.substr(-4);
	    },

	    //js中用正则表达式 过滤特殊字符, 校验所有输入域是否含有特殊符号 (无法过滤 \ )
	    //  searchFilter(s) {
	    //         event.toast(s);
	    //         var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
	    //         var rs = "";
	    //         for (var i = 0; i < s.length; i++) {
	    //             rs = rs + s.substr(i, 1).replace(pattern,'');
	    //         }
	    //         return rs;
	    //     }

	    //老的二维码转换成新格式
	    qr2scan: function qr2scan(e) {
	        var type = this.getUrlParameter("type", e);
	        var code = this.getUrlParameter("no", e);
	        if (type == "paybill") {
	            return websiteURL + "/q/818804" + code + ".jhtml";
	        } else if (type == "card_active") {
	            return websiteURL + "/q/818801" + code + ".jhtml";
	        } else {
	            return e;
	        }
	    },

	    //    二维码读取内容
	    readScan: function readScan(e, callback) {
	        e = this.qr2scan(e);
	        var backData = {};
	        //二维码字段截取. indexOf 没找到时返回-1， 此时如果2个indexof都没找到 那么 e.substring（-1 + 3 ，-1）,e的长度会变为2
	        // let subData = e.substring(e.indexOf("/q/8") + 3,e.indexOf(".jhtml"));

	        var start = e.indexOf("/q/8");
	        var end = e.indexOf(".jhtml");
	        var subData = null;
	        if (start != -1 && end != -1) {
	            subData = e.substring(start + 3, end);
	        }
	        //判断是不是web  code'000000'为无效二维码 '999999'为webView；
	        if (subData == null) {
	            //如果没有找到q/ 和 .jhtml中的字端，就执行该段代码
	            if (e.substring(0, 4) == 'http' && _debug) {
	                var data = {
	                    type: 'webView',
	                    code: '999999'
	                };
	                backData = this.message('success', 'webView', data);
	            } else {
	                var _data2 = {
	                    type: 'error',
	                    code: '000000'
	                };
	                backData = this.message('error', '无效二维码', _data2);
	            }
	            callback(backData);
	        } else {
	            //截取11位的判断码
	            var type = subData.substring(0, 6);
	            var code = subData.slice(6);
	            var _data3 = {
	                type: type,
	                code: code
	            };
	            if (code == '000000') {
	                backData = this.message('error', '无效二维码', _data3);
	            } else {
	                backData = this.message('success', '扫描成功', _data3);
	            }
	            callback(backData);
	        }
	    },

	    //判断用户是否只输入了空格
	    isAllEmpty: function isAllEmpty(str) {
	        if (str.replace(/ /g, "").length == 0) {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    //判断设备型号
	    device: function device() {
	        var s = weex.config.env.deviceModel;
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s.indexOf("V1") > 0) {
	                return "V1";
	            } else if (s.indexOf("10,3") > 0 || s.indexOf("10,6") > 0) {
	                return 'IPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },

	    //    登录主页的轮播图控制
	    indexMt: function indexMt() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'indexMtV1';
	            } else if (s == 'IPhoneX') {
	                return 'indexMtIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },


	    //    判断设备型号为fix定位的元素添加高度 (会员首页 作者专栏 顶部设置跟返回按钮)
	    addTop: function addTop() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'addTopV1';
	            } else if (s == 'IPhoneX') {
	                return 'addTopIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //   会员首页 作者专栏 顶部信息栏
	    addInfo: function addInfo() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'addInfoV1';
	            } else if (s == 'IPhoneX') {
	                return 'addInfoIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    判断设备型号为fix定位的元素添加高度 (会员首页 作者专栏 顶部设置跟返回按钮)
	    addBgImg: function addBgImg() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'addBgImgV1';
	            } else if (s == 'IPhoneX') {
	                return 'addBgImgIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    控制滑动时文集box的显示
	    hideCorpus: function hideCorpus() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'hideCorpusV1';
	            } else if (s == 'IPhoneX') {
	                return 'hideCorpusIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    控制滑动时文集box的显示
	    pageTop: function pageTop() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'pageTopV1';
	            } else if (s == 'IPhoneX') {
	                return 'pageTopIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },

	    //判断设备系统是不是ios
	    isIosSystem: function isIosSystem() {
	        var s = weex.config.env.osName;
	        if (s == 'iOS') {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    resolvetimefmt: function resolvetimefmt(value) {
	        //value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
	        if (value.toString().length == 10) {
	            value = parseInt(value) * 1000;
	        } else {
	            value = parseInt(value);
	        }
	        // 返回处理后的值
	        var date = new Date(value);

	        var d2 = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

	        date = new Date(d2 + 28800000);

	        var y = date.getUTCFullYear();
	        var m = date.getUTCMonth() + 1;
	        var d = date.getUTCDate();
	        var h = date.getUTCHours();
	        var i = date.getUTCMinutes();
	        var s = date.getUTCSeconds();
	        if (m < 10) {
	            m = '0' + m;
	        }
	        if (d < 10) {
	            d = '0' + d;
	        }
	        if (h < 10) {
	            h = '0' + h;
	        }
	        if (i < 10) {
	            i = '0' + i;
	        }
	        if (s < 10) {
	            s = '0' + s;
	        }
	        var timeObj = {
	            y: y,
	            m: m,
	            d: d,
	            h: h,
	            i: i,
	            s: s
	        };
	        return timeObj;
	    },
	    //返回格式 2017-09-01
	    ymdtimefmt: function ymdtimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        return timeObj.y + '-' + timeObj.m + '-' + timeObj.d;
	    },
	    //返回格式 2017-09-01 06:35:59
	    ymdhistimefmt: function ymdhistimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);

	        return timeObj.y + '-' + timeObj.m + '-' + timeObj.d + ' ' + timeObj.h + ':' + timeObj.i + ':' + timeObj.s;
	    },
	    //返回格式 2017年09月01日 06:35:59
	    ymdhisdayfmt: function ymdhisdayfmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);

	        return timeObj.y + '年' + timeObj.m + '月' + timeObj.d + '日' + ' ' + timeObj.h + ':' + timeObj.i + ':' + timeObj.s;
	    },
	    //返回格式 06:35:59
	    histimefmt: function histimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        return timeObj.h + ':' + timeObj.i + ':' + timeObj.s;
	    }
	};

	exports.default = utilsFunc;
	module.exports = exports['default'];

/***/ }),
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */
/***/ (function(module, exports) {

	module.exports = {
	  "wrapper": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "width": 750,
	    "backgroundColor": "#eeeeee"
	  },
	  "nav_title": {
	    "fontSize": 38,
	    "color": "#ffffff",
	    "lineHeight": 38
	  },
	  "title": {
	    "fontSize": 32,
	    "color": "#000000"
	  },
	  "sub_title": {
	    "fontSize": 30,
	    "color": "#999999"
	  },
	  "sub_date": {
	    "fontSize": 26,
	    "color": "#999999"
	  },
	  "fz28": {
	    "fontSize": 28
	  },
	  "fz30": {
	    "fontSize": 30
	  },
	  "fz32": {
	    "fontSize": 32
	  },
	  "fz35": {
	    "fontSize": 35
	  },
	  "fz40": {
	    "fontSize": 40
	  },
	  "boder-bottom": {
	    "borderStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "boder-top": {
	    "borderStyle": "solid",
	    "borderTopWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "boder-right": {
	    "borderStyle": "solid",
	    "borderRightWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "boder-left": {
	    "borderStyle": "solid",
	    "borderLeftWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "pl10": {
	    "paddingLeft": 10
	  },
	  "pt10": {
	    "paddingTop": 10
	  },
	  "pt15": {
	    "paddingTop": 15
	  },
	  "pb10": {
	    "paddingBottom": 10
	  },
	  "pl20": {
	    "paddingLeft": 20
	  },
	  "pt20": {
	    "paddingTop": 20
	  },
	  "pb15": {
	    "paddingBottom": 15
	  },
	  "pb20": {
	    "paddingBottom": 20
	  },
	  "pt25": {
	    "paddingTop": 25
	  },
	  "pt30": {
	    "paddingTop": 30
	  },
	  "pt40": {
	    "paddingTop": 40
	  },
	  "pb40": {
	    "paddingBottom": 40
	  },
	  "pb30": {
	    "paddingBottom": 30
	  },
	  "pb25": {
	    "paddingBottom": 25
	  },
	  "pl25": {
	    "paddingLeft": 25
	  },
	  "pl30": {
	    "paddingLeft": 30
	  },
	  "pr10": {
	    "paddingRight": 10
	  },
	  "pr20": {
	    "paddingRight": 20
	  },
	  "pr25": {
	    "paddingRight": 25
	  },
	  "pr30": {
	    "paddingRight": 30
	  },
	  "pl35": {
	    "paddingLeft": 35
	  },
	  "pr35": {
	    "paddingRight": 35
	  },
	  "bgWhite": {
	    "backgroundColor": "#ffffff"
	  },
	  "textActive": {
	    "backgroundColor:active": "#cccccc"
	  },
	  "mt0": {
	    "marginTop": 0
	  },
	  "mt10": {
	    "marginTop": 10
	  },
	  "mt20": {
	    "marginTop": 20
	  },
	  "mt30": {
	    "marginTop": 30
	  },
	  "mt50": {
	    "marginTop": 50
	  },
	  "bt0": {
	    "marginBottom": 0
	  },
	  "bt5": {
	    "marginBottom": 5
	  },
	  "bt10": {
	    "marginBottom": 10
	  },
	  "bt15": {
	    "marginBottom": 15
	  },
	  "bt20": {
	    "marginBottom": 20
	  },
	  "bt30": {
	    "marginBottom": 30
	  },
	  "bt50": {
	    "marginBottom": 50
	  },
	  "mr5": {
	    "marginRight": 5
	  },
	  "mr30": {
	    "marginRight": 30
	  },
	  "ml5": {
	    "marginLeft": 5
	  },
	  "ml10": {
	    "marginLeft": 10
	  },
	  "ml20": {
	    "marginLeft": 20
	  },
	  "ml30": {
	    "marginLeft": 30
	  },
	  "header": {
	    "height": 136,
	    "paddingTop": 44,
	    "flexDirection": "row",
	    "position": "sticky",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid",
	    "borderColor": "#cccccc",
	    "backgroundColor": "#EB4E40"
	  },
	  "nav": {
	    "width": 654,
	    "justifyContent": "space-between",
	    "flexDirection": "row",
	    "height": 92,
	    "alignItems": "center",
	    "marginTop": 0
	  },
	  "nav_back": {
	    "marginTop": 0,
	    "flexDirection": "row",
	    "width": 92,
	    "height": 92,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "corpusActive": {
	    "color": "#EB4E40",
	    "borderColor": "#EB4E40",
	    "borderStyle": "solid",
	    "borderBottomWidth": 4
	  },
	  "footer": {
	    "position": "fixed",
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "height": 100
	  },
	  "fill": {
	    "height": 500,
	    "width": 750,
	    "backgroundColor": "#eeeeee"
	  },
	  "iconImg": {
	    "width": 60,
	    "height": 60,
	    "fontSize": 60
	  },
	  "cell-header": {
	    "height": 70,
	    "flexDirection": "row",
	    "backgroundColor": "#dddddd",
	    "paddingLeft": 20
	  },
	  "cell-row": {
	    "minHeight": 100,
	    "flexDirection": "column",
	    "backgroundColor": "#ffffff",
	    "paddingLeft": 20,
	    "marginTop": 20
	  },
	  "cell-row-row": {
	    "minHeight": 100,
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "backgroundColor": "#ffffff",
	    "paddingLeft": 20,
	    "paddingRight": 20,
	    "alignItems": "center",
	    "marginTop": 20
	  },
	  "cell-line": {
	    "borderTopWidth": 1,
	    "borderTopColor": "#cccccc",
	    "borderTopStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid"
	  },
	  "borderTop": {
	    "borderTopWidth": 1,
	    "borderTopColor": "#cccccc",
	    "borderTopStyle": "solid"
	  },
	  "borderBottom": {
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel-column": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "column",
	    "justifyContent": "space-around",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid",
	    "paddingTop": 10,
	    "paddingBottom": 10
	  },
	  "cell-bottom-clear": {
	    "borderBottomWidth": 0
	  },
	  "cell-clear": {
	    "marginTop": 0,
	    "marginBottom": 0,
	    "borderTopWidth": 0,
	    "borderBottomWidth": 0
	  },
	  "space-between": {
	    "justifyContent": "space-between",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-start": {
	    "justifyContent": "flex-start",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-end": {
	    "justifyContent": "flex-end",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-center": {
	    "justifyContent": "center",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "space-around": {
	    "justifyContent": "space-around",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-row": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-column": {
	    "flexDirection": "column",
	    "alignItems": "center"
	  },
	  "flex1": {
	    "flex": 1
	  },
	  "flex2": {
	    "flex": 2
	  },
	  "flex3": {
	    "flex": 3
	  },
	  "flex4": {
	    "flex": 4
	  },
	  "flex5": {
	    "flex": 6
	  },
	  "flex6": {
	    "flex": 6
	  },
	  "bkg-white": {
	    "backgroundColor": "#FFFFFF"
	  },
	  "bkg-primary": {
	    "backgroundColor": "#EB4E40"
	  },
	  "bkg-gray": {
	    "backgroundColor": "#eeeeee"
	  },
	  "bd-primary": {
	    "borderColor": "#EB4E40"
	  },
	  "bkg-delete": {
	    "backgroundColor": "#FF0000"
	  },
	  "white": {
	    "color": "#FFFFFF"
	  },
	  "primary": {
	    "color": "#EB4E40"
	  },
	  "gray": {
	    "color": "#999999"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#EB4E40",
	    "marginTop": 2
	  },
	  "ico_big": {
	    "fontSize": 72,
	    "color": "#EB4E40",
	    "marginTop": 4
	  },
	  "ico_small": {
	    "fontSize": 32,
	    "color": "#EB4E40",
	    "marginTop": 1
	  },
	  "arrow": {
	    "fontSize": 32,
	    "color": "#cccccc",
	    "width": 40
	  },
	  "check": {
	    "fontSize": 32,
	    "color": "#EB4E40",
	    "width": 40
	  },
	  "shopCheck": {
	    "fontSize": 32,
	    "color": "#EB4E40",
	    "width": 40,
	    "marginLeft": 150
	  },
	  "button": {
	    "fontSize": 32,
	    "textAlign": "center",
	    "color": "#ffffff",
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "backgroundColor": "#EB4E40",
	    "borderRadius": 15,
	    "height": 80,
	    "lineHeight": 50,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "backgroundColor:active": "#cccccc",
	    "color:active": "#EB4E40",
	    "backgroundColor:disabled": "#EB4E40",
	    "color:disabled": "#999999"
	  },
	  "refresh": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "paddingTop": 10
	  },
	  "loading": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "paddingTop": 10
	  },
	  "noLoading": {
	    "height": 999
	  },
	  "gif": {
	    "width": 50,
	    "height": 50
	  },
	  "indicator": {
	    "fontSize": 36,
	    "color": "#EB4E40",
	    "width": 750,
	    "textAlign": "center",
	    "marginTop": 20,
	    "marginBottom": 20
	  },
	  "lines-ellipsis": {
	    "lines": 1,
	    "textOverflow": "ellipsis"
	  },
	  "V1": {
	    "height": 146,
	    "paddingTop": 54
	  },
	  "IPhoneX": {
	    "height": 156,
	    "paddingTop": 64
	  },
	  "addTopV1": {
	    "top": 54
	  },
	  "addTopIPhoneX": {
	    "top": 64
	  },
	  "addInfoV1": {
	    "height": 430,
	    "paddingTop": 50
	  },
	  "addInfoIPhoneX": {
	    "height": 440,
	    "paddingTop": 60
	  },
	  "addBgImgV1": {
	    "height": 430
	  },
	  "addBgImgIPhoneX": {
	    "height": 440
	  },
	  "hideCorpusV1": {
	    "top": 146
	  },
	  "hideCorpusIPhoneX": {
	    "top": 156
	  },
	  "pageTopV1": {
	    "top": 226
	  },
	  "pageTopIPhoneX": {
	    "top": 236
	  },
	  "maskLayer": {
	    "position": "fixed",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "backgroundColor": "#000000",
	    "opacity": 0.5
	  },
	  "showBox": {
	    "position": "fixed",
	    "top": 150,
	    "right": 15,
	    "backgroundColor": "#ffffff",
	    "borderRadius": 20,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "arrowUp": {
	    "position": "fixed",
	    "top": 148,
	    "right": 30
	  },
	  "refreshImg": {
	    "width": 60,
	    "height": 60,
	    "borderRadius": 30
	  },
	  "refreshBox": {
	    "height": 120,
	    "width": 750,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "indexMtIPhoneX": {
	    "marginTop": 124
	  }
	}

/***/ }),
/* 95 */
/***/ (function(module, exports) {

	module.exports = {
	  "cb": {
	    "borderBottomWidth": 0
	  },
	  "navRightBox": {
	    "minWidth": 92,
	    "height": 92,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "nav_bg": {
	    "width": 750,
	    "height": 156,
	    "backgroundSize": "cover",
	    "position": "absolute",
	    "top": 0
	  },
	  "nav_ico": {
	    "fontSize": 38,
	    "color": "#ffffff",
	    "marginTop": 2
	  },
	  "nav_CompleteIcon": {
	    "paddingLeft": 27,
	    "paddingRight": 27,
	    "fontSize": 44,
	    "lineHeight": 44,
	    "color": "#FFFFFF"
	  },
	  "nav_Complete": {
	    "paddingLeft": 27,
	    "paddingRight": 27
	  }
	}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(71);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: {
	        title: { default: "navbar" },
	        complete: { default: '' },
	        showComplete: { default: true },
	        border: { default: true }
	    },
	    methods: {
	        classHeader: function classHeader() {
	            var dc = _utils2.default.device();

	            return dc;
	        },
	        goback: function goback(e) {
	            this.$emit('goback');
	        },
	        goComplete: function goComplete(e) {
	            this.$emit('goComplete');
	        }
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	module.exports = exports['default'];

/***/ }),
/* 97 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["header"],
	    class: [_vm.classHeader(), _vm.border == true ? '' : 'cb']
	  }, [_c('div', {
	    staticClass: ["nav_back"],
	    on: {
	      "click": function($event) {
	        _vm.goback('/')
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["nav_ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["nav"]
	  }, [_c('text', {
	    staticClass: ["nav_title"]
	  }, [_vm._v(_vm._s(_vm.title))]), (_vm.showComplete) ? _c('div', {
	    staticClass: ["navRightBox"],
	    on: {
	      "click": function($event) {
	        _vm.goComplete('/')
	      }
	    }
	  }, [(_vm.complete != 'textIcon') ? _c('text', {
	    staticClass: ["nav_Complete", "nav_title"]
	  }, [_vm._v(_vm._s(_vm.complete))]) : _c('text', {
	    staticClass: ["nav_CompleteIcon"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]) : _vm._e()])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _promise = __webpack_require__(1);

	var _promise2 = _interopRequireDefault(_promise);

	exports.POST = POST;
	exports.GET = GET;
	exports.SCAN = SCAN;

	var _utils = __webpack_require__(71);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var stream = weex.requireModule('stream');
	var modal = weex.requireModule('modal');
	var baseURL = '';

	var event = weex.requireModule('event');
	function POST(path, body) {
	    return new _promise2.default(function (resolve, reject) {
	        stream.fetch({
	            method: 'POST',
	            url: '' + baseURL + path,
	            type: 'json',
	            body: '' + body
	        }, function (response) {
	            if (response.status == 200) {
	                resolve(response.data);
	            } else {
	                reject({
	                    type: "error",
	                    content: "网络不稳定"
	                });
	            }
	        }, function () {});
	    });
	}

	function GET(path, resolve, reject) {
	    // let cacheParams = {
	    //     type:'httpCache',//类型
	    //     key:`${baseURL}${path}`,//关键址
	    // }
	    // event.find(cacheParams,function (cache) {
	    //    if (cache.type=='success') {
	    //        if (cache.data != '') {
	    //            resolve(JSON.parse(cache.data.value));
	    //        }
	    //    }
	    // })
	    stream.fetch({
	        method: 'GET',
	        url: '' + baseURL + path,
	        type: 'json'
	    }, function (response) {
	        //请求 type=success 或 warn 或 error（没缓存） 时返回，都能正常获取数据
	        if (response.status == 200) {
	            resolve(response.data);
	        } else
	            //请求 type= error 网络正常，但服务器返回错误，有缓存，也需要给数据，并提示出错了  statusText=服务器返回的 content
	            //网络异常，有缓存，需要给出缓存数据，并且   statusText 固定为 "网络不稳定"
	            if (response.status == 304) {
	                resolve(response.data);
	                reject({
	                    type: "error",
	                    content: response.statusText
	                });
	            } else
	                //网络异常，没有缓存
	                {
	                    reject({
	                        type: "error",
	                        content: '网络不稳定'
	                    });
	                }
	    }, function () {});
	}
	//二维码扫描
	function SCAN(message, resolve, reject) {
	    if (message.type == 'success') {
	        _utils2.default.readScan(message.data, function (data) {
	            if (data.type == 'success') {
	                if (data.data.type == '865380') {
	                    var userId = parseInt(data.data.code) - 10200;
	                    POST('weex/member/friends/add.jhtml?friendId=' + userId).then(function (mes) {
	                        if (mes.type == "success") {
	                            event.toast('添加好友请求已发送,请等待对方验证');
	                        } else {
	                            event.toast(mes.content);
	                        }
	                        resolve(mes);
	                    }, function (err) {
	                        reject(err);
	                        event.toast(err.content);
	                    });
	                } else if (data.data.type == '818803') {
	                    GET('weex/member/couponCode/use.jhtml?code=' + data.data.code, function (mes) {
	                        modal.alert({
	                            message: mes.content,
	                            duration: 0.3
	                        }, function (value) {});
	                    }, function (err) {
	                        event.toast(err.content);
	                    });
	                } else if (data.data.type == 'webView') {
	                    event.openURL(message.data, function () {});
	                } else {
	                    event.toast('无效验证码');
	                }
	            } else {
	                event.toast(data.content);
	            }
	        });
	    } else {}
	}

/***/ }),
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(94)
	)
	__vue_styles__.push(__webpack_require__(95)
	)

	/* script */
	__vue_exports__ = __webpack_require__(96)

	/* template */
	var __vue_template__ = __webpack_require__(97)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/leistercheung/Documents/mopian/mp/src/include/navbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-cc5bb20e"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__


/***/ }),
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(12);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */
/***/ (function(module, exports) {

	module.exports = {
	  "wrapper": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "width": 750,
	    "backgroundColor": "#eeeeee"
	  },
	  "nav_title": {
	    "fontSize": 38,
	    "color": "#ffffff",
	    "lineHeight": 38
	  },
	  "title": {
	    "fontSize": 32,
	    "color": "#000000"
	  },
	  "sub_title": {
	    "fontSize": 30,
	    "color": "#999999"
	  },
	  "sub_date": {
	    "fontSize": 26,
	    "color": "#999999"
	  },
	  "fz28": {
	    "fontSize": 28
	  },
	  "fz30": {
	    "fontSize": 30
	  },
	  "fz32": {
	    "fontSize": 32
	  },
	  "fz35": {
	    "fontSize": 35
	  },
	  "fz40": {
	    "fontSize": 40
	  },
	  "boder-bottom": {
	    "borderStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "boder-top": {
	    "borderStyle": "solid",
	    "borderTopWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "boder-right": {
	    "borderStyle": "solid",
	    "borderRightWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "boder-left": {
	    "borderStyle": "solid",
	    "borderLeftWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "pl10": {
	    "paddingLeft": 10
	  },
	  "pt10": {
	    "paddingTop": 10
	  },
	  "pt15": {
	    "paddingTop": 15
	  },
	  "pb10": {
	    "paddingBottom": 10
	  },
	  "pl20": {
	    "paddingLeft": 20
	  },
	  "pt20": {
	    "paddingTop": 20
	  },
	  "pb15": {
	    "paddingBottom": 15
	  },
	  "pb20": {
	    "paddingBottom": 20
	  },
	  "pt25": {
	    "paddingTop": 25
	  },
	  "pt30": {
	    "paddingTop": 30
	  },
	  "pt40": {
	    "paddingTop": 40
	  },
	  "pb40": {
	    "paddingBottom": 40
	  },
	  "pb30": {
	    "paddingBottom": 30
	  },
	  "pb25": {
	    "paddingBottom": 25
	  },
	  "pl25": {
	    "paddingLeft": 25
	  },
	  "pl30": {
	    "paddingLeft": 30
	  },
	  "pr10": {
	    "paddingRight": 10
	  },
	  "pr20": {
	    "paddingRight": 20
	  },
	  "pr25": {
	    "paddingRight": 25
	  },
	  "pr30": {
	    "paddingRight": 30
	  },
	  "pl35": {
	    "paddingLeft": 35
	  },
	  "pr35": {
	    "paddingRight": 35
	  },
	  "bgWhite": {
	    "backgroundColor": "#ffffff"
	  },
	  "textActive": {
	    "backgroundColor:active": "#cccccc"
	  },
	  "mt0": {
	    "marginTop": 0
	  },
	  "mt10": {
	    "marginTop": 10
	  },
	  "mt20": {
	    "marginTop": 20
	  },
	  "mt30": {
	    "marginTop": 30
	  },
	  "mt50": {
	    "marginTop": 50
	  },
	  "bt0": {
	    "marginBottom": 0
	  },
	  "bt5": {
	    "marginBottom": 5
	  },
	  "bt10": {
	    "marginBottom": 10
	  },
	  "bt15": {
	    "marginBottom": 15
	  },
	  "bt20": {
	    "marginBottom": 20
	  },
	  "bt30": {
	    "marginBottom": 30
	  },
	  "bt50": {
	    "marginBottom": 50
	  },
	  "mr5": {
	    "marginRight": 5
	  },
	  "mr30": {
	    "marginRight": 30
	  },
	  "ml5": {
	    "marginLeft": 5
	  },
	  "ml10": {
	    "marginLeft": 10
	  },
	  "ml20": {
	    "marginLeft": 20
	  },
	  "ml30": {
	    "marginLeft": 30
	  },
	  "header": {
	    "height": 136,
	    "paddingTop": 44,
	    "flexDirection": "row",
	    "position": "sticky",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid",
	    "borderColor": "#cccccc",
	    "backgroundColor": "#EB4E40"
	  },
	  "nav": {
	    "width": 654,
	    "justifyContent": "space-between",
	    "flexDirection": "row",
	    "height": 92,
	    "alignItems": "center",
	    "marginTop": 0
	  },
	  "nav_back": {
	    "marginTop": 0,
	    "flexDirection": "row",
	    "width": 92,
	    "height": 92,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "corpusActive": {
	    "color": "#EB4E40",
	    "borderColor": "#EB4E40",
	    "borderStyle": "solid",
	    "borderBottomWidth": 4
	  },
	  "footer": {
	    "position": "fixed",
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "height": 100
	  },
	  "fill": {
	    "height": 500,
	    "width": 750,
	    "backgroundColor": "#eeeeee"
	  },
	  "iconImg": {
	    "width": 60,
	    "height": 60,
	    "fontSize": 60
	  },
	  "cell-header": {
	    "height": 70,
	    "flexDirection": "row",
	    "backgroundColor": "#dddddd",
	    "paddingLeft": 20
	  },
	  "cell-row": {
	    "minHeight": 100,
	    "flexDirection": "column",
	    "backgroundColor": "#ffffff",
	    "paddingLeft": 20,
	    "marginTop": 20
	  },
	  "cell-row-row": {
	    "minHeight": 100,
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "backgroundColor": "#ffffff",
	    "paddingLeft": 20,
	    "paddingRight": 20,
	    "alignItems": "center",
	    "marginTop": 20
	  },
	  "cell-line": {
	    "borderTopWidth": 1,
	    "borderTopColor": "#cccccc",
	    "borderTopStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid"
	  },
	  "borderTop": {
	    "borderTopWidth": 1,
	    "borderTopColor": "#cccccc",
	    "borderTopStyle": "solid"
	  },
	  "borderBottom": {
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel-column": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "column",
	    "justifyContent": "space-around",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid",
	    "paddingTop": 10,
	    "paddingBottom": 10
	  },
	  "cell-bottom-clear": {
	    "borderBottomWidth": 0
	  },
	  "cell-clear": {
	    "marginTop": 0,
	    "marginBottom": 0,
	    "borderTopWidth": 0,
	    "borderBottomWidth": 0
	  },
	  "space-between": {
	    "justifyContent": "space-between",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-start": {
	    "justifyContent": "flex-start",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-end": {
	    "justifyContent": "flex-end",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-center": {
	    "justifyContent": "center",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "space-around": {
	    "justifyContent": "space-around",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-row": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-column": {
	    "flexDirection": "column",
	    "alignItems": "center"
	  },
	  "flex1": {
	    "flex": 1
	  },
	  "flex2": {
	    "flex": 2
	  },
	  "flex3": {
	    "flex": 3
	  },
	  "flex4": {
	    "flex": 4
	  },
	  "flex5": {
	    "flex": 6
	  },
	  "flex6": {
	    "flex": 6
	  },
	  "bkg-white": {
	    "backgroundColor": "#FFFFFF"
	  },
	  "bkg-primary": {
	    "backgroundColor": "#EB4E40"
	  },
	  "bkg-gray": {
	    "backgroundColor": "#eeeeee"
	  },
	  "bd-primary": {
	    "borderColor": "#EB4E40"
	  },
	  "bkg-delete": {
	    "backgroundColor": "#FF0000"
	  },
	  "white": {
	    "color": "#FFFFFF"
	  },
	  "primary": {
	    "color": "#EB4E40"
	  },
	  "gray": {
	    "color": "#999999"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#EB4E40",
	    "marginTop": 2
	  },
	  "ico_big": {
	    "fontSize": 72,
	    "color": "#EB4E40",
	    "marginTop": 4
	  },
	  "ico_small": {
	    "fontSize": 32,
	    "color": "#EB4E40",
	    "marginTop": 1
	  },
	  "arrow": {
	    "fontSize": 32,
	    "color": "#cccccc",
	    "width": 40
	  },
	  "check": {
	    "fontSize": 32,
	    "color": "#EB4E40",
	    "width": 40
	  },
	  "shopCheck": {
	    "fontSize": 32,
	    "color": "#EB4E40",
	    "width": 40,
	    "marginLeft": 150
	  },
	  "button": {
	    "fontSize": 32,
	    "textAlign": "center",
	    "color": "#ffffff",
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "backgroundColor": "#EB4E40",
	    "borderRadius": 15,
	    "height": 80,
	    "lineHeight": 50,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "backgroundColor:active": "#cccccc",
	    "color:active": "#EB4E40",
	    "backgroundColor:disabled": "#EB4E40",
	    "color:disabled": "#999999"
	  },
	  "refresh": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "paddingTop": 10
	  },
	  "loading": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "paddingTop": 10
	  },
	  "noLoading": {
	    "height": 999
	  },
	  "gif": {
	    "width": 50,
	    "height": 50
	  },
	  "indicator": {
	    "fontSize": 36,
	    "color": "#EB4E40",
	    "width": 750,
	    "textAlign": "center",
	    "marginTop": 20,
	    "marginBottom": 20
	  },
	  "lines-ellipsis": {
	    "lines": 1,
	    "textOverflow": "ellipsis"
	  },
	  "V1": {
	    "height": 146,
	    "paddingTop": 54
	  },
	  "IPhoneX": {
	    "height": 156,
	    "paddingTop": 64
	  },
	  "addTopV1": {
	    "top": 54
	  },
	  "addTopIPhoneX": {
	    "top": 64
	  },
	  "addInfoV1": {
	    "height": 430,
	    "paddingTop": 50
	  },
	  "addInfoIPhoneX": {
	    "height": 440,
	    "paddingTop": 60
	  },
	  "addBgImgV1": {
	    "height": 430
	  },
	  "addBgImgIPhoneX": {
	    "height": 440
	  },
	  "hideCorpusV1": {
	    "top": 146
	  },
	  "hideCorpusIPhoneX": {
	    "top": 156
	  },
	  "pageTopV1": {
	    "top": 226
	  },
	  "pageTopIPhoneX": {
	    "top": 236
	  },
	  "maskLayer": {
	    "position": "fixed",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "backgroundColor": "#000000",
	    "opacity": 0.5
	  },
	  "showBox": {
	    "position": "fixed",
	    "top": 150,
	    "right": 15,
	    "backgroundColor": "#ffffff",
	    "borderRadius": 20,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "arrowUp": {
	    "position": "fixed",
	    "top": 148,
	    "right": 30
	  },
	  "refreshImg": {
	    "width": 60,
	    "height": 60,
	    "borderRadius": 30
	  },
	  "refreshBox": {
	    "height": 120,
	    "width": 750,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "indexMtIPhoneX": {
	    "marginTop": 124
	  }
	}

/***/ }),
/* 268 */
/***/ (function(module, exports) {

	module.exports = {
	  "videoIconBox": {
	    "position": "absolute",
	    "left": 0,
	    "top": 0,
	    "width": 155,
	    "height": 155,
	    "backgroundColor": "rgba(136,136,136,0.3)"
	  },
	  "goodsIcon": {
	    "color": "#ffffff",
	    "fontSize": 80,
	    "position": "absolute",
	    "top": 37.5,
	    "left": 37.5
	  },
	  "videoIcon": {
	    "color": "#ffffff",
	    "fontSize": 70,
	    "position": "absolute",
	    "top": 42.5,
	    "left": 42.5
	  },
	  "addIconBox": {
	    "backgroundColor:active": "#cccccc",
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "paddingRight": 40,
	    "paddingLeft": 40
	  },
	  "processTotal": {
	    "position": "absolute",
	    "bottom": 40,
	    "right": 50,
	    "fontSize": 28,
	    "color": "#888888"
	  },
	  "processBg": {
	    "backgroundColor": "#cccccc",
	    "width": 500
	  },
	  "processStyle": {
	    "height": 10,
	    "position": "absolute",
	    "left": 50,
	    "bottom": 100
	  },
	  "processText": {
	    "position": "absolute",
	    "top": 40,
	    "left": 50,
	    "fontSize": 32
	  },
	  "processBox": {
	    "height": 250,
	    "borderRadius": 5,
	    "width": 600,
	    "backgroundColor": "#ffffff",
	    "justifyContent": "space-between"
	  },
	  "sendMask": {
	    "position": "absolute",
	    "top": 0,
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "backgroundColor": "rgba(0,0,0,0.8)",
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "voteMargin": {
	    "marginBottom": 15
	  },
	  "@TRANSITION": {
	    "paraTransition-enter-active": {
	      "duration": 200
	    },
	    "paraTransition-leave-active": {
	      "duration": 200
	    }
	  },
	  "paraTransition-leave-to": {
	    "transform": "translateX(300px)",
	    "opacity": 0
	  },
	  "paraTransition-enter": {
	    "transform": "translateX(0px)",
	    "opacity": 1
	  },
	  "addVoteIcon": {
	    "fontSize": 39,
	    "paddingTop": 3
	  },
	  "addVote": {
	    "color": "#A89F95",
	    "fontSize": 34,
	    "marginLeft": 10
	  },
	  "flexRow": {
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "justifyContent": "center"
	  },
	  "greyColor": {
	    "color": "#999999"
	  },
	  "emptyBox": {
	    "height": 40
	  },
	  "arrowSize": {
	    "color": "#999999",
	    "fontSize": 34,
	    "fontWeight": "700"
	  },
	  "upArrow": {
	    "top": 0,
	    "paddingTop": 5,
	    "paddingLeft": 10,
	    "paddingBottom": 10
	  },
	  "downArrow": {
	    "bottom": 0,
	    "paddingTop": 10,
	    "paddingBottom": 5,
	    "paddingLeft": 10
	  },
	  "rightArrow": {
	    "position": "absolute",
	    "right": 0,
	    "paddingRight": 10
	  },
	  "paraClose": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "paddingLeft": 5,
	    "paddingTop": 5,
	    "paddingRight": 5,
	    "paddingBottom": 5
	  },
	  "paraCloseSize": {
	    "color": "#999999",
	    "fontSize": 34
	  },
	  "paraTextSize": {
	    "fontSize": 32,
	    "lineHeight": 38,
	    "color": "#444444",
	    "lines": 4,
	    "textOverflow": "ellipsis"
	  },
	  "paraText": {
	    "marginLeft": 20,
	    "width": 445
	  },
	  "paraImage": {
	    "width": 155,
	    "height": 155,
	    "borderRadius": 10
	  },
	  "paraBoxHeight": {
	    "height": 225
	  },
	  "paraBox": {
	    "flexDirection": "row",
	    "paddingLeft": 35,
	    "paddingRight": 35,
	    "paddingTop": 35,
	    "paddingBottom": 35,
	    "width": 700,
	    "marginLeft": 25,
	    "backgroundColor": "#ffffff",
	    "borderBottomRightRadius": 20,
	    "borderTopRightRadius": 20,
	    "borderBottomLeftRadius": 20,
	    "borderTopLeftRadius": 20
	  },
	  "wrapperBox": {
	    "backgroundColor": "#EFF0F5"
	  },
	  "addText": {
	    "color": "#FFE394"
	  },
	  "addImage": {
	    "color": "#1E7DEB"
	  },
	  "addVideo": {
	    "color": "#CCA7FC"
	  },
	  "addLinkPt": {
	    "paddingTop": 12
	  },
	  "addLink": {
	    "color": "#d81e06",
	    "fontSize": 44
	  },
	  "iconSize": {
	    "fontSize": 38
	  },
	  "iconBox": {
	    "flexDirection": "row",
	    "backgroundColor": "#ffffff",
	    "borderBottomRightRadius": 20,
	    "borderTopRightRadius": 20,
	    "borderBottomLeftRadius": 20,
	    "borderTopLeftRadius": 20,
	    "marginTop": 15,
	    "marginBottom": 15
	  },
	  "plusSign": {
	    "paddingLeft": 12,
	    "paddingRight": 12,
	    "paddingTop": 1,
	    "paddingBottom": 1,
	    "backgroundColor": "#D7DBD5",
	    "color": "#ffffff",
	    "borderStyle": "solid",
	    "borderWidth": 1,
	    "borderColor": "rgba(133,133,133,0.2)",
	    "borderRadius": 30,
	    "fontSize": 30,
	    "fontWeight": "700"
	  },
	  "plusSignBox": {
	    "paddingLeft": 15,
	    "paddingRight": 15,
	    "paddingBottom": 15,
	    "paddingTop": 15
	  },
	  "addBox": {
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "setTitle": {
	    "position": "absolute",
	    "top": 40,
	    "color": "#ffffff",
	    "fontSize": 40,
	    "left": 25,
	    "right": 25
	  },
	  "musicSize": {
	    "color": "#666666",
	    "fontSize": 27
	  },
	  "bottomBtn": {
	    "position": "absolute",
	    "bottom": 20,
	    "borderRadius": 10,
	    "color": "#666666",
	    "paddingBottom": 5,
	    "justifyContent": "center",
	    "paddingRight": 12,
	    "paddingLeft": 12,
	    "paddingTop": 5,
	    "backgroundColor": "#ffffff"
	  },
	  "addMusic": {
	    "left": 25,
	    "maxWidth": 500
	  },
	  "editCover": {
	    "right": 25
	  },
	  "coverMaskImage": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "width": 750,
	    "height": 375,
	    "backgroundColor": "#888888",
	    "opacity": 0.5
	  },
	  "coverImage": {
	    "width": 750,
	    "height": 375
	  }
	}

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(136);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _fetch = __webpack_require__(105);

	var _navbar = __webpack_require__(131);

	var _navbar2 = _interopRequireDefault(_navbar);

	var _utils = __webpack_require__(71);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var storage = weex.requireModule('storage'); //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var event = weex.requireModule('event');
	var album = weex.requireModule('album');
	var modal = weex.requireModule('modal');
	var stream = weex.requireModule('stream');
	var lastIndex = -1;
	var musicId = -1;
	exports.default = {
	    data: function data() {
	        return {
	            showStore: '',
	            toSendArticle: false, //控制进度条 遮罩显示
	            currentPro: 0, //当前进度
	            proTotal: 0, //总的进度
	            processWidth: 0, //进度条宽度
	            articleId: '',
	            refreshing: false,
	            firstPlusShow: true,
	            coverImage: _utils2.default.locate('resources/images/background.png'),
	            setTitle: '点击设置标题',
	            addMusic: '添加音乐',
	            musicName: '',
	            paraList: [],
	            voteList: [],
	            proportion: '', //缩略图的比例
	            serveCover: '', //用来保存图片上传服务器后存储服务器图片路径，避免覆盖图片时产生闪屏
	            catalogId: '',
	            publish: false,
	            sortStatus: '0,',
	            timestamp: '',
	            articleTemplates: [], //文章段落数组
	            musicData: '', //音乐数据
	            voteData: [], //投票的数组
	            hadChange: 0,
	            //                缓存有用
	            articleOption: {
	                articleCatalog: { count: 0 },
	                articleCategory: {},
	                authority: 'draft',
	                isPitch: false,
	                isPublish: false,
	                isTop: false
	            },
	            hits: 0,
	            laud: 0,
	            products: [],
	            isReview: 0,
	            clicked: false
	        };
	    },
	    filters: {
	        //            过滤html标签
	        htmlDeal: function htmlDeal(value) {
	            if (_utils2.default.isNull(value)) {
	                return value;
	            }
	            //                将h1-h5换成\n
	            var takeEnter = value.replace(/<\/h[0-9]>/g, "\n");
	            //                将html标签替换，可能遗留空格
	            var nbspText = takeEnter.replace(/<\/?.+?>/g, "");
	            //                将空格 &nbsp; 替换成 。
	            var spaceText = nbspText.replace(/&nbsp;/g, " ");
	            return spaceText;
	            //                //                将空格去除
	            ////                var onlyText=spaceText.replace(/ /g,"");
	        },
	        watchThumbImg: function watchThumbImg(value) {
	            if (_utils2.default.isNull(value)) {
	                return _utils2.default.locate('resources/images/text.png');
	            } else {
	                return value;
	            }
	        }
	    },
	    computed: {
	        voteImg: function voteImg() {
	            return _utils2.default.locate('resources/images/vote.png');
	        }
	    },
	    components: {
	        navbar: _navbar2.default
	    },
	    props: {
	        title: { default: "编辑" },
	        complete: { default: "完成" }
	    },
	    created: function created() {
	        _utils2.default.initIconFont();
	        var _this = this;
	        //            获取当前时间戳 作为唯一标识符key
	        this.timestamp = Math.round(new Date().getTime() / 1000);
	        //            bundleUrl = new String(bundleUrl);
	        //            取当前页面rul，将musicId取出来
	        var bundleUrl = this.$getConfig().bundleUrl;
	        var getVal = bundleUrl.split('?')[1];
	        //          创建文章编辑（首次）
	        if (_utils2.default.isNull(getVal)) {

	            //       多选图片
	            //      调用安卓的相册
	            var _this = this;
	            //判断是否第一次编辑该文章
	            var findDelete = {
	                type: 'articleDraft',
	                key: '0'
	            };
	            event.find(findDelete, function (delData) {
	                if (delData.type == 'success' && delData.data != '') {
	                    //从缓存读取数据 写入界面
	                    _this.readData(findDelete);
	                } else {
	                    album.openAlbumMuti(
	                    //选完图片后触发回调函数
	                    function (data) {
	                        if (data.type == 'success') {
	                            _this.coverImage = data.data[0].originalPath;
	                            //                    data.data里存放的是用户选取的图片路径
	                            for (var i = 0; i < data.data.length; i++) {
	                                _this.paraList.push({
	                                    //原图
	                                    paraImage: data.data[i].originalPath,
	                                    //小缩略图
	                                    thumbnailImage: data.data[i].thumbnailSmallPath,
	                                    mediaType: "image",
	                                    paraText: '',
	                                    show: true,
	                                    serveThumbnail: '',
	                                    //                                            对象id
	                                    id: 0,
	                                    //                                            第三方链接
	                                    url: ''
	                                });
	                                _this.saveDraft();
	                            }
	                        } else {
	                            event.closeURL();
	                        }
	                    });
	                }
	            });
	        } else {
	            //再次文章编辑
	            _this.delOnceDraft('noclose');
	            var op = getVal.split('=');
	            if (op[0] == 'articleId') {
	                var options = {
	                    type: 'article',
	                    key: op[1]
	                };
	                _this.articleId = op[1];
	                if (_this.articleId.length == 19) {//19位的id为草稿文章
	                } else {
	                    (0, _fetch.GET)('weex/member/article/option.jhtml?id=' + _this.articleId, function (data) {
	                        if (data.type == 'success' && data.data != '') {
	                            _this.catalogId = data.data.articleCatalog.id;
	                        }
	                    }, function (err) {
	                        event.toast(err.content);
	                        return;
	                    });
	                };
	                //从缓存读取数据 写入界面
	                _this.readData(options);
	            } else if (op[0] == 'goodsStorageName') {
	                //读取商品缓存并写入页面之中。
	                storage.getItem(op[1], function (e) {
	                    if (e.result == 'success') {
	                        var goodsInfo = JSON.parse(e.data);
	                        _this.coverImage = goodsInfo.thumbnail;
	                        _this.setTitle = goodsInfo.name;
	                        //                    data.data里存放的是用户选取的图片路径
	                        _this.paraList.push({
	                            //原图
	                            paraImage: goodsInfo.thumbnail,
	                            //小缩略图
	                            thumbnailImage: goodsInfo.thumbnail,
	                            mediaType: "product",
	                            paraText: '',
	                            show: true,
	                            serveThumbnail: '',
	                            //                                            对象id
	                            id: goodsInfo.id,
	                            //                                            第三方链接
	                            url: ''
	                        });
	                        //                            存储页面数据
	                        _this.saveDraft();
	                        //                          把缓存删除
	                        storage.removeItem(op[1], function (e) {});
	                    }
	                });
	            };
	        };
	    },
	    methods: {
	        //从缓存读取数据 写入界面
	        readData: function readData(options) {
	            var _this = this;
	            event.find(options, function (data) {
	                if (data.type == 'success' && data.data != '') {
	                    var articleData = JSON.parse(data.data.value);
	                    if (!_utils2.default.isNull(data.data.sort)) {
	                        //                            保存置顶状态。
	                        _this.sortStatus = data.data.sort.substring(0, 2);
	                    }
	                    _this.setTitle = articleData.title;
	                    _this.coverImage = articleData.thumbnail;
	                    if (!_utils2.default.isNull(articleData.music.name)) {
	                        _this.musicName = articleData.music.name;
	                    }
	                    _this.publish = articleData.articleOption.isPublish;
	                    _this.articleOption = articleData.articleOption, _this.hits = articleData.hits, _this.laud = articleData.laud, _this.products = articleData.products, _this.review = articleData.isReview, musicId = articleData.music.id;
	                    var templatesData = articleData.templates;
	                    for (var i = 0; i < templatesData.length; i++) {
	                        var paraId = _utils2.default.isNull(templatesData[i].id) ? 0 : templatesData[i].id;
	                        var paraUrl = _utils2.default.isNull(templatesData[i].url) ? '' : templatesData[i].url;
	                        _this.paraList.push({
	                            //原图
	                            paraImage: templatesData[i].original,
	                            //小缩略图
	                            thumbnailImage: templatesData[i].thumbnail,
	                            paraText: templatesData[i].content,
	                            show: true,
	                            mediaType: templatesData[i].mediaType,
	                            serveThumbnail: '', //用来保存图片上传服务器后存储服务器图片路径，避免覆盖图片时产生闪屏
	                            //          对象id
	                            id: paraId,
	                            //                                            第三方链接
	                            url: paraUrl
	                        });
	                    }
	                    //                            投票
	                    if (!_utils2.default.isNull(articleData.votes)) {
	                        articleData.votes.forEach(function (item) {
	                            var startDate = '';
	                            var startTime = '';
	                            if (_utils2.default.isNull(item.expire)) {
	                                startDate = '无截止时间';
	                            } else {
	                                var time = _utils2.default.ymdhistimefmt(item.expire);
	                                startDate = time.substring(0, 10);
	                                startTime = time.substring(11, 19);
	                            }
	                            var optionIndex = 0;
	                            switch (item.voteType) {
	                                case 'radiobox':
	                                    optionIndex = 0;
	                                    break;
	                                case 'checkbox':
	                                    optionIndex = 1;
	                                    break;
	                                case 'nolimit':
	                                    optionIndex = 2;
	                                    break;
	                                default:
	                                    break;
	                            }
	                            //选项
	                            var optionBox = [];
	                            item.options.forEach(function (value) {
	                                optionBox.push({
	                                    textAreaMessage: value,
	                                    textHeight: '48',
	                                    rowsNum: '1',
	                                    editSign: -1
	                                });
	                            });

	                            _this.voteList.push({
	                                chooseDate: startDate,
	                                chooseTime: startTime,
	                                optionsIndex: optionIndex,
	                                textAreaTitle: item.title,
	                                pageBox: optionBox
	                            });
	                        });
	                    }
	                } else {
	                    if (_this.articleId.length == 19) {
	                        event.toast('本地数据已被删除');
	                        event.closeURL();
	                        return;
	                    }
	                    //                        从服务器获取文章信息并存入缓存
	                    _this.getServerArticle(function () {
	                        var options = {
	                            type: 'article',
	                            key: _this.articleId
	                        };
	                        _this.readData(options);
	                    });
	                };
	            });
	        },

	        //           从服务器获取文章信息并存入缓存
	        getServerArticle: function getServerArticle(callback) {
	            var _this = this;
	            (0, _fetch.GET)('weex/member/article/view.jhtml?id=' + _this.articleId, function (res) {
	                if (res.data != '' && res.type == 'success') {
	                    //                                   将服务器的缩略图换成原图的缩略图
	                    //                                    res.data.templates.forEach(function (item) {
	                    //                                        item.thumbnail = utils.thumbnail(item.original,155,155);
	                    //                                    })
	                    var resDataStr = (0, _stringify2.default)(res.data);
	                    var saveData = {
	                        type: "article",
	                        key: res.data.id,
	                        value: resDataStr,
	                        sort: '0,' + res.data.modifyDate,
	                        keyword: ',[' + _this.catalogId + '],' + _this.setTitle + ','
	                    };
	                    event.save(saveData, function (data) {
	                        if (data.type == 'success') {
	                            callback();
	                        } else {
	                            event.toast(data.content);
	                        }
	                    });
	                }
	            }, function (err) {
	                event.toast(err.content);
	            });
	        },

	        //            保存临时草稿
	        saveDraft: function saveDraft(callback) {
	            var _this = this;
	            //                将数据保存到变量里
	            this.savePage();
	            var allPageData = {
	                articleOption: this.articleOption,
	                hits: this.hits,
	                laud: this.laud,
	                products: this.products,
	                review: this.isReview,
	                id: this.articleId,
	                isDraft: true,
	                modifyDate: this.timestamp,
	                music: this.musicData,
	                templates: this.articleTemplates,
	                thumbnail: this.coverImage,
	                title: this.setTitle,
	                votes: this.voteData
	            };
	            allPageData = (0, _stringify2.default)(allPageData);
	            var storageType;
	            var storageKey;
	            if (_utils2.default.isNull(this.articleId)) {
	                storageType = "articleDraft";
	                storageKey = '0';
	            } else {
	                storageType = "article";
	                storageKey = this.articleId;
	            }
	            var draftOptions = {
	                type: storageType,
	                key: storageKey,
	                value: allPageData,
	                sort: _this.sortStatus + _this.timestamp,
	                keyword: ',[' + _this.catalogId + '],' + _this.setTitle + ','
	            };
	            event.save(draftOptions, function (data) {
	                if (data.type == 'success' && !_utils2.default.isNull(_this.articleId)) {

	                    //                                    全局监听文章变动
	                    var listenData = _utils2.default.message('success', '文章改变', '');
	                    event.sendGlobalEvent('onArticleChange', listenData);
	                    if (!_utils2.default.isNull(callback)) {
	                        callback();
	                    }
	                } else if (data.type == 'success') {
	                    if (!_utils2.default.isNull(callback)) {
	                        callback();
	                    }
	                } else {
	                    event.toast(data.content);
	                }
	            });
	        },


	        //            控制进度条
	        ctrlProcess: function ctrlProcess(data) {
	            this.processWidth = parseInt(data.data) * 5;
	            if (this.processWidth == 500) {
	                this.currentPro++;
	            };
	        },


	        //            设置文章标题
	        articleTitle: function articleTitle(title) {
	            //防止重复点击按钮
	            if (this.clicked) {
	                return;
	            }
	            this.clicked = true;
	            var _this = this;
	            if (title == '点击设置标题') {
	                title = '';
	            };
	            var textData = {
	                autograph: title
	            };
	            textData = (0, _stringify2.default)(textData);
	            storage.setItem('articleTitle', textData, function (e) {
	                event.openURL(_utils2.default.locate('widget/autograph.js?name=articleTitle'), function (message) {
	                    _this.clicked = false;
	                    if (message.type == 'success' && !_utils2.default.isNull(message.data) && !_utils2.default.isNull(message.data.text)) {
	                        _this.setTitle = message.data.text;
	                        _this.hadChange = 1;
	                        //                            if(utils.isNull(_this.articleId)){
	                        //                        临时保存到缓存
	                        _this.saveDraft();
	                        //                            }
	                    }
	                });
	            });
	        },
	        //            段落里的文本编辑
	        editorText: function editorText(index) {
	            //防止重复点击按钮
	            if (this.clicked) {
	                return;
	            }
	            this.clicked = true;
	            var _this = this;

	            //                if(_this.paraList[index].mediaType == 'product'){
	            //                    event.openURL(utils.locate('view/shop/goods/manage.js?from=editor'),function (data) {
	            //                        if (data.type == 'success') {
	            //                            _this.paraList[index].paraImage = data.data.thumbnail;
	            //                            _this.paraList[index].thumbnailImage = data.data.thumbnail;
	            //                            _this.paraList[index].paraText = data.data.name;
	            ////                    添加修改标志
	            //                            _this.hadChange = 1;
	            ////                        if(utils.isNull(_this.articleId)){
	            ////                        临时保存到缓存
	            //                            _this.saveDraft();
	            ////                        }
	            //                        }
	            //                    })
	            //                    return;
	            //                }

	            event.openEditor(_this.paraList[index].paraText, function (data) {
	                _this.clicked = false;
	                if (data.data != '') {
	                    //                    将返回回来的html数据赋值进去
	                    _this.paraList[index].paraText = data.data;
	                    _this.hadChange = 1;
	                    //                        if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                        }
	                }
	            });
	        },

	        //            返回
	        goBack: function goBack() {
	            var _this = this;
	            //                判断是草稿还是已经发布文章
	            if (_utils2.default.isNull(this.articleId) || this.articleId.length == 19) {
	                modal.confirm({
	                    message: '请选择方式?',
	                    duration: 0.3,
	                    okTitle: '删除草稿',
	                    cancelTitle: '存草稿'
	                }, function (value) {
	                    if (value == '存草稿') {
	                        if (_utils2.default.isNull(_this.articleId)) {
	                            //                                生成6位随机数
	                            var Num = "";
	                            for (var i = 0; i < 6; i++) {
	                                Num += Math.floor(Math.random() * 10);
	                            }
	                            //            获取当前时间戳 作为唯一标识符key
	                            _this.articleId = Math.round(new Date().getTime()) + Num;
	                        }
	                        _this.saveDraft(function () {
	                            _this.delOnceDraft();
	                        });
	                    } else if (value == '删除草稿') {
	                        _this.deleteDraft();
	                    }
	                });
	            } else {
	                //                    判断是否有修改过
	                if (this.hadChange == 1) {
	                    modal.confirm({
	                        message: '请选择方式?',
	                        duration: 0.3,
	                        okTitle: '撤销编辑',
	                        cancelTitle: '存草稿'
	                    }, function (value) {
	                        if (value == '存草稿') {
	                            _this.saveDraft(function () {
	                                var E = {
	                                    isDone: 'complete'
	                                };
	                                var backData = _utils2.default.message('success', '成功', E);
	                                event.closeURL(backData);
	                            });
	                        } else if (value == '撤销编辑') {
	                            _this.getServerArticle(function () {
	                                //                                    全局监听文章变动
	                                var listenData = _utils2.default.message('success', '文章改变', '');
	                                event.sendGlobalEvent('onArticleChange', listenData);
	                                event.closeURL();
	                            });
	                        }
	                    });
	                } else {
	                    event.closeURL();
	                }
	            }
	        },
	        //            删除临时缓存和草稿缓存
	        deleteDraft: function deleteDraft(close) {
	            var _this = this;
	            var storageType;
	            var storageKey;
	            if (_utils2.default.isNull(this.articleId)) {
	                storageType = "articleDraft";
	                storageKey = '0';
	            } else {
	                if (this.articleId.length != 19) {
	                    return;
	                }
	                storageType = "article";
	                storageKey = this.articleId;
	            }
	            //                                    判断是否第一次编辑该文章
	            var findDel = {
	                type: storageType,
	                key: storageKey
	            };
	            event.find(findDel, function (delData) {
	                if (delData.type == 'success' && delData.data != '') {
	                    //  将临时缓存删除;
	                    var delOption = {
	                        type: storageType,
	                        key: storageKey
	                    };
	                    event.delete(delOption, function (data) {
	                        if (data.type == 'success' && !_utils2.default.isNull(_this.articleId)) {
	                            if (_utils2.default.isNull(close)) {
	                                //                                    全局监听文章变动
	                                var listenData = _utils2.default.message('success', '文章改变', '');
	                                event.sendGlobalEvent('onArticleChange', listenData);
	                                event.closeURL();
	                            }
	                        } else if (data.type == 'success') {
	                            if (_utils2.default.isNull(close)) {
	                                event.closeURL();
	                            }
	                        }
	                    });
	                } else {
	                    event.toast(delData.content);
	                }
	            });
	        },

	        //            删除临时缓存
	        delOnceDraft: function delOnceDraft(close) {
	            var _this = this;
	            //   将临时草稿删除
	            var findDel = {
	                type: 'articleDraft',
	                key: '0'
	            };
	            event.find(findDel, function (delData) {
	                if (delData.type == 'success' && delData.data != '') {
	                    //  将临时缓存删除;
	                    var delOption = {
	                        type: 'articleDraft',
	                        key: '0'
	                    };
	                    event.delete(delOption, function (data) {
	                        if (data.type == 'success') {
	                            if (_utils2.default.isNull(close)) {
	                                var E = {
	                                    isDone: 'complete'
	                                };
	                                var backData = _utils2.default.message('success', '成功', E);
	                                event.closeURL(backData);
	                            }
	                        } else {
	                            event.toast(data.content);
	                        }
	                    });
	                } else {
	                    if (_utils2.default.isNull(close)) {
	                        event.closeURL();
	                    }
	                }
	            });
	        },

	        //            完成
	        goComplete: function goComplete() {
	            var _this = this;
	            if (this.setTitle == '点击设置标题') {
	                event.toast('请设置标题');
	                return;
	            }
	            //                判断封面是否有值。
	            if (this.coverImage == _utils2.default.locate('resources/images/background.png')) {
	                event.toast('请设置封面');
	                return;
	            }
	            var imageNum = 0;
	            //                上传时判断至少要有一张图,或者一个商品;
	            _this.paraList.forEach(function (item) {
	                if ((item.mediaType == 'image' || item.mediaType == 'product') && item.paraImage != '') {
	                    imageNum++;
	                }
	            });
	            if (imageNum == 0) {
	                //                        modal.toast({message: '至少要保留一张图片', duration: 0.5});
	                event.toast('至少要有一张图片');
	                return;
	            }

	            //防止重复点击按钮
	            if (this.clicked) {
	                return;
	            }
	            this.clicked = true;

	            this.toSendArticle = true;
	            this.proTotal = 0;
	            //                判断封面图片是否已上传过
	            if (!_utils2.default.isNull(this.coverImage) && this.coverImage.substring(0, 4) != 'http') {
	                this.proTotal++;
	            };
	            //                判断段落图片是否已上传
	            this.paraList.forEach(function (item) {
	                if (!_utils2.default.isNull(item.paraImage) && item.paraImage.substring(0, 4) != 'http') {
	                    _this.proTotal++;
	                }
	            });
	            ////                获取设备宽度
	            //                let devWidth = weex.config.env.deviceWidth;
	            ////                获取缩略图的宽高
	            //                _this.proportion = parseInt(155 * devWidth/750);
	            var frontcoverUrl = '';
	            if (!_utils2.default.isNull(this.coverImage)) {
	                frontcoverUrl = this.coverImage.substring(0, 4);
	            }
	            //                event.toast(frontcoverUrl);
	            if (frontcoverUrl == 'http') {
	                //                    event.toast('1');
	                _this.serveCover = this.coverImage;
	                _this.sendImage(0);
	            } else {
	                //                将封面上传服务器
	                event.upload(this.coverImage, function (data) {
	                    if (data.type == 'success') {
	                        //这边会由于避免重复渲染而需要再次向服务器上传该图片
	                        _this.serveCover = data.data;
	                        //                        上传段落图片
	                        _this.sendImage(0);
	                    } else {
	                        _this.toSendArticle = false;
	                        //                防止重复点击
	                        _this.clicked = false;
	                        event.toast(data.content);
	                        return;
	                    }
	                }, function (data) {
	                    _this.ctrlProcess(data);
	                });
	            }
	        },
	        //上传图片到服务器
	        sendImage: function sendImage(sendIndex) {
	            var _this = this;
	            //                var frontUrl;
	            var sendLength = _this.paraList.length; //获取图片数组总长度
	            var mediaType = _this.paraList[sendIndex].mediaType;
	            var frontUrl = '';
	            if (!_utils2.default.isNull(_this.paraList[sendIndex].paraImage)) {
	                frontUrl = _this.paraList[sendIndex].paraImage.substring(0, 4);
	            }
	            //                if(mediaType == 'image') {
	            //                    modal.toast({message:frontUrl,duration:1});
	            //                }else if(mediaType == 'video'){//如果是视频
	            //                    frontUrl = _this.paraList[sendIndex].thumbnailImage.substring(0,5);
	            //
	            //                    modal.toast({message:frontUrl,duration:1});
	            //                }
	            //                判断是否已经是服务器图片
	            if (frontUrl == 'http') {
	                if (mediaType == 'image' || mediaType == 'product') {
	                    //                    如果已经是http的图片 就直接将图片赋予要上传的变量；
	                    _this.paraList[sendIndex].serveThumbnail = _utils2.default.thumbnail(_this.paraList[sendIndex].paraImage, 155, 155);
	                } else if (mediaType == 'video') {
	                    //如果是视频就将缩略图进行赋值
	                    _this.paraList[sendIndex].serveThumbnail = _this.paraList[sendIndex].thumbnailImage;
	                }
	                sendIndex++;
	                //                        判断是否最后一张图
	                if (sendIndex < sendLength) {
	                    //                            回调自己自己
	                    _this.sendImage(sendIndex);
	                } else {
	                    //进行上传文章
	                    _this.realSave();
	                }
	            } else if (_utils2.default.isNull(_this.paraList[sendIndex].paraImage)) {
	                //判断是否只有文字
	                _this.paraList[sendIndex].serveThumbnail = '';
	                sendIndex++;
	                //                        判断是否最后一张图
	                if (sendIndex < sendLength) {
	                    //                            回调自己自己
	                    _this.sendImage(sendIndex);
	                } else {
	                    //进行上传文章
	                    _this.realSave();
	                }
	            } else {
	                event.upload(_this.paraList[sendIndex].paraImage, function (data) {
	                    if (data.type == 'success') {
	                        _this.paraList[sendIndex].paraImage = data.data;
	                        //                            判断是图片还是视频
	                        if (mediaType == 'image' || mediaType == 'product') {
	                            //                            向后台获取缩略图
	                            _this.paraList[sendIndex].serveThumbnail = _utils2.default.thumbnail(data.data, 155, 155);
	                            //                                    因为异步操作,所以要分别在if elseif里写下列代码
	                            sendIndex++;
	                            //                        判断是否最后一张图
	                            if (sendIndex < sendLength) {
	                                //                            回调自己自己
	                                _this.sendImage(sendIndex);
	                            } else {
	                                //进行上传文章
	                                _this.realSave();
	                            }
	                        } else if (mediaType == 'video') {
	                            //                                将视频的封面上传
	                            event.upload(_this.paraList[sendIndex].thumbnailImage, function (e) {
	                                if (e.type == 'success') {
	                                    //                            向后台获取缩略图 (视频不需要获取缩略图)
	                                    _this.paraList[sendIndex].serveThumbnail = e.data;
	                                    //                                        event.toast(_this.paraList[sendIndex].serveThumbnail);
	                                } else {
	                                    //上传失败
	                                    _this.toSendArticle = false;
	                                    _this.currentPro = 0; //当前进度
	                                    _this.proTotal = 0; //总的进度
	                                    _this.processWidth = 0; //进度条宽度
	                                    event.toast(e.content);
	                                    return;
	                                    //                                        这边出错 11.30
	                                }
	                                //                                    因为异步操作,所以要分别在if elseif里写下列代码
	                                sendIndex++;
	                                //                        判断是否最后一张图
	                                if (sendIndex < sendLength) {
	                                    //                            回调自己自己
	                                    _this.sendImage(sendIndex);
	                                } else {
	                                    //进行上传文章
	                                    _this.realSave();
	                                }
	                            }, function (data) {});
	                        }
	                    } else {
	                        //上传失败
	                        _this.toSendArticle = false;
	                        //                防止重复点击
	                        _this.clicked = false;
	                        _this.currentPro = 0; //当前进度
	                        _this.proTotal = 0; //总的进度
	                        _this.processWidth = 0; //进度条宽度
	                        event.toast(data.content);
	                        return;
	                    }
	                }, function (data) {
	                    //                    上传进度
	                    _this.ctrlProcess(data);
	                });
	            }
	        },

	        //            将页面上的数据存储起来
	        savePage: function savePage() {

	            //                每次保存前 将下列3个变量重新置空;
	            this.articleTemplates = []; //文章段落数组
	            this.musicData = ''; //音乐数据
	            this.voteData = []; //投票的数组

	            var _this = this;
	            this.musicData = {
	                name: _this.musicName,
	                id: musicId
	                //                let voteData = [];
	                //                投票组
	            };this.voteList.forEach(function (item) {
	                //                    投票选项
	                var voteOptions = [];
	                item.pageBox.forEach(function (value) {
	                    voteOptions.push(value.textAreaMessage);
	                });
	                var expireTime = '';
	                if (item.chooseDate == '无截止时间') {} else {
	                    var merge = item.chooseDate + ' ' + item.chooseTime + ':00';
	                    var mergeMore = new Date(Date.parse(merge.replace(/-/g, "/")));
	                    expireTime = mergeMore.getTime() / 1000;
	                }
	                _this.voteData.push({
	                    title: item.textAreaTitle,
	                    expire: expireTime,
	                    voteType: item.optionsIndex,
	                    options: voteOptions
	                });
	                //                    event.toast(voteData);
	            });
	            //                var articleTemplates = [];
	            if (!_utils2.default.isNull(this.articleId) && this.articleId.length == 19) {
	                //判断id为19位的是草稿，或者有文章id时。
	                var uploadThumbnailImg;
	                this.paraList.forEach(function (item) {
	                    if (!_utils2.default.isNull(item.serveThumbnail)) {
	                        uploadThumbnailImg = item.serveThumbnail;
	                    } else {
	                        uploadThumbnailImg = item.thumbnailImage;
	                    }
	                    _this.articleTemplates.push({
	                        thumbnail: uploadThumbnailImg,
	                        original: item.paraImage,
	                        mediaType: item.mediaType,
	                        content: item.paraText,
	                        //          对象id
	                        id: parseInt(item.id),
	                        //                                            第三方链接
	                        url: item.url
	                    });
	                });
	            } else {
	                var uploadThumbnail;
	                //                    如果是临时缓存 是没有上传过的本地图片； thumbnail:item.thumbnailImage,
	                this.paraList.forEach(function (item) {
	                    if (!_utils2.default.isNull(item.paraImage) && item.paraImage.substring(0, 4) == 'http' && !_utils2.default.isNull(item.serveThumbnail)) {
	                        uploadThumbnail = item.serveThumbnail;
	                    } else {
	                        uploadThumbnail = item.thumbnailImage;
	                    }
	                    _this.articleTemplates.push({
	                        thumbnail: uploadThumbnail,
	                        original: item.paraImage,
	                        mediaType: item.mediaType,
	                        content: item.paraText,
	                        //          对象id
	                        id: parseInt(item.id),
	                        //                                            第三方链接
	                        url: item.url
	                    });
	                });
	            }
	        },

	        //            图片上传后，正式将文章数据上传服务器
	        realSave: function realSave() {
	            var _this = this;
	            //                将页面上的数据存储起来
	            this.savePage();
	            //                判断是再次编辑还是初次编辑;
	            var sendId = _utils2.default.isNull(_this.articleId) ? _this.timestamp : _this.articleId;
	            var articleData = {
	                thumbnail: this.serveCover,
	                music: _this.musicData,
	                templates: _this.articleTemplates,
	                id: sendId,
	                title: _this.setTitle,
	                votes: _this.voteData,
	                isDraft: false
	            };
	            //                转成json字符串后上传服务器
	            articleData = (0, _stringify2.default)(articleData);
	            //                utils.debug(articleData);
	            //                网络请求，保存文章
	            (0, _fetch.POST)('weex/member/article/submit.jhtml', articleData).then(function (res) {
	                //                        utils.debug(res);
	                if (res.data != '' && res.type == 'success') {
	                    //                            _this.articleId = res.data.id;
	                    var resDataStr = (0, _stringify2.default)(res.data);
	                    var saveData = {
	                        type: "article",
	                        key: res.data.id,
	                        value: resDataStr,
	                        sort: _this.sortStatus + _this.timestamp,
	                        keyword: ',[' + _this.catalogId + '],' + _this.setTitle + ','
	                    };
	                    //                1是置顶（默认倒序）  keyword ",[1],文章title,"
	                    event.save(saveData, function (data) {
	                        if (data.type == 'success') {
	                            _this.deleteDraft('noclose');
	                            //                                    event.closeURL();
	                            _this.toSendArticle = false;
	                            //                                  防止重复点击
	                            _this.clicked = false;
	                            //                                    全局监听文章变动
	                            var listenData = _utils2.default.message('success', '文章改变', '');
	                            event.sendGlobalEvent('onArticleChange', listenData);
	                            event.openURL(_utils2.default.locate('view/article/preview.js?articleId=' + res.data.id + '&publish=' + _this.publish), function (data) {
	                                _this.currentPro = 0; //当前进度
	                                _this.proTotal = 0; //总的进度
	                                _this.processWidth = 0; //进度条宽度
	                                //                                        if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete'){
	                                var E = {
	                                    isDone: 'complete'
	                                };
	                                var backData = _utils2.default.message('success', '成功', E);
	                                event.closeURL(backData);
	                                //                                        }
	                            });
	                            //                                    event.router(utils.locate('view/article/preview.js?articleId=' + res.data.id + '&publish=' + _this.publish));
	                        } else {
	                            _this.toSendArticle = false;
	                            //                防止重复点击
	                            _this.clicked = false;
	                            _this.currentPro = 0; //当前进度
	                            _this.proTotal = 0; //总的进度
	                            _this.processWidth = 0; //进度条宽度
	                            event.toast(data.content);
	                        };
	                    });
	                } else {
	                    event.toast(res.content);
	                    _this.toSendArticle = false;
	                    //                防止重复点击
	                    _this.clicked = false;
	                    _this.currentPro = 0; //当前进度
	                    _this.proTotal = 0; //总的进度
	                    _this.processWidth = 0; //进度条宽度
	                }
	            }, function (err) {
	                event.toast(err.content);
	                //                防止重复点击
	                _this.clicked = false;
	                _this.toSendArticle = false;
	                _this.currentPro = 0; //当前进度
	                _this.proTotal = 0; //总的进度
	                _this.processWidth = 0; //进度条宽度
	            });
	        },


	        //            点击"+"号里的文本时
	        addTextPara: function addTextPara(index) {
	            //防止重复点击按钮
	            //                if(this.clicked) {
	            //                    return;
	            //                }
	            //                this.clicked = true;
	            var _this = this;
	            event.openEditor('', function (data) {
	                //                    _this.clicked = false;
	                if (data.type == 'success' && data.data != '') {
	                    var textImg = _utils2.default.locate('resources/images/text.png');
	                    //                    将返回回来的html数据赋值进
	                    var newPara = {
	                        //原图
	                        paraImage: '',
	                        //                                    小缩略图
	                        thumbnailImage: textImg,
	                        //                        paraText:_this.checkInput(data.data),
	                        paraText: data.data,
	                        mediaType: "image",
	                        show: true,
	                        //          对象id
	                        id: 0,
	                        //                                            第三方链接
	                        url: ''
	                    };
	                    _this.paraList.splice(index, 0, newPara);
	                    //                    添加修改标志
	                    _this.hadChange = 1;
	                    //                    if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                    }
	                    //                    modal.toast({message:_this.paraList[index].paraText,duration:3});
	                }
	            });
	        },
	        //            点击"+"号里的图片时
	        addImgPara: function addImgPara(index) {
	            //防止重复点击按钮
	            //                if(this.clicked) {
	            //                    return;
	            //                }
	            //                this.clicked = true;
	            var _this = this;
	            album.openAlbumMuti(
	            //选完图片后触发回调函数
	            function (data) {
	                //                        _this.clicked = false;
	                if (data.type == 'success') {
	                    //                    data.data里存放的是用户选取的图片路径
	                    for (var i = 0; i < data.data.length; i++) {
	                        var newPara = {
	                            //原图
	                            paraImage: data.data[i].originalPath,
	                            //                                    小缩略图
	                            thumbnailImage: data.data[i].thumbnailSmallPath,
	                            paraText: '',
	                            show: true,
	                            mediaType: "image",
	                            //          对象id
	                            id: 0,
	                            //                                            第三方链接
	                            url: ''
	                        };
	                        _this.paraList.splice(index + i, 0, newPara);
	                        _this.clearIconBox();
	                        //                    添加修改标志
	                        _this.hadChange = 1;
	                        //                                if(utils.isNull(_this.articleId)){
	                        //                        临时保存到缓存
	                        _this.saveDraft();
	                        //                                }
	                    }
	                }
	            });
	        },
	        //            点击第一个"+"号时触发
	        firstShow: function firstShow() {
	            var _this2 = this;

	            this.firstPlusShow = !this.firstPlusShow;
	            if (lastIndex != -1) {
	                setTimeout(function () {
	                    if (_this2.paraList[lastIndex].show == false) {
	                        _this2.paraList[lastIndex].show = true;
	                    }
	                    lastIndex = -1;
	                }, 60);
	            }
	        },
	        //            点击第2个以后的"+"号时，触发
	        showIconBox: function showIconBox(index) {
	            var _this3 = this;

	            setTimeout(function () {
	                if (_this3.firstPlusShow == false) {
	                    _this3.firstPlusShow = true;
	                }
	            }, 60);
	            if (lastIndex == -1) {
	                this.paraList[index].show = !this.paraList[index].show;
	            } else {
	                this.paraList[index].show = !this.paraList[index].show;
	                //需要加延迟 否则画面会出现卡顿。先将点击的加号转变成功能盒，再将上一个功能后转变为"+"号
	                setTimeout(function () {
	                    if (_this3.paraList[lastIndex].show == false) {
	                        _this3.paraList[lastIndex].show = true;
	                    }
	                }, 60);
	            }
	            setTimeout(function () {
	                lastIndex = index;
	            }, 60);
	        },
	        //            点击空白区域时，将功能盒子隐藏，显示出"+"号
	        clearIconBox: function clearIconBox() {
	            if (lastIndex != -1) {
	                if (this.paraList[lastIndex].show == false) {
	                    this.paraList[lastIndex].show = true;
	                }
	                lastIndex = -1;
	            }
	            if (this.firstPlusShow == false) {
	                this.firstPlusShow = true;
	            }
	        },
	        //            判断是否最后一个段落来添加向下移动的箭头。
	        lastPara: function lastPara(index) {
	            if (index != this.paraList.length - 1) {
	                return true;
	            } else {
	                return false;
	            }
	        },
	        //            上箭头
	        moveUp: function moveUp(index) {
	            var _this = this;
	            this.firstPlusShow = true;
	            if (lastIndex != -1) {
	                this.paraList[lastIndex].show = true;
	                lastIndex = -1;
	            }
	            //         方法2
	            var a = this.paraList[index].thumbnailImage;
	            var b = this.paraList[index].paraText;
	            var c = this.paraList[index].mediaType;
	            var d = this.paraList[index].paraImage;
	            var e = this.paraList[index].id;
	            var f = this.paraList[index].url;
	            this.paraList[index].mediaType = this.paraList[index - 1].mediaType;
	            this.paraList[index].thumbnailImage = this.paraList[index - 1].thumbnailImage;
	            this.paraList[index].paraText = this.paraList[index - 1].paraText;
	            this.paraList[index].paraImage = this.paraList[index - 1].paraImage;
	            this.paraList[index].id = this.paraList[index - 1].id;
	            this.paraList[index].url = this.paraList[index - 1].url;
	            this.paraList[index - 1].thumbnailImage = a;
	            this.paraList[index - 1].paraText = b;
	            this.paraList[index - 1].mediaType = c;
	            this.paraList[index - 1].paraImage = d;
	            this.paraList[index - 1].id = e;
	            this.paraList[index - 1].url = f;
	            if (!_utils2.default.isNull(this.paraList[index].serveThumbnail)) {
	                var g = this.paraList[index].serveThumbnail;
	                this.paraList[index].serveThumbnail = this.paraList[index - 1].serveThumbnail;
	                this.paraList[index - 1].paraImage = g;
	            }
	            //                    添加修改标志
	            this.hadChange = 1;
	            //                if(utils.isNull(_this.articleId)){
	            //                        临时保存到缓存
	            this.saveDraft();
	            //                }
	        },
	        //            下箭头
	        moveBottom: function moveBottom(index) {
	            var _this = this;
	            this.firstPlusShow = true;
	            if (lastIndex != -1) {
	                this.paraList[lastIndex].show = true;
	                lastIndex = -1;
	            }
	            //         方法2
	            var a = this.paraList[index].thumbnailImage;
	            var b = this.paraList[index].paraText;
	            var c = this.paraList[index].mediaType;
	            var d = this.paraList[index].paraImage;
	            var e = this.paraList[index].id;
	            var f = this.paraList[index].url;
	            this.paraList[index].mediaType = this.paraList[index + 1].mediaType;
	            this.paraList[index].thumbnailImage = this.paraList[index + 1].thumbnailImage;
	            this.paraList[index].paraText = this.paraList[index + 1].paraText;
	            this.paraList[index].paraImage = this.paraList[index + 1].paraImage;
	            this.paraList[index].id = this.paraList[index + 1].id;
	            this.paraList[index].url = this.paraList[index + 1].url;
	            this.paraList[index + 1].thumbnailImage = a;
	            this.paraList[index + 1].paraText = b;
	            this.paraList[index + 1].mediaType = c;
	            this.paraList[index + 1].paraImage = d;
	            this.paraList[index + 1].id = e;
	            this.paraList[index + 1].url = f;
	            if (!_utils2.default.isNull(this.paraList[index].serveThumbnail)) {
	                var g = this.paraList[index].serveThumbnail;
	                this.paraList[index].serveThumbnail = this.paraList[index + 1].serveThumbnail;
	                this.paraList[index + 1].paraImage = g;
	            }
	            //                    添加修改标志
	            this.hadChange = 1;
	            //                if(utils.isNull(_this.articleId)){
	            //                        临时保存到缓存
	            this.saveDraft();
	            //                }
	        },
	        //            用户执行删除时触发询问。
	        showConfirm: function showConfirm(index) {
	            var _this = this;
	            var imageNum = 0;
	            //                判断至少要保留一张图;
	            if (_this.paraList[index].mediaType == 'image' && _this.paraList[index].paraImage != '') {
	                //判断是不是图片
	                _this.paraList.forEach(function (item) {
	                    if ((item.mediaType == 'image' || item.mediaType == 'product') && item.paraImage != '') {
	                        imageNum++;
	                    }
	                });
	                if (imageNum <= 1) {
	                    //                        modal.toast({message: '至少要保留一张图片', duration: 0.5});
	                    event.toast('至少要保留一张图片');
	                    return;
	                }
	            }
	            modal.confirm({
	                message: '确定删除该段?',
	                okTitle: '确定',
	                cancelTitle: '取消',
	                duration: 0.3
	            }, function (value) {
	                if (value == '确定') {
	                    //    将内容删掉
	                    _this.paraList.splice(index, 1);
	                    //                    添加修改标志
	                    _this.hadChange = 1;
	                    //                        if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                        }
	                }
	            });
	        },
	        //            删除投票
	        closeVote: function closeVote(index) {
	            var _this = this;
	            modal.confirm({
	                message: '确定删除投票?',
	                okTitle: '删除',
	                cancelTitle: '取消',
	                duration: 0.3
	            }, function (value) {
	                console.log(value);
	                if (value == '删除') {
	                    //                将内容删掉
	                    _this.voteList.splice(index, 1);
	                    //                    添加修改标志
	                    _this.hadChange = 1;
	                    //                        if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                        }
	                }
	            });
	        },
	        //            编辑段落图片或者视频
	        editParaImage: function editParaImage(imgSrc, index, mediaType) {
	            //防止重复点击按钮
	            if (this.clicked) {
	                return;
	            }
	            this.clicked = true;
	            var _this = this;
	            //                if(mediaType == 'product'){
	            //                    event.openURL(utils.locate('view/shop/goods/manage.js?from=editor'),function (data) {
	            //                        if (data.type == 'success') {
	            //                            _this.paraList[index].paraImage = data.data.thumbnail;
	            //                            _this.paraList[index].thumbnailImage = data.data.thumbnail;
	            //                            _this.paraList[index].paraText = data.data.name;
	            ////                    添加修改标志
	            //                            _this.hadChange = 1;
	            ////                        if(utils.isNull(_this.articleId)){
	            ////                        临时保存到缓存
	            //                            _this.saveDraft();
	            ////                        }
	            //                        }
	            //                    })
	            //                    return;
	            //                }
	            //                判断是否没有图片
	            if (_utils2.default.isNull(imgSrc)) {
	                album.openAlbumSingle(false, function (data) {
	                    if (data.type == 'success') {
	                        _this.clicked = false;
	                        _this.paraList[index].paraImage = data.data.originalPath;
	                        _this.paraList[index].thumbnailImage = data.data.thumbnailSmallPath;
	                        //                    添加修改标志
	                        _this.hadChange = 1;
	                        //                        if(utils.isNull(_this.articleId)){
	                        //                        临时保存到缓存
	                        _this.saveDraft();
	                        //                        }
	                    }
	                });
	                return;
	            } else {
	                //                    modal.confirm({
	                //                        message: '请选择裁剪或者更换图片',
	                //                        duration: 0.3,
	                //                        okTitle:'裁剪',
	                //                        cancelTitle:'更换',
	                //                    }, function (value) {
	                //                        event.toast(value);
	                //                        if(value == '更换'){
	                ////                                调用单选图片接口
	                //                            album.openAlbumSingle(false, function(data){
	                //                                _this.paraList[index].paraImage ='file:/' + data.data.originalPath;
	                //                                _this.paraList[index].thumbnailImage ='file:/' + data.data.thumbnailSmallPath;
	                //                            })
	                //                        }else if(value == '裁剪'){
	                if (mediaType == 'image' || mediaType == 'product') {
	                    //                                调用裁剪图片
	                    album.openCrop(imgSrc, function (data) {
	                        _this.clicked = false;
	                        //                            utils.debug(data);
	                        if (data.type == 'success') {
	                            _this.paraList[index].paraImage = data.data.originalPath;
	                            _this.paraList[index].thumbnailImage = data.data.thumbnailSmallPath;
	                            //                    添加修改标志
	                            _this.hadChange = 1;
	                            //                                if(utils.isNull(_this.articleId)){
	                            //                        临时保存到缓存
	                            _this.saveDraft();
	                            //                                }
	                        } else {
	                            if (data.content.indexOf('取消') != -1) {} else {
	                                event.toast(data.content);
	                            }
	                        }
	                    });
	                } else if (mediaType == 'video') {
	                    album.openVideo(function (data) {
	                        _this.clicked = false;
	                        if (data.type == 'success') {
	                            _this.paraList[index].paraImage = data.data.videoPath;
	                            _this.paraList[index].thumbnailImage = data.data.coverImagePath;
	                            //                    添加修改标志
	                            _this.hadChange = 1;
	                            //                                if(utils.isNull(_this.articleId)){
	                            //                        临时保存到缓存
	                            _this.saveDraft();
	                            //                                }
	                        } else {
	                            if (data.content == '用户取消') {} else {
	                                event.toast(data.content);
	                            }
	                        }
	                    });
	                }
	                //                        }else{
	                //                            event.toast(value);
	                //                        }
	                //                    })
	            }
	        },

	        //            下拉刷新
	        onrefresh: function onrefresh(event) {
	            var _this4 = this;

	            console.log('is refreshing');
	            this.refreshing = true;
	            setTimeout(function () {
	                _this4.refreshing = false;
	            }, 10);
	        },

	        //            正在下拉
	        onpullingdown: function onpullingdown(event) {
	            console.log('is onpulling down');
	        },

	        //            跳转封面页面
	        goCover: function goCover() {
	            //防止重复点击按钮
	            //                if(this.clicked) {
	            //                    return;
	            //                }
	            //                this.clicked = true;

	            //                ***** 单选裁剪 *****
	            //                var _this = this;
	            //                album.openAlbumSingle(
	            //                    //选完图片后触发回调函数
	            //                    true,function (data) {
	            //                        utils.debug(data);
	            //                        if(data.type == 'success'){
	            //                            _this.coverImage = data.data.originalPath;
	            //////                    添加修改标志
	            //                            _this.hadChange = 1;
	            ////                        临时保存到缓存
	            //                            _this.saveDraft();
	            //                        }else{
	            //                            if(data.content.indexOf('取消') != -1){
	            //                            }else{
	            //                                event.toast(data.content);
	            //                            }
	            //                        }
	            //                    })
	            //                ***** 单选裁剪 *****


	            var _this = this;
	            var paraLength = _this.paraList.length;
	            var uploadLength = 0;
	            var imgList = [];
	            //                控制最多只传6张图
	            for (var i = 0; i < paraLength; i++) {
	                if (uploadLength < 6) {
	                    //                        区分字体 图像 视频
	                    if (_this.paraList[i].paraImage != '' && (_this.paraList[i].mediaType == 'image' || _this.paraList[i].mediaType == 'product')) {
	                        imgList.push({
	                            path: _this.paraList[i].paraImage
	                        });
	                        uploadLength++;
	                    } else if (_this.paraList[i].paraImage != '' && _this.paraList[i].mediaType == 'video') {
	                        imgList.push({
	                            path: _this.paraList[i].thumbnailImage
	                        });
	                        uploadLength++;
	                    }
	                }
	            }
	            var coverData = {
	                image: imgList,
	                cover: _this.coverImage
	            };
	            coverData = (0, _stringify2.default)(coverData);
	            storage.setItem('coverImage', coverData);
	            event.openURL(_utils2.default.locate('view/member/editor/cover.js?name=coverImage'), function (message) {
	                _this.clicked = false;
	                //                event.openURL('http://192.168.2.157:8081/cover.weex.js?name=coverImage',function (message) {
	                //                    let jsonData = JSON.parse(data);
	                //                    modal.toast({message:message,duration:1});
	                if (message.type == 'success' && message.data != '') {
	                    _this.coverImage = message.data;
	                    //                    添加修改标志
	                    _this.hadChange = 1;
	                    //                        if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                        }
	                }
	            });
	        },
	        //            跳转音乐页面
	        goMusic: function goMusic() {
	            //防止重复点击按钮
	            if (this.clicked) {
	                return;
	            }
	            this.clicked = true;
	            //                event.openURL('file://assets/member/editor/music.js');
	            var _this = this;
	            //                event.toast(musicId);
	            event.openURL(_utils2.default.locate('view/member/editor/music.js?musicId=' + musicId), function (message) {
	                _this.clicked = false;
	                if (message.type == 'success' && message.data != '') {
	                    _this.musicName = message.data.chooseMusicName;
	                    musicId = message.data.chooseMusicId;
	                    //                    添加修改标志
	                    _this.hadChange = 1;
	                    //                        if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                        }
	                }
	            });
	        },
	        //            跳转投票页面
	        goVote: function goVote() {
	            //防止重复点击按钮
	            if (this.clicked) {
	                return;
	            }
	            this.clicked = true;
	            var _this = this;
	            //                event.openURL('http://192.168.2.157:8081/vote.weex.js',function (message) {
	            event.openURL(_utils2.default.locate('view/member/editor/vote.js'), function (message) {
	                _this.clicked = false;
	                if (message.type == 'success' && message.data != '') {
	                    _this.voteList.push(message.data);
	                    //                    添加修改标志
	                    _this.hadChange = 1;
	                    //                        if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                        }
	                }
	            });
	        },
	        //            编辑投票
	        editVote: function editVote(index) {
	            //防止重复点击按钮
	            if (this.clicked) {
	                return;
	            }
	            this.clicked = true;
	            var _this = this;
	            var voteData = (0, _stringify2.default)(_this.voteList[index]);
	            storage.setItem('voteData', voteData);
	            //                event.openURL('http://192.168.2.157:8081/vote.weex.js?name=voteData',function (message) {
	            event.openURL(_utils2.default.locate('view/member/editor/vote.js?name=voteData'), function (message) {
	                _this.clicked = false;
	                if (message.type == 'success' && message.data != '') {
	                    //                        直接=无法重新渲染页面。需要push后才可以
	                    //                        _this.voteList[index] = message.data;
	                    _this.voteList.splice(index, 1);
	                    _this.voteList.splice(index, 0, message.data);
	                    //                    添加修改标志
	                    _this.hadChange = 1;
	                    //                        if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                        }
	                }
	            });
	        },
	        //            点击"+"加号里的添加视频
	        addVideoPara: function addVideoPara(index) {
	            //防止重复点击按钮
	            //                if(this.clicked) {
	            //                    return;
	            //                }
	            //                this.clicked = true;
	            var _this = this;
	            album.openVideo(function (data) {
	                //                    _this.clicked = false;
	                if (data.type == 'success') {
	                    //                    data.data里存放的是用户选取的图片路径
	                    var newPara = {
	                        //原图
	                        //                                    paraImage: data.data[i].originalPath,
	                        paraImage: data.data.videoPath,
	                        //                                    小缩略图
	                        //                                    thumbnailImage: data.data[i].thumbnailSmallPath,
	                        thumbnailImage: data.data.coverImagePath,
	                        mediaType: "video",
	                        paraText: '',
	                        show: true,
	                        //                             对象ID
	                        id: 0,
	                        //                            第三方链接
	                        url: ''
	                        //                          serveThumbnail:''
	                    };
	                    _this.paraList.splice(index, 0, newPara);
	                    _this.clearIconBox();

	                    //                    添加修改标志
	                    _this.hadChange = 1;
	                    //                        if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                        }
	                }
	            });
	        },
	        //            点击"+"加号里的添加链接
	        addLinkPara: function addLinkPara(index) {
	            //防止重复点击按钮
	            //                if(this.clicked) {
	            //                    return;
	            //                }
	            //                this.clicked = true;
	            var _this = this;
	            event.openURL(_utils2.default.locate('view/shop/goods/manage.js?from=editor'), function (data) {
	                //                    _this.clicked = false;
	                if (data.type == 'success') {
	                    var newPara = {
	                        //原图
	                        //                                    paraImage: data.data[i].originalPath,
	                        paraImage: data.data.thumbnail,
	                        //                                    小缩略图
	                        //                                    thumbnailImage: data.data[i].thumbnailSmallPath,
	                        thumbnailImage: data.data.thumbnail,
	                        mediaType: "product",
	                        paraText: '',
	                        show: true,
	                        //                             对象ID
	                        id: data.data.id,
	                        //                            第三方链接
	                        url: ''
	                        //                          serveThumbnail:''
	                    };
	                    _this.paraList.splice(index, 0, newPara);
	                    _this.clearIconBox();
	                    //                    添加修改标志
	                    _this.hadChange = 1;
	                    //                        if(utils.isNull(_this.articleId)){
	                    //                        临时保存到缓存
	                    _this.saveDraft();
	                    //                        }
	                }
	            });
	        },
	        maskClick: function maskClick() {
	            return;
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),
/* 270 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["wrapper"]
	  }, [_c('navbar', {
	    attrs: {
	      "title": _vm.title,
	      "complete": _vm.complete
	    },
	    on: {
	      "goback": _vm.goBack,
	      "goComplete": _vm.goComplete
	    }
	  }), _c('list', {
	    staticClass: ["wrapperBox"]
	  }, [_c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('div', [_c('image', {
	    staticClass: ["coverImage"],
	    attrs: {
	      "resize": "cover",
	      "src": _vm.coverImage
	    }
	  }), _c('div', {
	    staticClass: ["coverMaskImage"]
	  }), _c('text', {
	    staticClass: ["setTitle"],
	    on: {
	      "trigger": function($event) {
	        _vm.articleTitle(_vm.setTitle)
	      },
	      "click": function($event) {
	        _vm.articleTitle(_vm.setTitle)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.setTitle))]), _c('div', {
	    staticClass: ["bottomBtn", "addMusic"]
	  }, [(this.musicName == '') ? _c('text', {
	    staticClass: ["musicSize"],
	    on: {
	      "click": function($event) {
	        _vm.goMusic()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.addMusic))]) : _c('text', {
	    staticClass: ["musicSize"],
	    style: {
	      fontFamily: 'iconfont'
	    },
	    on: {
	      "click": function($event) {
	        _vm.goMusic()
	      }
	    }
	  }, [_vm._v(" " + _vm._s(_vm.musicName))])]), _c('text', {
	    staticClass: ["bottomBtn", "editCover", "musicSize"],
	    on: {
	      "click": function($event) {
	        _vm.goCover()
	      }
	    }
	  }, [_vm._v("编辑封面")])])]), _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('div', {
	    staticClass: ["addBox"],
	    on: {
	      "click": function($event) {
	        _vm.clearIconBox()
	      }
	    }
	  }, [(_vm.firstPlusShow) ? _c('div', [_c('div', {
	    staticClass: ["plusSignBox"],
	    on: {
	      "click": function($event) {
	        _vm.firstShow()
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["plusSign"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])]) : _c('div', {
	    staticClass: ["iconBox"]
	  }, [_c('div', {
	    staticClass: ["addIconBox"],
	    on: {
	      "click": function($event) {
	        _vm.addTextPara(0)
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["addText", "iconSize"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["addIconBox"],
	    on: {
	      "click": function($event) {
	        _vm.addImgPara(0)
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["addImage", "iconSize"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["addIconBox"],
	    on: {
	      "click": function($event) {
	        _vm.addVideoPara(0)
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["addVideo", "iconSize"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["addIconBox", "addLinkPt"],
	    on: {
	      "click": function($event) {
	        _vm.addLinkPara(0)
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["iconSize", "addLink"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])])])]), _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('transition-group', {
	    attrs: {
	      "name": "paraTransition",
	      "tag": "div"
	    }
	  }, _vm._l((_vm.paraList), function(item, index) {
	    return _c('div', {
	      key: item
	    }, [_c('div', {
	      staticClass: ["paraBox", "paraBoxHeight"]
	    }, [_c('div', {
	      staticClass: ["paraClose"],
	      on: {
	        "click": function($event) {
	          _vm.showConfirm(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["paraCloseSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), (index != 0) ? _c('div', {
	      staticClass: ["rightArrow", "upArrow"],
	      on: {
	        "click": function($event) {
	          _vm.moveUp(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["arrowSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]) : _vm._e(), (_vm.lastPara(index)) ? _c('div', {
	      staticClass: ["rightArrow", "downArrow"],
	      on: {
	        "click": function($event) {
	          _vm.moveBottom(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["arrowSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]) : _vm._e(), _c('div', {
	      on: {
	        "click": function($event) {
	          _vm.editParaImage(item.paraImage, index, item.mediaType)
	        }
	      }
	    }, [_c('image', {
	      staticClass: ["paraImage"],
	      attrs: {
	        "resize": "cover",
	        "src": _vm._f("watchThumbImg")(item.thumbnailImage)
	      }
	    }), (item.mediaType == 'video') ? _c('div', {
	      staticClass: ["videoIconBox"]
	    }, [_c('text', {
	      staticClass: ["videoIcon"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]) : _vm._e(), (item.mediaType == 'product') ? _c('div', {
	      staticClass: ["videoIconBox"]
	    }, [_c('text', {
	      staticClass: ["videoIcon", "goodsIcon"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]) : _vm._e()]), _c('div', {
	      staticClass: ["paraText"],
	      on: {
	        "click": function($event) {
	          _vm.editorText(index)
	        }
	      }
	    }, [(item.paraText != '' && item.paraText != null && item.paraText != undefined && item.paraText != 'undefined') ? _c('text', {
	      staticClass: ["paraTextSize"]
	    }, [_vm._v(_vm._s(_vm._f("htmlDeal")(item.paraText)))]) : _c('text', {
	      staticClass: ["paraTextSize", "greyColor"]
	    }, [_vm._v("点击添加文字")])])]), _c('div', {
	      staticClass: ["addBox"],
	      on: {
	        "click": function($event) {
	          _vm.clearIconBox()
	        }
	      }
	    }, [(item.show) ? _c('div', [_c('div', {
	      staticClass: ["plusSignBox"],
	      on: {
	        "click": function($event) {
	          _vm.showIconBox(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["plusSign"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])])]) : _c('div', {
	      staticClass: ["iconBox"]
	    }, [_c('div', {
	      staticClass: ["addIconBox"],
	      on: {
	        "click": function($event) {
	          _vm.addTextPara(index + 1)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["addText", "iconSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), _c('div', {
	      staticClass: ["addIconBox"],
	      on: {
	        "click": function($event) {
	          _vm.addImgPara(index + 1)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["addImage", "iconSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), _c('div', {
	      staticClass: ["addIconBox"],
	      on: {
	        "click": function($event) {
	          _vm.addVideoPara(index + 1)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["addVideo", "iconSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), _c('div', {
	      staticClass: ["addIconBox", "addLinkPt"],
	      on: {
	        "click": function($event) {
	          _vm.addLinkPara(index + 1)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["iconSize", "addLink"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])])])])])
	  }))], 1), _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_vm._l((_vm.voteList), function(item, index) {
	    return _c('div', {
	      staticClass: ["voteMargin"],
	      on: {
	        "click": function($event) {
	          _vm.editVote(index)
	        }
	      }
	    }, [_c('div', {
	      staticClass: ["paraBox", "paraBoxHeight"]
	    }, [_c('div', {
	      staticClass: ["paraClose"],
	      on: {
	        "click": function($event) {
	          _vm.closeVote(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["paraCloseSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), _c('div', [_c('image', {
	      staticClass: ["paraImage"],
	      attrs: {
	        "src": _vm.voteImg
	      }
	    })]), _c('div', {
	      staticClass: ["paraText"]
	    }, [_c('text', {
	      staticClass: ["paraTextSize"]
	    }, [_vm._v(_vm._s(item.textAreaTitle))])])])])
	  }), _c('div', {
	    staticClass: ["paraBox", "flexRow"],
	    on: {
	      "click": function($event) {
	        _vm.addLinkPara(_vm.paraList.length)
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["addVote", "addVoteIcon"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["addVote"]
	  }, [_vm._v("添加商品")])])], 2), _vm._m(0)]), (_vm.toSendArticle) ? _c('div', {
	    staticClass: ["sendMask"],
	    on: {
	      "click": function($event) {
	        _vm.maskClick()
	      }
	    }
	  }, [_c('div', {
	    staticClass: ["processBox"]
	  }, [_c('text', {
	    staticClass: ["processText"]
	  }, [_vm._v("正在云同步,请稍候...")]), _c('div', {
	    staticClass: ["processStyle", "processBg"]
	  }), _c('div', {
	    staticClass: ["processStyle", "bkg-primary"],
	    style: {
	      width: _vm.processWidth + 'px'
	    }
	  }), _c('text', {
	    staticClass: ["processTotal"]
	  }, [_vm._v(_vm._s(_vm.currentPro) + "/" + _vm._s(_vm.proTotal))])])]) : _vm._e()], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('div', {
	    staticClass: ["emptyBox"]
	  })])
	}]}
	module.exports.render._withStripped = true

/***/ })
/******/ ]);