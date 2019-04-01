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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(774)
	)
	__vue_styles__.push(__webpack_require__(775)
	)

	/* script */
	__vue_exports__ = __webpack_require__(776)

	/* template */
	var __vue_template__ = __webpack_require__(778)
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
	__vue_options__.__file = "/Users/leistercheung/Documents/weex/mp/src/widget/city.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-6ffa30ea"
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

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(48);
	__webpack_require__(52);
	__webpack_require__(69);
	__webpack_require__(70);
	module.exports = __webpack_require__(12).Promise;


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	

/***/ }),

/***/ 4:
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

/***/ 5:
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

/***/ 6:
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),

/***/ 8:
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

/***/ 9:
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),

/***/ 10:
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

/***/ 11:
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 13:
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

/***/ 14:
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),

/***/ 15:
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

/***/ 16:
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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(20) && !__webpack_require__(21)(function () {
	  return Object.defineProperty(__webpack_require__(22)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(21)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),

/***/ 21:
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	var document = __webpack_require__(11).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),

/***/ 23:
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

/***/ 24:
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

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);


/***/ }),

/***/ 26:
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),

/***/ 27:
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),

/***/ 28:
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

/***/ 29:
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

/***/ 30:
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

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(32);
	var enumBugKeys = __webpack_require__(42);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),

/***/ 32:
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

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(34);
	var defined = __webpack_require__(7);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(35);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),

/***/ 35:
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),

/***/ 36:
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

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(6);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(40)('keys');
	var uid = __webpack_require__(41);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ }),

/***/ 41:
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),

/***/ 42:
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(11).document;
	module.exports = document && document.documentElement;


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(16).f;
	var has = __webpack_require__(26);
	var TAG = __webpack_require__(45)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),

/***/ 45:
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

/***/ 46:
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

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),

/***/ 48:
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

/***/ 49:
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

/***/ 50:
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),

/***/ 51:
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),

/***/ 52:
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

/***/ 53:
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

/***/ 54:
/***/ (function(module, exports) {

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};


/***/ }),

/***/ 55:
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

/***/ 56:
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

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(27);
	var ITERATOR = __webpack_require__(45)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ }),

/***/ 58:
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

/***/ 59:
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

/***/ 60:
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

/***/ 61:
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

/***/ 62:
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

/***/ 63:
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

/***/ 64:
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};


/***/ }),

/***/ 65:
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

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(15);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};


/***/ }),

/***/ 67:
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

/***/ 68:
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

/***/ 69:
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

/***/ 70:
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

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(72);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by zwwill on 2017/8/27.
	 */
	var modal = weex.requireModule('modal');
	var resLocateURL = 'file://';
	var resRemoteURL = 'http://cdn.rzico.com/weex/';
	var websiteURL = 'https://small.rzico.com';
	var event = weex.requireModule('event');
	var _debug = false; //删掉该属性时请查找该页所有debug变量并删除变量
	var appName = 'yundian'; // app类型  water 或 yundian
	var utilsFunc = {
	    //0 标准版 1生鲜版 2桶装水
	    version: 2,
	    xmid: 43,
	    // app类型
	    appType: function appType() {
	        return appName;
	    },
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
	        if (value == null || value == 'null' || value == undefined || value == '' || value == 'undefined') {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    //把缩略图过滤为原图
	    filterThumbnail: function filterThumbnail(url) {

	        if (this.isNull(url)) {
	            return url;
	        }
	        if (url.indexOf('?x-oss-') != -1) {
	            url = url.substring(0, url.indexOf('?x-oss-'));
	        } else if (url.indexOf('@') != -1) {
	            url = url.substring(0, url.indexOf('@'));
	        }
	        return url;
	    },

	    //获取缩略图
	    thumbnail: function thumbnail(url, w, h) {
	        if (this.isNull(url)) {
	            return url;
	        }
	        //获取屏幕宽度计算得出比例
	        var proportion = weex.config.env.deviceWidth / 750;
	        //                获取缩略图的宽高
	        w = parseInt(w * proportion);
	        h = parseInt(h * proportion);
	        if (url.substring(0, 11) == "http://cdnx") {
	            return url + "?x-oss-process=image/resize,m_fill,w_" + w + ",h_" + h + "";
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

	    //模糊图片，r, s  为 1-50，超大超模糊
	    blur: function blur(url, r, s) {
	        if (this.isNull(url)) {
	            return url;
	        }
	        if (url.substring(0, 10) == "http://cdn") {
	            return url + "@" + r + "-" + s + "bl";
	        } else {
	            return url;
	        }
	    },

	    //获取文章URL地址
	    articleUrl: function articleUrl(template, id) {
	        template = template == '' ? 't1001' : template;
	        var d = new Date();
	        return websiteURL + "/#/" + template + "?id=" + id + '&noticstr=' + d.getTime();
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

	    //    将过长的字符串换成 XXX...格式 默认取前7个字符
	    changeStrLast: function changeStrLast(value, length, maxLength) {
	        length = this.isNull(length) ? 7 : length;
	        maxLength = this.isNull(maxLength) ? 16 : maxLength;
	        //              如果用户名称过长，便截取拼成名字
	        if (this.getLength(value) > maxLength) {
	            value = value.substr(0, length) + '...';
	        }
	        return value;
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


	    //    登录主页的轮播图slider控制
	    indexMtSlider: function indexMtSlider() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'IPhoneX') {
	                return 'indexSliderMtIPhoneX';
	            } else if (this.isIosSystem()) {
	                return 'indexSliderMtIPhone';
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

	    //   新会员首页 专栏 顶部信息栏
	    topicInfo: function topicInfo() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'memberBox';
	            } else if (s == 'IPhoneX') {
	                return 'memberBoxIPHONEX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //   新会员首页 专栏 顶部粉丝栏
	    topicFans: function topicFans() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'fansBox';
	            } else if (s == 'IPhoneX') {
	                return 'fansBoxIPHONEX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //   新会员首页 专栏 顶部操作栏
	    topicOperation: function topicOperation() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'operationBox';
	            } else if (s == 'IPhoneX') {
	                return 'operationBoxIPHONEX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //判断设备型号
	    getHeaderHeight: function getHeaderHeight() {
	        var s = weex.config.env.deviceModel;
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s.indexOf("10,3") > 0 || s.indexOf("10,6") > 0) {
	                return 156;
	            } else {
	                return 136;
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
	                return 'headerBox';
	            } else if (s == 'IPhoneX') {
	                return 'headerBoxIPHONEX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    判断设备型号为fix定位的元素添加高度 (会员首页 作者专栏 顶部设置跟返回按钮)
	    topicBgImg: function topicBgImg() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'topicBgImg';
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
	    //    控制preview文章box的top
	    artOutTop: function artOutTop() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'artOutBoxTopV1';
	            } else if (s == 'IPhoneX') {
	                return 'artOutBoxTopIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    控制预览文章页底部栏的bottom高度
	    previewBottom: function previewBottom() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return '';
	        } else {
	            if (s == 'IPhoneX') {
	                return s;
	            } else {
	                return '';
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
	        if (this.isNull(value)) {
	            return value;
	        }
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
	    resolvetime: function resolvetime(value) {
	        if (this.isNull(value)) {
	            return value;
	        }
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
	    resolveTimeObj: function resolveTimeObj(obj) {
	        return new Date(obj.y, obj.m - 1, obj.d).getTime();
	    },
	    // 点击一次增加一月
	    incMonth: function incMonth(date) {
	        var obj = this.resolvetime(date);
	        // 必须转为整型，否则快速点击会出现问题
	        obj.m = parseInt(obj.m);
	        obj.y = parseInt(obj.y);
	        if (obj.m >= 12) {
	            obj.y = obj.y + 1;
	            obj.m = 1;
	        } else {
	            obj.m = obj.m + 1;
	        }

	        return this.resolveTimeObj(obj);
	    },
	    // 点击一次减一月
	    decMonth: function decMonth(date) {
	        var obj = this.resolvetime(date);
	        // 必须转为整型，否则快速点击会出现问题
	        obj.m = parseInt(obj.m);
	        obj.y = parseInt(obj.y);
	        if (obj.m <= 1) {
	            obj.y = obj.y - 1;
	            obj.m = 12;
	        } else {
	            obj.m = obj.m - 1;
	        }
	        return this.resolveTimeObj(obj);
	    },
	    trunceDate: function trunceDate(date) {
	        var obj = this.resolvetime(date);

	        obj.d = 1;
	        obj.h = 0;
	        obj.i = 0;
	        obj.s = 0;
	        return this.resolveTimeObj(obj);
	    },
	    trunceMonth: function trunceMonth(date) {
	        var obj = this.resolvetime(date);
	        obj.m = 1;
	        obj.d = 1;
	        obj.h = 0;
	        obj.i = 0;
	        obj.s = 0;
	        return this.resolveTimeObj(obj);
	    },
	    // 减一天
	    decDate: function decDate(date) {

	        return (date / 1000 - 86400) * 1000;
	    },
	    // 增一天
	    incDate: function incDate(date) {

	        return (date / 1000 + 86400) * 1000;
	    },
	    // 点击一次减一年
	    decYears: function decYears(date) {
	        var obj = this.resolvetime(date);

	        // 必须要先转为整型，否者快速操作时会出错
	        obj.y = obj.y - 1;

	        return this.resolveTimeObj(obj);
	    },
	    // 点击一次增加一年
	    incYears: function incYears(date) {
	        var obj = this.resolvetime(date);
	        // 必须要先转为整型，否者快速操作时会出错
	        obj.y = obj.y + 1;

	        return this.resolveTimeObj(obj);
	    },
	    //返回格式 2017-09-01
	    ymdtimefmt: function ymdtimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        var d = (0, _stringify2.default)(timeObj);
	        return timeObj.y + '-' + timeObj.m + '-' + timeObj.d;
	    },
	    //返回格式 2017-09
	    ymtimefmt: function ymtimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        return timeObj.y + '-' + timeObj.m;
	    },
	    //返回格式 2017
	    ytimefmt: function ytimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        return timeObj.y;
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
	    },
	    //过滤表情
	    filteremoji: function filteremoji(text, type) {
	        var ranges = ['\uD83C[\uDF00-\uDFFF]', '\uD83D[\uDC00-\uDE4F]', '\uD83D[\uDE80-\uDEFF]'];
	        text = text.replace(new RegExp(ranges.join('|'), 'g'), '');
	        if (this.isNull(text) && type == 'article') {
	            return '点击设置标题';
	        }
	        return text;
	    },

	    //金额保留两位小数点
	    currencyfmt: function currencyfmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        // 返回处理后的值
	        if (value != null) {
	            if (value == 0) {
	                return value.toFixed(2);
	            } else {
	                var price = (Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
	                return price;
	            }
	        }
	    }
	};

	exports.default = utilsFunc;
	module.exports = exports['default'];

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(12);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/he v1.1.1 by @mathias | MIT license */
	;(function(root) {

		// Detect free variables `exports`.
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`.
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`.
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		// All astral symbols.
		var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
		// All ASCII symbols (not just printable ASCII) except those listed in the
		// first column of the overrides table.
		// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
		var regexAsciiWhitelist = /[\x01-\x7F]/g;
		// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
		// code points listed in the first column of the overrides table on
		// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
		var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

		var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
		var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

		var regexEscape = /["&'<>`]/g;
		var escapeMap = {
			'"': '&quot;',
			'&': '&amp;',
			'\'': '&#x27;',
			'<': '&lt;',
			// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
			// following is not strictly necessary unless it’s part of a tag or an
			// unquoted attribute value. We’re only escaping it to support those
			// situations, and for XML support.
			'>': '&gt;',
			// In Internet Explorer ≤ 8, the backtick character can be used
			// to break out of (un)quoted attribute values or HTML comments.
			// See http://html5sec.org/#102, http://html5sec.org/#108, and
			// http://html5sec.org/#133.
			'`': '&#x60;'
		};

		var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
		var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
		var regexDecode = /&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)([=a-zA-Z0-9])?/g;
		var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
		var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
		var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
		var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		var object = {};
		var hasOwnProperty = object.hasOwnProperty;
		var has = function(object, propertyName) {
			return hasOwnProperty.call(object, propertyName);
		};

		var contains = function(array, value) {
			var index = -1;
			var length = array.length;
			while (++index < length) {
				if (array[index] == value) {
					return true;
				}
			}
			return false;
		};

		var merge = function(options, defaults) {
			if (!options) {
				return defaults;
			}
			var result = {};
			var key;
			for (key in defaults) {
				// A `hasOwnProperty` check is not needed here, since only recognized
				// option names are used anyway. Any others are ignored.
				result[key] = has(options, key) ? options[key] : defaults[key];
			}
			return result;
		};

		// Modified version of `ucs2encode`; see https://mths.be/punycode.
		var codePointToSymbol = function(codePoint, strict) {
			var output = '';
			if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
				// See issue #4:
				// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
				// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
				// REPLACEMENT CHARACTER.”
				if (strict) {
					parseError('character reference outside the permissible Unicode range');
				}
				return '\uFFFD';
			}
			if (has(decodeMapNumeric, codePoint)) {
				if (strict) {
					parseError('disallowed character reference');
				}
				return decodeMapNumeric[codePoint];
			}
			if (strict && contains(invalidReferenceCodePoints, codePoint)) {
				parseError('disallowed character reference');
			}
			if (codePoint > 0xFFFF) {
				codePoint -= 0x10000;
				output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
				codePoint = 0xDC00 | codePoint & 0x3FF;
			}
			output += stringFromCharCode(codePoint);
			return output;
		};

		var hexEscape = function(codePoint) {
			return '&#x' + codePoint.toString(16).toUpperCase() + ';';
		};

		var decEscape = function(codePoint) {
			return '&#' + codePoint + ';';
		};

		var parseError = function(message) {
			throw Error('Parse error: ' + message);
		};

		/*--------------------------------------------------------------------------*/

		var encode = function(string, options) {
			options = merge(options, encode.options);
			var strict = options.strict;
			if (strict && regexInvalidRawCodePoint.test(string)) {
				parseError('forbidden code point');
			}
			var encodeEverything = options.encodeEverything;
			var useNamedReferences = options.useNamedReferences;
			var allowUnsafeSymbols = options.allowUnsafeSymbols;
			var escapeCodePoint = options.decimal ? decEscape : hexEscape;

			var escapeBmpSymbol = function(symbol) {
				return escapeCodePoint(symbol.charCodeAt(0));
			};

			if (encodeEverything) {
				// Encode ASCII symbols.
				string = string.replace(regexAsciiWhitelist, function(symbol) {
					// Use named references if requested & possible.
					if (useNamedReferences && has(encodeMap, symbol)) {
						return '&' + encodeMap[symbol] + ';';
					}
					return escapeBmpSymbol(symbol);
				});
				// Shorten a few escapes that represent two symbols, of which at least one
				// is within the ASCII range.
				if (useNamedReferences) {
					string = string
						.replace(/&gt;\u20D2/g, '&nvgt;')
						.replace(/&lt;\u20D2/g, '&nvlt;')
						.replace(/&#x66;&#x6A;/g, '&fjlig;');
				}
				// Encode non-ASCII symbols.
				if (useNamedReferences) {
					// Encode non-ASCII symbols that can be replaced with a named reference.
					string = string.replace(regexEncodeNonAscii, function(string) {
						// Note: there is no need to check `has(encodeMap, string)` here.
						return '&' + encodeMap[string] + ';';
					});
				}
				// Note: any remaining non-ASCII symbols are handled outside of the `if`.
			} else if (useNamedReferences) {
				// Apply named character references.
				// Encode `<>"'&` using named character references.
				if (!allowUnsafeSymbols) {
					string = string.replace(regexEscape, function(string) {
						return '&' + encodeMap[string] + ';'; // no need to check `has()` here
					});
				}
				// Shorten escapes that represent two symbols, of which at least one is
				// `<>"'&`.
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;');
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			} else if (!allowUnsafeSymbols) {
				// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
				// using named character references.
				string = string.replace(regexEscape, escapeBmpSymbol);
			}
			return string
				// Encode astral symbols.
				.replace(regexAstralSymbols, function($0) {
					// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
					var high = $0.charCodeAt(0);
					var low = $0.charCodeAt(1);
					var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
					return escapeCodePoint(codePoint);
				})
				// Encode any remaining BMP symbols that are not printable ASCII symbols
				// using a hexadecimal escape.
				.replace(regexBmpWhitelist, escapeBmpSymbol);
		};
		// Expose default options (so they can be overridden globally).
		encode.options = {
			'allowUnsafeSymbols': false,
			'encodeEverything': false,
			'strict': false,
			'useNamedReferences': false,
			'decimal' : false
		};

		var decode = function(html, options) {
			options = merge(options, decode.options);
			var strict = options.strict;
			if (strict && regexInvalidEntity.test(html)) {
				parseError('malformed character reference');
			}
			return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7) {
				var codePoint;
				var semicolon;
				var decDigits;
				var hexDigits;
				var reference;
				var next;
				if ($1) {
					// Decode decimal escapes, e.g. `&#119558;`.
					decDigits = $1;
					semicolon = $2;
					if (strict && !semicolon) {
						parseError('character reference was not terminated by a semicolon');
					}
					codePoint = parseInt(decDigits, 10);
					return codePointToSymbol(codePoint, strict);
				}
				if ($3) {
					// Decode hexadecimal escapes, e.g. `&#x1D306;`.
					hexDigits = $3;
					semicolon = $4;
					if (strict && !semicolon) {
						parseError('character reference was not terminated by a semicolon');
					}
					codePoint = parseInt(hexDigits, 16);
					return codePointToSymbol(codePoint, strict);
				}
				if ($5) {
					// Decode named character references with trailing `;`, e.g. `&copy;`.
					reference = $5;
					if (has(decodeMap, reference)) {
						return decodeMap[reference];
					} else {
						// Ambiguous ampersand. https://mths.be/notes/ambiguous-ampersands
						if (strict) {
							parseError(
								'named character reference was not terminated by a semicolon'
							);
						}
						return $0;
					}
				}
				// If we’re still here, it’s a legacy reference for sure. No need for an
				// extra `if` check.
				// Decode named character references without trailing `;`, e.g. `&amp`
				// This is only a parse error if it gets converted to `&`, or if it is
				// followed by `=` in an attribute context.
				reference = $6;
				next = $7;
				if (next && options.isAttributeValue) {
					if (strict && next == '=') {
						parseError('`&` did not start a character reference');
					}
					return $0;
				} else {
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					// Note: there is no need to check `has(decodeMapLegacy, reference)`.
					return decodeMapLegacy[reference] + (next || '');
				}
			});
		};
		// Expose default options (so they can be overridden globally).
		decode.options = {
			'isAttributeValue': false,
			'strict': false
		};

		var escape = function(string) {
			return string.replace(regexEscape, function($0) {
				// Note: there is no need to check `has(escapeMap, $0)` here.
				return escapeMap[$0];
			});
		};

		/*--------------------------------------------------------------------------*/

		var he = {
			'version': '1.1.1',
			'encode': encode,
			'decode': decode,
			'escape': escape,
			'unescape': decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return he;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = he;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (var key in he) {
					has(he, key) && (freeExports[key] = he[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.he = he;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(90)(module), (function() { return this; }())))

/***/ }),

/***/ 90:
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),

/***/ 96:
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
	  "fz22": {
	    "fontSize": 22
	  },
	  "fz24": {
	    "fontSize": 24
	  },
	  "fz26": {
	    "fontSize": 26
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
	  "pl5": {
	    "paddingLeft": 5
	  },
	  "pt0": {
	    "paddingTop": 0
	  },
	  "pt10": {
	    "paddingTop": 10
	  },
	  "pt15": {
	    "paddingTop": 15
	  },
	  "pb0": {
	    "paddingBottom": 0
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
	  "pr5": {
	    "paddingRight": 5
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
	  "mt15": {
	    "marginTop": 15
	  },
	  "mt20": {
	    "marginTop": 20
	  },
	  "mt30": {
	    "marginTop": 30
	  },
	  "mt40": {
	    "marginTop": 40
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
	  "bt45": {
	    "marginBottom": 45
	  },
	  "bt50": {
	    "marginBottom": 50
	  },
	  "mr5": {
	    "marginRight": 5
	  },
	  "mr10": {
	    "marginRight": 10
	  },
	  "mr15": {
	    "marginRight": 15
	  },
	  "mr20": {
	    "marginRight": 20
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
	    "backgroundColor": "#068F3D"
	  },
	  "baseNavBg": {
	    "backgroundColor": "#068F3D"
	  },
	  "baseNavColor": {
	    "color": "#068F3D"
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
	    "color": "#068F3D",
	    "borderColor": "#068F3D",
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
	    "backgroundColor": "#068F3D"
	  },
	  "bkg-gray": {
	    "backgroundColor": "#eeeeee"
	  },
	  "bd-primary": {
	    "borderColor": "#068F3D"
	  },
	  "bkg-delete": {
	    "backgroundColor": "#FF0000"
	  },
	  "white": {
	    "color": "#FFFFFF"
	  },
	  "primary": {
	    "color": "#068F3D"
	  },
	  "gray": {
	    "color": "#999999"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#068F3D",
	    "marginTop": 2
	  },
	  "ico_big": {
	    "fontSize": 72,
	    "color": "#068F3D",
	    "marginTop": 4
	  },
	  "ico_small": {
	    "fontSize": 32,
	    "color": "#068F3D",
	    "marginTop": 1
	  },
	  "arrow": {
	    "fontSize": 32,
	    "color": "#cccccc",
	    "width": 40
	  },
	  "check": {
	    "fontSize": 32,
	    "color": "#068F3D",
	    "width": 40
	  },
	  "shopCheck": {
	    "fontSize": 32,
	    "color": "#068F3D",
	    "width": 40,
	    "marginLeft": 150
	  },
	  "button": {
	    "fontSize": 32,
	    "textAlign": "center",
	    "color": "#ffffff",
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "backgroundColor": "#068F3D",
	    "borderRadius": 15,
	    "height": 80,
	    "lineHeight": 50,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "backgroundColor:active": "#cccccc",
	    "color:active": "#068F3D",
	    "backgroundColor:disabled": "#068F3D",
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
	    "color": "#068F3D",
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
	    "opacity": 0.4
	  },
	  "showBox": {
	    "position": "fixed",
	    "top": 150,
	    "right": 15,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "showBg": {
	    "position": "absolute",
	    "top": 0,
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "backgroundColor": "#ffffff",
	    "borderRadius": 20
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
	  },
	  "indexSliderMtIPhone": {
	    "marginTop": 44
	  },
	  "indexSliderMtIPhoneX": {
	    "marginTop": 124
	  },
	  "artOutBoxTopIPhoneX": {
	    "top": 156
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
	  "coverAbsoTop": {
	    "position": "absolute",
	    "top": 0,
	    "backgroundColor": "rgba(136,136,136,0.1)"
	  }
	}

/***/ }),

/***/ 97:
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

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(71);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var he = __webpack_require__(89); //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	    props: {
	        title: { default: "navbar" },
	        complete: { default: '' },
	        completeIcon: { default: '' },
	        showComplete: { default: true },
	        border: { default: true }
	    },
	    computed: {
	        getIco: function getIco() {
	            return he.decode(this.completeIcon);
	        }
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
	};
	module.exports = exports['default'];

/***/ }),

/***/ 99:
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
	  }, [_vm._v(_vm._s(_vm.title))]), _c('div', {
	    staticClass: ["navRightBox"],
	    on: {
	      "click": function($event) {
	        _vm.goComplete('/')
	      }
	    }
	  }, [(_vm.completeIcon == '') ? _c('text', {
	    staticClass: ["nav_Complete", "nav_title"]
	  }, [_vm._v(_vm._s(_vm.complete))]) : _c('text', {
	    staticClass: ["nav_CompleteIcon"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v(_vm._s(_vm.getIco))])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _promise = __webpack_require__(1);

	var _promise2 = _interopRequireDefault(_promise);

	exports.baseUrl = baseUrl;
	exports.getBaseUrl = getBaseUrl;
	exports.URIEncrypt = URIEncrypt;
	exports.POST = POST;
	exports.GET = GET;
	exports.SCAN = SCAN;

	var _utils = __webpack_require__(71);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var stream = weex.requireModule('stream');
	var modal = weex.requireModule('modal');

	var event = weex.requireModule('event');
	var baseURL = '';

	function baseUrl(val) {
	    if (val == "") {
	        var findDel = {
	            type: "systemInfo",
	            key: "systemInfo"
	        };
	        event.find(findDel, function (data) {
	            if (data.type == 'success' && !_utils2.default.isNull(data.data)) {
	                var systemInfo = JSON.parse(data.data.value);
	                baseUrl(systemInfo.server);
	            }
	        });
	    } else {
	        baseURL = "weex://" + val + "/";
	    }
	}

	function getBaseUrl() {
	    var s = baseURL.replace("weex", "http");
	    return s;
	}

	function URIEncrypt(params) {

	    var s = "";

	    var array = [];
	    for (var key in params) {
	        array.push(key);
	    }

	    //排序
	    // for(var unfix=array.length-1; unfix>0; unfix--){
	    //     /*给进度做个记录，比到未确定位置*/
	    //     for(var i=0; i<unfix;i++){
	    //         if(array[i]>array[i+1]){
	    //             var temp = array[i];
	    //             array.splice(i,1,array[i+1]);
	    //             array.splice(i+1,1,temp);
	    //         }
	    //     }
	    // }

	    for (var i = 0; i < array.length; i++) {
	        var _key = array[i];
	        var ve = params[_key];
	        if (!_utils2.default.isNull(ve)) {
	            var v = encodeURIComponent(ve);
	            if (s != "") {
	                s = s + "&";
	            }
	            s = s + _key + '=' + v;
	        }
	    }

	    //清加时间


	    return s;
	}

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
	                // reject({
	                //     type:"error",
	                //     content:response.statusText
	                // })
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

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(96)
	)
	__vue_styles__.push(__webpack_require__(97)
	)

	/* script */
	__vue_exports__ = __webpack_require__(98)

	/* template */
	var __vue_template__ = __webpack_require__(99)
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
	__vue_options__.__file = "/Users/leistercheung/Documents/weex/mp/src/include/navbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-09bbd89c"
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

/***/ 154:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var dom = weex.requireModule('dom');
	var event = weex.requireModule('event');
	var stream = weex.requireModule('stream');
	var storage = weex.requireModule('storage');
	var animation = weex.requireModule('animation');
	exports.default = { dom: dom, event: event, stream: stream, storage: storage, animation: animation };
	module.exports = exports['default'];

/***/ }),

/***/ 774:
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
	  "fz22": {
	    "fontSize": 22
	  },
	  "fz24": {
	    "fontSize": 24
	  },
	  "fz26": {
	    "fontSize": 26
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
	  "pl5": {
	    "paddingLeft": 5
	  },
	  "pt0": {
	    "paddingTop": 0
	  },
	  "pt10": {
	    "paddingTop": 10
	  },
	  "pt15": {
	    "paddingTop": 15
	  },
	  "pb0": {
	    "paddingBottom": 0
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
	  "pr5": {
	    "paddingRight": 5
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
	  "mt15": {
	    "marginTop": 15
	  },
	  "mt20": {
	    "marginTop": 20
	  },
	  "mt30": {
	    "marginTop": 30
	  },
	  "mt40": {
	    "marginTop": 40
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
	  "bt45": {
	    "marginBottom": 45
	  },
	  "bt50": {
	    "marginBottom": 50
	  },
	  "mr5": {
	    "marginRight": 5
	  },
	  "mr10": {
	    "marginRight": 10
	  },
	  "mr15": {
	    "marginRight": 15
	  },
	  "mr20": {
	    "marginRight": 20
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
	    "backgroundColor": "#068F3D"
	  },
	  "baseNavBg": {
	    "backgroundColor": "#068F3D"
	  },
	  "baseNavColor": {
	    "color": "#068F3D"
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
	    "color": "#068F3D",
	    "borderColor": "#068F3D",
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
	    "backgroundColor": "#068F3D"
	  },
	  "bkg-gray": {
	    "backgroundColor": "#eeeeee"
	  },
	  "bd-primary": {
	    "borderColor": "#068F3D"
	  },
	  "bkg-delete": {
	    "backgroundColor": "#FF0000"
	  },
	  "white": {
	    "color": "#FFFFFF"
	  },
	  "primary": {
	    "color": "#068F3D"
	  },
	  "gray": {
	    "color": "#999999"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#068F3D",
	    "marginTop": 2
	  },
	  "ico_big": {
	    "fontSize": 72,
	    "color": "#068F3D",
	    "marginTop": 4
	  },
	  "ico_small": {
	    "fontSize": 32,
	    "color": "#068F3D",
	    "marginTop": 1
	  },
	  "arrow": {
	    "fontSize": 32,
	    "color": "#cccccc",
	    "width": 40
	  },
	  "check": {
	    "fontSize": 32,
	    "color": "#068F3D",
	    "width": 40
	  },
	  "shopCheck": {
	    "fontSize": 32,
	    "color": "#068F3D",
	    "width": 40,
	    "marginLeft": 150
	  },
	  "button": {
	    "fontSize": 32,
	    "textAlign": "center",
	    "color": "#ffffff",
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "backgroundColor": "#068F3D",
	    "borderRadius": 15,
	    "height": 80,
	    "lineHeight": 50,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "backgroundColor:active": "#cccccc",
	    "color:active": "#068F3D",
	    "backgroundColor:disabled": "#068F3D",
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
	    "color": "#068F3D",
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
	    "opacity": 0.4
	  },
	  "showBox": {
	    "position": "fixed",
	    "top": 150,
	    "right": 15,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "showBg": {
	    "position": "absolute",
	    "top": 0,
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "backgroundColor": "#ffffff",
	    "borderRadius": 20
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
	  },
	  "indexSliderMtIPhone": {
	    "marginTop": 44
	  },
	  "indexSliderMtIPhoneX": {
	    "marginTop": 124
	  },
	  "artOutBoxTopIPhoneX": {
	    "top": 156
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
	  "coverAbsoTop": {
	    "position": "absolute",
	    "top": 0,
	    "backgroundColor": "rgba(136,136,136,0.1)"
	  }
	}

/***/ }),

/***/ 775:
/***/ (function(module, exports) {

	module.exports = {
	  "active": {
	    "backgroundColor:active": "#999999"
	  }
	}

/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _weex = __webpack_require__(154);

	var _navbar = __webpack_require__(133);

	var _navbar2 = _interopRequireDefault(_navbar);

	var _utils = __webpack_require__(71);

	var _utils2 = _interopRequireDefault(_utils);

	var _fetch = __webpack_require__(107);

	var _city = __webpack_require__(777);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var modal = weex.requireModule('modal'); //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	    data: function data() {
	        return {
	            //                用来用户返回界面时勾选行
	            listId: '',
	            dataList: [],
	            typeArr: ['pro', 'city', 'country'],
	            typeId: 0,
	            urlType: 'pro',
	            clicked: false
	        };
	    },

	    components: {
	        navbar: _navbar2.default
	    },
	    props: {
	        title: { default: "文章类别" }
	    },
	    created: function created() {

	        var _this = this;
	        this.listId = _utils2.default.isNull(_utils2.default.getUrlParameter('listId')) ? '' : _utils2.default.getUrlParameter('listId');
	        var a = _utils2.default.getUrlParameter('type');
	        if (!_utils2.default.isNull(a)) {
	            this.urlType = this.typeArr[a];
	            _this.typeId = a;
	        }
	        //            判断是选择第几级城市。
	        switch (this.urlType) {
	            case 'pro':
	                this.dataList = _city.getCity.getPro();
	                this.title = '省份选择';
	                break;
	            case 'city':
	                this.dataList = _city.getCity.getCity(this.listId);
	                this.title = '城市选择';
	                break;
	            case 'country':
	                this.dataList = _city.getCity.getCountry(this.listId);
	                this.title = '区县选择';
	                break;
	            default:
	                break;
	        }
	    },

	    methods: {
	        goback: function goback(e) {
	            _weex.event.closeURL();
	        },
	        setup: function setup(e) {},
	        //            选择相应数据时触发。
	        checkChange: function checkChange(id, name, city) {
	            if (this.clicked) {
	                return;
	            }
	            this.clicked = true;
	            var _this = this;
	            this.listId = id;
	            //                判断是否选择到区县或者该省/市没有下一级地区时，结束城市选择。
	            if (_this.typeId == 2 || city == '') {
	                var E = {
	                    name: name,
	                    chooseId: id,
	                    chooseArea: name
	                };
	                var backData = _utils2.default.message('success', '成功', E);
	                _weex.event.closeURL(backData);
	            } else {
	                var typeId = parseInt(this.typeId) + 1;
	                _weex.event.openURL(_utils2.default.locate('widget/city.js?type=' + typeId + '&listId=' + this.listId), function (data) {
	                    _this.clicked = false;
	                    if (data.type == 'success' && !_utils2.default.isNull(data.data)) {
	                        //                            当选择完毕后，一级一级的把名字拼凑起来返回到页面去，并记录下最后一级的id跟名字 用于传给服务器。
	                        var _E = {
	                            name: name + ' ' + data.data.name,
	                            chooseId: data.data.chooseId,
	                            chooseArea: data.data.chooseArea
	                        };
	                        var _backData = _utils2.default.message('success', '成功', _E);
	                        _weex.event.closeURL(_backData);
	                    }
	                });
	            }
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 777:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var areas = [{ id: "1150", name: "福建", children: [{ id: "1151", name: "福州", children: [{ id: "1152", name: "鼓楼" }, { id: "1153", name: "台江" }, { id: "1154", name: "仓山" }, { id: "1155", name: "马尾" }, { id: "1156", name: "晋安" }, { id: "1157", name: "闽侯" }, { id: "1158", name: "连江" }, { id: "1159", name: "罗源" }, { id: "1160", name: "闽清" }, { id: "1161", name: "永泰" }, { id: "1162", name: "平潭" }, { id: "1163", name: "福清" }, { id: "1164", name: "长乐" }] }, { id: "1165", name: "厦门", children: [{ id: "1166", name: "思明" }, { id: "1167", name: "海沧" }, { id: "1168", name: "湖里" }, { id: "1169", name: "集美" }, { id: "1170", name: "同安" }, { id: "1171", name: "翔安" }] }, { id: "1172", name: "莆田", children: [{ id: "1173", name: "城厢" }, { id: "1174", name: "涵江" }, { id: "1175", name: "荔城" }, { id: "1176", name: "秀屿" }, { id: "1177", name: "仙游" }] }, { id: "1178", name: "三明", children: [{ id: "1179", name: "梅列" }, { id: "1180", name: "三元" }, { id: "1181", name: "明溪" }, { id: "1182", name: "清流" }, { id: "1183", name: "宁化" }, { id: "1184", name: "大田" }, { id: "1185", name: "尤溪" }, { id: "1186", name: "沙县" }, { id: "1187", name: "将乐" }, { id: "1188", name: "泰宁" }, { id: "1189", name: "建宁" }, { id: "1190", name: "永安" }] }, { id: "1191", name: "泉州", children: [{ id: "1192", name: "鲤城" }, { id: "1193", name: "丰泽" }, { id: "1194", name: "洛江" }, { id: "1195", name: "泉港" }, { id: "1196", name: "惠安" }, { id: "1197", name: "安溪" }, { id: "1198", name: "永春" }, { id: "1199", name: "德化" }, { id: "1200", name: "金门" }, { id: "1201", name: "石狮" }, { id: "1202", name: "晋江" }, { id: "1203", name: "南安" }] }, { id: "1204", name: "漳州", children: [{ id: "1205", name: "芗城" }, { id: "1206", name: "龙文" }, { id: "1207", name: "云霄" }, { id: "1208", name: "漳浦" }, { id: "1209", name: "诏安" }, { id: "1210", name: "长泰" }, { id: "1211", name: "东山" }, { id: "1212", name: "南靖" }, { id: "1213", name: "平和" }, { id: "1214", name: "华安" }, { id: "1215", name: "龙海" }] }, { id: "1216", name: "南平", children: [{ id: "1217", name: "延平" }, { id: "1218", name: "顺昌" }, { id: "1219", name: "浦城" }, { id: "1220", name: "光泽" }, { id: "1221", name: "松溪" }, { id: "1222", name: "政和" }, { id: "1223", name: "邵武" }, { id: "1224", name: "武夷山" }, { id: "1225", name: "建瓯" }, { id: "1226", name: "建阳" }] }, { id: "1227", name: "龙岩", children: [{ id: "1228", name: "新罗" }, { id: "1229", name: "长汀" }, { id: "1230", name: "永定" }, { id: "1231", name: "上杭" }, { id: "1232", name: "武平" }, { id: "1233", name: "连城" }, { id: "1234", name: "漳平" }] }, { id: "1235", name: "宁德", children: [{ id: "1236", name: "蕉城" }, { id: "1237", name: "霞浦" }, { id: "1238", name: "古田" }, { id: "1239", name: "屏南" }, { id: "1240", name: "寿宁" }, { id: "1241", name: "周宁" }, { id: "1242", name: "柘荣" }, { id: "1243", name: "福安" }, { id: "1244", name: "福鼎" }] }] }, { id: "810", name: "江苏", children: [{ id: "811", name: "南京", children: [{ id: "812", name: "玄武" }, { id: "813", name: "白下" }, { id: "814", name: "秦淮" }, { id: "815", name: "建邺" }, { id: "816", name: "鼓楼" }, { id: "817", name: "下关" }, { id: "818", name: "浦口" }, { id: "819", name: "栖霞" }, { id: "820", name: "雨花台" }, { id: "821", name: "江宁" }, { id: "822", name: "六合" }, { id: "823", name: "溧水" }, { id: "824", name: "高淳" }] }, { id: "825", name: "无锡", children: [{ id: "826", name: "崇安" }, { id: "827", name: "南长" }, { id: "828", name: "北塘" }, { id: "829", name: "锡山" }, { id: "830", name: "惠山" }, { id: "831", name: "滨湖" }, { id: "832", name: "江阴" }, { id: "833", name: "宜兴" }] }, { id: "834", name: "徐州", children: [{ id: "835", name: "鼓楼" }, { id: "836", name: "云龙" }, { id: "837", name: "贾汪" }, { id: "838", name: "泉山" }, { id: "839", name: "铜山" }, { id: "840", name: "丰县" }, { id: "841", name: "沛县" }, { id: "842", name: "睢宁" }, { id: "843", name: "新沂" }, { id: "844", name: "邳州" }] }, { id: "845", name: "常州", children: [{ id: "846", name: "天宁" }, { id: "847", name: "钟楼" }, { id: "848", name: "戚墅堰" }, { id: "849", name: "新北" }, { id: "850", name: "武进" }, { id: "851", name: "溧阳" }, { id: "852", name: "金坛" }] }, { id: "853", name: "苏州", children: [{ id: "854", name: "虎丘" }, { id: "855", name: "吴中" }, { id: "856", name: "相城" }, { id: "857", name: "姑苏" }, { id: "858", name: "吴江" }, { id: "859", name: "常熟" }, { id: "860", name: "张家港" }, { id: "861", name: "昆山" }, { id: "862", name: "太仓" }] }, { id: "863", name: "南通", children: [{ id: "864", name: "崇川" }, { id: "865", name: "港闸" }, { id: "866", name: "通州" }, { id: "867", name: "海安" }, { id: "868", name: "如东" }, { id: "869", name: "启东" }, { id: "870", name: "如皋" }, { id: "871", name: "海门" }] }, { id: "872", name: "连云港", children: [{ id: "873", name: "连云" }, { id: "874", name: "新浦" }, { id: "875", name: "海州" }, { id: "876", name: "赣榆" }, { id: "877", name: "东海" }, { id: "878", name: "灌云" }, { id: "879", name: "灌南" }] }, { id: "880", name: "淮安", children: [{ id: "881", name: "清河" }, { id: "882", name: "淮安" }, { id: "883", name: "淮阴" }, { id: "884", name: "清浦" }, { id: "885", name: "涟水" }, { id: "886", name: "洪泽" }, { id: "887", name: "盱眙" }, { id: "888", name: "金湖" }] }, { id: "889", name: "盐城", children: [{ id: "890", name: "亭湖" }, { id: "891", name: "盐都" }, { id: "892", name: "响水" }, { id: "893", name: "滨海" }, { id: "894", name: "阜宁" }, { id: "895", name: "射阳" }, { id: "896", name: "建湖" }, { id: "897", name: "东台" }, { id: "898", name: "大丰" }] }, { id: "899", name: "扬州", children: [{ id: "900", name: "广陵" }, { id: "901", name: "邗江" }, { id: "902", name: "江都" }, { id: "903", name: "宝应" }, { id: "904", name: "仪征" }, { id: "905", name: "高邮" }] }, { id: "906", name: "镇江", children: [{ id: "907", name: "京口" }, { id: "908", name: "润州" }, { id: "909", name: "丹徒" }, { id: "910", name: "丹阳" }, { id: "911", name: "扬中" }, { id: "912", name: "句容" }] }, { id: "913", name: "泰州", children: [{ id: "914", name: "海陵" }, { id: "915", name: "高港" }, { id: "916", name: "兴化" }, { id: "917", name: "靖江" }, { id: "918", name: "泰兴" }, { id: "919", name: "姜堰" }] }, { id: "920", name: "宿迁", children: [{ id: "921", name: "宿城" }, { id: "922", name: "宿豫" }, { id: "923", name: "沭阳" }, { id: "924", name: "泗阳" }, { id: "925", name: "泗洪" }] }] }, { id: "926", name: "浙江", children: [{ id: "927", name: "杭州", children: [{ id: "928", name: "上城" }, { id: "929", name: "下城" }, { id: "930", name: "江干" }, { id: "931", name: "拱墅" }, { id: "932", name: "西湖" }, { id: "933", name: "滨江" }, { id: "934", name: "萧山" }, { id: "935", name: "余杭" }, { id: "936", name: "桐庐" }, { id: "937", name: "淳安" }, { id: "938", name: "建德" }, { id: "939", name: "富阳" }, { id: "940", name: "临安" }] }, { id: "941", name: "宁波", children: [{ id: "942", name: "海曙" }, { id: "943", name: "江东" }, { id: "944", name: "江北" }, { id: "945", name: "北仑" }, { id: "946", name: "镇海" }, { id: "947", name: "鄞州" }, { id: "948", name: "象山" }, { id: "949", name: "宁海" }, { id: "950", name: "余姚" }, { id: "951", name: "慈溪" }, { id: "952", name: "奉化" }] }, { id: "953", name: "温州", children: [{ id: "954", name: "鹿城" }, { id: "955", name: "龙湾" }, { id: "956", name: "瓯海" }, { id: "957", name: "洞头" }, { id: "958", name: "永嘉" }, { id: "959", name: "平阳" }, { id: "960", name: "苍南" }, { id: "961", name: "文成" }, { id: "962", name: "泰顺" }, { id: "963", name: "瑞安" }, { id: "964", name: "乐清" }] }, { id: "965", name: "嘉兴", children: [{ id: "966", name: "南湖" }, { id: "967", name: "秀洲" }, { id: "968", name: "嘉善" }, { id: "969", name: "海盐" }, { id: "970", name: "海宁" }, { id: "971", name: "平湖" }, { id: "972", name: "桐乡" }] }, { id: "973", name: "湖州", children: [{ id: "974", name: "吴兴" }, { id: "975", name: "南浔" }, { id: "976", name: "德清" }, { id: "977", name: "长兴" }, { id: "978", name: "安吉" }] }, { id: "979", name: "绍兴", children: [{ id: "980", name: "越城" }, { id: "981", name: "绍兴" }, { id: "982", name: "新昌" }, { id: "983", name: "诸暨" }, { id: "984", name: "上虞" }, { id: "985", name: "嵊州" }] }, { id: "986", name: "金华", children: [{ id: "987", name: "婺城" }, { id: "988", name: "金东" }, { id: "989", name: "武义" }, { id: "990", name: "浦江" }, { id: "991", name: "磐安" }, { id: "992", name: "兰溪" }, { id: "993", name: "义乌" }, { id: "994", name: "东阳" }, { id: "995", name: "永康" }] }, { id: "996", name: "衢州", children: [{ id: "997", name: "柯城" }, { id: "998", name: "衢江" }, { id: "999", name: "常山" }, { id: "1000", name: "开化" }, { id: "1001", name: "龙游" }, { id: "1002", name: "江山" }] }, { id: "1003", name: "舟山", children: [{ id: "1004", name: "定海" }, { id: "1005", name: "普陀" }, { id: "1006", name: "岱山" }, { id: "1007", name: "嵊泗" }] }, { id: "1008", name: "台州", children: [{ id: "1009", name: "椒江" }, { id: "1010", name: "黄岩" }, { id: "1011", name: "路桥" }, { id: "1012", name: "玉环" }, { id: "1013", name: "三门" }, { id: "1014", name: "天台" }, { id: "1015", name: "仙居" }, { id: "1016", name: "温岭" }, { id: "1017", name: "临海" }] }, { id: "1018", name: "丽水", children: [{ id: "1024", name: "云和" }, { id: "1025", name: "庆元" }, { id: "1026", name: "景宁畲" }, { id: "1027", name: "龙泉" }, { id: "1019", name: "莲都" }, { id: "1020", name: "青田" }, { id: "1021", name: "缙云" }, { id: "1022", name: "遂昌" }, { id: "1023", name: "松阳" }] }] }, { id: "792", name: "上海", children: [{ id: "793", name: "黄浦", children: [] }, { id: "794", name: "徐汇", children: [] }, { id: "795", name: "长宁", children: [] }, { id: "796", name: "静安", children: [] }, { id: "797", name: "普陀", children: [] }, { id: "798", name: "闸北", children: [] }, { id: "799", name: "虹口", children: [] }, { id: "800", name: "杨浦", children: [] }, { id: "801", name: "闵行", children: [] }, { id: "802", name: "宝山", children: [] }, { id: "803", name: "嘉定", children: [] }, { id: "804", name: "浦东", children: [] }, { id: "805", name: "金山", children: [] }, { id: "806", name: "松江", children: [] }, { id: "807", name: "青浦", children: [] }, { id: "808", name: "奉贤", children: [] }, { id: "809", name: "崇明", children: [] }, { id: "3322", name: "南汇", children: [] }] }, { id: "1028", name: "安徽", children: [{ id: "1029", name: "合肥", children: [{ id: "1030", name: "瑶海区" }, { id: "1031", name: "庐阳区" }, { id: "1032", name: "蜀山区" }, { id: "1033", name: "包河区" }, { id: "1034", name: "长丰" }, { id: "1035", name: "肥东" }, { id: "1036", name: "肥西" }, { id: "1037", name: "庐江" }, { id: "1038", name: "巢湖" }, { id: "3324", name: "滨湖区" }, { id: "3325", name: "经开区" }, { id: "3326", name: "政务区" }] }, { id: "1039", name: "芜湖", children: [{ id: "1040", name: "镜湖" }, { id: "1041", name: "弋江" }, { id: "1042", name: "鸠江" }, { id: "1043", name: "三山" }, { id: "1044", name: "芜湖" }, { id: "1045", name: "繁昌" }, { id: "1046", name: "南陵" }, { id: "1047", name: "无为" }] }, { id: "1048", name: "蚌埠", children: [{ id: "1049", name: "龙子湖" }, { id: "1050", name: "蚌山" }, { id: "1051", name: "禹会" }, { id: "1052", name: "淮上" }, { id: "1053", name: "怀远" }, { id: "1054", name: "五河" }, { id: "1055", name: "固镇" }] }, { id: "1056", name: "淮南", children: [{ id: "1057", name: "大通" }, { id: "1058", name: "田家庵" }, { id: "1059", name: "谢家集" }, { id: "1060", name: "八公山" }, { id: "1061", name: "潘集" }, { id: "1062", name: "凤台" }] }, { id: "1063", name: "马鞍山", children: [{ id: "1064", name: "花山" }, { id: "1065", name: "雨山" }, { id: "1066", name: "博望" }, { id: "1067", name: "当涂" }, { id: "1068", name: "含山" }, { id: "1069", name: "和县" }] }, { id: "1070", name: "淮北", children: [{ id: "1071", name: "杜集" }, { id: "1072", name: "相山" }, { id: "1073", name: "烈山" }, { id: "1074", name: "濉溪" }] }, { id: "1075", name: "铜陵", children: [{ id: "1076", name: "铜官山" }, { id: "1077", name: "狮子山" }, { id: "1078", name: "郊区" }, { id: "1079", name: "铜陵" }] }, { id: "1080", name: "安庆", children: [{ id: "1081", name: "迎江" }, { id: "1082", name: "大观" }, { id: "1083", name: "宜秀" }, { id: "1084", name: "怀宁" }, { id: "1085", name: "枞阳" }, { id: "1086", name: "潜山" }, { id: "1087", name: "太湖" }, { id: "1088", name: "宿松" }, { id: "1089", name: "望江" }, { id: "1090", name: "岳西" }, { id: "1091", name: "桐城" }] }, { id: "1092", name: "黄山", children: [{ id: "1093", name: "屯溪" }, { id: "1094", name: "黄山" }, { id: "1095", name: "徽州" }, { id: "1096", name: "歙县" }, { id: "1097", name: "休宁" }, { id: "1098", name: "黟县" }, { id: "1099", name: "祁门" }] }, { id: "1100", name: "滁州", children: [{ id: "1101", name: "琅琊" }, { id: "1102", name: "南谯" }, { id: "1103", name: "来安" }, { id: "1104", name: "全椒" }, { id: "1105", name: "定远" }, { id: "1106", name: "凤阳" }, { id: "1107", name: "天长" }, { id: "1108", name: "明光" }] }, { id: "1109", name: "阜阳", children: [{ id: "1110", name: "颍州" }, { id: "1111", name: "颍东" }, { id: "1112", name: "颍泉" }, { id: "1113", name: "临泉" }, { id: "1114", name: "太和" }, { id: "1115", name: "阜南" }, { id: "1116", name: "颍上" }, { id: "1117", name: "界首" }] }, { id: "1118", name: "宿州", children: [{ id: "1119", name: "埇桥" }, { id: "1120", name: "砀山" }, { id: "1121", name: "萧县" }, { id: "1122", name: "灵璧" }, { id: "1123", name: "泗县" }] }, { id: "1124", name: "六安", children: [{ id: "1125", name: "金安" }, { id: "1126", name: "裕安" }, { id: "1127", name: "寿县" }, { id: "1128", name: "霍邱" }, { id: "1129", name: "舒城" }, { id: "1130", name: "金寨" }, { id: "1131", name: "霍山" }] }, { id: "1132", name: "亳州", children: [{ id: "1133", name: "谯城" }, { id: "1134", name: "涡阳" }, { id: "1135", name: "蒙城" }, { id: "1136", name: "利辛" }] }, { id: "1137", name: "池州", children: [{ id: "1138", name: "贵池" }, { id: "1139", name: "东至" }, { id: "1140", name: "石台" }, { id: "1141", name: "青阳" }] }, { id: "1142", name: "宣城", children: [{ id: "1143", name: "宣州" }, { id: "1144", name: "郎溪" }, { id: "1145", name: "广德" }, { id: "1146", name: "泾县" }, { id: "1147", name: "绩溪" }, { id: "1148", name: "旌德" }, { id: "1149", name: "宁国" }] }, { id: "3327", name: "滁州", children: [] }] }, { id: "1", name: "北京", children: [{ id: "2", name: "东城", children: [] }, { id: "3", name: "西城", children: [] }, { id: "3317", name: "崇文", children: [] }, { id: "3318", name: "宣武", children: [] }, { id: "4", name: "朝阳", children: [] }, { id: "5", name: "丰台", children: [] }, { id: "6", name: "石景山", children: [] }, { id: "7", name: "海淀", children: [] }, { id: "8", name: "门头沟", children: [] }, { id: "9", name: "房山", children: [] }, { id: "10", name: "通州", children: [] }, { id: "11", name: "顺义", children: [] }, { id: "12", name: "昌平", children: [] }, { id: "13", name: "大兴", children: [] }, { id: "14", name: "怀柔", children: [] }, { id: "15", name: "平谷", children: [] }, { id: "16", name: "密云", children: [] }, { id: "17", name: "延庆", children: [] }] }, { id: "1357", name: "山东", children: [{ id: "1358", name: "济南", children: [{ id: "1359", name: "历下" }, { id: "1360", name: "市中" }, { id: "1361", name: "槐荫" }, { id: "1362", name: "天桥" }, { id: "1363", name: "历城" }, { id: "1364", name: "长清" }, { id: "1365", name: "平阴" }, { id: "1366", name: "济阳" }, { id: "1367", name: "商河" }, { id: "1368", name: "章丘" }] }, { id: "1369", name: "青岛", children: [{ id: "1370", name: "市南" }, { id: "1371", name: "市北" }, { id: "1372", name: "四方" }, { id: "1373", name: "黄岛" }, { id: "1374", name: "崂山" }, { id: "1375", name: "李沧" }, { id: "1376", name: "城阳" }, { id: "1377", name: "胶州" }, { id: "1378", name: "即墨" }, { id: "1379", name: "平度" }, { id: "1380", name: "胶南" }, { id: "1381", name: "莱西" }] }, { id: "1382", name: "淄博", children: [{ id: "1383", name: "淄川" }, { id: "1384", name: "张店" }, { id: "1385", name: "博山" }, { id: "1386", name: "临淄" }, { id: "1387", name: "周村" }, { id: "1388", name: "桓台" }, { id: "1389", name: "高青" }, { id: "1390", name: "沂源" }] }, { id: "1391", name: "枣庄", children: [{ id: "1392", name: "市中" }, { id: "1393", name: "薛城" }, { id: "1394", name: "峄城" }, { id: "1395", name: "台儿庄" }, { id: "1396", name: "山亭" }, { id: "1397", name: "滕州" }] }, { id: "1398", name: "东营", children: [{ id: "1399", name: "东营" }, { id: "1400", name: "河口" }, { id: "1401", name: "垦利" }, { id: "1402", name: "利津" }, { id: "1403", name: "广饶" }] }, { id: "1404", name: "烟台", children: [{ id: "1405", name: "芝罘" }, { id: "1406", name: "福山" }, { id: "1407", name: "牟平" }, { id: "1408", name: "莱山" }, { id: "1409", name: "长岛" }, { id: "1410", name: "龙口" }, { id: "1411", name: "莱阳" }, { id: "1412", name: "莱州" }, { id: "1413", name: "蓬莱" }, { id: "1414", name: "招远" }, { id: "1415", name: "栖霞" }, { id: "1416", name: "海阳" }] }, { id: "1417", name: "潍坊", children: [{ id: "1418", name: "潍城" }, { id: "1419", name: "寒亭" }, { id: "1420", name: "坊子" }, { id: "1421", name: "奎文" }, { id: "1422", name: "临朐" }, { id: "1423", name: "昌乐" }, { id: "1424", name: "青州" }, { id: "1425", name: "诸城" }, { id: "1426", name: "寿光" }, { id: "1427", name: "安丘" }, { id: "1428", name: "高密" }, { id: "1429", name: "昌邑" }] }, { id: "1430", name: "济宁", children: [{ id: "1431", name: "市中" }, { id: "1432", name: "任城" }, { id: "1433", name: "微山" }, { id: "1434", name: "鱼台" }, { id: "1435", name: "金乡" }, { id: "1436", name: "嘉祥" }, { id: "1437", name: "汶上" }, { id: "1438", name: "泗水" }, { id: "1439", name: "梁山" }, { id: "1440", name: "曲阜" }, { id: "1441", name: "兖州" }, { id: "1442", name: "邹城" }] }, { id: "1443", name: "泰安", children: [{ id: "1444", name: "泰山" }, { id: "1445", name: "岱岳" }, { id: "1446", name: "宁阳" }, { id: "1447", name: "东平" }, { id: "1448", name: "新泰" }, { id: "1449", name: "肥城" }] }, { id: "1450", name: "威海", children: [{ id: "1451", name: "环翠" }, { id: "1452", name: "文登" }, { id: "1453", name: "荣成" }, { id: "1454", name: "乳山" }] }, { id: "1455", name: "日照", children: [{ id: "1456", name: "东港" }, { id: "1457", name: "岚山" }, { id: "1458", name: "五莲" }, { id: "1459", name: "莒县" }] }, { id: "1460", name: "莱芜", children: [{ id: "1461", name: "莱城" }, { id: "1462", name: "钢城" }] }, { id: "1463", name: "临沂", children: [{ id: "1464", name: "兰山" }, { id: "1465", name: "罗庄" }, { id: "1466", name: "河东" }, { id: "1467", name: "沂南" }, { id: "1468", name: "郯城" }, { id: "1469", name: "沂水" }, { id: "1470", name: "苍山" }, { id: "1471", name: "费县" }, { id: "1472", name: "平邑" }, { id: "1473", name: "莒南" }, { id: "1474", name: "蒙阴" }, { id: "1475", name: "临沭" }] }, { id: "1476", name: "德州", children: [{ id: "1477", name: "德城" }, { id: "1478", name: "陵县" }, { id: "1479", name: "宁津" }, { id: "1480", name: "庆云" }, { id: "1481", name: "临邑" }, { id: "1482", name: "齐河" }, { id: "1483", name: "平原" }, { id: "1484", name: "夏津" }, { id: "1485", name: "武城" }, { id: "1486", name: "乐陵" }, { id: "1487", name: "禹城" }] }, { id: "1488", name: "聊城", children: [{ id: "1489", name: "东昌府" }, { id: "1490", name: "阳谷" }, { id: "1491", name: "莘县" }, { id: "1492", name: "茌平" }, { id: "1493", name: "东阿" }, { id: "1494", name: "冠县" }, { id: "1495", name: "高唐" }, { id: "1496", name: "临清" }] }, { id: "1497", name: "滨州", children: [{ id: "1498", name: "滨城" }, { id: "1499", name: "惠民" }, { id: "1500", name: "阳信" }, { id: "1501", name: "无棣" }, { id: "1502", name: "沾化" }, { id: "1503", name: "博兴" }, { id: "1504", name: "邹平" }] }, { id: "1505", name: "菏泽", children: [{ id: "1506", name: "牡丹" }, { id: "1507", name: "曹县" }, { id: "1508", name: "单县" }, { id: "1509", name: "成武" }, { id: "1510", name: "巨野" }, { id: "1511", name: "郓城" }, { id: "1512", name: "鄄城" }, { id: "1513", name: "定陶" }, { id: "1514", name: "东明" }] }] }, { id: "219", name: "山西", children: [{ id: "337", name: "吕梁", children: [{ id: "338", name: "离石" }, { id: "339", name: "文水" }, { id: "340", name: "交城" }, { id: "341", name: "兴县" }, { id: "342", name: "临县" }, { id: "343", name: "柳林" }, { id: "344", name: "石楼" }, { id: "345", name: "岚县" }, { id: "346", name: "方山" }, { id: "347", name: "中阳" }, { id: "348", name: "交口" }, { id: "349", name: "孝义" }, { id: "350", name: "汾阳" }] }, { id: "220", name: "太原", children: [{ id: "221", name: "小店" }, { id: "222", name: "迎泽" }, { id: "223", name: "杏花岭" }, { id: "224", name: "尖草坪" }, { id: "225", name: "万柏林" }, { id: "226", name: "晋源" }, { id: "227", name: "清徐" }, { id: "228", name: "阳曲" }, { id: "229", name: "娄烦" }, { id: "230", name: "古交" }] }, { id: "231", name: "大同", children: [{ id: "232", name: "城区" }, { id: "233", name: "矿区" }, { id: "234", name: "南郊" }, { id: "235", name: "新荣" }, { id: "236", name: "阳高" }, { id: "237", name: "天镇" }, { id: "238", name: "广灵" }, { id: "239", name: "灵丘" }, { id: "240", name: "浑源" }, { id: "241", name: "左云" }, { id: "242", name: "大同" }] }, { id: "243", name: "阳泉", children: [{ id: "244", name: "城区" }, { id: "245", name: "矿区" }, { id: "246", name: "郊区" }, { id: "247", name: "平定" }, { id: "248", name: "盂县" }] }, { id: "249", name: "长治", children: [{ id: "256", name: "黎城" }, { id: "257", name: "壶关" }, { id: "258", name: "长子" }, { id: "259", name: "武乡" }, { id: "260", name: "沁县" }, { id: "261", name: "沁源" }, { id: "262", name: "潞城" }, { id: "250", name: "城区" }, { id: "251", name: "郊区" }, { id: "252", name: "长治" }, { id: "253", name: "襄垣" }, { id: "254", name: "屯留" }, { id: "255", name: "平顺" }] }, { id: "263", name: "晋城", children: [{ id: "264", name: "晋城市" }, { id: "265", name: "城区" }, { id: "266", name: "沁水" }, { id: "267", name: "阳城" }, { id: "268", name: "陵川" }, { id: "269", name: "泽州" }, { id: "270", name: "高平" }] }, { id: "271", name: "朔州", children: [{ id: "272", name: "朔城" }, { id: "273", name: "平鲁" }, { id: "274", name: "山阴" }, { id: "275", name: "应县" }, { id: "276", name: "右玉" }, { id: "277", name: "怀仁" }] }, { id: "278", name: "晋中", children: [{ id: "279", name: "榆次" }, { id: "280", name: "榆社" }, { id: "281", name: "左权" }, { id: "282", name: "和顺" }, { id: "283", name: "昔阳" }, { id: "284", name: "寿阳" }, { id: "285", name: "太谷" }, { id: "286", name: "祁县" }, { id: "287", name: "平遥" }, { id: "288", name: "灵石" }, { id: "289", name: "介休" }] }, { id: "290", name: "运城", children: [{ id: "291", name: "盐湖" }, { id: "292", name: "临猗" }, { id: "293", name: "万荣" }, { id: "294", name: "闻喜" }, { id: "295", name: "稷山" }, { id: "296", name: "新绛" }, { id: "297", name: "绛县" }, { id: "298", name: "垣曲" }, { id: "299", name: "夏县" }, { id: "300", name: "平陆" }, { id: "301", name: "芮城" }, { id: "302", name: "永济" }, { id: "303", name: "河津" }] }, { id: "304", name: "忻州", children: [{ id: "305", name: "忻府区" }, { id: "306", name: "定襄县" }, { id: "307", name: "五台县" }, { id: "308", name: "代县" }, { id: "309", name: "繁峙县" }, { id: "310", name: "宁武县" }, { id: "311", name: "静乐县" }, { id: "312", name: "神池县" }, { id: "313", name: "五寨县" }, { id: "314", name: "岢岚县" }, { id: "315", name: "河曲县" }, { id: "316", name: "保德县" }, { id: "317", name: "偏关县" }, { id: "318", name: "原平市" }] }, { id: "319", name: "临汾", children: [{ id: "320", name: "尧都" }, { id: "321", name: "曲沃" }, { id: "322", name: "翼城" }, { id: "323", name: "襄汾" }, { id: "324", name: "洪洞" }, { id: "325", name: "古县" }, { id: "326", name: "安泽" }, { id: "327", name: "浮山" }, { id: "328", name: "吉县" }, { id: "329", name: "乡宁" }, { id: "330", name: "大宁" }, { id: "331", name: "隰县" }, { id: "332", name: "永和" }, { id: "333", name: "蒲县" }, { id: "334", name: "汾西" }, { id: "335", name: "侯马" }, { id: "336", name: "霍州" }] }] }, { id: "1515", name: "河南", children: [{ id: "1540", name: "洛阳", children: [{ id: "1541", name: "老城" }, { id: "1542", name: "西工" }, { id: "1543", name: "瀍河" }, { id: "1544", name: "涧西" }, { id: "1545", name: "吉利" }, { id: "1546", name: "洛龙" }, { id: "1547", name: "孟津" }, { id: "1548", name: "新安" }, { id: "1549", name: "栾川" }, { id: "1550", name: "嵩县" }, { id: "1551", name: "汝阳" }, { id: "1552", name: "宜阳" }, { id: "1553", name: "洛宁" }, { id: "1554", name: "伊川" }, { id: "1555", name: "偃师" }] }, { id: "1556", name: "平顶山", children: [{ id: "1557", name: "新华" }, { id: "1558", name: "卫东" }, { id: "1559", name: "石龙" }, { id: "1560", name: "湛河" }, { id: "1561", name: "宝丰" }, { id: "1562", name: "叶县" }, { id: "1563", name: "鲁山" }, { id: "1564", name: "郏县" }, { id: "1565", name: "舞钢" }, { id: "1566", name: "汝州" }] }, { id: "1567", name: "安阳", children: [{ id: "1568", name: "文峰" }, { id: "1569", name: "北关" }, { id: "1570", name: "殷都" }, { id: "1571", name: "龙安" }, { id: "1572", name: "安阳" }, { id: "1573", name: "汤阴" }, { id: "1574", name: "滑县" }, { id: "1575", name: "内黄" }, { id: "1576", name: "林州" }] }, { id: "1577", name: "鹤壁", children: [{ id: "1578", name: "鹤山" }, { id: "1579", name: "山城" }, { id: "1580", name: "淇滨" }, { id: "1581", name: "浚县" }, { id: "1582", name: "淇县" }] }, { id: "1583", name: "新乡", children: [{ id: "1584", name: "红旗" }, { id: "1585", name: "卫滨" }, { id: "1586", name: "凤泉" }, { id: "1587", name: "牧野" }, { id: "1588", name: "新乡" }, { id: "1589", name: "获嘉" }, { id: "1590", name: "原阳" }, { id: "1591", name: "延津" }, { id: "1592", name: "封丘" }, { id: "1593", name: "长垣" }, { id: "1594", name: "卫辉" }, { id: "1595", name: "辉县" }] }, { id: "1596", name: "焦作", children: [{ id: "1597", name: "解放" }, { id: "1598", name: "中站" }, { id: "1599", name: "马村" }, { id: "1600", name: "山阳" }, { id: "1601", name: "修武" }, { id: "1602", name: "博爱" }, { id: "1603", name: "武陟" }, { id: "1604", name: "温县" }, { id: "1605", name: "沁阳" }, { id: "1606", name: "孟州" }] }, { id: "1607", name: "濮阳", children: [{ id: "1608", name: "华龙" }, { id: "1609", name: "清丰" }, { id: "1610", name: "南乐" }, { id: "1611", name: "范县" }, { id: "1612", name: "台前" }, { id: "1613", name: "濮阳" }] }, { id: "1614", name: "许昌", children: [{ id: "1615", name: "魏都" }, { id: "1616", name: "许昌" }, { id: "1617", name: "鄢陵" }, { id: "1618", name: "襄城" }, { id: "1619", name: "禹州" }, { id: "1620", name: "长葛" }] }, { id: "1621", name: "漯河", children: [{ id: "1622", name: "源汇" }, { id: "1623", name: "郾城" }, { id: "1624", name: "召陵" }, { id: "1625", name: "舞阳" }, { id: "1626", name: "临颍" }] }, { id: "1627", name: "三门峡", children: [{ id: "1628", name: "湖滨" }, { id: "1629", name: "渑池" }, { id: "1630", name: "陕县" }, { id: "1631", name: "卢氏" }, { id: "1632", name: "义马" }, { id: "1633", name: "灵宝" }] }, { id: "1634", name: "南阳", children: [{ id: "1635", name: "宛城" }, { id: "1636", name: "卧龙" }, { id: "1637", name: "南召" }, { id: "1638", name: "方城" }, { id: "1639", name: "西峡" }, { id: "1640", name: "镇平" }, { id: "1641", name: "内乡" }, { id: "1642", name: "淅川" }, { id: "1643", name: "社旗" }, { id: "1644", name: "唐河" }, { id: "1645", name: "新野" }, { id: "1646", name: "桐柏" }, { id: "1647", name: "邓州" }] }, { id: "1648", name: "商丘", children: [{ id: "1649", name: "梁园" }, { id: "1650", name: "睢阳" }, { id: "1651", name: "民权" }, { id: "1652", name: "睢县" }, { id: "1653", name: "宁陵" }, { id: "1654", name: "柘城" }, { id: "1655", name: "虞城" }, { id: "1656", name: "夏邑" }, { id: "1657", name: "永城" }] }, { id: "1658", name: "信阳", children: [{ id: "1659", name: "浉河" }, { id: "1660", name: "平桥" }, { id: "1661", name: "罗山" }, { id: "1662", name: "光山" }, { id: "1663", name: "新县" }, { id: "1664", name: "商城" }, { id: "1665", name: "固始" }, { id: "1666", name: "潢川" }, { id: "1667", name: "淮滨" }, { id: "1668", name: "息县" }] }, { id: "1669", name: "周口", children: [{ id: "1670", name: "川汇" }, { id: "1671", name: "扶沟" }, { id: "1672", name: "西华" }, { id: "1673", name: "商水" }, { id: "1674", name: "沈丘" }, { id: "1675", name: "郸城" }, { id: "1676", name: "淮阳" }, { id: "1677", name: "太康" }, { id: "1678", name: "鹿邑" }, { id: "1679", name: "项城" }] }, { id: "1680", name: "驻马店", children: [{ id: "1681", name: "驿城" }, { id: "1682", name: "西平" }, { id: "1683", name: "上蔡" }, { id: "1684", name: "平舆" }, { id: "1685", name: "正阳" }, { id: "1686", name: "确山" }, { id: "1687", name: "泌阳" }, { id: "1688", name: "汝南" }, { id: "1689", name: "遂平" }, { id: "1690", name: "新蔡" }] }, { id: "1691", name: "济源", children: [] }, { id: "1516", name: "郑州", children: [{ id: "1517", name: "中原" }, { id: "1518", name: "二七" }, { id: "1519", name: "管城" }, { id: "1520", name: "金水" }, { id: "1521", name: "上街" }, { id: "1522", name: "惠济" }, { id: "1523", name: "中牟" }, { id: "1524", name: "巩义" }, { id: "1525", name: "荥阳" }, { id: "1526", name: "新密" }, { id: "1527", name: "新郑" }, { id: "1528", name: "登封" }] }, { id: "1529", name: "开封", children: [{ id: "1536", name: "通许" }, { id: "1537", name: "尉氏" }, { id: "1538", name: "开封" }, { id: "1539", name: "兰考" }, { id: "1530", name: "龙亭" }, { id: "1531", name: "顺河" }, { id: "1532", name: "鼓楼" }, { id: "1533", name: "禹王台" }, { id: "1534", name: "金明" }, { id: "1535", name: "杞县" }] }] }, { id: "35", name: "河北", children: [{ id: "36", name: "石家庄", children: [{ id: "37", name: "长安" }, { id: "38", name: "桥东" }, { id: "39", name: "桥西" }, { id: "40", name: "新华" }, { id: "41", name: "井陉矿" }, { id: "42", name: "裕华" }, { id: "43", name: "井陉" }, { id: "44", name: "正定" }, { id: "45", name: "栾城" }, { id: "46", name: "行唐" }, { id: "47", name: "灵寿" }, { id: "48", name: "高邑" }, { id: "49", name: "深泽" }, { id: "50", name: "赞皇" }, { id: "51", name: "无极" }, { id: "52", name: "平山" }, { id: "53", name: "元氏" }, { id: "54", name: "赵县" }, { id: "55", name: "辛集" }, { id: "56", name: "藁城" }, { id: "57", name: "晋州" }, { id: "58", name: "新乐" }, { id: "59", name: "鹿泉" }] }, { id: "60", name: "唐山", children: [{ id: "67", name: "曹妃甸" }, { id: "61", name: "路南" }, { id: "62", name: "路北" }, { id: "63", name: "古冶" }, { id: "64", name: "开平" }, { id: "65", name: "丰南" }, { id: "66", name: "丰润" }, { id: "68", name: "滦县" }, { id: "69", name: "滦南" }, { id: "70", name: "乐亭" }, { id: "71", name: "迁西" }, { id: "72", name: "玉田" }, { id: "3321", name: "唐海" }, { id: "73", name: "遵化" }, { id: "74", name: "迁安" }] }, { id: "75", name: "秦皇岛", children: [{ id: "76", name: "海港" }, { id: "77", name: "山海关" }, { id: "78", name: "北戴河" }, { id: "79", name: "青龙" }, { id: "80", name: "昌黎" }, { id: "81", name: "抚宁" }, { id: "82", name: "卢龙" }] }, { id: "83", name: "邯郸", children: [{ id: "84", name: "邯山" }, { id: "85", name: "丛台" }, { id: "86", name: "复兴" }, { id: "87", name: "峰峰矿" }, { id: "88", name: "邯郸" }, { id: "89", name: "临漳" }, { id: "90", name: "成安" }, { id: "91", name: "大名" }, { id: "92", name: "涉县" }, { id: "93", name: "磁县" }, { id: "94", name: "肥乡" }, { id: "95", name: "永年" }, { id: "96", name: "邱县" }, { id: "97", name: "鸡泽" }, { id: "98", name: "广平" }, { id: "99", name: "馆陶" }, { id: "100", name: "魏县" }, { id: "101", name: "曲周" }, { id: "102", name: "武安" }] }, { id: "103", name: "邢台", children: [{ id: "104", name: "桥东" }, { id: "105", name: "桥西" }, { id: "106", name: "邢台" }, { id: "107", name: "临城" }, { id: "108", name: "内丘" }, { id: "109", name: "柏乡" }, { id: "110", name: "隆尧" }, { id: "111", name: "任县" }, { id: "112", name: "南和" }, { id: "113", name: "宁晋" }, { id: "114", name: "巨鹿" }, { id: "115", name: "新河" }, { id: "116", name: "广宗" }, { id: "117", name: "平乡" }, { id: "118", name: "威县" }, { id: "119", name: "清河" }, { id: "120", name: "临西" }, { id: "121", name: "南宫" }, { id: "122", name: "沙河" }] }, { id: "123", name: "保定", children: [{ id: "124", name: "市辖区" }, { id: "125", name: "竞秀区" }, { id: "126", name: "莲池区" }, { id: "127", name: "满城" }, { id: "128", name: "清苑" }, { id: "129", name: "涞水" }, { id: "130", name: "阜平" }, { id: "131", name: "徐水" }, { id: "132", name: "定兴" }, { id: "133", name: "唐县" }, { id: "134", name: "高阳" }, { id: "135", name: "容城" }, { id: "136", name: "涞源" }, { id: "137", name: "望都" }, { id: "138", name: "安新" }, { id: "139", name: "易县" }, { id: "140", name: "曲阳" }, { id: "141", name: "蠡县" }, { id: "142", name: "顺平" }, { id: "143", name: "博野" }, { id: "144", name: "雄县" }, { id: "145", name: "涿州" }, { id: "146", name: "定州" }, { id: "147", name: "安国" }, { id: "148", name: "高碑店" }] }, { id: "149", name: "张家口", children: [{ id: "150", name: "桥东" }, { id: "151", name: "桥西" }, { id: "152", name: "宣化" }, { id: "153", name: "下花园" }, { id: "154", name: "宣化" }, { id: "155", name: "张北" }, { id: "156", name: "康保" }, { id: "157", name: "沽源" }, { id: "158", name: "尚义" }, { id: "159", name: "蔚县" }, { id: "160", name: "阳原" }, { id: "161", name: "怀安" }, { id: "162", name: "万全" }, { id: "163", name: "怀来" }, { id: "164", name: "涿鹿" }, { id: "165", name: "赤城" }, { id: "166", name: "崇礼" }] }, { id: "167", name: "承德", children: [{ id: "168", name: "双桥" }, { id: "169", name: "双滦" }, { id: "170", name: "鹰手营子矿" }, { id: "171", name: "承德" }, { id: "172", name: "兴隆" }, { id: "173", name: "平泉" }, { id: "174", name: "滦平" }, { id: "175", name: "隆化" }, { id: "176", name: "丰宁" }, { id: "177", name: "宽城" }, { id: "178", name: "围场" }] }, { id: "179", name: "沧州", children: [{ id: "180", name: "新华" }, { id: "181", name: "运河" }, { id: "182", name: "沧县" }, { id: "183", name: "青县" }, { id: "184", name: "东光" }, { id: "185", name: "海兴" }, { id: "186", name: "盐山" }, { id: "187", name: "肃宁" }, { id: "188", name: "南皮" }, { id: "189", name: "吴桥" }, { id: "190", name: "献县" }, { id: "191", name: "孟村" }, { id: "192", name: "泊头" }, { id: "193", name: "任丘" }, { id: "194", name: "黄骅" }, { id: "195", name: "河间" }] }, { id: "196", name: "廊坊", children: [{ id: "197", name: "安次" }, { id: "198", name: "广阳" }, { id: "199", name: "固安" }, { id: "200", name: "永清" }, { id: "201", name: "香河" }, { id: "202", name: "大城" }, { id: "203", name: "文安" }, { id: "204", name: "大厂" }, { id: "205", name: "霸州" }, { id: "206", name: "三河" }] }, { id: "207", name: "衡水", children: [{ id: "208", name: "桃城" }, { id: "209", name: "枣强" }, { id: "210", name: "武邑" }, { id: "211", name: "武强" }, { id: "212", name: "饶阳" }, { id: "213", name: "安平" }, { id: "214", name: "故城" }, { id: "215", name: "景县" }, { id: "216", name: "阜城" }, { id: "217", name: "冀州" }, { id: "218", name: "深州" }] }] }, { id: "2580", name: "云南", children: [{ id: "2581", name: "昆明", children: [{ id: "2582", name: "五华" }, { id: "2583", name: "盘龙" }, { id: "2584", name: "官渡" }, { id: "2585", name: "西山" }, { id: "2586", name: "东川" }, { id: "2587", name: "呈贡" }, { id: "2588", name: "晋宁" }, { id: "2589", name: "富民" }, { id: "2590", name: "宜良" }, { id: "2591", name: "石林" }, { id: "2592", name: "嵩明" }, { id: "2593", name: "禄劝" }, { id: "2594", name: "寻甸" }, { id: "2595", name: "安宁" }] }, { id: "2596", name: "曲靖", children: [{ id: "2597", name: "麒麟" }, { id: "2598", name: "马龙" }, { id: "2599", name: "陆良" }, { id: "2600", name: "师宗" }, { id: "2601", name: "罗平" }, { id: "2602", name: "富源" }, { id: "2603", name: "会泽" }, { id: "2604", name: "沾益" }, { id: "2605", name: "宣威" }] }, { id: "2606", name: "玉溪", children: [{ id: "2607", name: "红塔" }, { id: "2608", name: "江川" }, { id: "2609", name: "澄江" }, { id: "2610", name: "通海" }, { id: "2611", name: "华宁" }, { id: "2612", name: "易门" }, { id: "2613", name: "峨山" }, { id: "2614", name: "新平" }, { id: "2615", name: "元江" }] }, { id: "2616", name: "保山", children: [{ id: "2617", name: "隆阳" }, { id: "2618", name: "施甸" }, { id: "2619", name: "腾冲" }, { id: "2620", name: "龙陵" }, { id: "2621", name: "昌宁" }] }, { id: "2622", name: "昭通", children: [{ id: "2623", name: "昭阳" }, { id: "2624", name: "鲁甸" }, { id: "2625", name: "巧家" }, { id: "2626", name: "盐津" }, { id: "2627", name: "大关" }, { id: "2628", name: "永善" }, { id: "2629", name: "绥江" }, { id: "2630", name: "镇雄" }, { id: "2631", name: "彝良" }, { id: "2632", name: "威信" }, { id: "2633", name: "水富" }] }, { id: "2634", name: "丽江", children: [{ id: "2635", name: "古城" }, { id: "2636", name: "玉龙" }, { id: "2637", name: "永胜" }, { id: "2638", name: "华坪" }, { id: "2639", name: "宁蒗" }] }, { id: "2640", name: "普洱", children: [{ id: "2641", name: "思茅" }, { id: "2642", name: "宁洱" }, { id: "2643", name: "墨江" }, { id: "2644", name: "景东" }, { id: "2645", name: "景谷" }, { id: "2646", name: "镇沅" }, { id: "2647", name: "江城" }, { id: "2648", name: "孟连" }, { id: "2649", name: "澜沧" }, { id: "2650", name: "西盟" }] }, { id: "2651", name: "临沧", children: [{ id: "2652", name: "临翔" }, { id: "2653", name: "凤庆" }, { id: "2654", name: "云县" }, { id: "2655", name: "永德" }, { id: "2656", name: "镇康" }, { id: "2657", name: "双江" }, { id: "2658", name: "耿马" }, { id: "2659", name: "沧源" }] }, { id: "2660", name: "楚雄", children: [{ id: "2661", name: "楚雄" }, { id: "2662", name: "双柏" }, { id: "2663", name: "牟定" }, { id: "2664", name: "南华" }, { id: "2665", name: "姚安" }, { id: "2666", name: "大姚" }, { id: "2667", name: "永仁" }, { id: "2668", name: "元谋" }, { id: "2669", name: "武定" }, { id: "2670", name: "禄丰" }] }, { id: "2671", name: "红河", children: [{ id: "2672", name: "个旧" }, { id: "2673", name: "开远" }, { id: "2674", name: "蒙自" }, { id: "2675", name: "屏边" }, { id: "2676", name: "建水" }, { id: "2677", name: "石屏" }, { id: "2678", name: "弥勒" }, { id: "2679", name: "泸西" }, { id: "2680", name: "元阳" }, { id: "2681", name: "红河" }, { id: "2682", name: "金平" }, { id: "2683", name: "绿春" }, { id: "2684", name: "河口" }] }, { id: "2685", name: "文山", children: [{ id: "2686", name: "文山" }, { id: "2687", name: "砚山" }, { id: "2688", name: "西畴" }, { id: "2689", name: "麻栗坡" }, { id: "2690", name: "马关" }, { id: "2691", name: "丘北" }, { id: "2692", name: "广南" }, { id: "2693", name: "富宁" }] }, { id: "2694", name: "西双版纳", children: [{ id: "2695", name: "景洪" }, { id: "2696", name: "勐海" }, { id: "2697", name: "勐腊" }] }, { id: "2698", name: "大理", children: [{ id: "2699", name: "大理" }, { id: "2700", name: "漾濞" }, { id: "2701", name: "祥云" }, { id: "2702", name: "宾川" }, { id: "2703", name: "弥渡" }, { id: "2704", name: "南涧" }, { id: "2705", name: "巍山" }, { id: "2706", name: "永平" }, { id: "2707", name: "云龙" }, { id: "2708", name: "洱源" }, { id: "2709", name: "剑川" }, { id: "2710", name: "鹤庆" }] }, { id: "2711", name: "德宏", children: [{ id: "2712", name: "瑞丽" }, { id: "2713", name: "芒市" }, { id: "2714", name: "梁河" }, { id: "2715", name: "盈江" }, { id: "2716", name: "陇川" }] }, { id: "2717", name: "怒江", children: [{ id: "2718", name: "泸水" }, { id: "2719", name: "福贡" }, { id: "2720", name: "贡山" }, { id: "2721", name: "兰坪" }, { id: "3320", name: "六库" }] }, { id: "2722", name: "迪庆", children: [{ id: "2723", name: "香格里拉" }, { id: "2724", name: "德钦" }, { id: "2725", name: "维西" }, { id: "3319", name: "中甸" }] }] }, { id: "2482", name: "贵州", children: [{ id: "2567", name: "黔南", children: [{ id: "2568", name: "都匀" }, { id: "2569", name: "福泉" }, { id: "2570", name: "荔波" }, { id: "2571", name: "贵定" }, { id: "2572", name: "瓮安" }, { id: "2573", name: "独山" }, { id: "2574", name: "平塘" }, { id: "2575", name: "罗甸" }, { id: "2576", name: "长顺" }, { id: "2577", name: "龙里" }, { id: "2578", name: "惠水" }, { id: "2579", name: "三都水" }] }, { id: "2483", name: "贵阳", children: [{ id: "2484", name: "南明" }, { id: "2485", name: "云岩" }, { id: "2486", name: "花溪" }, { id: "2487", name: "乌当" }, { id: "2488", name: "白云" }, { id: "2489", name: "小河" }, { id: "2490", name: "开阳" }, { id: "2491", name: "息烽" }, { id: "2492", name: "修文" }, { id: "2493", name: "清镇" }] }, { id: "2494", name: "六盘水", children: [{ id: "2495", name: "钟山" }, { id: "2496", name: "六枝特" }, { id: "2497", name: "水城" }, { id: "2498", name: "盘县" }] }, { id: "2499", name: "遵义", children: [{ id: "2500", name: "红花岗" }, { id: "2501", name: "汇川" }, { id: "2502", name: "遵义" }, { id: "2503", name: "桐梓" }, { id: "2504", name: "绥阳" }, { id: "2505", name: "正安" }, { id: "2506", name: "道真仡佬" }, { id: "2507", name: "务川仡佬" }, { id: "2508", name: "凤冈" }, { id: "2509", name: "湄潭" }, { id: "2510", name: "余庆" }, { id: "2511", name: "习水" }, { id: "2512", name: "赤水" }, { id: "2513", name: "仁怀" }] }, { id: "2514", name: "安顺", children: [{ id: "2515", name: "西秀" }, { id: "2516", name: "平坝" }, { id: "2517", name: "普定" }, { id: "2518", name: "镇宁布" }, { id: "2519", name: "关岭" }, { id: "2520", name: "紫云苗族" }] }, { id: "2521", name: "毕节", children: [{ id: "2522", name: "七星关" }, { id: "2523", name: "大方" }, { id: "2524", name: "黔西" }, { id: "2525", name: "金沙" }, { id: "2526", name: "织金" }, { id: "2527", name: "纳雍" }, { id: "2528", name: "威宁彝" }, { id: "2529", name: "赫章" }] }, { id: "2530", name: "铜仁", children: [{ id: "2531", name: "碧江" }, { id: "2532", name: "万山" }, { id: "2533", name: "江口" }, { id: "2534", name: "玉屏侗族" }, { id: "2535", name: "石阡" }, { id: "2536", name: "思南" }, { id: "2537", name: "印江土家" }, { id: "2538", name: "德江" }, { id: "2539", name: "沿河土家" }, { id: "2540", name: "松桃苗族" }] }, { id: "2541", name: "黔西南", children: [{ id: "2542", name: "兴义" }, { id: "2543", name: "兴仁" }, { id: "2544", name: "普安" }, { id: "2545", name: "晴隆" }, { id: "2546", name: "贞丰" }, { id: "2547", name: "望谟" }, { id: "2548", name: "册亨" }, { id: "2549", name: "安龙" }] }, { id: "2550", name: "黔东南", children: [{ id: "2560", name: "台江" }, { id: "2561", name: "黎平" }, { id: "2562", name: "榕江" }, { id: "2563", name: "从江" }, { id: "2564", name: "雷山" }, { id: "2565", name: "麻江" }, { id: "2566", name: "丹寨" }, { id: "2551", name: "凯里" }, { id: "2552", name: "黄平" }, { id: "2553", name: "施秉" }, { id: "2554", name: "三穗" }, { id: "2555", name: "镇远" }, { id: "2556", name: "岑巩" }, { id: "2557", name: "天柱" }, { id: "2558", name: "锦屏" }, { id: "2559", name: "剑河" }] }] }, { id: "2279", name: "四川", children: [{ id: "2307", name: "攀枝花", children: [{ id: "2308", name: "东区" }, { id: "2309", name: "西区" }, { id: "2310", name: "仁和" }, { id: "2311", name: "米易" }, { id: "2312", name: "盐边" }] }, { id: "2313", name: "泸州", children: [{ id: "2314", name: "江阳" }, { id: "2315", name: "纳溪" }, { id: "2316", name: "龙马潭" }, { id: "2317", name: "泸县" }, { id: "2318", name: "合江" }, { id: "2319", name: "叙永" }, { id: "2320", name: "古蔺" }] }, { id: "2321", name: "德阳", children: [{ id: "2322", name: "旌阳" }, { id: "2323", name: "中江" }, { id: "2324", name: "罗江" }, { id: "2325", name: "广汉" }, { id: "2326", name: "什邡" }, { id: "2327", name: "绵竹" }] }, { id: "2328", name: "绵阳", children: [{ id: "2329", name: "涪城" }, { id: "2330", name: "游仙" }, { id: "2331", name: "三台" }, { id: "2332", name: "盐亭" }, { id: "2333", name: "安县" }, { id: "2334", name: "梓潼" }, { id: "2335", name: "北川羌族" }, { id: "2336", name: "平武" }, { id: "2337", name: "江油" }] }, { id: "2338", name: "广元", children: [{ id: "2339", name: "利州" }, { id: "2340", name: "元坝" }, { id: "2341", name: "朝天" }, { id: "2342", name: "旺苍" }, { id: "2343", name: "青川" }, { id: "2344", name: "剑阁" }, { id: "2345", name: "苍溪" }] }, { id: "2346", name: "遂宁", children: [{ id: "2347", name: "船山" }, { id: "2348", name: "安居" }, { id: "2349", name: "蓬溪" }, { id: "2350", name: "射洪" }, { id: "2351", name: "大英" }] }, { id: "2352", name: "内江", children: [{ id: "2353", name: "市中" }, { id: "2354", name: "东兴" }, { id: "2355", name: "威远" }, { id: "2356", name: "资中" }, { id: "2357", name: "隆昌" }] }, { id: "2358", name: "乐山", children: [{ id: "2359", name: "市中" }, { id: "2360", name: "沙湾" }, { id: "2361", name: "五通桥" }, { id: "2362", name: "金口河" }, { id: "2363", name: "犍为" }, { id: "2364", name: "井研" }, { id: "2365", name: "夹江" }, { id: "2366", name: "沐川" }, { id: "2367", name: "峨边" }, { id: "2368", name: "马边" }, { id: "2369", name: "峨眉山" }] }, { id: "2370", name: "南充", children: [{ id: "2371", name: "顺庆" }, { id: "2372", name: "高坪" }, { id: "2373", name: "嘉陵" }, { id: "2374", name: "南部" }, { id: "2375", name: "营山" }, { id: "2376", name: "蓬安" }, { id: "2377", name: "仪陇" }, { id: "2378", name: "西充" }, { id: "2379", name: "阆中" }] }, { id: "2380", name: "眉山", children: [{ id: "2381", name: "东坡" }, { id: "2382", name: "仁寿" }, { id: "2383", name: "彭山" }, { id: "2384", name: "洪雅" }, { id: "2385", name: "丹棱" }, { id: "2386", name: "青神" }] }, { id: "2387", name: "宜宾", children: [{ id: "2388", name: "翠屏" }, { id: "2389", name: "南溪" }, { id: "2390", name: "宜宾" }, { id: "2391", name: "江安" }, { id: "2392", name: "长宁" }, { id: "2393", name: "高县" }, { id: "2394", name: "珙县" }, { id: "2395", name: "筠连" }, { id: "2396", name: "兴文" }, { id: "2397", name: "屏山" }] }, { id: "2398", name: "广安", children: [{ id: "2399", name: "广安" }, { id: "2400", name: "岳池" }, { id: "2401", name: "武胜" }, { id: "2402", name: "邻水" }, { id: "2403", name: "华蓥" }] }, { id: "2404", name: "达州", children: [{ id: "2405", name: "通川" }, { id: "2406", name: "达县" }, { id: "2407", name: "宣汉" }, { id: "2408", name: "开江" }, { id: "2409", name: "大竹" }, { id: "2410", name: "渠县" }, { id: "2411", name: "万源" }] }, { id: "2412", name: "雅安", children: [{ id: "2413", name: "雨城" }, { id: "2414", name: "名山" }, { id: "2415", name: "荥经" }, { id: "2416", name: "汉源" }, { id: "2417", name: "石棉" }, { id: "2418", name: "天全" }, { id: "2419", name: "芦山" }, { id: "2420", name: "宝兴" }] }, { id: "2421", name: "巴中", children: [{ id: "2422", name: "巴州" }, { id: "2423", name: "通江" }, { id: "2424", name: "南江" }, { id: "2425", name: "平昌" }] }, { id: "2426", name: "资阳", children: [{ id: "2427", name: "雁江" }, { id: "2428", name: "安岳" }, { id: "2429", name: "乐至" }, { id: "2430", name: "简阳" }] }, { id: "2431", name: "阿坝", children: [{ id: "2432", name: "汶川" }, { id: "2433", name: "理县" }, { id: "2434", name: "茂县" }, { id: "2435", name: "松潘" }, { id: "2436", name: "九寨沟" }, { id: "2437", name: "金川" }, { id: "2438", name: "小金" }, { id: "2439", name: "黑水" }, { id: "2440", name: "马尔康" }, { id: "2441", name: "壤塘" }, { id: "2442", name: "阿坝" }, { id: "2443", name: "若尔盖" }, { id: "2444", name: "红原" }] }, { id: "2445", name: "甘孜", children: [{ id: "2446", name: "康定" }, { id: "2447", name: "泸定" }, { id: "2448", name: "丹巴" }, { id: "2449", name: "九龙" }, { id: "2450", name: "雅江" }, { id: "2451", name: "道孚" }, { id: "2452", name: "炉霍" }, { id: "2453", name: "甘孜" }, { id: "2454", name: "新龙" }, { id: "2455", name: "德格" }, { id: "2456", name: "白玉" }, { id: "2457", name: "石渠" }, { id: "2458", name: "色达" }, { id: "2459", name: "理塘" }, { id: "2460", name: "巴塘" }, { id: "2461", name: "乡城" }, { id: "2462", name: "稻城" }, { id: "2463", name: "得荣" }] }, { id: "2464", name: "凉山", children: [{ id: "2465", name: "西昌" }, { id: "2466", name: "木里" }, { id: "2467", name: "盐源" }, { id: "2468", name: "德昌" }, { id: "2469", name: "会理" }, { id: "2470", name: "会东" }, { id: "2471", name: "宁南" }, { id: "2472", name: "普格" }, { id: "2473", name: "布拖" }, { id: "2474", name: "金阳" }, { id: "2475", name: "昭觉" }, { id: "2476", name: "喜德" }, { id: "2477", name: "冕宁" }, { id: "2478", name: "越西" }, { id: "2479", name: "甘洛" }, { id: "2480", name: "美姑" }, { id: "2481", name: "雷波" }] }, { id: "2280", name: "成都", children: [{ id: "2281", name: "锦江" }, { id: "2282", name: "青羊" }, { id: "2283", name: "金牛" }, { id: "2284", name: "武侯" }, { id: "2285", name: "成华" }, { id: "2286", name: "龙泉驿" }, { id: "2287", name: "青白江" }, { id: "2288", name: "新都" }, { id: "2289", name: "温江" }, { id: "2290", name: "金堂" }, { id: "2291", name: "双流" }, { id: "2292", name: "郫县" }, { id: "2293", name: "大邑" }, { id: "2294", name: "蒲江" }, { id: "2295", name: "新津" }, { id: "2296", name: "都江堰" }, { id: "2297", name: "彭州" }, { id: "2298", name: "邛崃" }, { id: "2299", name: "崇州" }] }, { id: "2300", name: "自贡", children: [{ id: "2304", name: "沿滩" }, { id: "2305", name: "荣县" }, { id: "2306", name: "富顺" }, { id: "2301", name: "自流井" }, { id: "2302", name: "贡井" }, { id: "2303", name: "大安" }] }] }, { id: "1946", name: "广东", children: [{ id: "2050", name: "河源", children: [{ id: "2051", name: "源城" }, { id: "2052", name: "紫金" }, { id: "2053", name: "龙川" }, { id: "2054", name: "连平" }, { id: "2055", name: "和平" }, { id: "2056", name: "东源" }] }, { id: "2057", name: "阳江", children: [{ id: "2058", name: "江城" }, { id: "2059", name: "阳西" }, { id: "2060", name: "阳东" }, { id: "2061", name: "阳春" }] }, { id: "2062", name: "清远", children: [{ id: "2063", name: "清城" }, { id: "2064", name: "佛冈" }, { id: "2065", name: "阳山" }, { id: "2066", name: "连山" }, { id: "2067", name: "连南" }, { id: "2068", name: "清新" }, { id: "2069", name: "英德" }, { id: "2070", name: "连州" }] }, { id: "2071", name: "东莞", children: [] }, { id: "2072", name: "中山", children: [] }, { id: "2073", name: "潮州", children: [{ id: "2074", name: "湘桥" }, { id: "2075", name: "潮安" }, { id: "2076", name: "饶平" }] }, { id: "2077", name: "揭阳", children: [{ id: "2078", name: "榕城" }, { id: "2079", name: "揭东" }, { id: "2080", name: "揭西" }, { id: "2081", name: "惠来" }, { id: "2082", name: "普宁" }] }, { id: "2083", name: "云浮", children: [{ id: "2084", name: "云城" }, { id: "2085", name: "新兴" }, { id: "2086", name: "郁南" }, { id: "2087", name: "云安" }, { id: "2088", name: "罗定" }] }, { id: "1947", name: "广州", children: [{ id: "1948", name: "荔湾" }, { id: "1949", name: "越秀" }, { id: "1950", name: "海珠" }, { id: "1951", name: "天河" }, { id: "1952", name: "白云" }, { id: "1953", name: "黄埔" }, { id: "1954", name: "番禺" }, { id: "1955", name: "花都" }, { id: "1956", name: "南沙" }, { id: "1957", name: "萝岗" }, { id: "1958", name: "增城" }, { id: "1959", name: "从化" }] }, { id: "1960", name: "韶关", children: [{ id: "1961", name: "武江" }, { id: "1962", name: "浈江" }, { id: "1963", name: "曲江" }, { id: "1964", name: "始兴" }, { id: "1965", name: "仁化" }, { id: "1966", name: "翁源" }, { id: "1967", name: "乳源" }, { id: "1968", name: "新丰" }, { id: "1969", name: "乐昌" }, { id: "1970", name: "南雄" }] }, { id: "1971", name: "深圳", children: [{ id: "1972", name: "罗湖" }, { id: "1973", name: "福田" }, { id: "1974", name: "南山" }, { id: "1975", name: "宝安" }, { id: "1976", name: "龙岗" }, { id: "1977", name: "盐田" }] }, { id: "1978", name: "珠海", children: [{ id: "1979", name: "香洲" }, { id: "1980", name: "斗门" }, { id: "1981", name: "金湾" }] }, { id: "1982", name: "汕头", children: [{ id: "1983", name: "龙湖" }, { id: "1984", name: "金平" }, { id: "1985", name: "濠江" }, { id: "1986", name: "潮阳" }, { id: "1987", name: "潮南" }, { id: "1988", name: "澄海" }, { id: "1989", name: "南澳" }] }, { id: "1990", name: "佛山", children: [{ id: "1991", name: "禅城" }, { id: "1992", name: "南海" }, { id: "1993", name: "顺德" }, { id: "1994", name: "三水" }, { id: "1995", name: "高明" }] }, { id: "1996", name: "江门", children: [{ id: "1997", name: "蓬江" }, { id: "1998", name: "江海" }, { id: "1999", name: "新会" }, { id: "2000", name: "台山" }, { id: "2001", name: "开平" }, { id: "2002", name: "鹤山" }, { id: "2003", name: "恩平" }] }, { id: "2004", name: "湛江", children: [{ id: "2005", name: "赤坎" }, { id: "2006", name: "霞山" }, { id: "2007", name: "坡头" }, { id: "2008", name: "麻章" }, { id: "2009", name: "遂溪" }, { id: "2010", name: "徐闻" }, { id: "2011", name: "廉江" }, { id: "2012", name: "雷州" }, { id: "2013", name: "吴川" }] }, { id: "2014", name: "茂名", children: [{ id: "2015", name: "茂南" }, { id: "2016", name: "茂港" }, { id: "2017", name: "电白" }, { id: "2018", name: "高州" }, { id: "2019", name: "化州" }, { id: "2020", name: "信宜" }] }, { id: "2021", name: "肇庆", children: [{ id: "2022", name: "端州" }, { id: "2023", name: "鼎湖" }, { id: "2024", name: "广宁" }, { id: "2025", name: "怀集" }, { id: "2026", name: "封开" }, { id: "2027", name: "德庆" }, { id: "2028", name: "高要" }, { id: "2029", name: "四会" }] }, { id: "2030", name: "惠州", children: [{ id: "2031", name: "惠城" }, { id: "2032", name: "惠阳" }, { id: "2033", name: "博罗" }, { id: "2034", name: "惠东" }, { id: "2035", name: "龙门" }] }, { id: "2036", name: "梅州", children: [{ id: "2037", name: "梅江" }, { id: "2038", name: "梅县" }, { id: "2039", name: "大埔" }, { id: "2040", name: "丰顺" }, { id: "2041", name: "五华" }, { id: "2042", name: "平远" }, { id: "2043", name: "蕉岭" }, { id: "2044", name: "兴宁" }] }, { id: "2045", name: "汕尾", children: [{ id: "2048", name: "陆河" }, { id: "2049", name: "陆丰" }, { id: "2046", name: "城区" }, { id: "2047", name: "海丰" }] }] }, { id: "2089", name: "广西", children: [{ id: "2090", name: "南宁", children: [{ id: "2091", name: "兴宁" }, { id: "2092", name: "青秀" }, { id: "2093", name: "江南" }, { id: "2094", name: "西乡塘" }, { id: "2095", name: "良庆" }, { id: "2096", name: "邕宁" }, { id: "2097", name: "武鸣" }, { id: "2098", name: "隆安" }, { id: "2099", name: "马山" }, { id: "2100", name: "上林" }, { id: "2101", name: "宾阳" }, { id: "2102", name: "横县" }] }, { id: "2103", name: "柳州", children: [{ id: "2104", name: "城中" }, { id: "2105", name: "鱼峰" }, { id: "2106", name: "柳南" }, { id: "2107", name: "柳北" }, { id: "2108", name: "柳江" }, { id: "2109", name: "柳城" }, { id: "2110", name: "鹿寨" }, { id: "2111", name: "融安" }, { id: "2112", name: "融水" }, { id: "2113", name: "三江" }] }, { id: "2114", name: "桂林", children: [{ id: "2115", name: "秀峰" }, { id: "2116", name: "叠彩" }, { id: "2117", name: "象山" }, { id: "2118", name: "七星" }, { id: "2119", name: "雁山" }, { id: "2120", name: "阳朔" }, { id: "2121", name: "临桂" }, { id: "2122", name: "灵川" }, { id: "2123", name: "全州" }, { id: "2124", name: "兴安" }, { id: "2125", name: "永福" }, { id: "2126", name: "灌阳" }, { id: "2127", name: "龙胜" }, { id: "2128", name: "资源" }, { id: "2129", name: "平乐" }, { id: "2130", name: "荔浦" }, { id: "2131", name: "恭城" }] }, { id: "2132", name: "梧州", children: [{ id: "2133", name: "万秀" }, { id: "2134", name: "蝶山" }, { id: "2135", name: "长洲" }, { id: "2136", name: "苍梧" }, { id: "2137", name: "藤县" }, { id: "2138", name: "蒙山" }, { id: "2139", name: "岑溪" }] }, { id: "2140", name: "北海", children: [{ id: "2141", name: "海城" }, { id: "2142", name: "银海" }, { id: "2143", name: "铁山港" }, { id: "2144", name: "合浦" }] }, { id: "2145", name: "防城港", children: [{ id: "2146", name: "港口" }, { id: "2147", name: "防城" }, { id: "2148", name: "上思" }, { id: "2149", name: "东兴" }] }, { id: "2150", name: "钦州", children: [{ id: "2151", name: "钦南" }, { id: "2152", name: "钦北" }, { id: "2153", name: "灵山" }, { id: "2154", name: "浦北" }] }, { id: "2155", name: "贵港", children: [{ id: "2156", name: "港北" }, { id: "2157", name: "港南" }, { id: "2158", name: "覃塘" }, { id: "2159", name: "平南" }, { id: "2160", name: "桂平" }] }, { id: "2161", name: "玉林", children: [{ id: "2162", name: "玉州" }, { id: "2163", name: "容县" }, { id: "2164", name: "陆川" }, { id: "2165", name: "博白" }, { id: "2166", name: "兴业" }, { id: "2167", name: "北流" }] }, { id: "2168", name: "百色", children: [{ id: "2169", name: "右江" }, { id: "2170", name: "田阳" }, { id: "2171", name: "田东" }, { id: "2172", name: "平果" }, { id: "2173", name: "德保" }, { id: "2174", name: "靖西" }, { id: "2175", name: "那坡" }, { id: "2176", name: "凌云" }, { id: "2177", name: "乐业" }, { id: "2178", name: "田林" }, { id: "2179", name: "西林" }, { id: "2180", name: "隆林" }] }, { id: "2181", name: "贺州", children: [{ id: "2182", name: "八步" }, { id: "2183", name: "昭平" }, { id: "2184", name: "钟山" }, { id: "2185", name: "富川" }] }, { id: "2186", name: "河池", children: [{ id: "2187", name: "金城江" }, { id: "2188", name: "南丹" }, { id: "2189", name: "天峨" }, { id: "2190", name: "凤山" }, { id: "2191", name: "东兰" }, { id: "2192", name: "罗城" }, { id: "2193", name: "环江" }, { id: "2194", name: "巴马" }, { id: "2195", name: "都安" }, { id: "2196", name: "大化" }, { id: "2197", name: "宜州" }] }, { id: "2198", name: "来宾", children: [{ id: "2199", name: "兴宾" }, { id: "2200", name: "忻城" }, { id: "2201", name: "象州" }, { id: "2202", name: "武宣" }, { id: "2203", name: "金秀" }, { id: "2204", name: "合山" }] }, { id: "2205", name: "崇左", children: [{ id: "2206", name: "江洲" }, { id: "2207", name: "扶绥" }, { id: "2208", name: "宁明" }, { id: "2209", name: "龙州" }, { id: "2210", name: "大新" }, { id: "2211", name: "天等" }, { id: "2212", name: "凭祥" }] }] }, { id: "1245", name: "江西", children: [{ id: "1281", name: "新余", children: [{ id: "1282", name: "渝水" }, { id: "1283", name: "分宜" }] }, { id: "1284", name: "鹰潭", children: [{ id: "1285", name: "月湖" }, { id: "1286", name: "余江" }, { id: "1287", name: "贵溪" }] }, { id: "1288", name: "赣州", children: [{ id: "1289", name: "章贡" }, { id: "1290", name: "赣县" }, { id: "1291", name: "信丰" }, { id: "1292", name: "大余" }, { id: "1293", name: "上犹" }, { id: "1294", name: "崇义" }, { id: "1295", name: "安远" }, { id: "1296", name: "龙南" }, { id: "1297", name: "定南" }, { id: "1298", name: "全南" }, { id: "1299", name: "宁都" }, { id: "1300", name: "于都" }, { id: "1301", name: "兴国" }, { id: "1302", name: "会昌" }, { id: "1303", name: "寻乌" }, { id: "1304", name: "石城" }, { id: "1305", name: "瑞金" }, { id: "1306", name: "南康" }] }, { id: "1307", name: "吉安", children: [{ id: "1308", name: "吉州" }, { id: "1309", name: "青原" }, { id: "1310", name: "吉安" }, { id: "1311", name: "吉水" }, { id: "1312", name: "峡江" }, { id: "1313", name: "新干" }, { id: "1314", name: "永丰" }, { id: "1315", name: "泰和" }, { id: "1316", name: "遂川" }, { id: "1317", name: "万安" }, { id: "1318", name: "安福" }, { id: "1319", name: "永新" }, { id: "1320", name: "井冈山" }] }, { id: "1321", name: "宜春", children: [{ id: "1322", name: "袁州" }, { id: "1323", name: "奉新" }, { id: "1324", name: "万载" }, { id: "1325", name: "上高" }, { id: "1326", name: "宜丰" }, { id: "1327", name: "靖安" }, { id: "1328", name: "铜鼓" }, { id: "1329", name: "丰城" }, { id: "1330", name: "樟树" }, { id: "1331", name: "高安" }] }, { id: "1332", name: "抚州", children: [{ id: "1333", name: "临川" }, { id: "1334", name: "南城" }, { id: "1335", name: "黎川" }, { id: "1336", name: "南丰" }, { id: "1337", name: "崇仁" }, { id: "1338", name: "乐安" }, { id: "1339", name: "宜黄" }, { id: "1340", name: "金溪" }, { id: "1341", name: "资溪" }, { id: "1342", name: "东乡" }, { id: "1343", name: "广昌" }] }, { id: "1344", name: "上饶", children: [{ id: "1345", name: "信州" }, { id: "1346", name: "上饶" }, { id: "1347", name: "广丰" }, { id: "1348", name: "玉山" }, { id: "1349", name: "铅山" }, { id: "1350", name: "横峰" }, { id: "1351", name: "弋阳" }, { id: "1352", name: "余干" }, { id: "1353", name: "鄱阳" }, { id: "1354", name: "万年" }, { id: "1355", name: "婺源" }, { id: "1356", name: "德兴" }] }, { id: "1246", name: "南昌", children: [{ id: "1247", name: "东湖" }, { id: "1248", name: "西湖" }, { id: "1249", name: "青云谱" }, { id: "1250", name: "湾里" }, { id: "1251", name: "青山湖" }, { id: "1252", name: "南昌" }, { id: "1253", name: "新建" }, { id: "1254", name: "安义" }, { id: "1255", name: "进贤" }] }, { id: "1256", name: "景德镇", children: [{ id: "1257", name: "昌江" }, { id: "1258", name: "珠山" }, { id: "1259", name: "浮梁" }, { id: "1260", name: "乐平" }] }, { id: "1261", name: "萍乡", children: [{ id: "1262", name: "安源" }, { id: "1263", name: "湘东" }, { id: "1264", name: "莲花" }, { id: "1265", name: "上栗" }, { id: "1266", name: "芦溪" }] }, { id: "1267", name: "九江", children: [{ id: "1280", name: "共青城" }, { id: "1268", name: "庐山" }, { id: "1269", name: "浔阳" }, { id: "1270", name: "九江" }, { id: "1271", name: "武宁" }, { id: "1272", name: "修水" }, { id: "1273", name: "永修" }, { id: "1274", name: "德安" }, { id: "1275", name: "星子" }, { id: "1276", name: "都昌" }, { id: "1277", name: "湖口" }, { id: "1278", name: "彭泽" }, { id: "1279", name: "瑞昌" }] }] }, { id: "1809", name: "湖南", children: [{ id: "1810", name: "长沙", children: [{ id: "1811", name: "芙蓉" }, { id: "1812", name: "天心" }, { id: "1813", name: "岳麓" }, { id: "1814", name: "开福" }, { id: "1815", name: "雨花" }, { id: "1816", name: "望城" }, { id: "1817", name: "长沙" }, { id: "1818", name: "宁乡" }, { id: "1819", name: "浏阳" }] }, { id: "1820", name: "株洲", children: [{ id: "1821", name: "荷塘" }, { id: "1822", name: "芦淞" }, { id: "1823", name: "石峰" }, { id: "1824", name: "天元" }, { id: "1825", name: "株洲" }, { id: "1826", name: "攸县" }, { id: "1827", name: "茶陵" }, { id: "1828", name: "炎陵" }, { id: "1829", name: "醴陵" }] }, { id: "1830", name: "湘潭", children: [{ id: "1831", name: "雨湖" }, { id: "1832", name: "岳塘" }, { id: "1833", name: "湘潭" }, { id: "1834", name: "湘乡" }, { id: "1835", name: "韶山" }] }, { id: "1836", name: "衡阳", children: [{ id: "1837", name: "珠晖" }, { id: "1838", name: "雁峰" }, { id: "1839", name: "石鼓" }, { id: "1840", name: "蒸湘" }, { id: "1841", name: "南岳区" }, { id: "1842", name: "衡阳" }, { id: "1843", name: "衡南" }, { id: "1844", name: "衡山" }, { id: "1845", name: "衡东" }, { id: "1846", name: "祁东" }, { id: "1847", name: "耒阳" }, { id: "1848", name: "常宁" }] }, { id: "1849", name: "邵阳", children: [{ id: "1850", name: "双清" }, { id: "1851", name: "大祥" }, { id: "1852", name: "北塔" }, { id: "1853", name: "邵东" }, { id: "1854", name: "新邵" }, { id: "1855", name: "邵阳" }, { id: "1856", name: "隆回" }, { id: "1857", name: "洞口" }, { id: "1858", name: "绥宁" }, { id: "1859", name: "新宁" }, { id: "1860", name: "城步苗族自治县" }, { id: "1861", name: "武冈" }] }, { id: "1862", name: "岳阳", children: [{ id: "1863", name: "岳阳楼" }, { id: "1864", name: "云溪" }, { id: "1865", name: "君山" }, { id: "1866", name: "岳阳" }, { id: "1867", name: "华容" }, { id: "1868", name: "湘阴" }, { id: "1869", name: "平江" }, { id: "1870", name: "汨罗" }, { id: "1871", name: "临湘" }] }, { id: "1872", name: "常德", children: [{ id: "1873", name: "武陵" }, { id: "1874", name: "鼎城" }, { id: "1875", name: "安乡" }, { id: "1876", name: "汉寿" }, { id: "1877", name: "澧县" }, { id: "1878", name: "临澧" }, { id: "1879", name: "桃源" }, { id: "1880", name: "石门" }, { id: "1881", name: "津市" }] }, { id: "1882", name: "张家界", children: [{ id: "1883", name: "永定" }, { id: "1884", name: "武陵源" }, { id: "1885", name: "慈利" }, { id: "1886", name: "桑植" }] }, { id: "1887", name: "益阳", children: [{ id: "1888", name: "资阳" }, { id: "1889", name: "赫山" }, { id: "1890", name: "南县" }, { id: "1891", name: "桃江" }, { id: "1892", name: "安化" }, { id: "1893", name: "沅江" }] }, { id: "1894", name: "郴州", children: [{ id: "1895", name: "北湖" }, { id: "1896", name: "苏仙" }, { id: "1897", name: "桂阳" }, { id: "1898", name: "宜章" }, { id: "1899", name: "永兴" }, { id: "1900", name: "嘉禾" }, { id: "1901", name: "临武" }, { id: "1902", name: "汝城" }, { id: "1903", name: "桂东" }, { id: "1904", name: "安仁" }, { id: "1905", name: "资兴" }] }, { id: "1906", name: "永州", children: [{ id: "1907", name: "零陵区" }, { id: "1908", name: "冷水滩" }, { id: "1909", name: "祁阳" }, { id: "1910", name: "东安" }, { id: "1911", name: "双牌" }, { id: "1912", name: "道县" }, { id: "1913", name: "江永" }, { id: "1914", name: "宁远" }, { id: "1915", name: "蓝山" }, { id: "1916", name: "新田" }, { id: "1917", name: "江华" }] }, { id: "1918", name: "怀化", children: [{ id: "1919", name: "鹤城" }, { id: "1920", name: "中方" }, { id: "1921", name: "沅陵" }, { id: "1922", name: "辰溪" }, { id: "1923", name: "溆浦" }, { id: "1924", name: "会同" }, { id: "1925", name: "麻阳" }, { id: "1926", name: "新晃" }, { id: "1927", name: "芷江" }, { id: "1928", name: "靖州" }, { id: "1929", name: "通道" }, { id: "1930", name: "洪江" }] }, { id: "1931", name: "娄底", children: [{ id: "1932", name: "娄星" }, { id: "1933", name: "双峰" }, { id: "1934", name: "新化" }, { id: "1935", name: "冷水江" }, { id: "1936", name: "涟源" }] }, { id: "1937", name: "湘西", children: [{ id: "1938", name: "吉首" }, { id: "1939", name: "泸溪" }, { id: "1940", name: "凤凰" }, { id: "1941", name: "花垣" }, { id: "1942", name: "保靖" }, { id: "1943", name: "古丈" }, { id: "1944", name: "永顺" }, { id: "1945", name: "龙山" }] }] }, { id: "1692", name: "湖北", children: [{ id: "1792", name: "随州", children: [{ id: "1793", name: "曾都" }, { id: "1794", name: "随县" }, { id: "1795", name: "广水" }] }, { id: "1796", name: "恩施", children: [{ id: "1797", name: "恩施" }, { id: "1798", name: "利川" }, { id: "1799", name: "建始" }, { id: "1800", name: "巴东" }, { id: "1801", name: "宣恩" }, { id: "1802", name: "咸丰" }, { id: "1803", name: "来凤" }, { id: "1804", name: "鹤峰" }] }, { id: "1805", name: "仙桃", children: [] }, { id: "1806", name: "潜江", children: [] }, { id: "1807", name: "天门", children: [] }, { id: "1808", name: "神农架林", children: [] }, { id: "1693", name: "武汉", children: [{ id: "1694", name: "江岸" }, { id: "1695", name: "江汉" }, { id: "1696", name: "硚口" }, { id: "1697", name: "汉阳" }, { id: "1698", name: "武昌" }, { id: "1699", name: "青山" }, { id: "1700", name: "洪山" }, { id: "1701", name: "东西湖" }, { id: "1702", name: "汉南" }, { id: "1703", name: "蔡甸" }, { id: "1704", name: "江夏" }, { id: "1705", name: "黄陂" }, { id: "1706", name: "新洲" }] }, { id: "1707", name: "黄石", children: [{ id: "1708", name: "黄石港区" }, { id: "1709", name: "西塞山区" }, { id: "1710", name: "下陆区" }, { id: "1711", name: "铁山区" }, { id: "1712", name: "阳新县" }, { id: "1713", name: "大冶市" }] }, { id: "1714", name: "十堰", children: [{ id: "1715", name: "茅箭" }, { id: "1716", name: "张湾" }, { id: "1717", name: "郧县" }, { id: "1718", name: "郧西" }, { id: "1719", name: "竹山" }, { id: "1720", name: "竹溪" }, { id: "1721", name: "房县" }, { id: "1722", name: "丹江口" }] }, { id: "1723", name: "宜昌", children: [{ id: "1724", name: "西陵" }, { id: "1725", name: "伍家岗" }, { id: "1726", name: "点军" }, { id: "1727", name: "猇亭" }, { id: "1728", name: "夷陵" }, { id: "1729", name: "远安" }, { id: "1730", name: "兴山" }, { id: "1731", name: "秭归" }, { id: "1732", name: "长阳" }, { id: "1733", name: "五峰" }, { id: "1734", name: "宜都" }, { id: "1735", name: "当阳" }, { id: "1736", name: "枝江" }] }, { id: "1737", name: "襄阳", children: [{ id: "1738", name: "襄城" }, { id: "1739", name: "樊城" }, { id: "1740", name: "襄州" }, { id: "1741", name: "南漳" }, { id: "1742", name: "谷城" }, { id: "1743", name: "保康" }, { id: "1744", name: "老河口" }, { id: "1745", name: "枣阳" }, { id: "1746", name: "宜城" }] }, { id: "1747", name: "鄂州", children: [{ id: "1748", name: "梁子湖" }, { id: "1749", name: "华容" }, { id: "1750", name: "鄂城" }] }, { id: "1751", name: "荆门", children: [{ id: "1752", name: "东宝" }, { id: "1753", name: "掇刀" }, { id: "1754", name: "京山" }, { id: "1755", name: "沙洋" }, { id: "1756", name: "钟祥" }] }, { id: "1757", name: "孝感", children: [{ id: "1758", name: "孝南" }, { id: "1759", name: "孝昌" }, { id: "1760", name: "大悟" }, { id: "1761", name: "云梦" }, { id: "1762", name: "应城" }, { id: "1763", name: "安陆" }, { id: "1764", name: "汉川" }] }, { id: "1765", name: "荆州", children: [{ id: "1766", name: "沙市" }, { id: "1767", name: "荆州" }, { id: "1768", name: "公安" }, { id: "1769", name: "监利" }, { id: "1770", name: "江陵" }, { id: "1771", name: "石首" }, { id: "1772", name: "洪湖" }, { id: "1773", name: "松滋" }] }, { id: "1774", name: "黄冈", children: [{ id: "1775", name: "黄州" }, { id: "1776", name: "团风" }, { id: "1777", name: "红安" }, { id: "1778", name: "罗田" }, { id: "1779", name: "英山" }, { id: "1780", name: "浠水" }, { id: "1781", name: "蕲春" }, { id: "1782", name: "黄梅" }, { id: "1783", name: "麻城" }, { id: "1784", name: "武穴" }] }, { id: "1785", name: "咸宁", children: [{ id: "1786", name: "咸安" }, { id: "1787", name: "嘉鱼" }, { id: "1788", name: "通城" }, { id: "1789", name: "崇阳" }, { id: "1790", name: "通山" }, { id: "1791", name: "赤壁" }] }] }, { id: "465", name: "辽宁", children: [{ id: "514", name: "丹东", children: [{ id: "515", name: "元宝" }, { id: "516", name: "振兴" }, { id: "517", name: "振安" }, { id: "518", name: "宽甸" }, { id: "519", name: "东港" }, { id: "520", name: "凤城" }] }, { id: "521", name: "锦州", children: [{ id: "522", name: "古塔" }, { id: "523", name: "凌河" }, { id: "524", name: "太和" }, { id: "525", name: "黑山" }, { id: "526", name: "义县" }, { id: "527", name: "凌海" }, { id: "528", name: "北镇市" }] }, { id: "529", name: "营口", children: [{ id: "530", name: "站前" }, { id: "531", name: "西市" }, { id: "532", name: "鲅鱼圈" }, { id: "533", name: "老边" }, { id: "534", name: "盖州" }, { id: "535", name: "大石桥" }] }, { id: "536", name: "阜新", children: [{ id: "537", name: "海州" }, { id: "538", name: "新邱" }, { id: "539", name: "太平" }, { id: "540", name: "清河门" }, { id: "541", name: "细河" }, { id: "542", name: "阜新" }, { id: "543", name: "彰武" }] }, { id: "544", name: "辽阳", children: [{ id: "545", name: "白塔" }, { id: "546", name: "文圣" }, { id: "547", name: "宏伟" }, { id: "548", name: "弓长岭" }, { id: "549", name: "太子河" }, { id: "550", name: "辽阳" }, { id: "551", name: "灯塔" }] }, { id: "552", name: "盘锦", children: [{ id: "553", name: "双台子" }, { id: "554", name: "兴隆台" }, { id: "555", name: "大洼" }, { id: "556", name: "盘山" }] }, { id: "557", name: "铁岭", children: [{ id: "558", name: "银州" }, { id: "559", name: "清河" }, { id: "560", name: "铁岭" }, { id: "561", name: "西丰" }, { id: "562", name: "昌图" }, { id: "563", name: "调兵山" }, { id: "564", name: "开原" }] }, { id: "565", name: "朝阳", children: [{ id: "566", name: "双塔" }, { id: "567", name: "龙城" }, { id: "568", name: "朝阳" }, { id: "569", name: "建平" }, { id: "570", name: "喀喇沁左翼蒙古族自治县" }, { id: "571", name: "北票" }, { id: "572", name: "凌源" }] }, { id: "573", name: "葫芦岛", children: [{ id: "574", name: "连山" }, { id: "575", name: "龙港" }, { id: "576", name: "南票" }, { id: "577", name: "绥中" }, { id: "578", name: "建昌" }, { id: "579", name: "兴城" }] }, { id: "466", name: "沈阳", children: [{ id: "467", name: "和平" }, { id: "468", name: "沈河" }, { id: "469", name: "大东" }, { id: "470", name: "皇姑" }, { id: "471", name: "铁西" }, { id: "472", name: "苏家屯" }, { id: "473", name: "浑南区" }, { id: "474", name: "沈北新" }, { id: "475", name: "于洪" }, { id: "476", name: "辽中" }, { id: "477", name: "康平" }, { id: "478", name: "法库" }, { id: "479", name: "新民" }] }, { id: "480", name: "大连", children: [{ id: "481", name: "中山" }, { id: "482", name: "西岗" }, { id: "483", name: "沙河口" }, { id: "484", name: "甘井子" }, { id: "485", name: "旅顺口" }, { id: "486", name: "金州" }, { id: "487", name: "长海" }, { id: "488", name: "瓦房店" }, { id: "489", name: "普兰店" }, { id: "490", name: "庄河" }] }, { id: "491", name: "鞍山", children: [{ id: "492", name: "铁东" }, { id: "493", name: "铁西" }, { id: "494", name: "立山" }, { id: "495", name: "千山" }, { id: "496", name: "台安" }, { id: "497", name: "岫岩" }, { id: "498", name: "海城" }] }, { id: "499", name: "抚顺", children: [{ id: "500", name: "新抚" }, { id: "501", name: "东洲" }, { id: "502", name: "望花" }, { id: "503", name: "顺城" }, { id: "504", name: "抚顺" }, { id: "505", name: "新宾" }, { id: "506", name: "清原" }] }, { id: "507", name: "本溪", children: [{ id: "512", name: "本溪" }, { id: "513", name: "桓仁" }, { id: "508", name: "平山" }, { id: "509", name: "溪湖" }, { id: "510", name: "明山" }, { id: "511", name: "南芬" }] }] }, { id: "580", name: "吉林", children: [{ id: "581", name: "长春", children: [{ id: "582", name: "南关" }, { id: "583", name: "宽城" }, { id: "584", name: "朝阳" }, { id: "585", name: "二道" }, { id: "586", name: "绿园" }, { id: "587", name: "双阳" }, { id: "588", name: "农安" }, { id: "589", name: "九台" }, { id: "590", name: "榆树" }, { id: "591", name: "德惠" }] }, { id: "592", name: "吉林", children: [{ id: "593", name: "昌邑" }, { id: "594", name: "龙潭" }, { id: "595", name: "船营" }, { id: "596", name: "丰满" }, { id: "597", name: "永吉" }, { id: "598", name: "蛟河" }, { id: "599", name: "桦甸" }, { id: "600", name: "舒兰" }, { id: "601", name: "磐石" }] }, { id: "602", name: "四平", children: [{ id: "603", name: "铁西" }, { id: "604", name: "铁东" }, { id: "605", name: "梨树" }, { id: "606", name: "伊通" }, { id: "607", name: "公主岭" }, { id: "608", name: "双辽" }] }, { id: "609", name: "辽源", children: [{ id: "610", name: "龙山" }, { id: "611", name: "西安" }, { id: "612", name: "东丰" }, { id: "613", name: "东辽" }] }, { id: "614", name: "通化", children: [{ id: "615", name: "东昌" }, { id: "616", name: "二道江" }, { id: "617", name: "通化" }, { id: "618", name: "辉南" }, { id: "619", name: "柳河" }, { id: "620", name: "梅河口" }, { id: "621", name: "集安" }] }, { id: "622", name: "白山", children: [{ id: "623", name: "浑江" }, { id: "624", name: "江源" }, { id: "625", name: "抚松" }, { id: "626", name: "靖宇" }, { id: "627", name: "长白" }, { id: "628", name: "临江" }] }, { id: "629", name: "松原", children: [{ id: "630", name: "宁江" }, { id: "631", name: "前郭尔罗斯" }, { id: "632", name: "长岭" }, { id: "633", name: "乾安" }, { id: "634", name: "扶余" }] }, { id: "635", name: "白城", children: [{ id: "636", name: "洮北" }, { id: "637", name: "镇赉" }, { id: "638", name: "通榆" }, { id: "639", name: "洮南" }, { id: "640", name: "大安" }] }, { id: "641", name: "延边", children: [{ id: "642", name: "延吉" }, { id: "643", name: "图们" }, { id: "644", name: "敦化" }, { id: "645", name: "珲春" }, { id: "646", name: "龙井" }, { id: "647", name: "和龙" }, { id: "648", name: "汪清" }, { id: "649", name: "安图" }] }] }, { id: "650", name: "黑龙江", children: [{ id: "770", name: "黑河", children: [{ id: "771", name: "爱辉" }, { id: "772", name: "嫩江" }, { id: "773", name: "逊克" }, { id: "774", name: "孙吴" }, { id: "775", name: "北安" }, { id: "776", name: "五大连池" }] }, { id: "777", name: "绥化", children: [{ id: "778", name: "北林" }, { id: "779", name: "望奎" }, { id: "780", name: "兰西" }, { id: "781", name: "青冈" }, { id: "782", name: "庆安" }, { id: "783", name: "明水" }, { id: "784", name: "绥棱" }, { id: "785", name: "安达" }, { id: "786", name: "肇东" }, { id: "787", name: "海伦" }] }, { id: "788", name: "大兴安岭", children: [{ id: "789", name: "呼玛" }, { id: "790", name: "塔河" }, { id: "791", name: "漠河" }] }, { id: "651", name: "哈尔滨", children: [{ id: "652", name: "道里" }, { id: "653", name: "南岗" }, { id: "654", name: "道外" }, { id: "655", name: "平房" }, { id: "656", name: "松北" }, { id: "657", name: "香坊" }, { id: "658", name: "呼兰" }, { id: "659", name: "阿城" }, { id: "660", name: "依兰" }, { id: "661", name: "方正" }, { id: "662", name: "宾县" }, { id: "663", name: "巴彦" }, { id: "664", name: "木兰" }, { id: "665", name: "通河" }, { id: "666", name: "延寿" }, { id: "667", name: "双城" }, { id: "668", name: "尚志" }, { id: "669", name: "五常" }] }, { id: "670", name: "齐齐哈尔", children: [{ id: "671", name: "龙沙" }, { id: "672", name: "建华" }, { id: "673", name: "铁锋" }, { id: "674", name: "昂昂溪" }, { id: "675", name: "富拉尔基" }, { id: "676", name: "碾子山" }, { id: "677", name: "梅里斯达" }, { id: "678", name: "龙江" }, { id: "679", name: "依安" }, { id: "680", name: "泰来" }, { id: "681", name: "甘南" }, { id: "682", name: "富裕" }, { id: "683", name: "克山" }, { id: "684", name: "克东" }, { id: "685", name: "拜泉" }, { id: "686", name: "讷河" }] }, { id: "687", name: "鸡西", children: [{ id: "688", name: "鸡冠" }, { id: "689", name: "恒山" }, { id: "690", name: "滴道" }, { id: "691", name: "梨树" }, { id: "692", name: "城子河" }, { id: "693", name: "麻山" }, { id: "694", name: "鸡东" }, { id: "695", name: "虎林" }, { id: "696", name: "密山" }] }, { id: "697", name: "鹤岗", children: [{ id: "698", name: "向阳" }, { id: "699", name: "工农" }, { id: "700", name: "南山" }, { id: "701", name: "兴安" }, { id: "702", name: "东山" }, { id: "703", name: "兴山" }, { id: "704", name: "萝北" }, { id: "705", name: "绥滨" }] }, { id: "706", name: "双鸭山", children: [{ id: "707", name: "尖山" }, { id: "708", name: "岭东" }, { id: "709", name: "四方台" }, { id: "710", name: "宝山" }, { id: "711", name: "集贤" }, { id: "712", name: "友谊" }, { id: "713", name: "宝清" }, { id: "714", name: "饶河" }] }, { id: "715", name: "大庆", children: [{ id: "716", name: "萨尔图" }, { id: "717", name: "龙凤" }, { id: "718", name: "让胡路" }, { id: "719", name: "红岗" }, { id: "720", name: "大同" }, { id: "721", name: "肇州" }, { id: "722", name: "肇源" }, { id: "723", name: "林甸" }, { id: "724", name: "杜尔伯特" }] }, { id: "725", name: "伊春", children: [{ id: "726", name: "伊春" }, { id: "727", name: "南岔" }, { id: "728", name: "友好" }, { id: "729", name: "西林" }, { id: "730", name: "翠峦" }, { id: "731", name: "新青" }, { id: "732", name: "美溪" }, { id: "733", name: "金山屯" }, { id: "734", name: "五营" }, { id: "735", name: "乌马河" }, { id: "736", name: "汤旺河" }, { id: "737", name: "带岭" }, { id: "738", name: "乌伊岭" }, { id: "739", name: "红星" }, { id: "740", name: "上甘岭" }, { id: "741", name: "嘉荫" }, { id: "742", name: "铁力" }] }, { id: "743", name: "佳木斯", children: [{ id: "744", name: "向阳" }, { id: "745", name: "前进" }, { id: "746", name: "东风" }, { id: "747", name: "郊区" }, { id: "748", name: "桦南" }, { id: "749", name: "桦川" }, { id: "750", name: "汤原" }, { id: "751", name: "抚远" }, { id: "752", name: "同江" }, { id: "753", name: "富锦" }] }, { id: "754", name: "七台河", children: [{ id: "755", name: "新兴" }, { id: "756", name: "桃山" }, { id: "757", name: "茄子河" }, { id: "758", name: "勃利" }] }, { id: "759", name: "牡丹江", children: [{ id: "768", name: "宁安" }, { id: "769", name: "穆棱" }, { id: "760", name: "东安" }, { id: "761", name: "阳明" }, { id: "762", name: "爱民" }, { id: "763", name: "西安" }, { id: "764", name: "东宁" }, { id: "765", name: "林口" }, { id: "766", name: "绥芬河" }, { id: "767", name: "海林" }] }] }, { id: "2807", name: "陕西", children: [{ id: "2822", name: "铜川", children: [{ id: "2823", name: "王益" }, { id: "2824", name: "印台" }, { id: "2825", name: "耀州" }, { id: "2826", name: "宜君" }] }, { id: "2827", name: "宝鸡", children: [{ id: "2828", name: "渭滨" }, { id: "2829", name: "金台" }, { id: "2830", name: "陈仓" }, { id: "2831", name: "凤翔" }, { id: "2832", name: "岐山" }, { id: "2833", name: "扶风" }, { id: "2834", name: "眉县" }, { id: "2835", name: "陇县" }, { id: "2836", name: "千阳" }, { id: "2837", name: "麟游" }, { id: "2838", name: "凤县" }, { id: "2839", name: "太白" }] }, { id: "2840", name: "咸阳", children: [{ id: "2841", name: "秦都" }, { id: "2842", name: "杨凌" }, { id: "2843", name: "渭城" }, { id: "2844", name: "三原" }, { id: "2845", name: "泾阳" }, { id: "2846", name: "乾县" }, { id: "2847", name: "礼泉" }, { id: "2848", name: "永寿" }, { id: "2849", name: "彬县" }, { id: "2850", name: "长武" }, { id: "2851", name: "旬邑" }, { id: "2852", name: "淳化" }, { id: "2853", name: "武功" }, { id: "2854", name: "兴平" }] }, { id: "2855", name: "渭南", children: [{ id: "2856", name: "临渭" }, { id: "2857", name: "华州区" }, { id: "2858", name: "潼关" }, { id: "2859", name: "大荔" }, { id: "2860", name: "合阳" }, { id: "2861", name: "澄城" }, { id: "2862", name: "蒲城" }, { id: "2863", name: "白水" }, { id: "2864", name: "富平" }, { id: "2865", name: "韩城" }, { id: "2866", name: "华阴" }] }, { id: "2867", name: "延安", children: [{ id: "2868", name: "宝塔" }, { id: "2869", name: "延长" }, { id: "2870", name: "延川" }, { id: "2871", name: "子长" }, { id: "2872", name: "安塞" }, { id: "2873", name: "志丹" }, { id: "2874", name: "吴起" }, { id: "2875", name: "甘泉" }, { id: "2876", name: "富县" }, { id: "2877", name: "洛川" }, { id: "2878", name: "宜川" }, { id: "2879", name: "黄龙" }, { id: "2880", name: "黄陵" }] }, { id: "2881", name: "汉中", children: [{ id: "2882", name: "汉台" }, { id: "2883", name: "南郑" }, { id: "2884", name: "城固" }, { id: "2885", name: "洋县" }, { id: "2886", name: "西乡" }, { id: "2887", name: "勉县" }, { id: "2888", name: "宁强" }, { id: "2889", name: "略阳" }, { id: "2890", name: "镇巴" }, { id: "2891", name: "留坝" }, { id: "2892", name: "佛坪" }] }, { id: "2893", name: "榆林", children: [{ id: "2894", name: "榆阳" }, { id: "2895", name: "神木" }, { id: "2896", name: "府谷" }, { id: "2897", name: "横山" }, { id: "2898", name: "靖边" }, { id: "2899", name: "定边" }, { id: "2900", name: "绥德" }, { id: "2901", name: "米脂" }, { id: "2902", name: "佳县" }, { id: "2903", name: "吴堡" }, { id: "2904", name: "清涧" }, { id: "2905", name: "子洲" }] }, { id: "2906", name: "安康", children: [{ id: "2907", name: "汉滨" }, { id: "2908", name: "汉阴" }, { id: "2909", name: "石泉" }, { id: "2910", name: "宁陕" }, { id: "2911", name: "紫阳" }, { id: "2912", name: "岚皋" }, { id: "2913", name: "平利" }, { id: "2914", name: "镇坪" }, { id: "2915", name: "旬阳" }, { id: "2916", name: "白河" }] }, { id: "2917", name: "商洛", children: [{ id: "2918", name: "商州" }, { id: "2919", name: "洛南" }, { id: "2920", name: "丹凤" }, { id: "2921", name: "商南" }, { id: "2922", name: "山阳" }, { id: "2923", name: "镇安" }, { id: "2924", name: "柞水" }] }, { id: "2808", name: "西安", children: [{ id: "2816", name: "临潼" }, { id: "2817", name: "长安" }, { id: "2818", name: "蓝田" }, { id: "2819", name: "周至" }, { id: "2820", name: "户县" }, { id: "2821", name: "高陵" }, { id: "2809", name: "新城" }, { id: "2810", name: "碑林" }, { id: "2811", name: "莲湖" }, { id: "2812", name: "灞桥" }, { id: "2813", name: "未央" }, { id: "2814", name: "雁塔" }, { id: "2815", name: "阎良" }] }] }, { id: "2925", name: "甘肃", children: [{ id: "2926", name: "兰州", children: [{ id: "2927", name: "城关" }, { id: "2928", name: "七里河" }, { id: "2929", name: "西固" }, { id: "2930", name: "安宁" }, { id: "2931", name: "红古" }, { id: "2932", name: "永登" }, { id: "2933", name: "皋兰" }, { id: "2934", name: "榆中" }] }, { id: "2935", name: "嘉峪关", children: [] }, { id: "2936", name: "金昌", children: [{ id: "2937", name: "金川" }, { id: "2938", name: "永昌" }] }, { id: "2939", name: "白银", children: [{ id: "2940", name: "白银" }, { id: "2941", name: "平川" }, { id: "2942", name: "靖远" }, { id: "2943", name: "会宁" }, { id: "2944", name: "景泰" }] }, { id: "2945", name: "天水", children: [{ id: "2946", name: "秦州" }, { id: "2947", name: "麦积" }, { id: "2948", name: "清水" }, { id: "2949", name: "秦安" }, { id: "2950", name: "甘谷" }, { id: "2951", name: "武山" }, { id: "2952", name: "张家川" }] }, { id: "2953", name: "武威", children: [{ id: "2954", name: "凉州" }, { id: "2955", name: "民勤" }, { id: "2956", name: "古浪" }, { id: "2957", name: "天祝" }] }, { id: "2958", name: "张掖", children: [{ id: "2959", name: "甘州" }, { id: "2960", name: "肃南" }, { id: "2961", name: "民乐" }, { id: "2962", name: "临泽" }, { id: "2963", name: "高台" }, { id: "2964", name: "山丹" }] }, { id: "2965", name: "平凉", children: [{ id: "2966", name: "崆峒" }, { id: "2967", name: "泾川" }, { id: "2968", name: "灵台" }, { id: "2969", name: "崇信" }, { id: "2970", name: "华亭" }, { id: "2971", name: "庄浪" }, { id: "2972", name: "静宁" }] }, { id: "2973", name: "酒泉", children: [{ id: "2974", name: "肃州" }, { id: "2975", name: "金塔" }, { id: "2976", name: "瓜州" }, { id: "2977", name: "肃北" }, { id: "2978", name: "阿克塞哈萨克族自治县" }, { id: "2979", name: "玉门" }, { id: "2980", name: "敦煌" }] }, { id: "2981", name: "庆阳", children: [{ id: "2982", name: "西峰" }, { id: "2983", name: "庆城" }, { id: "2984", name: "环县" }, { id: "2985", name: "华池" }, { id: "2986", name: "合水" }, { id: "2987", name: "正宁" }, { id: "2988", name: "宁县" }, { id: "2989", name: "镇原" }] }, { id: "2990", name: "定西", children: [{ id: "2991", name: "安定" }, { id: "2992", name: "通渭" }, { id: "2993", name: "陇西" }, { id: "2994", name: "渭源" }, { id: "2995", name: "临洮" }, { id: "2996", name: "漳县" }, { id: "2997", name: "岷县" }] }, { id: "2998", name: "陇南", children: [{ id: "2999", name: "武都" }, { id: "3000", name: "成县" }, { id: "3001", name: "文县" }, { id: "3002", name: "宕昌" }, { id: "3003", name: "康县" }, { id: "3004", name: "西和" }, { id: "3005", name: "礼县" }, { id: "3006", name: "徽县" }, { id: "3007", name: "两当" }] }, { id: "3008", name: "临夏", children: [{ id: "3009", name: "临夏" }, { id: "3010", name: "临夏县" }, { id: "3011", name: "康乐" }, { id: "3012", name: "永靖" }, { id: "3013", name: "广河" }, { id: "3014", name: "和政" }, { id: "3015", name: "东乡族自治县" }, { id: "3016", name: "积石山" }] }, { id: "3017", name: "甘南", children: [{ id: "3018", name: "合作" }, { id: "3019", name: "临潭" }, { id: "3020", name: "卓尼" }, { id: "3021", name: "舟曲" }, { id: "3022", name: "迭部" }, { id: "3023", name: "玛曲" }, { id: "3024", name: "碌曲" }, { id: "3025", name: "夏河" }] }] }, { id: "3078", name: "宁夏", children: [{ id: "3079", name: "银川", children: [{ id: "3080", name: "兴庆" }, { id: "3081", name: "西夏" }, { id: "3082", name: "金凤" }, { id: "3083", name: "永宁" }, { id: "3084", name: "贺兰" }, { id: "3085", name: "灵武" }] }, { id: "3086", name: "石嘴山", children: [{ id: "3087", name: "大武口" }, { id: "3088", name: "惠农" }, { id: "3089", name: "平罗" }] }, { id: "3090", name: "吴忠", children: [{ id: "3091", name: "利通" }, { id: "3092", name: "红寺堡" }, { id: "3093", name: "盐池" }, { id: "3094", name: "同心" }, { id: "3095", name: "青铜峡" }] }, { id: "3096", name: "固原", children: [{ id: "3097", name: "原州" }, { id: "3098", name: "西吉" }, { id: "3099", name: "隆德" }, { id: "3100", name: "泾源" }, { id: "3101", name: "彭阳" }] }, { id: "3102", name: "中卫", children: [{ id: "3103", name: "沙坡头" }, { id: "3104", name: "中宁" }, { id: "3105", name: "海原" }] }] }, { id: "351", name: "内蒙古", children: [{ id: "352", name: "呼和浩特", children: [{ id: "353", name: "新城" }, { id: "354", name: "回民" }, { id: "355", name: "玉泉" }, { id: "356", name: "赛罕" }, { id: "357", name: "土默特左旗" }, { id: "358", name: "托克托" }, { id: "359", name: "和林格尔" }, { id: "360", name: "清水河" }, { id: "361", name: "武川" }] }, { id: "362", name: "包头", children: [{ id: "363", name: "东河" }, { id: "364", name: "昆都仑" }, { id: "365", name: "青山" }, { id: "366", name: "石拐" }, { id: "367", name: "白云鄂博矿" }, { id: "368", name: "九原" }, { id: "369", name: "土默特右旗" }, { id: "370", name: "固阳" }, { id: "371", name: "达尔罕茂明安联合旗" }] }, { id: "372", name: "乌海", children: [{ id: "373", name: "海勃湾" }, { id: "374", name: "海南" }, { id: "375", name: "乌达" }] }, { id: "376", name: "赤峰", children: [{ id: "377", name: "红山" }, { id: "378", name: "元宝山" }, { id: "379", name: "松山" }, { id: "380", name: "阿鲁科尔沁旗" }, { id: "381", name: "巴林左旗" }, { id: "382", name: "巴林右旗" }, { id: "383", name: "林西" }, { id: "384", name: "克什克腾旗" }, { id: "385", name: "翁牛特旗" }, { id: "386", name: "喀喇沁旗" }, { id: "387", name: "宁城" }, { id: "388", name: "敖汉旗" }] }, { id: "389", name: "通辽", children: [{ id: "390", name: "科尔沁" }, { id: "391", name: "科尔沁左翼中旗" }, { id: "392", name: "科尔沁左翼后旗" }, { id: "393", name: "开鲁" }, { id: "394", name: "库伦旗" }, { id: "395", name: "奈曼旗" }, { id: "396", name: "扎鲁特旗" }, { id: "397", name: "霍林郭勒" }] }, { id: "398", name: "鄂尔多斯", children: [{ id: "399", name: "东胜" }, { id: "400", name: "达拉特" }, { id: "401", name: "准格尔" }, { id: "402", name: "鄂托克前" }, { id: "403", name: "鄂托克" }, { id: "404", name: "杭锦" }, { id: "405", name: "乌审" }, { id: "406", name: "伊金霍洛" }] }, { id: "407", name: "呼伦贝尔", children: [{ id: "408", name: "海拉尔" }, { id: "409", name: "阿荣旗" }, { id: "410", name: "莫力达瓦达斡尔族自治旗" }, { id: "411", name: "鄂伦春自治旗" }, { id: "412", name: "鄂温克族自治旗" }, { id: "413", name: "陈巴尔虎旗" }, { id: "414", name: "新巴尔虎左旗" }, { id: "415", name: "新巴尔虎右旗" }, { id: "416", name: "满洲里" }, { id: "417", name: "牙克石" }, { id: "418", name: "扎兰屯" }, { id: "419", name: "额尔古纳" }, { id: "420", name: "根河" }] }, { id: "421", name: "巴彦淖尔", children: [{ id: "422", name: "临河" }, { id: "423", name: "五原" }, { id: "424", name: "磴口" }, { id: "425", name: "乌拉特前旗" }, { id: "426", name: "乌拉特中旗" }, { id: "427", name: "乌拉特后旗" }, { id: "428", name: "杭锦后旗" }] }, { id: "429", name: "乌兰察布", children: [{ id: "430", name: "集宁" }, { id: "431", name: "卓资" }, { id: "432", name: "化德" }, { id: "433", name: "商都" }, { id: "434", name: "兴和" }, { id: "435", name: "凉城" }, { id: "436", name: "察哈尔右翼前旗" }, { id: "437", name: "察哈尔右翼中旗" }, { id: "438", name: "察哈尔右翼后旗" }, { id: "439", name: "四子王旗" }, { id: "440", name: "丰镇" }] }, { id: "441", name: "兴安盟", children: [{ id: "442", name: "乌兰浩特" }, { id: "443", name: "阿尔山" }, { id: "444", name: "科尔沁右翼前旗" }, { id: "445", name: "科尔沁右翼中旗" }, { id: "446", name: "扎赉特旗" }, { id: "447", name: "突泉" }] }, { id: "448", name: "锡林郭勒", children: [{ id: "449", name: "二连浩特" }, { id: "450", name: "锡林浩特旗" }, { id: "451", name: "阿巴嘎旗" }, { id: "452", name: "苏尼特左旗" }, { id: "453", name: "苏尼特右旗" }, { id: "454", name: "东乌珠穆沁旗" }, { id: "455", name: "西乌珠穆沁旗" }, { id: "456", name: "太仆寺旗" }, { id: "457", name: "镶黄旗" }, { id: "458", name: "正镶旗" }, { id: "459", name: "正蓝旗" }, { id: "460", name: "多伦县" }] }, { id: "461", name: "阿拉善", children: [{ id: "462", name: "阿拉善左旗" }, { id: "463", name: "阿拉善右旗" }, { id: "464", name: "额济纳旗" }] }] }, { id: "3026", name: "青海", children: [{ id: "3072", name: "海西", children: [{ id: "3073", name: "格尔木" }, { id: "3074", name: "德令哈" }, { id: "3075", name: "乌兰" }, { id: "3076", name: "都兰" }, { id: "3077", name: "天峻" }] }, { id: "3027", name: "西宁", children: [{ id: "3028", name: "城东" }, { id: "3029", name: "城中" }, { id: "3030", name: "城西" }, { id: "3031", name: "城北" }, { id: "3032", name: "大通" }, { id: "3033", name: "湟中" }, { id: "3034", name: "湟源" }] }, { id: "3035", name: "海东", children: [{ id: "3036", name: "平安" }, { id: "3037", name: "民和" }, { id: "3038", name: "乐都" }, { id: "3039", name: "互助" }, { id: "3040", name: "化隆" }, { id: "3041", name: "循化" }] }, { id: "3042", name: "海北", children: [{ id: "3043", name: "门源" }, { id: "3044", name: "祁连" }, { id: "3045", name: "海晏" }, { id: "3046", name: "刚察" }] }, { id: "3047", name: "黄南", children: [{ id: "3048", name: "同仁" }, { id: "3049", name: "尖扎" }, { id: "3050", name: "泽库" }, { id: "3051", name: "河南" }] }, { id: "3052", name: "海南", children: [{ id: "3053", name: "共和" }, { id: "3054", name: "同德" }, { id: "3055", name: "贵德" }, { id: "3056", name: "兴海" }, { id: "3057", name: "贵南" }] }, { id: "3058", name: "果洛", children: [{ id: "3059", name: "玛沁" }, { id: "3060", name: "班玛" }, { id: "3061", name: "甘德" }, { id: "3062", name: "达日" }, { id: "3063", name: "久治" }, { id: "3064", name: "玛多" }] }, { id: "3065", name: "玉树", children: [{ id: "3066", name: "玉树" }, { id: "3067", name: "杂多" }, { id: "3068", name: "称多" }, { id: "3069", name: "治多" }, { id: "3070", name: "囊谦" }, { id: "3071", name: "曲麻莱" }] }] }, { id: "3106", name: "新疆", children: [{ id: "3161", name: "克孜勒苏", children: [{ id: "3162", name: "阿图什市" }, { id: "3163", name: "阿克陶县" }, { id: "3164", name: "阿合奇县" }, { id: "3165", name: "乌恰县" }] }, { id: "3166", name: "喀什", children: [{ id: "3167", name: "喀什" }, { id: "3168", name: "疏附" }, { id: "3169", name: "疏勒" }, { id: "3170", name: "英吉沙" }, { id: "3171", name: "泽普" }, { id: "3172", name: "莎车" }, { id: "3173", name: "叶城" }, { id: "3174", name: "麦盖提" }, { id: "3175", name: "岳普湖" }, { id: "3176", name: "伽师" }, { id: "3177", name: "巴楚" }, { id: "3178", name: "塔什库尔干塔吉克自治县" }] }, { id: "3179", name: "和田", children: [{ id: "3180", name: "和田" }, { id: "3181", name: "和田" }, { id: "3182", name: "墨玉" }, { id: "3183", name: "皮山" }, { id: "3184", name: "洛浦" }, { id: "3185", name: "策勒" }, { id: "3186", name: "于田" }, { id: "3187", name: "民丰" }] }, { id: "3188", name: "伊犁", children: [{ id: "3189", name: "伊宁" }, { id: "3190", name: "奎屯" }, { id: "3191", name: "伊宁" }, { id: "3192", name: "察布查尔锡伯自治县" }, { id: "3193", name: "霍城县" }, { id: "3194", name: "巩留" }, { id: "3195", name: "新源" }, { id: "3196", name: "昭苏" }, { id: "3197", name: "特克斯县" }, { id: "3198", name: "尼勒克县" }] }, { id: "3199", name: "塔城", children: [{ id: "3200", name: "塔城" }, { id: "3201", name: "乌苏" }, { id: "3202", name: "额敏" }, { id: "3203", name: "沙湾" }, { id: "3204", name: "托里" }, { id: "3205", name: "裕民" }, { id: "3206", name: "和布克赛尔蒙古自治县" }] }, { id: "3207", name: "阿勒泰", children: [{ id: "3208", name: "阿勒泰" }, { id: "3209", name: "布尔津" }, { id: "3210", name: "富蕴" }, { id: "3211", name: "福海" }, { id: "3212", name: "哈巴河" }, { id: "3213", name: "青河县" }, { id: "3214", name: "吉木乃" }] }, { id: "3215", name: "石河子", children: [] }, { id: "3216", name: "阿拉尔", children: [] }, { id: "3217", name: "图木舒克", children: [] }, { id: "3218", name: "五家渠", children: [] }, { id: "3107", name: "乌鲁木齐", children: [{ id: "3108", name: "天山" }, { id: "3109", name: "沙依巴克" }, { id: "3110", name: "新市" }, { id: "3111", name: "水磨沟" }, { id: "3112", name: "头屯河" }, { id: "3113", name: "达坂城" }, { id: "3114", name: "米东" }, { id: "3115", name: "乌鲁木齐" }] }, { id: "3116", name: "克拉玛依", children: [{ id: "3117", name: "独山子" }, { id: "3118", name: "克拉玛依" }, { id: "3119", name: "白碱滩" }, { id: "3120", name: "乌尔禾" }] }, { id: "3121", name: "吐鲁番", children: [{ id: "3122", name: "高昌区" }, { id: "3123", name: "鄯善县" }, { id: "3124", name: "托克逊县" }] }, { id: "3125", name: "哈密", children: [{ id: "3126", name: "伊州区" }, { id: "3127", name: "巴里坤哈萨克自治县" }, { id: "3128", name: "伊吾县" }] }, { id: "3129", name: "昌吉", children: [{ id: "3130", name: "昌吉市" }, { id: "3131", name: "阜康市" }, { id: "3132", name: "呼图壁县" }, { id: "3133", name: "玛纳斯县" }, { id: "3134", name: "奇台县" }, { id: "3135", name: "吉木萨尔县" }, { id: "3136", name: "木垒哈萨克自治县" }] }, { id: "3137", name: "博尔塔拉", children: [{ id: "3138", name: "博乐" }, { id: "3139", name: "精河" }, { id: "3140", name: "温泉" }] }, { id: "3141", name: "巴音郭楞", children: [{ id: "3142", name: "库尔勒市" }, { id: "3143", name: "轮台县" }, { id: "3144", name: "尉犁县" }, { id: "3145", name: "若羌县" }, { id: "3146", name: "且末县" }, { id: "3147", name: "焉耆回族自治县" }, { id: "3148", name: "和静县" }, { id: "3149", name: "和硕县" }, { id: "3150", name: "博湖县" }] }, { id: "3151", name: "阿克苏", children: [{ id: "3152", name: "阿克苏市" }, { id: "3153", name: "温宿县" }, { id: "3154", name: "库车县" }, { id: "3155", name: "沙雅县" }, { id: "3156", name: "新和县" }, { id: "3157", name: "拜城县" }, { id: "3158", name: "乌什县" }, { id: "3159", name: "阿瓦提县" }, { id: "3160", name: "柯坪县" }] }] }, { id: "2240", name: "重庆", children: [{ id: "2241", name: "万州", children: [] }, { id: "2242", name: "涪陵", children: [] }, { id: "2243", name: "渝中", children: [] }, { id: "2244", name: "大渡口", children: [] }, { id: "2245", name: "江北", children: [] }, { id: "2246", name: "沙坪坝", children: [] }, { id: "2247", name: "九龙坡", children: [] }, { id: "2248", name: "南岸", children: [] }, { id: "2249", name: "北碚", children: [] }, { id: "2250", name: "綦江", children: [] }, { id: "2251", name: "大足", children: [] }, { id: "2252", name: "渝北", children: [] }, { id: "2253", name: "巴南", children: [] }, { id: "2254", name: "黔江", children: [] }, { id: "2255", name: "长寿", children: [] }, { id: "2256", name: "江津", children: [] }, { id: "2257", name: "合川", children: [] }, { id: "2258", name: "永川", children: [] }, { id: "2259", name: "南川", children: [] }, { id: "2260", name: "潼南", children: [] }, { id: "2261", name: "铜梁", children: [] }, { id: "2262", name: "荣昌", children: [] }, { id: "2263", name: "璧山", children: [] }, { id: "2264", name: "梁平", children: [] }, { id: "2265", name: "城口", children: [] }, { id: "2266", name: "丰都", children: [] }, { id: "2267", name: "垫江", children: [] }, { id: "2268", name: "武隆", children: [] }, { id: "2269", name: "忠县", children: [] }, { id: "2270", name: "开县", children: [] }, { id: "2271", name: "云阳", children: [] }, { id: "2272", name: "奉节", children: [] }, { id: "2273", name: "巫山", children: [] }, { id: "2274", name: "巫溪", children: [] }, { id: "2275", name: "石柱", children: [] }, { id: "2276", name: "秀山", children: [] }, { id: "2277", name: "酉阳", children: [] }, { id: "2278", name: "彭水", children: [] }] }, { id: "18", name: "天津", children: [{ id: "19", name: "和平", children: [] }, { id: "20", name: "河东", children: [] }, { id: "21", name: "河西", children: [] }, { id: "22", name: "南开", children: [] }, { id: "23", name: "河北", children: [] }, { id: "24", name: "红桥", children: [] }, { id: "25", name: "东丽", children: [] }, { id: "26", name: "西青", children: [] }, { id: "27", name: "津南", children: [] }, { id: "28", name: "北辰", children: [] }, { id: "29", name: "武清", children: [] }, { id: "30", name: "宝坻", children: [] }, { id: "31", name: "滨海", children: [] }, { id: "32", name: "宁河", children: [] }, { id: "33", name: "静海", children: [] }, { id: "34", name: "蓟县", children: [] }] }, { id: "2726", name: "西藏", children: [{ id: "2727", name: "拉萨", children: [{ id: "2728", name: "城关" }, { id: "2729", name: "林周" }, { id: "2730", name: "当雄" }, { id: "2731", name: "尼木" }, { id: "2732", name: "曲水" }, { id: "2733", name: "堆龙德庆" }, { id: "2734", name: "达孜" }, { id: "2735", name: "墨竹工卡" }] }, { id: "2736", name: "昌都", children: [{ id: "2737", name: "卡若区" }, { id: "2738", name: "江达" }, { id: "2739", name: "贡觉" }, { id: "2740", name: "类乌齐" }, { id: "2741", name: "丁青" }, { id: "2742", name: "察雅" }, { id: "2743", name: "八宿" }, { id: "2744", name: "左贡" }, { id: "2745", name: "芒康" }, { id: "2746", name: "洛隆" }, { id: "2747", name: "边坝" }] }, { id: "2748", name: "山南", children: [{ id: "2749", name: "乃东" }, { id: "2750", name: "扎囊" }, { id: "2751", name: "贡嘎" }, { id: "2752", name: "桑日" }, { id: "2753", name: "琼结" }, { id: "2754", name: "曲松" }, { id: "2755", name: "措美" }, { id: "2756", name: "洛扎" }, { id: "2757", name: "加查" }, { id: "2758", name: "隆子" }, { id: "2759", name: "错那" }, { id: "2760", name: "浪卡子" }] }, { id: "2761", name: "日喀则", children: [{ id: "2762", name: "桑珠孜区" }, { id: "2763", name: "南木林" }, { id: "2764", name: "江孜" }, { id: "2765", name: "定日" }, { id: "2766", name: "萨迦" }, { id: "2767", name: "拉孜" }, { id: "2768", name: "昂仁" }, { id: "2769", name: "谢通门" }, { id: "2770", name: "白朗" }, { id: "2771", name: "仁布" }, { id: "2772", name: "康马" }, { id: "2773", name: "定结" }, { id: "2774", name: "仲巴" }, { id: "2775", name: "亚东" }, { id: "2776", name: "吉隆" }, { id: "2777", name: "聂拉木" }, { id: "2778", name: "萨嘎" }, { id: "2779", name: "岗巴" }] }, { id: "2780", name: "那曲", children: [{ id: "2781", name: "那曲" }, { id: "2782", name: "嘉黎" }, { id: "2783", name: "比如" }, { id: "2784", name: "聂荣" }, { id: "2785", name: "安多" }, { id: "2786", name: "申扎" }, { id: "2787", name: "索县" }, { id: "2788", name: "班戈" }, { id: "2789", name: "巴青" }, { id: "2790", name: "尼玛" }] }, { id: "2791", name: "阿里", children: [{ id: "2792", name: "普兰" }, { id: "2793", name: "札达" }, { id: "2794", name: "噶尔" }, { id: "2795", name: "日土" }, { id: "2796", name: "革吉" }, { id: "2797", name: "改则" }, { id: "2798", name: "措勤" }] }, { id: "2799", name: "林芝", children: [{ id: "2800", name: "巴宜区" }, { id: "2801", name: "工布江达" }, { id: "2802", name: "米林" }, { id: "2803", name: "墨脱" }, { id: "2804", name: "波密" }, { id: "2805", name: "察隅" }, { id: "2806", name: "朗县" }] }] }, { id: "2213", name: "海南", children: [{ id: "2214", name: "海口", children: [{ id: "2215", name: "秀英" }, { id: "2216", name: "龙华" }, { id: "2217", name: "琼山" }, { id: "2218", name: "美兰" }] }, { id: "2219", name: "三亚", children: [] }, { id: "2220", name: "三沙", children: [{ id: "2221", name: "西沙群" }, { id: "2222", name: "南沙群" }, { id: "2223", name: "中沙群岛" }] }, { id: "2224", name: "五指山", children: [] }, { id: "2225", name: "琼海", children: [] }, { id: "2226", name: "儋州", children: [] }, { id: "2227", name: "文昌", children: [] }, { id: "2228", name: "万宁", children: [] }, { id: "2229", name: "东方", children: [] }, { id: "2230", name: "定安", children: [] }, { id: "2231", name: "屯昌", children: [] }, { id: "2232", name: "澄迈", children: [] }, { id: "2233", name: "临高", children: [] }, { id: "2234", name: "白沙", children: [] }, { id: "2235", name: "昌江", children: [] }, { id: "2236", name: "乐东", children: [] }, { id: "2237", name: "陵水", children: [] }, { id: "2238", name: "保亭", children: [] }, { id: "2239", name: "琼中", children: [] }] }, { id: "3292", name: "香港", children: [{ id: "3293", name: "香港岛", children: [{ id: "3301", name: "中西" }, { id: "3302", name: "湾仔" }, { id: "3303", name: "东区" }, { id: "3304", name: "南区" }] }, { id: "3294", name: "九龙", children: [{ id: "3296", name: "九龙城" }, { id: "3297", name: "油尖旺" }, { id: "3298", name: "深水埗" }, { id: "3299", name: "黄大仙" }, { id: "3300", name: "观塘" }] }, { id: "3295", name: "新界", children: [{ id: "3305", name: "北区" }, { id: "3306", name: "大埔" }, { id: "3307", name: "沙田" }, { id: "3308", name: "西贡" }, { id: "3309", name: "元朗" }, { id: "3310", name: "屯门" }, { id: "3311", name: "荃湾" }, { id: "3312", name: "葵青" }, { id: "3313", name: "离岛" }] }] }, { id: "3314", name: "澳门", children: [{ id: "3315", name: "半岛", children: [] }, { id: "3316", name: "离岛", children: [] }] }, { id: "3219", name: "台湾", children: [{ id: "3220", name: "台北", children: [{ id: "3241", name: "中正" }, { id: "3242", name: "大同" }, { id: "3243", name: "中山" }, { id: "3244", name: "松山" }, { id: "3245", name: "大安" }, { id: "3246", name: "万华" }, { id: "3247", name: "信义" }, { id: "3248", name: "士林" }, { id: "3249", name: "北投" }, { id: "3250", name: "内湖" }, { id: "3251", name: "南港" }, { id: "3252", name: "文山" }] }, { id: "3221", name: "高雄", children: [{ id: "3255", name: "新兴" }, { id: "3256", name: "前金" }, { id: "3257", name: "芩雅" }, { id: "3258", name: "盐埕" }, { id: "3259", name: "鼓山" }, { id: "3260", name: "旗津" }, { id: "3261", name: "前镇" }, { id: "3262", name: "三民" }, { id: "3263", name: "左营" }, { id: "3264", name: "楠梓" }, { id: "3265", name: "小港" }] }, { id: "3222", name: "台南", children: [{ id: "3273", name: "中西" }, { id: "3274", name: "东区" }, { id: "3275", name: "南区" }, { id: "3276", name: "北区" }, { id: "3277", name: "安平" }, { id: "3278", name: "安南" }] }, { id: "3223", name: "台中", children: [{ id: "3282", name: "中区" }, { id: "3283", name: "东区" }, { id: "3284", name: "南区" }, { id: "3285", name: "西区" }, { id: "3286", name: "北区" }, { id: "3287", name: "北屯" }, { id: "3288", name: "西屯" }, { id: "3289", name: "南屯" }] }, { id: "3224", name: "金门", children: [] }, { id: "3225", name: "南投", children: [] }, { id: "3226", name: "基隆", children: [{ id: "3266", name: "仁爱" }, { id: "3267", name: "信义" }, { id: "3268", name: "中正" }, { id: "3269", name: "中山" }, { id: "3270", name: "安乐" }, { id: "3271", name: "暖暖" }, { id: "3272", name: "七堵" }] }, { id: "3227", name: "新竹", children: [{ id: "3279", name: "东区" }, { id: "3280", name: "北区" }, { id: "3281", name: "香山" }] }, { id: "3228", name: "嘉义", children: [{ id: "3290", name: "东区" }, { id: "3291", name: "西区" }] }, { id: "3229", name: "新北", children: [] }, { id: "3230", name: "宜兰", children: [] }, { id: "3231", name: "新竹", children: [] }, { id: "3232", name: "桃园", children: [] }, { id: "3233", name: "苗栗", children: [] }, { id: "3234", name: "彰化", children: [] }, { id: "3235", name: "嘉义", children: [{ id: "3253", name: "东区" }, { id: "3254", name: "西区" }] }, { id: "3236", name: "云林", children: [] }, { id: "3237", name: "屏东", children: [] }, { id: "3238", name: "台东", children: [] }, { id: "3239", name: "花莲", children: [] }, { id: "3240", name: "澎湖", children: [] }] }];

	var getCity = {
	    /**
	     * 获取汉字的拼音首字母
	     * @param str 汉字字符串
	     * @param polyphone 是否支持多音字，默认false，如果为true，会返回所有可能的组合数组
	     */
	    getPro: function getPro() {
	        return areas;
	    },
	    getCity: function getCity(id) {
	        var cityList = [];
	        areas.forEach(function (item) {
	            if (item.id == id) {
	                cityList.push(item);
	            }
	        });
	        return cityList;
	    },
	    getCountry: function getCountry(id) {
	        var countryList = [];
	        areas.forEach(function (item) {
	            if (item.children != '') {
	                item.children.forEach(function (children) {
	                    if (children.id == id) {
	                        countryList.push(children);
	                    }
	                });
	            }
	        });
	        return countryList;
	    }
	};

	exports.default = { getCity: getCity };
	module.exports = exports["default"];

/***/ }),

/***/ 778:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["wrapper"]
	  }, [_c('navbar', {
	    attrs: {
	      "title": _vm.title
	    },
	    on: {
	      "goback": _vm.goback
	    }
	  }), _c('scroller', {
	    staticClass: ["scroller"],
	    attrs: {
	      "show-": "",
	      "showScrollbar": "false"
	    }
	  }, [_vm._l((_vm.dataList), function(item) {
	    return (_vm.urlType == 'pro') ? _c('div', {
	      staticClass: ["cell-row-row", "cell-line", "mt0", "cell-bottom-clear", "active"],
	      on: {
	        "click": function($event) {
	          _vm.checkChange(item.id, item.name, item.children)
	        }
	      }
	    }, [_c('div', {
	      staticClass: ["flex-row", "ml10"]
	    }, [_c('text', {
	      staticClass: ["title", "ml10", "sss"]
	    }, [_vm._v(_vm._s(item.name))])]), (_vm.listId == item.id) ? _c('div', [_c('text', {
	      staticClass: ["check"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]) : _vm._e()]) : _vm._e()
	  }), _vm._l((_vm.dataList), function(item) {
	    return (_vm.urlType == 'city') ? _c('div', _vm._l((item.children), function(city) {
	      return _c('div', {
	        staticClass: ["cell-row-row", "cell-line", "mt0", "cell-bottom-clear", "active"],
	        on: {
	          "click": function($event) {
	            _vm.checkChange(city.id, city.name, city.children)
	          }
	        }
	      }, [_c('div', {
	        staticClass: ["flex-row", "ml10"]
	      }, [_c('text', {
	        staticClass: ["title", "ml10", "sss"]
	      }, [_vm._v(_vm._s(city.name))])]), (_vm.listId == city.id) ? _c('div', [_c('text', {
	        staticClass: ["check"],
	        style: {
	          fontFamily: 'iconfont'
	        }
	      }, [_vm._v("")])]) : _vm._e()])
	    })) : _vm._e()
	  }), _vm._l((_vm.dataList), function(item) {
	    return (_vm.urlType == 'country') ? _c('div', _vm._l((item.children), function(city) {
	      return _c('div', {
	        staticClass: ["cell-row-row", "cell-line", "mt0", "cell-bottom-clear", "active"],
	        on: {
	          "click": function($event) {
	            _vm.checkChange(city.id, city.name, '')
	          }
	        }
	      }, [_c('div', {
	        staticClass: ["flex-row", "ml10"]
	      }, [_c('text', {
	        staticClass: ["title", "ml10", "sss"]
	      }, [_vm._v(_vm._s(city.name))])]), (_vm.listId == city.id) ? _c('div', [_c('text', {
	        staticClass: ["check"],
	        style: {
	          fontFamily: 'iconfont'
	        }
	      }, [_vm._v("")])]) : _vm._e()])
	    })) : _vm._e()
	  })], 2)], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });