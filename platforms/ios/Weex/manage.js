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
	__vue_styles__.push(__webpack_require__(71)
	)
	__vue_styles__.push(__webpack_require__(72)
	)

	/* script */
	__vue_exports__ = __webpack_require__(73)

	/* template */
	var __vue_template__ = __webpack_require__(74)
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
	__vue_options__.__file = "/Users/zhangsr/Documents/GitHub/weex/mp/src/view/member/manage.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-a5a57e7c"
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

/***/ 9:
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
	  "title": {
	    "fontSize": 32,
	    "color": "#000000"
	  },
	  "sub_title": {
	    "fontSize": 28,
	    "color": "#999999"
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
	    "height": 118,
	    "flexDirection": "row",
	    "position": "sticky",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid",
	    "borderBottomColor": "#999999",
	    "backgroundColor": "#D9141E",
	    "paddingTop": 22
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
	    "backgroundColor": "#eeeeee"
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
	  "cell-line": {
	    "borderTopWidth": 1,
	    "borderTopColor": "#999999",
	    "borderTopStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#999999",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#999999",
	    "borderBottomStyle": "solid"
	  },
	  "cell-clear": {
	    "marginTop": 0,
	    "marginBottom": 0,
	    "borderBottomWidth": 0,
	    "borderTopWidth": 0
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
	  "bkg-white": {
	    "backgroundColor": "#FFFFFF"
	  },
	  "bkg-primary": {
	    "backgroundColor": "#D9141E"
	  },
	  "bkg-gray": {
	    "backgroundColor": "#eeeeee"
	  },
	  "white": {
	    "color": "#FFFFFF"
	  },
	  "primary": {
	    "color": "#D9141E"
	  },
	  "gray": {
	    "color": "#999999"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#D9141E"
	  },
	  "arrow": {
	    "fontSize": 32,
	    "color": "#cccccc",
	    "width": 40
	  },
	  "button": {
	    "fontSize": 36,
	    "textAlign": "center",
	    "color": "#FAFAD2",
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#999999",
	    "backgroundColor": "#D9141E",
	    "borderRadius": 12,
	    "backgroundColor:active": "#eeeeee",
	    "backgroundColor:disabled": "#D9141E",
	    "color:disabled": "#999999"
	  },
	  "indicator": {
	    "fontSize": 36,
	    "color": "#D9141E",
	    "width": 750,
	    "textAlign": "center",
	    "marginTop": 20,
	    "marginBottom": 20
	  },
	  "lines-ellipsis": {
	    "lines": 1,
	    "textOverflow": "ellipsis"
	  }
	}

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

	module.exports = {
	  "back": {
	    "position": "relative",
	    "width": 96,
	    "height": 96,
	    "alignItems": "center"
	  },
	  "image": {
	    "fontSize": 44,
	    "width": 44,
	    "height": 44,
	    "top": 25,
	    "color": "#ffffff"
	  },
	  "nav": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "title": {
	    "fontFamily": "Verdana, Geneva, sans-serif",
	    "fontSize": 38,
	    "lineHeight": 38,
	    "color": "#FFFFFF"
	  }
	}

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var native = weex.requireModule('wxNativeModule');
	exports.default = {
	    props: {
	        title: { default: "navbar" }
	    },
	    created: function created() {
	        var domModule = weex.requireModule("dom");
	        domModule.addRule('fontFace', {
	            'fontFamily': 'iconfont',
	            'src': "url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
	        });
	    },

	    methods: {
	        goback: function goback(e) {
	            this.$emit('goback');
	        }
	    }
	};
	module.exports = exports["default"];

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["header"]
	  }, [_c('div', {
	    staticClass: ["back"],
	    on: {
	      "click": function($event) {
	        _vm.goback('/')
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["image"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["nav"]
	  }, [_c('text', {
	    staticClass: ["title"]
	  }, [_vm._v(_vm._s(_vm.title))])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(9)
	)
	__vue_styles__.push(__webpack_require__(10)
	)

	/* script */
	__vue_exports__ = __webpack_require__(11)

	/* template */
	var __vue_template__ = __webpack_require__(12)
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
	__vue_options__.__file = "/Users/zhangsr/Documents/GitHub/weex/mp/src/include/navbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-29311109"
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

/***/ 71:
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
	  "title": {
	    "fontSize": 32,
	    "color": "#000000"
	  },
	  "sub_title": {
	    "fontSize": 28,
	    "color": "#999999"
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
	    "height": 118,
	    "flexDirection": "row",
	    "position": "sticky",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid",
	    "borderBottomColor": "#999999",
	    "backgroundColor": "#D9141E",
	    "paddingTop": 22
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
	    "backgroundColor": "#eeeeee"
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
	  "cell-line": {
	    "borderTopWidth": 1,
	    "borderTopColor": "#999999",
	    "borderTopStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#999999",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#999999",
	    "borderBottomStyle": "solid"
	  },
	  "cell-clear": {
	    "marginTop": 0,
	    "marginBottom": 0,
	    "borderBottomWidth": 0,
	    "borderTopWidth": 0
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
	  "bkg-white": {
	    "backgroundColor": "#FFFFFF"
	  },
	  "bkg-primary": {
	    "backgroundColor": "#D9141E"
	  },
	  "bkg-gray": {
	    "backgroundColor": "#eeeeee"
	  },
	  "white": {
	    "color": "#FFFFFF"
	  },
	  "primary": {
	    "color": "#D9141E"
	  },
	  "gray": {
	    "color": "#999999"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#D9141E"
	  },
	  "arrow": {
	    "fontSize": 32,
	    "color": "#cccccc",
	    "width": 40
	  },
	  "button": {
	    "fontSize": 36,
	    "textAlign": "center",
	    "color": "#FAFAD2",
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#999999",
	    "backgroundColor": "#D9141E",
	    "borderRadius": 12,
	    "backgroundColor:active": "#eeeeee",
	    "backgroundColor:disabled": "#D9141E",
	    "color:disabled": "#999999"
	  },
	  "indicator": {
	    "fontSize": 36,
	    "color": "#D9141E",
	    "width": 750,
	    "textAlign": "center",
	    "marginTop": 20,
	    "marginBottom": 20
	  },
	  "lines-ellipsis": {
	    "lines": 1,
	    "textOverflow": "ellipsis"
	  }
	}

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

	module.exports = {
	  "logo": {
	    "width": 120,
	    "height": 120,
	    "borderRadius": 60,
	    "overflow": "hidden"
	  },
	  "name": {
	    "marginLeft": 10,
	    "flexDirection": "column",
	    "justifyContent": "center",
	    "height": 180
	  },
	  "autograph": {
	    "fontSize": 28,
	    "color": "#cccccc",
	    "top": 10
	  }
	}

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _navbar = __webpack_require__(27);

	var _navbar2 = _interopRequireDefault(_navbar);

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

	var navigator = weex.requireModule('navigator');
	exports.default = {
	    components: {
	        navbar: _navbar2.default
	    },
	    props: {
	        title: { default: "账号管理" }
	    },
	    methods: {
	        goback: function goback(e) {
	            navigator.pop({
	                url: 'http://cdn.rzico.com/weex/app/member/manager.js',
	                animated: "true"
	            }, function (msg) {
	                msg = "pop ";
	            });
	        },
	        setup: function setup(e) {
	            navigator.push({
	                url: 'http://cdn.rzico.com/weex/app/member/setup.js',
	                animated: "true"
	            });
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 74:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["wrapper"]
	  }, [_c('scroller', {
	    staticClass: ["scroller"]
	  }, [_c('div', {
	    staticClass: ["cell-row", "cell-line"]
	  }, [_c('div', {
	    staticClass: ["cell-panel", "space-between", "cell-clear"],
	    staticStyle: {
	      height: "160px"
	    },
	    on: {
	      "click": _vm.setup
	    }
	  }, [_vm._m(0), _c('div', {
	    staticClass: ["flex-row", "flex-end"]
	  }, [_c('text', {
	    staticClass: ["arrow"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])])]), _c('div', {
	    staticClass: ["cell-row", "cell-line"]
	  }, [_c('div', {
	    staticClass: ["cell-panel", "space-between"]
	  }, [_c('div', {
	    staticClass: ["flex-row", "flex-start"]
	  }, [_c('text', {
	    staticClass: ["ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["title", "ml10"]
	  }, [_vm._v("通用设置")])]), _c('div', {
	    staticClass: ["flex-row", "flex-end"]
	  }, [_c('text', {
	    staticClass: ["arrow"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])]), _c('div', {
	    staticClass: ["cell-panel", "space-between", "cell-clear"]
	  }, [_c('div', {
	    staticClass: ["flex-row"]
	  }, [_c('text', {
	    staticClass: ["ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["title", "ml10"]
	  }, [_vm._v("专栏认证")])]), _c('div', {
	    staticClass: ["flex-row", "flex-end"]
	  }, [_c('text', {
	    staticClass: ["sub_title"]
	  }, [_vm._v("已认证")]), _c('text', {
	    staticClass: ["arrow"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])])]), _c('div', {
	    staticClass: ["cell-row", "cell-line"]
	  }, [_c('div', {
	    staticClass: ["cell-panel", "space-between"]
	  }, [_c('div', {
	    staticClass: ["flex-row", "flex-start"]
	  }, [_c('text', {
	    staticClass: ["ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["title", "ml10"]
	  }, [_vm._v("商品管理")])]), _c('div', {
	    staticClass: ["flex-row", "flex-end"]
	  }, [_c('text', {
	    staticClass: ["arrow"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])]), _c('div', {
	    staticClass: ["cell-panel", "space-between"]
	  }, [_c('div', {
	    staticClass: ["flex-row", "flex-start"]
	  }, [_c('text', {
	    staticClass: ["ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["title", "ml10"]
	  }, [_vm._v("订单管理")])]), _c('div', {
	    staticClass: ["flex-row", "flex-end"]
	  }, [_c('text', {
	    staticClass: ["sub_title"]
	  }, [_vm._v("0个待处理")]), _c('text', {
	    staticClass: ["arrow"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])]), _c('div', {
	    staticClass: ["cell-panel", "space-between"]
	  }, [_c('div', {
	    staticClass: ["flex-row", "flex-start"]
	  }, [_c('text', {
	    staticClass: ["ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["title", "ml10"]
	  }, [_vm._v("评价管理")])]), _c('div', {
	    staticClass: ["flex-row", "flex-end"]
	  }, [_c('text', {
	    staticClass: ["sub_title"]
	  }), _c('text', {
	    staticClass: ["arrow"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])]), _c('div', {
	    staticClass: ["cell-panel", "space-between", "cell-clear"]
	  }, [_c('div', {
	    staticClass: ["flex-row", "flex-start"]
	  }, [_c('text', {
	    staticClass: ["ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["title", "ml10"]
	  }, [_vm._v("投票管理")])]), _c('div', {
	    staticClass: ["flex-row", "flex-end"]
	  }, [_c('text', {
	    staticClass: ["sub_title"]
	  }), _c('text', {
	    staticClass: ["arrow"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])])]), _c('div', {
	    staticClass: ["cell-row", "cell-line"]
	  }, [_c('div', {
	    staticClass: ["cell-panel", "space-between"]
	  }, [_c('div', {
	    staticClass: ["flex-row", "flex-start"]
	  }, [_c('text', {
	    staticClass: ["ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["title", "ml10"]
	  }, [_vm._v("推荐给好友")])]), _c('div', {
	    staticClass: ["flex-row", "flex-end"]
	  }, [_c('text', {
	    staticClass: ["arrow"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])]), _c('div', {
	    staticClass: ["cell-panel", "space-between", "cell-clear"]
	  }, [_c('div', {
	    staticClass: ["flex-row", "flex-start"]
	  }, [_c('text', {
	    staticClass: ["ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["title", "ml10"]
	  }, [_vm._v("联系客服")])]), _c('div', {
	    staticClass: ["flex-row", "flex-end"]
	  }, [_c('text', {
	    staticClass: ["arrow"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["flex-start"]
	  }, [_c('image', {
	    staticClass: ["logo"],
	    attrs: {
	      "resize": "cover",
	      "src": "https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"
	    }
	  }), _c('div', {
	    staticClass: ["name"]
	  }, [_c('text', {
	    staticClass: ["title"]
	  }, [_vm._v("张三")]), _c('text', {
	    staticClass: ["autograph"]
	  }, [_vm._v("点击设置个性签名")])])])
	}]}
	module.exports.render._withStripped = true

/***/ })

/******/ });