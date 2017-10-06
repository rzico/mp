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
	__vue_styles__.push(__webpack_require__(1)
	)

	/* script */
	__vue_exports__ = __webpack_require__(2)

	/* template */
	var __vue_template__ = __webpack_require__(24)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/view/member/index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-ab1ebe0c"
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
/***/ (function(module, exports) {

	module.exports = {
	  "relevantImage": {
	    "flexDirection": "row",
	    "fontSize": 32,
	    "color": "#888888",
	    "marginRight": 5,
	    "marginLeft": 5,
	    "alignItems": "center"
	  },
	  "relevantText": {
	    "color": "#888888",
	    "fontSize": 26
	  },
	  "relevantInfo": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "articleFoot": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "width": 710,
	    "alignItems": "center"
	  },
	  "articleDate": {
	    "fontSize": 24,
	    "color": "#888888"
	  },
	  "articleCover": {
	    "height": 300,
	    "width": 710,
	    "borderRadius": 5,
	    "marginTop": 20,
	    "marginBottom": 20
	  },
	  "articleBox": {
	    "backgroundColor": "#ffffff",
	    "paddingLeft": 20,
	    "paddingTop": 20,
	    "paddingRight": 20,
	    "paddingBottom": 20,
	    "marginBottom": 10
	  },
	  "atricleHead": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "articleTitle": {
	    "fontSize": 32,
	    "marginLeft": 10
	  },
	  "articleSign": {
	    "borderRadius": 10,
	    "padding": 5,
	    "color": "#888888",
	    "fontSize": 26,
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#DCDCDC"
	  },
	  "indicator": {
	    "width": 750,
	    "height": 80,
	    "textAlign": "center",
	    "lineHeight": 80
	  },
	  "wrapper": {
	    "backgroundColor": "#f4f4f4"
	  },
	  "recycleSiteContent": {
	    "alignItems": "center",
	    "width": 750
	  },
	  "tipsText": {
	    "color": "#808080",
	    "fontSize": 26,
	    "marginTop": 240,
	    "paddingBottom": 200
	  },
	  "active": {
	    "color": "#F0AD3C",
	    "borderColor": "#F0AD3C",
	    "borderStyle": "solid",
	    "borderBottomWidth": 4
	  },
	  "noActive": {
	    "borderBottomWidth": 0
	  },
	  "articleClass": {
	    "flexDirection": "row",
	    "paddingLeft": 10,
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#888888",
	    "height": 80,
	    "position": "sticky",
	    "backgroundColor": "#ffffff"
	  },
	  "allArticle": {
	    "fontSize": 29,
	    "marginRight": 20,
	    "lineHeight": 80,
	    "paddingLeft": 20,
	    "paddingRight": 20
	  },
	  "recycleSite": {
	    "fontSize": 29,
	    "lineHeight": 80,
	    "paddingLeft": 20,
	    "paddingRight": 20
	  },
	  "topBtnOne": {
	    "borderColor": "#FFFFFF",
	    "borderRightWidth": 1,
	    "borderStyle": "solid"
	  },
	  "topBtnTwo": {
	    "borderColor": "#FFFFFF",
	    "borderRightWidth": 1,
	    "borderStyle": "solid"
	  },
	  "backgroundImage": {
	    "position": "absolute",
	    "width": 750,
	    "top": 0,
	    "height": 420,
	    "filter": "blur(4px)",
	    "opacity": 0.8
	  },
	  "topBox": {
	    "position": "relative",
	    "paddingTop": 40,
	    "height": 420
	  },
	  "topBtnBox": {
	    "flexDirection": "row",
	    "alignItems": "center",
	    "marginTop": 40,
	    "width": 500,
	    "marginLeft": 125
	  },
	  "topBtnSmallBox": {
	    "height": 80,
	    "flex": 1
	  },
	  "topBtn": {
	    "color": "#FFFFFF",
	    "fontSize": 24,
	    "textAlign": "center",
	    "height": 40,
	    "lineHeight": 40
	  },
	  "topBtnBigFont": {
	    "fontWeight": "600",
	    "fontSize": 32
	  },
	  "topHead": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "paddingTop": 20,
	    "color": "#FFFFFF"
	  },
	  "testImage": {
	    "width": 120,
	    "height": 120,
	    "borderRadius": 50
	  },
	  "userSign": {
	    "lines": 1,
	    "textOverflow": "ellipsis",
	    "width": 500,
	    "fontSize": 26,
	    "color": "#FFFFFF"
	  },
	  "userName": {
	    "fontWeight": "600",
	    "fontSize": 32,
	    "marginTop": 15,
	    "marginBottom": 15,
	    "color": "#FFFFFF"
	  }
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(3);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _defineProperty2 = __webpack_require__(6);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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
       var app = weex.requireModule('app');
	var modal = weex.requireModule('modal');
	var native = weex.requireModule('wxNativeModule');
	var navigator = weex.requireModule('navigator');
	var stream = weex.requireModule('stream');
	exports.default = {
       
	    data: function data() {
	        var _ref;

	        return _ref = {
	            userName: '柯志杰',
	            userSign: '刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。',
	            isAllArticle: true,
	            isNoArticle: false,
	            refreshing: 'hide',
	            fontName: '&#xe685;',
	            collectNum: 3,
	            moneyNum: 44.5,
	            focusNum: 68,
	            imageUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	            id: '334',
	            showLoading: 'hide'
	        }, (0, _defineProperty3.default)(_ref, 'imageUrl', 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg'), (0, _defineProperty3.default)(_ref, 'articleList', [{
	            articleSign: '公开',
	            articleTitle: '金钻厦门',
	            articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	            articleDate: '2017-8-31',
	            browse: 55,
	            praise: 48,
	            comments: 32
	        }, {
	            articleSign: '私密',
	            articleTitle: '美丽厦门',
	            articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	            articleDate: '2017-09-01',
	            browse: 626,
	            praise: 47,
	            comments: 39
	        }, {
	            articleSign: '私密',
	            articleTitle: '美丽厦门',
	            articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	            articleDate: '2017-09-01',
	            browse: 626,
	            praise: 47,
	            comments: 39
	        }]), (0, _defineProperty3.default)(_ref, 'articleListDelete', [{
	            articleSign: '已删除',
	            articleTitle: '金钻厦门',
	            articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	            articleDate: '2017-8-31',
	            browse: 55,
	            praise: 48,
	            comments: 32
	        }, {
	            articleSign: '已删除',
	            articleTitle: '美丽厦门',
	            articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	            articleDate: '2017-09-01',
	            browse: 626,
	            praise: 47,
	            comments: 39
	        }, {
	            articleSign: '已删除',
	            articleTitle: '美丽厦门',
	            articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	            articleDate: '2017-09-01',
	            browse: 626,
	            praise: 47,
	            comments: 39
	        }]), _ref;
	    },
	    created: function created() {
	        if ((0, _stringify2.default)(this.articleList) == "[]") {
	            //从对象解析出字符串
	            isNoArticle = true;
	        };
	    },
	    mounted: function mounted() {
	        var domModule = weex.requireModule("dom");
	        domModule.addRule('fontFace', {
	            'fontFamily': 'iconfont',
	            'src': "url(\'http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf\')"
	        });
	    },
	    methods: {
	        toPage: function toPage(url) {
	            //                native.pageTo(url, false);
	            native.wxConfig(function (data) {
	                native.showToast(data.color);
	            });
	        },
	        jump: function jump(vueName) {
	            console.log('will jump');
       console.log('aaa=' + app.wxConfig().color);
                var bundleUrl = this.$getConfig().bundleUrl;
                bundleUrl = new String(bundleUrl);
                var nativeBaseUrl = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
                var naviToUrl = nativeBaseUrl + 'member.js';
                event.openURL(naviToUrl);
//                navigator.push({
//                      url: naviToUrl,
//                      animated: "true"
//                      });
       
	            //                this.$router.push(vueName);

	            //                    var url = this.$getConfig().bundleUrl;  //獲取當前a.we頁面的路徑(xxx/a.js)
	            //                    url = url.split('/').slice(0,-2).join('/') + 'member/manager.js';  //獲取sss.vue編譯後的b.js的相對路徑
	            //                    navigator.push({
	            //                        url: url,
	            //                        animated: true
	            //                    })
	        },
	        allArticle: function allArticle() {
	            this.isAllArticle = true;
	        },
	        recycleSite: function recycleSite() {
	            this.isAllArticle = false;
	        },
	        swipeHappen: function swipeHappen(event) {
	            console.log(event);
	            console.log(event.direction);
	            if (event.direction == 'left') {
	                this.isAllArticle = false;
	            } else if (event.direction == 'right') {
	                this.isAllArticle = true;
	            }
	        },
	        onloading: function onloading(event) {
	            var _this = this;

	            modal.toast({ message: '加载中...', duration: 1 });
	            this.showLoading = 'show';
	            setTimeout(function () {
	                var length = _this.articleList.length;
	                for (var i = length; i < length + 2; ++i) {
	                    _this.articleList.push({
	                        articleSign: '公开',
	                        articleTitle: '美丽厦门' + i,
	                        articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                        articleDate: '2017-09-01',
	                        browse: 626 + i,
	                        praise: 47 + i,
	                        comments: 39 + i
	                    });
	                }
	                _this.showLoading = 'hide';
	            }, 1500);
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(5);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(7);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	var $Object = __webpack_require__(5).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(10);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(19), 'Object', { defineProperty: __webpack_require__(15).f });


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11);
	var core = __webpack_require__(5);
	var ctx = __webpack_require__(12);
	var hide = __webpack_require__(14);
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
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(13);
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
/* 13 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(15);
	var createDesc = __webpack_require__(23);
	module.exports = __webpack_require__(19) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(16);
	var IE8_DOM_DEFINE = __webpack_require__(18);
	var toPrimitive = __webpack_require__(22);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(19) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(19) && !__webpack_require__(20)(function () {
	  return Object.defineProperty(__webpack_require__(21)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(20)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);
	var document = __webpack_require__(11).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(17);
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('scroller', {
	    staticClass: ["wrapper"],
	    attrs: {
	      "showScrollbar": "false"
	    }
	  }, [_c('div', {
	    ref: "topBox",
	    staticClass: ["topBox"]
	  }, [_c('image', {
	    staticClass: ["backgroundImage"],
	    attrs: {
	      "src": _vm.imageUrl
	    }
	  }), _c('div', {
	    staticClass: ["topHead"],
	    on: {
	      "click": function($event) {
	        _vm.toPage('member/manager.js')
	      }
	    }
	  }, [_c('image', {
	    staticClass: ["testImage"],
	    attrs: {
	      "src": _vm.imageUrl
	    }
	  }), _c('text', {
	    staticClass: ["userName"]
	  }, [_vm._v(_vm._s(_vm.userName))]), _c('text', {
	    staticClass: ["userSign"]
	  }, [_vm._v(_vm._s(_vm.userSign))])]), _c('div', {
	    staticClass: ["topBtnBox"]
	  }, [_c('div', {
	    staticClass: ["topBtnSmallBox", "topBtnOne"],
	    on: {
	      "click": function($event) {
	        _vm.jump()
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["topBtn", "topBtnBigFont"]
	  }, [_vm._v(_vm._s(_vm.collectNum))]), _c('text', {
	    staticClass: ["topBtn"]
	  }, [_vm._v("收藏")])]), _c('div', {
	    staticClass: ["topBtnSmallBox", "topBtnTwo"],
	    on: {
	      "click": function($event) {
	        _vm.jump()
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["topBtn", "topBtnBigFont"]
	  }, [_vm._v("¥ " + _vm._s(_vm.moneyNum))]), _c('text', {
	    staticClass: ["topBtn"]
	  }, [_vm._v("钱包")])]), _c('div', {
	    staticClass: ["topBtnSmallBox"]
	  }, [_c('text', {
	    staticClass: ["topBtn", "topBtnBigFont"]
	  }, [_vm._v(_vm._s(_vm.focusNum))]), _c('text', {
	    staticClass: ["topBtn"]
	  }, [_vm._v("关注")])])])]), _c('div', [_c('div', {
	    staticClass: ["articleClass"]
	  }, [_c('text', {
	    staticClass: ["allArticle"],
	    class: [_vm.isAllArticle ? 'active' : 'noActive'],
	    on: {
	      "click": function($event) {
	        _vm.allArticle()
	      }
	    }
	  }, [_vm._v("全部文章")]), _c('text', {
	    staticClass: ["recycleSite"],
	    class: [!_vm.isAllArticle ? 'active' : 'noActive'],
	    on: {
	      "click": function($event) {
	        _vm.recycleSite()
	      }
	    }
	  }, [_vm._v("回收站")])]), (_vm.isAllArticle) ? _c('div', {
	    attrs: {
	      "transition": "slide-edit-box"
	    }
	  }, [_c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [_c('div', [(_vm.isNoArticle) ? _c('text', {
	    staticClass: ["tipsText"]
	  }, [_vm._v("您还没有文章")]) : _vm._e()])]), _c('div', _vm._l((_vm.articleList), function(item) {
	    return _c('div', {
	      staticClass: ["articleBox"],
	      on: {
	        "click": function($event) {
	          _vm.jump()
	        },
	        "swipe": function($event) {
	          _vm.swipeHappen($event)
	        }
	      }
	    }, [_c('div', {
	      staticClass: ["atricleHead"]
	    }, [_c('text', {
	      staticClass: ["articleSign"]
	    }, [_vm._v(_vm._s(item.articleSign))]), _c('text', {
	      staticClass: ["articleTitle"]
	    }, [_vm._v(_vm._s(item.articleTitle))])]), _c('div', [_c('image', {
	      staticClass: ["articleCover"],
	      attrs: {
	        "src": item.articleCoverUrl
	      }
	    })]), _c('div', {
	      staticClass: ["articleFoot"]
	    }, [_c('div', [_c('text', {
	      staticClass: ["articleDate"]
	    }, [_vm._v(_vm._s(item.articleDate))])]), _c('div', {
	      staticClass: ["relevantInfo"]
	    }, [_c('text', {
	      staticClass: ["relevantImage"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")]), _c('text', {
	      staticClass: ["relevantText"]
	    }, [_vm._v(_vm._s(item.browse))]), _c('text', {
	      staticClass: ["relevantImage", "testC"],
	      staticStyle: {
	        paddingBottom: "2px"
	      },
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")]), _c('text', {
	      staticClass: ["relevantText"]
	    }, [_vm._v(_vm._s(item.praise))]), _c('text', {
	      staticClass: ["relevantImage"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")]), _c('text', {
	      staticClass: ["relevantText"]
	    }, [_vm._v(_vm._s(item.comments))])])])])
	  }))], 1) : _vm._e(), (!_vm.isAllArticle) ? _c('div', {
	    staticClass: ["recycleSiteContent"],
	    attrs: {
	      "transition": "slide-edit-box"
	    }
	  }, [_c('div', [(_vm.isNoArticle) ? _c('text', {
	    staticClass: ["tipsText"]
	  }, [_vm._v("您没有文章在回收站中")]) : _vm._e()]), _c('div', _vm._l((_vm.articleListDelete), function(item) {
	    return _c('div', {
	      staticClass: ["articleBox"],
	      on: {
	        "swipe": function($event) {
	          _vm.swipeHappen($event)
	        }
	      }
	    }, [_c('div', {
	      staticClass: ["atricleHead"]
	    }, [_c('text', {
	      staticClass: ["articleSign"]
	    }, [_vm._v(_vm._s(item.articleSign))]), _c('text', {
	      staticClass: ["articleTitle"]
	    }, [_vm._v(_vm._s(item.articleTitle))])]), _c('div', [_c('image', {
	      staticClass: ["articleCover"],
	      attrs: {
	        "src": item.articleCoverUrl
	      }
	    })]), _c('div', {
	      staticClass: ["articleFoot"]
	    }, [_c('div', [_c('text', {
	      staticClass: ["articleDate"]
	    }, [_vm._v(_vm._s(item.articleDate))])]), _c('div', {
	      staticClass: ["relevantInfo"]
	    }, [_c('text', {
	      staticClass: ["relevantImage"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")]), _c('text', {
	      staticClass: ["relevantText"]
	    }, [_vm._v(_vm._s(item.browse))]), _c('text', {
	      staticClass: ["relevantImage", "testC"],
	      staticStyle: {
	        paddingBottom: "2px"
	      },
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")]), _c('text', {
	      staticClass: ["relevantText"]
	    }, [_vm._v(_vm._s(item.praise))]), _c('text', {
	      staticClass: ["relevantImage"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")]), _c('text', {
	      staticClass: ["relevantText"]
	    }, [_vm._v(_vm._s(item.comments))])])])])
	  }))]) : _vm._e()]), _c('loading', {
	    staticClass: ["loading"],
	    attrs: {
	      "display": _vm.showLoading
	    },
	    on: {
	      "loading": _vm.onloading
	    }
	  }, [_c('text', {
	    staticClass: ["indicator"]
	  }, [_vm._v("Loading ...")])])], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })
/******/ ]);
